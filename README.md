# Club Connect - Pierce College Clubs

A modern, student-friendly website for community college students to discover and manage clubs.

## Quick Start

### 1. Install Dependencies (First Time Only)
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The server will start on **http://localhost:8080**

**Important:** Keep the terminal window open while the server is running!

### 3. Access the Website
Open your browser and go to: **http://localhost:8080**

## Project Structure

- `src/pages/` - Main page components (Index, Auth, Dashboard, ClubDetail, Calendar, Settings)
- `src/components/` - Reusable components (ClubCard, SearchBar, FilterPanel, MapComponent, CheckInButton)
- `src/integrations/supabase/` - Supabase database configuration

## Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Make sure you have a `.env` file (or `.env.local`) with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

## Features

✅ Home page with club directory  
✅ User authentication (Sign In/Sign Up)  
✅ Club detail pages with maps  
✅ Personal dashboard  
✅ Calendar with Google Calendar sync  
✅ Check-in/Check-out system  
✅ Filter by major/interest  
✅ Settings page  

## Troubleshooting

**Server won't start?**
- Make sure port 8080 is not in use
- Run `npm install` to ensure all dependencies are installed

**Connection refused?**
- Make sure the server is running (check terminal for "VITE ready")
- Try `http://127.0.0.1:8080` instead of `localhost:8080`

**Module not found errors?**
- Delete `node_modules` folder and run `npm install` again
