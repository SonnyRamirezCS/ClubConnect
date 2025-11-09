# Quick Start Guide - Club Connect

## 🚀 Setup in 3 Steps

### Step 1: Open Terminal
Open PowerShell (Windows) or Terminal (Mac/Linux)

### Step 2: Navigate to Project
```bash
cd C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main
```

### Step 3: Install & Run
```bash
npm install
npm run dev
```

### Step 4: Open Browser
Go to: **http://localhost:8080**

---

## ✅ What's Already Done

- ✅ Logo component ready (add `club-connect-logo.png` to `public/` folder)
- ✅ All "CampusConnect" changed to "Club Connect"
- ✅ Back button on sign in page
- ✅ Bigger banner with college info
- ✅ About Us section on home page
- ✅ Map component with building coordinates
- ✅ 3 clubs added with meeting times:
  - **Tech Club**: VGLE 8109, Monday 1pm-2pm PST (weekly)
  - **SHPE**: AT 3804, Thursday 2pm-3pm PST (weekly)
  - **Pierce Science Journal Club**: CFS 9203, Friday 1:45pm-2:45pm PST (biweekly)
- ✅ Google Calendar integration for recurring events

---

## 📍 Building Coordinates

The map component uses these coordinates:
- **VGLE (Pierce Village)**: 34.2035, -118.5675
- **AT (Applied Technology)**: 34.2018, -118.5712
- **CFS (Center for Sciences)**: 34.2048, -118.5698

---

## 🗓️ Google Calendar Integration

Users can add club meetings to their Google Calendar:
- Recurring events (weekly/biweekly)
- Automatic next meeting calculation
- Includes location and description

---

## 🖼️ Adding the Logo

1. Save your Club Connect logo as: `public/club-connect-logo.png`
2. The logo will automatically appear everywhere
3. If image not found, shows "CC" as fallback

---

## ⚠️ Important

- **Keep terminal open** while server is running
- Press `Ctrl + C` to stop the server
- Website only works while server is running

---

## 🆘 Troubleshooting

**Port 8080 in use?**
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process
```

**Module errors?**
```bash
rm -rf node_modules
npm install
```

**Connection refused?**
- Check terminal shows "VITE ready"
- Try `http://127.0.0.1:8080` instead

---

## 📚 More Info

See `SETUP_GUIDE.md` for detailed instructions.

