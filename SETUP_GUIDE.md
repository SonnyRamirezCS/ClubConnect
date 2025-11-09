# Club Connect - Setup & Run Guide

## Prerequisites

Before you begin, make sure you have:
- **Node.js** installed (version 18 or higher)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

### Check if you have Node.js:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## Step 1: Navigate to Project Directory

Open your terminal (PowerShell on Windows, Terminal on Mac/Linux) and navigate to the project:

```bash
cd C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main
```

Or if you're already in the Downloads folder:
```bash
cd pierce-link-main\pierce-link-main
```

---

## Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will download all the necessary libraries (React, Vite, Supabase, etc.). This may take 2-5 minutes.

**Expected output:**
```
added 426 packages, and audited 427 packages
```

---

## Step 3: Set Up Environment Variables

Your project needs Supabase credentials. Check if you have a `.env` or `.env.local` file in the project root.

If not, create a `.env.local` file with:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key_here
VITE_SUPABASE_PROJECT_ID=your_project_id_here
```

**Note:** Your `.env` file should already exist with these values based on earlier setup.

---

## Step 4: Add Logo Image (Optional)

1. Save your Club Connect logo as: `public/club-connect-logo.png`
2. The logo will automatically appear throughout the app
3. If the image isn't found, it will show "CC" as a fallback

---

## Step 5: Start the Development Server

Run this command:

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.x.x:8080/
```

---

## Step 6: Open in Browser

1. Open your web browser
2. Go to: **http://localhost:8080**
3. You should see the Club Connect homepage!

---

## Important Notes

### ⚠️ Keep Terminal Open
- **DO NOT close the terminal** while the server is running
- The server must stay running for the website to work
- Press `Ctrl + C` in the terminal to stop the server

### 🔄 Making Changes
- The server automatically reloads when you save files
- Just refresh your browser to see changes

### 🛑 Stopping the Server
- Press `Ctrl + C` in the terminal
- Type `Y` and press Enter to confirm

---

## Troubleshooting

### "Port 8080 is already in use"
**Solution:** Kill the process using port 8080:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process
```

Then try `npm run dev` again.

### "Cannot find module" errors
**Solution:** Delete `node_modules` folder and reinstall:
```bash
rm -rf node_modules
npm install
```

### "Connection refused" error
**Solution:** 
1. Make sure the server is running (check terminal)
2. Try `http://127.0.0.1:8080` instead of `localhost:8080`

### Database/Supabase errors
**Solution:** 
1. Check your `.env` file has correct Supabase credentials
2. Make sure your Supabase project is active
3. Verify database tables exist (run migrations if needed)

---

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (check code quality)
npm run lint
```

---

## Project Structure

```
pierce-link-main/
├── public/              # Static files (images, favicon)
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── data/            # Club data
│   └── integrations/    # Supabase setup
├── index.html           # Main HTML file
├── package.json         # Dependencies
└── vite.config.ts       # Vite configuration
```

---

## Next Steps After Setup

1. **Add Club Data**: Populate your Supabase database with club information
2. **Add Logo**: Place `club-connect-logo.png` in the `public/` folder
3. **Test Features**: 
   - Sign up/Sign in
   - Browse clubs
   - Join clubs
   - View calendar
   - Check in to events

---

## Need Help?

- Check the browser console (F12) for errors
- Check the terminal for server errors
- Verify all environment variables are set correctly
- Make sure Supabase is properly configured

---

## Quick Start (TL;DR)

```bash
# 1. Navigate to project
cd C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main

# 2. Install dependencies
npm install

# 3. Start server
npm run dev

# 4. Open browser to http://localhost:8080
```

**That's it!** 🎉


