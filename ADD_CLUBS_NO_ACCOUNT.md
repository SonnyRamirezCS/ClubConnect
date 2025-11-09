# 🔓 Add Clubs Without Supabase Account

If you're using Supabase but don't have dashboard access, here are solutions:

## Solution 1: Use Service Role Key (Recommended) ⭐

If you have the service role key, it bypasses RLS completely.

### Step 1: Get Service Role Key

Ask whoever set up the Supabase project for the **service_role** key (NOT the anon key).

### Step 2: Add to Environment Variables

Create or update `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ IMPORTANT:** Never commit the service role key to Git! It's a secret key.

### Step 3: Restart Dev Server

```powershell
# Stop server (Ctrl+C), then restart:
npm run dev
```

### Step 4: Use Admin Page

1. Go to: http://localhost:8080/admin
2. Click "Add Clubs to Database"
3. Should work now! ✅

---

## Solution 2: Disable RLS Temporarily (Via SQL)

If you have SQL access (even without dashboard):

### Run This SQL:

```sql
-- Temporarily disable RLS for clubs table (for initial setup)
ALTER TABLE public.clubs DISABLE ROW LEVEL SECURITY;
```

**Then:**
1. Use Admin page to add clubs
2. **Re-enable RLS after:**
   ```sql
   ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
   ```
3. **Add proper INSERT policy:**
   ```sql
   CREATE POLICY "Allow inserts for setup"
     ON public.clubs FOR INSERT
     WITH CHECK (true);
   ```

---

## Solution 3: Direct SQL Insert (No Admin Page)

If you have SQL access, insert clubs directly:

### Run This SQL:

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
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_desc = EXCLUDED.short_desc,
  long_desc = EXCLUDED.long_desc,
  room_code = EXCLUDED.room_code,
  advisor_name = EXCLUDED.advisor_name,
  contact_email = EXCLUDED.contact_email;

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
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_desc = EXCLUDED.short_desc,
  long_desc = EXCLUDED.long_desc,
  room_code = EXCLUDED.room_code,
  advisor_name = EXCLUDED.advisor_name,
  contact_email = EXCLUDED.contact_email;

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
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_desc = EXCLUDED.short_desc,
  long_desc = EXCLUDED.long_desc,
  room_code = EXCLUDED.room_code,
  advisor_name = EXCLUDED.advisor_name,
  contact_email = EXCLUDED.contact_email;
```

---

## Solution 4: Browser Console (Temporary Workaround)

If you can't use any of the above, you can temporarily modify RLS in the browser console:

1. **Open browser console** (F12)
2. **Go to Admin page:** http://localhost:8080/admin
3. **In console, run:**

```javascript
// This won't work directly, but you can use the service role key approach
// Or ask for SQL access to run the policy creation
```

---

## Which Solution to Use?

| Solution | When to Use | Difficulty |
|----------|-------------|------------|
| **Service Role Key** | You have the key | ⭐ Easy |
| **Disable RLS** | You have SQL access | ⭐⭐ Medium |
| **Direct SQL** | You have SQL access | ⭐⭐ Medium |
| **Ask Admin** | None of the above | ⭐⭐⭐ Hard |

---

## After Adding Clubs

1. **Verify clubs appear:**
   - Go to homepage: http://localhost:8080
   - You should see all 3 clubs

2. **Create recurring events:**
   - Go to Admin page
   - Click "Create Recurring Events"

---

## Need Help?

If you don't have:
- ❌ Service role key
- ❌ SQL access
- ❌ Dashboard access

**Ask the person who set up Supabase to:**
1. Either give you the service role key
2. Or run the SQL to add the INSERT policy
3. Or add the clubs manually via SQL

---

**Recommended:** Get the service role key and add it to `.env.local` - it's the easiest solution! 🚀

