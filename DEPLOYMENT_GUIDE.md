# 🚀 Deployment Guide - Club Connect

This guide will help you deploy Club Connect to the web. Choose one of the hosting platforms below.

## Prerequisites

Before deploying, make sure you have:
- ✅ Your Supabase credentials ready
- ✅ A GitHub account (recommended for easy deployment)
- ✅ Your project builds successfully (`npm run build`)

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest and fastest way to deploy your Vite React app.

### Step 1: Prepare Your Project

1. Make sure your code is in a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/yourusername/club-connect.git
     git push -u origin main
     ```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up/login (you can use your GitHub account)

2. **Click "Add New Project"**

3. **Import your GitHub repository** (select your club-connect repo)

4. **Configure Project Settings:**
   - Framework Preset: **Vite** (should auto-detect)
   - Root Directory: `./` (or `pierce-link-main` if deploying from parent folder)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Install Command: `npm install` (auto-filled)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL = your_supabase_url_here
   VITE_SUPABASE_PUBLISHABLE_KEY = your_supabase_key_here
   ```

6. **Click "Deploy"**

7. **Wait for deployment** (usually 1-2 minutes)

8. **Your site is live!** 🎉
   - Vercel will give you a URL like: `https://club-connect.vercel.app`
   - You can add a custom domain later

### Step 3: Update Supabase Redirect URLs

1. Go to your Supabase Dashboard
2. Navigate to Authentication → URL Configuration
3. Add your Vercel URL to "Redirect URLs":
   - `https://your-app.vercel.app`
   - `https://your-app.vercel.app/**`

---

## Option 2: Deploy to Netlify

### Step 1: Prepare Your Project

Same as Vercel - make sure your code is on GitHub.

### Step 2: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign up/login

2. **Click "Add new site" → "Import an existing project"**

3. **Connect to GitHub** and select your repository

4. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty or `pierce-link-main` if needed)

5. **Add Environment Variables:**
   Click "Site settings" → "Environment variables" and add:
   ```
   VITE_SUPABASE_URL = your_supabase_url_here
   VITE_SUPABASE_PUBLISHABLE_KEY = your_supabase_key_here
   ```

6. **Click "Deploy site"**

7. **Your site is live!** 🎉
   - Netlify will give you a URL like: `https://random-name-123.netlify.app`
   - You can customize the name in site settings

### Step 3: Update Supabase Redirect URLs

Same as Vercel - add your Netlify URL to Supabase redirect URLs.

---

## Option 3: Deploy to GitHub Pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add these scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 3: Update vite.config.ts

Add base path:
```typescript
export default defineConfig({
  base: '/your-repo-name/', // Replace with your GitHub repo name
  // ... rest of config
})
```

### Step 4: Deploy

```bash
npm run deploy
```

---

## Testing Your Deployment

After deployment, test these features:

1. ✅ **Homepage loads** - Should show banner and club listings
2. ✅ **Sign In/Sign Up** - Test authentication
3. ✅ **Club pages** - Check if club detail pages load
4. ✅ **Maps** - Verify Google Maps embeds work
5. ✅ **Calendar** - Test "Add to Calendar" buttons

---

## Environment Variables Checklist

Make sure these are set in your hosting platform:

- ✅ `VITE_SUPABASE_URL` - Your Supabase project URL
- ✅ `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon/public key

**Important:** Never commit `.env` files to Git! Always use your hosting platform's environment variable settings.

---

## Troubleshooting

### Build Fails

1. Check build logs in your hosting platform
2. Make sure all dependencies are in `package.json`
3. Try building locally: `npm run build`

### Environment Variables Not Working

1. Verify variables are set correctly in hosting platform
2. Make sure variable names start with `VITE_`
3. Redeploy after adding/changing variables

### Routes Not Working (404 errors)

1. Make sure redirect rules are configured (Vercel/Netlify auto-configures this)
2. For GitHub Pages, ensure base path is set correctly

### Supabase Connection Issues

1. Check Supabase URL and key are correct
2. Verify redirect URLs are added in Supabase dashboard
3. Check browser console for errors

---

## Quick Deploy Commands

### Vercel CLI (Alternative Method)

```bash
npm install -g vercel
vercel login
vercel
```

### Netlify CLI (Alternative Method)

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Need Help?

- Check hosting platform documentation
- Review build logs for errors
- Test locally with `npm run build && npm run preview`
- Check browser console for runtime errors

---

**Recommended:** Start with **Vercel** - it's the easiest and has the best developer experience! 🚀

