# 🔑 How to Get Your Supabase Keys

Since you created the Supabase project, you can get all the keys you need from the dashboard.

---

## Step 1: Go to Supabase Dashboard

1. **Open your browser**
2. **Go to:** https://supabase.com/dashboard
3. **Sign in** with your account
4. **Select your project** (the one you just created)

---

## Step 2: Get Your API Keys

1. **In the left sidebar**, click **"Settings"** (gear icon)
2. **Click "API"** in the settings menu

3. **You'll see several sections:**
   - Project URL
   - Project API keys
   - etc.

---

## Step 3: Copy Your Keys

You need **3 values**:

### 1. Project URL
- **Location:** Under "Project URL" section
- **Looks like:** `https://xxxxxxxxxxxxx.supabase.co`
- **Copy this entire URL**

### 2. Anon/Public Key
- **Location:** Under "Project API keys" → "anon" → "public"
- **This is a long JWT token** starting with `eyJ...`
- **Click the eye icon** to reveal it, then click **"Copy"**

### 3. Service Role Key ⭐ (IMPORTANT)
- **Location:** Under "Project API keys" → "service_role" → "secret"
- **This is also a long JWT token** starting with `eyJ...`
- **Click the eye icon** to reveal it, then click **"Copy"**
- **⚠️ WARNING:** This key bypasses all security - keep it secret!

---

## Step 4: Create/Update .env.local File

1. **Go to your project folder:**
   ```
   C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main
   ```

2. **Create or open `.env.local` file** in the root folder

3. **Add these 3 lines** (paste your actual values):

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
   VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

4. **Example** (with your actual values):
   ```env
   VITE_SUPABASE_URL=https://fhuqivwdgnpnsyxxkotf.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodXFpdndkZ25wbnN5eHhrb3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.actual_key_here
   VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodXFpdndkZ25wbnN5eHhrb3RmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTk5OTk5OSwiZXhwIjoyMDE1NTc1OTk5fQ.actual_key_here
   ```

5. **Save the file** (Ctrl+S)

---

## Step 5: Run Database Migrations

Your Supabase project needs the database tables. Let's check if they exist:

1. **In Supabase Dashboard**, go to **"SQL Editor"** (left sidebar)

2. **Click "New query"**

3. **Check if tables exist** - run this:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

4. **If you don't see `clubs`, `events`, `memberships` tables**, you need to run the migration:

   - Go to **"SQL Editor"** → **"New query"**
   - Open the file: `supabase/migrations/20251108232436_8f1e748a-76d5-43b6-ac4a-58c7f54f3f64.sql`
   - Copy the entire contents
   - Paste into SQL Editor
   - Click **"Run"** (or press Ctrl+Enter)

---

## Step 6: Add INSERT Policy for Clubs

Since you have dashboard access, add the RLS policy:

1. **Go to SQL Editor** → **"New query"**

2. **Run this SQL:**
   ```sql
   -- Allow authenticated users to insert clubs
   CREATE POLICY "Authenticated users can insert clubs"
     ON public.clubs FOR INSERT
     TO authenticated
     WITH CHECK (true);
   ```

3. **Click "Run"**

---

## Step 7: Restart Dev Server

1. **Stop your server** (if running):
   - Press `Ctrl + C` in terminal

2. **Start it again:**
   ```powershell
   npm run dev
   ```

---

## Step 8: Add Clubs via Admin Page

1. **Open browser:** http://localhost:8080/admin

2. **Click "Add Clubs to Database"**

3. **Should work now!** ✅

---

## Quick Reference: Where to Find Keys

| What You Need | Where to Find |
|---------------|---------------|
| **Project URL** | Settings → API → Project URL |
| **Anon Key** | Settings → API → Project API keys → anon → public |
| **Service Role Key** | Settings → API → Project API keys → service_role → secret |

---

## ✅ Checklist

- [ ] Opened Supabase Dashboard
- [ ] Found Project URL
- [ ] Found Anon/Public Key
- [ ] Found Service Role Key
- [ ] Added all 3 to `.env.local`
- [ ] Ran database migration (if needed)
- [ ] Added INSERT policy for clubs
- [ ] Restarted dev server
- [ ] Tested Admin page

---

**You're all set!** Now you can add clubs to your database! 🎉


