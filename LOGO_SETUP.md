# Logo Setup Instructions

## Club Connect Logo

The app now uses the Club Connect logo (chat bubble with people icon) throughout the application.

### To Add the Logo Image:

1. **Save your logo image** as `club-connect-logo.png` in the `public/` folder:
   ```
   public/club-connect-logo.png
   ```

2. **The logo will automatically appear** in:
   - Home page header
   - Club detail page header
   - Dashboard header
   - Settings page (if added)
   - Calendar page (if added)
   - Sign in/Sign up page

### Logo Component Features:

- **Automatic fallback**: If the image is not found, it will show "CC" text instead
- **Flexible sizing**: Can be sized with className prop (default: `w-8 h-8`)
- **Optional text**: Use `showText={true}` to display "Club Connect" text next to the logo
- **Responsive**: Works on all screen sizes

### Usage Examples:

```tsx
// Small logo without text
<Logo className="w-8 h-8" />

// Large logo with text
<Logo className="w-16 h-16" showText={true} />

// Custom size
<Logo className="w-12 h-12" />
```

### Current Implementation:

All pages have been updated to use the `<Logo />` component. The logo will display once you add the image file to the `public/` folder.


