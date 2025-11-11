-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'advisor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  long_desc TEXT,
  room TEXT,
  category TEXT NOT NULL,
  advisor TEXT,
  contact_email TEXT,
  meeting_time TEXT,
  next_meeting TEXT,
  coordinates JSONB,
  socials JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create club_members table (junction table)
CREATE TABLE IF NOT EXISTS club_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(club_id, user_id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  location TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create event_attendees table
CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checked_in_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  checked_out_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Clubs RLS Policies
CREATE POLICY "Anyone can view clubs"
  ON clubs FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert clubs"
  ON clubs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'advisor')
    )
  );

CREATE POLICY "Admins can update clubs"
  ON clubs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'advisor')
    )
  );

CREATE POLICY "Admins can delete clubs"
  ON clubs FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'advisor')
    )
  );

-- Club Members RLS Policies
CREATE POLICY "Users can view their own memberships"
  ON club_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view members of clubs they belong to"
  ON club_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM club_members cm
      WHERE cm.club_id = club_members.club_id
      AND cm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join clubs"
  ON club_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave clubs"
  ON club_members FOR DELETE
  USING (auth.uid() = user_id);

-- Events RLS Policies
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Admins can create events"
  ON events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'advisor')
    )
  );

CREATE POLICY "Admins can update events"
  ON events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'advisor')
    )
  );

CREATE POLICY "Admins can delete events"
  ON events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'advisor')
    )
  );

-- Event Attendees RLS Policies
CREATE POLICY "Users can view their own attendance"
  ON event_attendees FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view attendance for events in their clubs"
  ON event_attendees FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events e
      JOIN club_members cm ON cm.club_id = e.club_id
      WHERE e.id = event_attendees.event_id
      AND cm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can check in to events"
  ON event_attendees FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attendance"
  ON event_attendees FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_club_members_user_id ON club_members(user_id);
CREATE INDEX IF NOT EXISTS idx_club_members_club_id ON club_members(club_id);
CREATE INDEX IF NOT EXISTS idx_events_club_id ON events(club_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON event_attendees(user_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_clubs_category ON clubs(category);
CREATE INDEX IF NOT EXISTS idx_clubs_slug ON clubs(slug);

