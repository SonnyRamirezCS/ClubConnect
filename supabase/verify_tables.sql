-- Run this query in Supabase SQL Editor to verify all tables were created
-- You should see 5 tables listed

SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM 
  information_schema.tables t
WHERE 
  table_schema = 'public' 
  AND table_name IN ('profiles', 'clubs', 'club_members', 'events', 'event_attendees')
ORDER BY 
  table_name;

