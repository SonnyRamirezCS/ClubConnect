# Implementation Notes

## Changes Completed

### 1. Branding Updates
- ✅ Changed "CampusConnect" to "Club Connect" throughout the application
- ✅ Updated logo from "C" to "CC" in headers
- ✅ Updated all page titles and meta tags

### 2. UI Enhancements
- ✅ Added back button to sign in page (top-left corner)
- ✅ Made banner bigger with college name, address, and semester info
- ✅ Added "About Club Connect" section on home page

### 3. Map Implementation
- ✅ Created `CampusMap.tsx` component with simple HTML iframe implementation
- ✅ Uses Google Maps embed API (no API key required for basic embedding)
- ✅ Building coordinates added for:
  - VGLE (Pierce Village): 34.2031, -118.5681
  - AT (Applied Technology): 34.2015, -118.5710
  - CFS (Center for Sciences): 34.2045, -118.5700
- ✅ "Get Directions" and "View on Map" buttons open Google Maps

### 4. Club Data
- ✅ Created `src/data/clubs.ts` with club information:
  - Tech Club: VGLE 8109, Monday 1pm-2pm PST (weekly)
  - SHPE: AT 3804, Thursday 2pm-3pm PST (weekly)
  - Pierce Science Journal Club: CFS 9203, Friday 1:45pm-2:45pm PST (biweekly)

### 5. Google Calendar Integration
- ✅ `generateGoogleCalendarUrl()` function creates recurring event URLs
- ✅ Supports weekly and biweekly recurring events
- ✅ Automatically calculates next meeting date
- ✅ Includes location, description, and proper time formatting

## How to Use the Map Component

The `CampusMap` component is already integrated into the club detail page. It automatically:
1. Extracts building code from room number (e.g., "VGLE 8109" → "VGLE")
2. Looks up coordinates for that building
3. Displays an embedded Google Map
4. Provides buttons for directions and viewing on Google Maps

### Adding New Buildings

To add coordinates for new buildings, update `BUILDING_COORDINATES` in `src/components/CampusMap.tsx`:

```typescript
const BUILDING_COORDINATES: Record<string, { lat: number; lng: number; name: string }> = {
  "YOUR_CODE": { lat: 34.XXXX, lng: -118.XXXX, name: "Building Name" },
};
```

## Google Calendar Integration

The `generateGoogleCalendarUrl()` function in `src/data/clubs.ts` creates Google Calendar URLs with:
- Recurring events (weekly/biweekly)
- Proper time formatting
- Location information
- Event descriptions

To use it:
```typescript
import { generateGoogleCalendarUrl, clubData } from "@/data/clubs";

const calendarUrl = generateGoogleCalendarUrl(clubData[0]);
window.open(calendarUrl, "_blank");
```

## Next Steps

1. **Add Campus Map Image as Logo**: 
   - Place the campus map image in `public/` folder
   - Update logo components to use `<img src="/campus-map.png" />` instead of "CC"

2. **Populate Database**:
   - Use the club data from `src/data/clubs.ts` to populate your Supabase database
   - Create events with recurring schedules using the meeting information

3. **Add More Clubs**:
   - Add all 80+ clubs from the list to `src/data/clubs.ts`
   - Update building coordinates as needed

4. **Enhance Map**:
   - Add more building coordinates
   - Consider using Google Maps JavaScript API for interactive features
   - Add room-level markers if needed

## Building Coordinates Reference

To find coordinates for new buildings:
1. Go to Google Maps
2. Search for "Los Angeles Pierce College [Building Name]"
3. Right-click on the location → "What's here?"
4. Copy the latitude and longitude

Example coordinates format:
- Latitude: 34.2031 (North/South)
- Longitude: -118.5681 (East/West, negative for West)

