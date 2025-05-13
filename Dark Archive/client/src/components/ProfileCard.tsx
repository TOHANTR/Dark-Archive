import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Profile } from "@shared/schema";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [, navigate] = useLocation();
  
  const handleClick = () => {
    navigate(`/profile/${profile.id}`);
  };
  
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  
  return (
    <Card 
      className="card-hover bg-card rounded-xl overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="block">
        <AspectRatio ratio={1 / 1}>
          <img 
            src={profile.coverImage}
            alt={`${profile.name} profile`} 
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-white">{profile.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(profile.createdAt)}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
