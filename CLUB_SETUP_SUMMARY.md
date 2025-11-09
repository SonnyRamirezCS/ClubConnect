# Club Setup Summary

## ✅ All 3 Clubs Ready to Add

### 1. Tech Club
- **Name**: Tech Club
- **Slug**: `tech-club`
- **Room**: VGLE 8109
- **Meeting**: Monday, 1:00 PM - 2:00 PM PST (Weekly)
- **Advisor**: Lilach Farhy
- **Contact**: lexington.carey@student.laccd.edu
- **Description**: To create a hands-on community for the tech-curious; exploring programming, engineering, AI/ML, and networking.

### 2. SHPE (Society of Hispanic Professional Engineers)
- **Name**: Society of Hispanic Professional Engineers (SHPE)
- **Slug**: `shpe`
- **Room**: AT 3804
- **Meeting**: Thursday, 2:00 PM - 3:00 PM PST (Weekly)
- **Advisor**: Jesus Huaman Contreres
- **Contact**: ariana.aceves.sevilla@student.laccd.edu
- **Description**: To build an inclusive community that empowers and fosters students in STEM through mentorship, leadership development, and networking.

### 3. Pierce Science Journal Club
- **Name**: Pierce Science Journal Club
- **Slug**: `science-journal-club`
- **Room**: CFS 9203
- **Meeting**: Friday, 1:45 PM - 2:45 PM PST (Biweekly - every other Friday)
- **Advisor**: Winn Hyunh
- **Contact**: anisah.khan@student.laccd.edu
- **Description**: To read, understand, and present scientific research articles, and to help students interested in research become more connected.

---

## 🗺️ Building Coordinates

All coordinates are set in `src/components/CampusMap.tsx`:

- **VGLE (Pierce Village)**: 34.2035, -118.5675
- **AT (Applied Technology)**: 34.2018, -118.5712
- **CFS (Center for Sciences)**: 34.2048, -118.5698

**Campus Address**: 6201 Winnetka Ave. Woodland Hills, CA 91371

---

## 📅 Google Calendar Integration

✅ **Fully implemented!** Users can:
- Click "Add to Calendar" on any event
- Get recurring events (weekly/biweekly)
- Automatically sync to their Google Calendar
- See next meeting dates calculated automatically

The `generateGoogleCalendarUrl()` function in `src/data/clubs.ts` handles:
- Recurring event rules (RRULE)
- Proper time formatting
- Location information
- Event descriptions

---

## 🖼️ Logo Setup

**Primary Logo**: `/lapc-campus-map-logo.png` (campus map)
**Fallback Logo**: `/club-connect-logo.png` (Club Connect logo)
**Final Fallback**: "CC" text

**To add logo:**
1. Save campus map image as: `public/lapc-campus-map-logo.png`
2. Logo will automatically appear everywhere

---

## 🚀 How to Add Clubs to Database

### Method 1: Admin Page (Recommended)
1. Start server: `npm run dev`
2. Go to: `http://localhost:8080/admin`
3. Click "Add Clubs to Database"
4. Click "Create Recurring Events"

### Method 2: SQL (Supabase Dashboard)
See `ADD_CLUBS_INSTRUCTIONS.md` for SQL commands

---

## ✅ Everything is Ready!

- ✅ Logo component (uses campus map)
- ✅ All branding changed to "Club Connect"
- ✅ Back button on sign in
- ✅ Bigger banner with address
- ✅ About Us section
- ✅ Map component with coordinates
- ✅ 3 clubs with complete data
- ✅ Google Calendar integration
- ✅ Recurring events support

**Just add the clubs to your database and you're done!**

