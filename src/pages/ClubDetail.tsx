import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CampusMap from "@/components/CampusMap";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Mail, 
  User, 
  Clock,
  Plus,
  Check,
  ExternalLink
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Club = Database['public']['Tables']['clubs']['Row'];

const ClubDetail = () => {
  const { clubSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Extract slug from the URL pattern: slug-room-ROOM
  const slug = clubSlug?.split('-room-')[0];

  // Fetch club data
  const { data: club, isLoading: clubLoading } = useQuery({
    queryKey: ['club', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Club;
    },
    enabled: !!slug,
  });

  // Check if user is a member
  const { data: isMember } = useQuery({
    queryKey: ['membership', club?.id, user?.id],
    queryFn: async () => {
      if (!user || !club) return false;

      const { data, error } = await supabase
        .from('club_members')
        .select('id')
        .eq('club_id', club.id)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
      return !!data;
    },
    enabled: !!user && !!club,
  });

  // Join club mutation
  const joinMutation = useMutation({
    mutationFn: async () => {
      if (!user || !club) throw new Error('User or club not found');

      const { error } = await supabase
        .from('club_members')
        .insert({
          club_id: club.id,
          user_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership', club?.id, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['joined-clubs'] });
      toast.success('Successfully joined club!');
    },
    onError: (error: any) => {
      console.error('Error joining club:', error);
      toast.error(error.message || 'Failed to join club');
    },
  });

  // Leave club mutation
  const leaveMutation = useMutation({
    mutationFn: async () => {
      if (!user || !club) throw new Error('User or club not found');

      const { error } = await supabase
        .from('club_members')
        .delete()
        .eq('club_id', club.id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership', club?.id, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['joined-clubs'] });
      toast.success('Left club successfully');
    },
    onError: (error: any) => {
      console.error('Error leaving club:', error);
      toast.error(error.message || 'Failed to leave club');
    },
  });

  const handleJoinClick = () => {
    if (!user) {
      toast.error('Please log in to join clubs');
      navigate('/login');
      return;
    }

    if (isMember) {
      leaveMutation.mutate();
    } else {
      joinMutation.mutate();
    }
  };

  if (clubLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Skeleton className="h-64 w-full mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-32" />
              <Skeleton className="h-64" />
            </div>
            <div>
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Club Not Found</h1>
          <p className="text-muted-foreground mb-6">The club you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clubs
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge className="mb-4">{club.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
              <p className="text-xl text-muted-foreground">{club.short_desc}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {club.long_desc || club.short_desc}
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Meeting Details</h3>
              <div className="space-y-3">
                {club.meeting_time && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Schedule</div>
                      <div className="text-sm text-muted-foreground">{club.meeting_time}</div>
                    </div>
                  </div>
                )}
                {club.room && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">Room {club.room}</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Campus Map */}
            <Card className="p-6">
              <CampusMap
                destination={
                  club.coordinates && 
                  typeof club.coordinates === 'object' && 
                  club.coordinates !== null && 
                  'lat' in club.coordinates && 
                  'lng' in club.coordinates
                    ? {
                        lat: (club.coordinates as { lat: number; lng: number }).lat,
                        lng: (club.coordinates as { lat: number; lng: number }).lng
                      }
                    : undefined
                }
                clubName={club.name}
              />
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-4">
              <Button 
                className="w-full mb-4 gap-2" 
                size="lg"
                onClick={handleJoinClick}
                disabled={joinMutation.isPending || leaveMutation.isPending}
                variant={isMember ? "outline" : "default"}
              >
                {isMember ? (
                  <>
                    <Check className="h-5 w-5" />
                    Joined
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Join Club
                  </>
                )}
              </Button>

              <Separator className="my-4" />

              <div className="space-y-4">
                {club.advisor && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Advisor</div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>{club.advisor}</span>
                    </div>
                  </div>
                )}

                {club.contact_email && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Contact</div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a 
                        href={`mailto:${club.contact_email}`}
                        className="text-sm hover:underline"
                      >
                        {club.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {club.next_meeting && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Next Meeting</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>{club.next_meeting}</span>
                    </div>
                  </div>
                )}
              </div>

              {club.socials && typeof club.socials === 'object' && club.socials !== null && 'website' in club.socials && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    {typeof club.socials.website === 'string' && (
                      <Button variant="outline" className="w-full gap-2" asChild>
                        <a href={club.socials.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
