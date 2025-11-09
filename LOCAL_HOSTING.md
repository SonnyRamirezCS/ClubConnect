# 🏠 Local Hosting Guide - Club Connect

Host your Club Connect app locally on your computer.

---

## 🚀 Quick Start

### Option 1: Development Server (Recommended for Development)

Run the development server with hot-reload:

```powershell
cd pierce-link-main
npm run dev
```

**Access at:** http://localhost:8080

**Features:**
- ✅ Hot module replacement (changes update instantly)
- ✅ Fast refresh
- ✅ Development tools enabled
- ✅ Source maps for debugging

---

### Option 2: Production Preview (Recommended for Testing Production Build)

Test the production build locally:

```powershell
cd pierce-link-main
npm run build
npm run preview
```

**Access at:** http://localhost:4173 (or the port shown in terminal)

**Features:**
- ✅ Production-optimized build
- ✅ Same as what will be deployed
- ✅ Minified and optimized code
- ✅ Test production performance

---

## 📋 Prerequisites

1. **Node.js installed** (version 18+)
   ```powershell
   node --version
   ```

2. **Dependencies installed**
   ```powershell
   npm install
   ```

3. **Environment variables set**
   - Create `.env.local` file with:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
     ```

---

## 🔧 Configuration

### Change Port (if needed)

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 8080,  // Change this to your preferred port
  },
  // ...
})
```

### Access from Other Devices on Network

The dev server shows a Network URL like:
```
➜  Network: http://192.168.x.x:8080/
```

Use this URL to access from:
- Other computers on the same network
- Your phone/tablet on the same Wi-Fi
- Other devices

---

## 🛠️ Troubleshooting

### Port Already in Use

If port 8080 is busy:
1. Change port in `vite.config.ts`
2. Or kill the process using the port:
   ```powershell
   # Find process using port 8080
   netstat -ano | findstr :8080
   # Kill process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

### Build Errors

```powershell
# Clean install
rm -r node_modules
npm install
npm run build
```

### Environment Variables Not Working

1. Make sure file is named `.env.local` (not `.env`)
2. Restart the dev server after changing `.env.local`
3. Variables must start with `VITE_`

### Can't Access from Network

1. Check Windows Firewall settings
2. Make sure you're using the Network URL (not localhost)
3. Verify devices are on the same network

---

## 📱 Testing on Mobile Devices

1. **Find your computer's IP address:**
   ```powershell
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. **Start dev server:**
   ```powershell
   npm run dev
   ```

3. **On your phone/tablet:**
   - Connect to same Wi-Fi network
   - Open browser
   - Go to: `http://192.168.1.100:8080` (use your IP)

---

## 🎯 Which Option to Use?

### Use Development Server (`npm run dev`) when:
- ✅ Actively developing/editing code
- ✅ Need hot-reload for quick testing
- ✅ Debugging and need source maps
- ✅ Making frequent changes

### Use Production Preview (`npm run preview`) when:
- ✅ Testing production build before deployment
- ✅ Checking performance of optimized build
- ✅ Verifying everything works in production mode
- ✅ Final testing before going live

---

## 🔄 Common Commands

```powershell
# Development
npm run dev              # Start dev server (port 8080)

# Production
npm run build           # Build for production
npm run preview         # Preview production build (port 4173)

# Other
npm run lint            # Check code for errors
```

---

## ✅ Checklist

Before hosting locally, make sure:

- [ ] Node.js installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created with Supabase credentials
- [ ] Port 8080 (or chosen port) is available
- [ ] Supabase project is set up and running

---

## 🎉 You're Ready!

Your app should now be running locally. Open your browser and go to:
- **Development:** http://localhost:8080
- **Production Preview:** http://localhost:4173

Happy coding! 🚀

