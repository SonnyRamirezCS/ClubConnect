# Manual Setup Todo List for CampusConnect

This document outlines all the manual steps you need to complete on your end before the application will work.

## ✅ Step 1: Supabase Project Setup

### 1.1 Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com) and sign in (or create an account)
- [ ] Click "New Project"
- [ ] Fill in:
  - Project name: `campus-connect` (or your preferred name)
  - Database password: **Save this password securely!** You'll need it later
  - Region: Choose the closest region to your users
- [ ] Wait for the project to be created (takes ~2 minutes)

### 1.2 Get Your Supabase Credentials
- [ ] Once the project is ready, go to **Settings** → **API**
- [ ] Copy the following values:
  - **Project URL** (looks like: `https://xxxxx.supabase.co`)
  - **anon/public key** (the `anon` `public` key, not the `service_role` key)
- [ ] Save these in a safe place - you'll need them for Step 1.3

### 1.3 Set Up Environment Variables
- [ ] In your project root (`club-connect-pierce-main/`), create a file named `.env`
- [ ] Add the following content (replace with your actual values):
  ```
  VITE_SUPABASE_URL=https://xxxxx.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
  ```
- [ ] **Important**: Make sure `.env` is in your `.gitignore` file (to avoid committing secrets)

### 1.4 Run the Database Schema
- [ ] In your Supabase dashboard, go to **SQL Editor**
- [ ] Click "New Query"
- [ ] Copy the entire contents of `supabase/schema.sql` (this file will be created by the implementation)
- [ ] Paste it into the SQL Editor
- [ ] Click "Run" (or press Ctrl+Enter)
- [ ] Verify that all tables were created successfully:
  - `profiles`
  - `clubs`
  - `club_members`
  - `events`
  - `event_attendees`

### 1.5 Verify Row Level Security (RLS)
- [ ] In Supabase dashboard, go to **Authentication** → **Policies**
- [ ] Verify that RLS is enabled for all tables (it should be, based on the schema)
- [ ] You should see policies for:
  - `profiles`: SELECT, UPDATE for authenticated users
  - `clubs`: SELECT for everyone, INSERT/UPDATE/DELETE for admins
  - `club_members`: SELECT/INSERT/DELETE for authenticated users
  - `events`: SELECT for everyone, INSERT/UPDATE/DELETE for admins
  - `event_attendees`: SELECT/INSERT/UPDATE for authenticated users

### 1.6 Generate TypeScript Types (Optional but Recommended)
- [ ] Install Supabase CLI (if not already installed):
  ```bash
  npm install -g supabase
  ```
- [ ] Login to Supabase CLI:
  ```bash
  supabase login
  ```
- [ ] Link your project:
  ```bash
  supabase link --project-ref your-project-ref
  ```
  (Find your project ref in Settings → General → Reference ID)
- [ ] Generate types:
  ```bash
  supabase gen types typescript --linked > src/integrations/supabase/types.ts
  ```
- [ ] **OR** manually copy types from Supabase dashboard:
  - Go to **Settings** → **API** → **TypeScript Types**
  - Copy the generated types
  - Save to `src/integrations/supabase/types.ts`

## ✅ Step 2: Install Dependencies

- [ ] Run the following command in your project root:
  ```bash
  npm install @supabase/supabase-js
  ```
  (This will be added to package.json, but you need to run `npm install`)

## ✅ Step 3: Test Authentication

### 3.1 Configure Email Authentication
- [ ] In Supabase dashboard, go to **Authentication** → **Providers**
- [ ] Ensure **Email** provider is enabled
- [ ] Configure email templates (optional, but recommended):
  - Go to **Authentication** → **Email Templates**
  - Customize the "Magic Link" template if desired

### 3.2 Test the Login Flow
- [ ] Start your dev server: `npm run dev`
- [ ] Navigate to `/login`
- [ ] Enter your email address
- [ ] Check your email for the magic link
- [ ] Click the link to sign in
- [ ] Verify you're redirected and logged in

## ✅ Step 4: Seed Initial Data (Optional)

If you want to populate your database with the existing clubs from `src/data/clubs.ts`:

- [ ] You can manually insert clubs through the Supabase dashboard:
  - Go to **Table Editor** → **clubs**
  - Click "Insert" → "Insert row"
  - Fill in the fields for each club
- [ ] **OR** create a migration script (we can help with this later)

## ✅ Step 5: Set Up Admin Users (For Step 3)

When you're ready to implement the admin features:

- [ ] In Supabase dashboard, go to **Table Editor** → **profiles**
- [ ] Find your user's profile (created automatically on first login)
- [ ] Edit the `role` column and set it to `"admin"` or `"advisor"` as needed
- [ ] Repeat for any other users who should have admin access

## ✅ Step 6: Google Calendar Integration (For Step 4)

When you're ready to implement Google Calendar sync:

### 6.1 Set Up Google OAuth
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create a new project (or select existing)
- [ ] Enable **Google Calendar API**
- [ ] Create OAuth 2.0 credentials:
  - Go to **APIs & Services** → **Credentials**
  - Click "Create Credentials" → "OAuth client ID"
  - Application type: "Web application"
  - Authorized redirect URIs: Add your Supabase project's redirect URL
    - Format: `https://xxxxx.supabase.co/auth/v1/callback`
- [ ] Copy the **Client ID** and **Client Secret**
- [ ] In Supabase dashboard, go to **Authentication** → **Providers** → **Google**
- [ ] Enable Google provider
- [ ] Enter your Client ID and Client Secret
- [ ] Save

### 6.2 Set Up Supabase Edge Functions (For Step 4)
- [ ] Install Supabase CLI (if not already done)
- [ ] Initialize Supabase in your project:
  ```bash
  supabase init
  ```
- [ ] Create a new Edge Function:
  ```bash
  supabase functions new google-calendar-sync
  ```
- [ ] Deploy the function (after implementation):
  ```bash
  supabase functions deploy google-calendar-sync
  ```

## 📝 Notes

- **Security**: Never commit your `.env` file or Supabase service role key to version control
- **RLS Policies**: The schema includes RLS policies, but review them to ensure they match your security requirements
- **Email Domain**: If you want to restrict sign-ups to specific email domains (e.g., `@piercecollege.edu`), you can configure this in Supabase Authentication settings

## 🆘 Troubleshooting

- **"Invalid API key"**: Double-check your `.env` file has the correct `VITE_SUPABASE_ANON_KEY`
- **"RLS policy violation"**: Check that RLS policies are correctly set up in Supabase
- **"Table doesn't exist"**: Make sure you ran the schema.sql file in the SQL Editor
- **Magic link not working**: Check your email spam folder, and verify Email provider is enabled in Supabase

---

**Once you've completed Steps 1-3, the application should be fully functional for Steps 1 and 2 of the implementation plan!**

