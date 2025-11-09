# 🔑 Step-by-Step: Using Service Role Key to Add Clubs

## Prerequisites
- You have the Supabase service role key (ask whoever set up Supabase)
- Your dev server is running or you can start it

---

## Step 1: Get Your Service Role Key

**Ask the person who set up Supabase for:**
- ✅ Service Role Key (NOT the anon/public key)
- ✅ Your Supabase URL
- ✅ Your Supabase Anon/Public Key (you might already have this)

**Where to find it (if you have dashboard access):**
- Supabase Dashboard → Settings → API
- Look for "service_role" key (keep this secret!)

---

## Step 2: Locate Your .env.local File

1. **Open your project folder:**
   ```
   C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main
   ```

2. **Look for `.env.local` file** in the root folder (same level as `package.json`)

3. **If it doesn't exist, create it:**
   - Right-click in the folder
   - New → Text Document
   - Name it: `.env.local` (make sure it starts with a dot!)
   - Remove the `.txt` extension if Windows adds it

---

## Step 3: Add Environment Variables

1. **Open `.env.local`** in a text editor (Notepad, VS Code, etc.)

2. **Add these lines** (replace with your actual values):

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
   VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. **Example** (with fake values):
   ```env
   VITE_SUPABASE_URL=https://fhuqivwdgnpnsyxxkotf.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodXFpdndkZ25wbnN5eHhrb3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.example
   VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodXFpdndkZ25wbnN5eHhrb3RmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTk5OTk5OSwiZXhwIjoyMDE1NTc1OTk5fQ.example
   ```

4. **Save the file** (Ctrl+S)

---

## Step 4: Verify .env.local is in .gitignore

1. **Open `.gitignore`** file in your project root

2. **Make sure it contains:**
   ```
   .env
   .env.local
   .env.*.local
   ```

3. **This prevents accidentally committing your keys to Git**

---

## Step 5: Stop Your Dev Server (If Running)

1. **Go to the terminal where your server is running**

2. **Press `Ctrl + C`** to stop the server

3. **Wait for it to stop** (you'll see the prompt return)

---

## Step 6: Restart Dev Server

1. **Open terminal/PowerShell** in your project folder

2. **Navigate to project** (if not already there):
   ```powershell
   cd C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main
   ```

3. **Start the server:**
   ```powershell
   npm run dev
   ```

4. **Wait for it to start** - you should see:
   ```
   VITE v5.4.19  ready in XXX ms
   
   ➜  Local:   http://localhost:8080/
   ```

---

## Step 6: Open Admin Page

1. **Open your browser**

2. **Go to:**
   ```
   http://localhost:8080/admin
   ```

3. **You should see the Admin page** with:
   - Title: "Admin - Add Clubs to Database"
   - List of 3 clubs
   - Two buttons: "Add Clubs to Database" and "Create Recurring Events"

---

## Step 7: Add Clubs to Database

1. **Click the button:** "Add Clubs to Database"

2. **Wait a few seconds** - it will process all 3 clubs

3. **Check the Results section** below:
   - ✅ **Success:** You'll see green messages like:
     - "Tech Club: created"
     - "SHPE: created"
     - "Pierce Science Journal Club: created"
   
   - ❌ **Error:** If you see red error messages, check:
     - Service role key is correct
     - Supabase URL is correct
     - Server was restarted after adding .env.local

---

## Step 8: Create Recurring Events

1. **After clubs are added successfully**, click: **"Create Recurring Events"**

2. **Wait for processing**

3. **Check results:**
   - Should see: "event created" for each club

---

## Step 9: Verify Clubs Appear

1. **Go to homepage:**
   ```
   http://localhost:8080
   ```

2. **You should see all 3 clubs listed:**
   - Tech Club
   - SHPE
   - Pierce Science Journal Club

3. **Click on a club** to see its detail page with map

---

## ✅ Success Checklist

- [ ] Service role key added to `.env.local`
- [ ] Dev server restarted
- [ ] Admin page loads at `/admin`
- [ ] "Add Clubs to Database" button works
- [ ] All 3 clubs show "created" status
- [ ] "Create Recurring Events" works
- [ ] Clubs appear on homepage
- [ ] Club detail pages show maps

---

## 🛠️ Troubleshooting

### Error: "Cannot find module"
- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Restart the dev server

### Error: "Invalid API key"
- Double-check the service role key is correct (no extra spaces)
- Make sure you're using the **service_role** key, not the anon key

### Still getting RLS errors
- Verify the service role key starts with `eyJ...` (JWT token)
- Make sure you restarted the server after adding `.env.local`
- Check browser console (F12) for detailed error messages

### Clubs don't appear on homepage
- Refresh the page (Ctrl+R)
- Check browser console for errors
- Verify clubs were actually created (check Admin page results)

---

## 🔒 Security Reminder

**NEVER:**
- ❌ Commit `.env.local` to Git
- ❌ Share your service role key publicly
- ❌ Put service role key in client-side code
- ❌ Use service role key in production frontend

**The service role key bypasses all security - keep it secret!**

---

**That's it! Your clubs should now be in the database!** 🎉

