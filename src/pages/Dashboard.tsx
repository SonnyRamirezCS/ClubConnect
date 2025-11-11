import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import ClubCard from '@/components/ClubCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';

type Club = Database['public']['Tables']['clubs']['Row'];
type ClubMember = Database['public']['Tables']['club_members']['Row'] & {
  clubs: Club;
};

const Dashboard = () => {
  const { user } = useAuth();

  const { data: memberships, isLoading } = useQuery({
    queryKey: ['joined-clubs', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('club_members')
        .select('*, clubs(*)')
        .eq('user_id', user.id)
        .order('joined_at', { ascending: false });

      if (error) throw error;
      return (data as ClubMember[]) || [];
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Please log in</CardTitle>
            <CardDescription>You need to be logged in to view your dashboard.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Clubs you've joined
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : memberships && memberships.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {memberships.map((membership) => {
              const club = membership.clubs;
              return (
                <ClubCard
                  key={membership.id}
                  slug={club.slug}
                  name={club.name}
                  shortDesc={club.short_desc}
                  room={club.room || ''}
                  nextMeeting={club.next_meeting || undefined}
                  category={club.category}
                />
              );
            })}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No clubs joined yet</CardTitle>
              <CardDescription>
                Start exploring clubs and join the ones that interest you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a href="/" className="text-primary hover:underline">
                Browse all clubs →
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

