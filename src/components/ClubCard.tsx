import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ClubCardProps {
  slug: string;
  name: string;
  shortDesc: string;
  room: string;
  nextMeeting?: string;
  category: string;
}

const ClubCard = ({ slug, name, shortDesc, room, nextMeeting, category }: ClubCardProps) => {
  return (
    <Link to={`/club/${slug}-room-${room}`} className="block">
      <Card className="club-card p-0 h-full flex flex-col">
        <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {shortDesc}
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Room {room}</span>
            </div>
            
            {nextMeeting && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{nextMeeting}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ClubCard;
