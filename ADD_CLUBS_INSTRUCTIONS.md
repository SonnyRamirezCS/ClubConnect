 # boooh
 # How to Add the 3 Clubs to Your Database

## Option 1: Use Admin Page (Easiest)

1. **Start your server:**
   ```bash
   npm run dev
   ```

2. **Open the admin page:**
   Go to: `http://localhost:8080/admin`

3. **Click "Add Clubs to Database"**
   - This will add all 3 clubs (Tech Club, SHPE, Pierce Science Journal Club)

4. **Click "Create Recurring Events"**
   - This will create recurring meeting events for each club

## Option 2: Manual SQL Insert (Advanced)

If you prefer to use SQL directly in Supabase:

```sql
-- Insert Tech Club
INSERT INTO clubs (name, slug, short_desc, long_desc, room_code, advisor_name, contact_email)
VALUES (
  'Tech Club',
  'tech-club',
  'To create a hands-on community for the tech-curious; exploring programming, engineering, AI/ML, and networking.',
  'Tech Club provides a hands-on community for students interested in technology. We explore programming, engineering, AI/ML, and networking through workshops, projects, and collaborative learning.',
  'VGLE 8109',
  'Lilach Farhy',
  'lexington.carey@student.laccd.edu'
);

-- Insert SHPE
INSERT INTO clubs (name, slug, short_desc, long_desc, room_code, advisor_name, contact_email)
VALUES (
  'Society of Hispanic Professional Engineers (SHPE)',
  'shpe',
  'To build an inclusive community that empowers and fosters students in STEM through mentorship, leadership development, and networking.',
  'SHPE builds an inclusive community that empowers and fosters students in STEM through mentorship, leadership development, and networking opportunities.',
  'AT 3804',
  'Jesus Huaman Contreres',
  'ariana.aceves.sevilla@student.laccd.edu'
);

-- Insert Pierce Science Journal Club
INSERT INTO clubs (name, slug, short_desc, long_desc, room_code, advisor_name, contact_email)
VALUES (
  'Pierce Science Journal Club',
  'science-journal-club',
  'To read, understand, and present scientific research articles, and to help students interested in research become more connected.',
  'The Science Journal Club reads, understands, and presents scientific research articles. We help students interested in research become more connected with the scientific community.',
  'CFS 9203',
  'Winn Hyunh',
  'anisah.khan@student.laccd.edu'
);
```

## Club Meeting Times

- **Tech Club**: Monday, 1:00 PM - 2:00 PM PST (Weekly)
- **SHPE**: Thursday, 2:00 PM - 3:00 PM PST (Weekly)
- **Pierce Science Journal Club**: Friday, 1:45 PM - 2:45 PM PST (Biweekly - every other Friday)

## After Adding Clubs

The clubs will automatically appear on:
- Home page (club directory)
- Search results
- Can be joined by users
- Will show on club detail pages with maps

## Creating Recurring Events

After adding clubs, you can create recurring events using the Admin page or manually:

The Admin page will automatically:
- Calculate next meeting date
- Create recurring weekly/biweekly events
- Set proper times and locations
- Link events to clubs

