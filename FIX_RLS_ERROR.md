# 🔧 Fix: Row Level Security (RLS) Error

## Problem
You're getting this error when trying to add clubs:
```
new row violates row-level security policy for table "clubs"
```

## Cause
The `clubs` table has Row Level Security (RLS) enabled, but there's no INSERT policy that allows adding new clubs.

## Solution

### Option 1: Add INSERT Policy via Supabase Dashboard (Easiest) ⭐

1. **Go to your Supabase Dashboard**
   - Open: https://supabase.com/dashboard
   - Select your project

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run this SQL:**
   ```sql
   -- Allow authenticated users to insert clubs
   CREATE POLICY "Authenticated users can insert clubs"
     ON public.clubs FOR INSERT
     TO authenticated
     WITH CHECK (true);
   ```

4. **Click "Run"** (or press Ctrl+Enter)

5. **Go back to Admin page and try again**
   - Refresh: http://localhost:8080/admin
   - Click "Add Clubs to Database"

---

### Option 2: Use Service Role Key (For Admin Operations)

If you want to bypass RLS for admin operations:

1. **Get your Service Role Key:**
   - Supabase Dashboard → Settings → API
   - Copy "service_role" key (NOT the anon key - keep this secret!)

2. **Update Admin Script** (temporary for setup):
   - The admin script can use service role for one-time setup
   - Or use the SQL method above (safer)

---

### Option 3: Manual SQL Insert (Bypasses RLS if using Dashboard)

1. **Go to Supabase Dashboard → SQL Editor**

2. **Run this SQL directly:**
   ```sql
   -- Insert Tech Club
   INSERT INTO clubs (name, slug, short_desc, long_desc, room_code, advisor_name, contact_email)
   VALUES (
     'Tech Club',
     'tech-club',
     'To create a hands-on community for the tech-curious; exploring programming, engineering, AI/ML, and networking.',
     'Tech Club provides a hands-on community for students interested in technology. We explore programming, engineering, AI/ML, and networking through workshops, projects, and collaborative learning.',
     'VGLE 8109',
     'Lilach Farhy',
     'lexington.carey@student.laccd.edu'
   );

   -- Insert SHPE
   INSERT INTO clubs (name, slug, short_desc, long_desc, room_code, advisor_name, contact_email)
   VALUES (
     'Society of Hispanic Professional Engineers (SHPE)',
     'shpe',
     'To build an inclusive community that empowers and fosters students in STEM through mentorship, leadership development, and networking.',
     'SHPE builds an inclusive community that empowers and fosters students in STEM through mentorship, leadership development, and networking opportunities.',
     'AT 3804',
     'Jesus Huaman Contreres',
     'ariana.aceves.sevilla@student.laccd.edu'
   );

   -- Insert Pierce Science Journal Club
   INSERT INTO clubs (name, slug, short_desc, long_desc, room_code, advisor_name, contact_email)
   VALUES (
     'Pierce Science Journal Club',
     'science-journal-club',
     'To read, understand, and present scientific research articles, and to help students interested in research become more connected.',
     'The Science Journal Club reads, understands, and presents scientific research articles. We help students interested in research become more connected with the scientific community.',
     'CFS 9203',
     'Winn Hyunh',
     'anisah.khan@student.laccd.edu'
   );
   ```

3. **Click "Run"**

---

## Recommended: Option 1 (Add Policy)

**Why?** This is the proper way to fix it. After adding the policy, the Admin page will work for future club additions.

---

## After Fixing

1. **Verify the policy was created:**
   - Supabase Dashboard → Authentication → Policies
   - You should see the new INSERT policy for clubs table

2. **Try Admin page again:**
   - Go to: http://localhost:8080/admin
   - Click "Add Clubs to Database"
   - Should work now! ✅

3. **Create recurring events:**
   - Click "Create Recurring Events"
   - This will add meeting events for each club

---

## Security Note

The policy `WITH CHECK (true)` allows any authenticated user to insert clubs. For production, you might want to restrict this to:
- Only service role
- Only specific admin users
- Only users with a specific role

But for now, this will get you up and running!

---

**Quick Fix:** Run the SQL from Option 1 in Supabase Dashboard → SQL Editor 🚀

