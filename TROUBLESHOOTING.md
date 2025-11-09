# Troubleshooting - Website Not Changing

## Common Issues & Solutions

### Issue 1: Server Not Running
**Symptoms**: Website won't load, connection refused

**Solution**:
1. Open PowerShell/Terminal
2. Navigate to project:
   ```bash
   cd C:\Users\kevin\Downloads\pierce-link-main\pierce-link-main
   ```
3. Start server:
   ```bash
   npm run dev
   ```
4. Keep terminal open!
5. Open browser to: `http://localhost:8080`

---

### Issue 2: Changes Not Appearing
**Symptoms**: Made changes but website looks the same

**Solutions**:

**A. Hard Refresh Browser**
- **Windows/Linux**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
- This clears browser cache

**B. Restart Server**
1. In terminal, press `Ctrl + C` to stop server
2. Run `npm run dev` again
3. Refresh browser

**C. Clear Browser Cache**
1. Open browser DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

**D. Check Terminal for Errors**
- Look for compilation errors
- Fix any TypeScript/React errors shown

---

### Issue 3: Wrong URL
**Symptoms**: Can't access website

**Try these URLs**:
- `http://localhost:8080`
- `http://127.0.0.1:8080`
- Check terminal for the exact URL shown

---

### Issue 4: Port Already in Use
**Symptoms**: Error about port 8080 being used

**Solution**:
```powershell
# Kill process on port 8080
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process

# Then start server again
npm run dev
```

---

### Issue 5: Files Not Saving
**Symptoms**: Changes don't persist

**Check**:
- Make sure you're saving files (Ctrl+S)
- Check if files are read-only
- Verify you're editing the correct files

---

### Issue 6: Browser Showing Old Version
**Symptoms**: Old content still showing

**Solutions**:
1. **Hard refresh**: `Ctrl + Shift + R`
2. **Clear cache**: Browser settings → Clear browsing data
3. **Incognito mode**: Open in private/incognito window
4. **Different browser**: Try Chrome, Firefox, or Edge

---

## Quick Fix Checklist

1. ✅ Server running? (Check terminal for "VITE ready")
2. ✅ Correct URL? (`http://localhost:8080`)
3. ✅ Hard refreshed? (`Ctrl + Shift + R`)
4. ✅ No errors in terminal?
5. ✅ Files saved? (Check file timestamps)
6. ✅ Browser cache cleared?

---

## Still Not Working?

1. **Check terminal output** - Look for errors
2. **Check browser console** - Press F12, look for errors
3. **Verify file changes** - Make sure files were actually saved
4. **Restart everything**:
   - Stop server (Ctrl+C)
   - Close browser
   - Start server again
   - Open fresh browser window

---

## Expected Behavior

When server is running, you should see in terminal:
```
VITE v5.4.19  ready in XXX ms
➜  Local:   http://localhost:8080/
```

Then the website should:
- Show the red banner with "Los Angeles Pierce College"
- Display "Club Connect" in header
- Show About Us section
- Display club cards (if clubs are in database)

