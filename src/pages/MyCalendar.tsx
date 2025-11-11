import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Database } from '@/integrations/supabase/types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

type Event = Database['public']['Tables']['events']['Row'] & {
  clubs: Database['public']['Tables']['clubs']['Row'];
};

const MyCalendar = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // First, get all club IDs the user is a member of
  const { data: memberships } = useQuery({
    queryKey: ['user-memberships', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('club_members')
        .select('club_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map((m) => m.club_id);
    },
    enabled: !!user,
  });

  // Then, get all events for those clubs
  const { data: events, isLoading } = useQuery({
    queryKey: ['user-events', memberships],
    queryFn: async () => {
      if (!memberships || memberships.length === 0) return [];

      const { data, error } = await supabase
        .from('events')
        .select('*, clubs(*)')
        .in('club_id', memberships)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;
      return (data as Event[]) || [];
    },
    enabled: !!memberships && memberships.length > 0,
  });

  const eventsForSelectedDate = events?.filter((event) => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.start_time);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Please log in</CardTitle>
            <CardDescription>You need to be logged in to view your calendar.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Calendar</h1>
          <p className="text-muted-foreground">
            Upcoming events from your clubs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : events && events.length > 0 ? (
              <div className="space-y-4">
                {selectedDate ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Events on {format(selectedDate, 'MMMM d, yyyy')}
                    </h2>
                    {eventsForSelectedDate && eventsForSelectedDate.length > 0 ? (
                      eventsForSelectedDate.map((event) => (
                        <Card key={event.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                <CardDescription className="mt-1">
                                  {event.clubs.name}
                                </CardDescription>
                              </div>
                              <Badge variant="secondary">{event.clubs.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {event.description && (
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              )}
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {format(new Date(event.start_time), 'h:mm a')}
                                  {event.end_time &&
                                    ` - ${format(new Date(event.end_time), 'h:mm a')}`}
                                </span>
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="py-6 text-center text-muted-foreground">
                          No events scheduled for this date
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                    {events.map((event) => (
                      <Card key={event.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {event.clubs.name}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">{event.clubs.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {event.description && (
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {format(new Date(event.start_time), 'MMMM d, yyyy h:mm a')}
                                {event.end_time &&
                                  ` - ${format(new Date(event.end_time), 'h:mm a')}`}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No upcoming events</CardTitle>
                  <CardDescription>
                    Join clubs to see their events here!
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;

