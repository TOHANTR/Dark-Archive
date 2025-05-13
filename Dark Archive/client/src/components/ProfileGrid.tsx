import { useQuery } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
import { Profile } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/components/Icons";

export default function ProfileGrid() {
  const { data: profiles, isLoading, error } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  // Create empty profile cards for loading state
  const LoadingProfiles = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-card rounded-xl overflow-hidden">
          <div>
            <AspectRatioSkeleton />
            <div className="p-4">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const AspectRatioSkeleton = () => (
    <div className="relative pt-[100%]">
      <Skeleton className="absolute inset-0 rounded-none" />
    </div>
  );

  // Sort profiles by creation date (newest first)
  const sortedProfiles = profiles ? [...profiles].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }) : [];

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Profiller yüklenirken bir hata oluştu.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 pb-24">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingProfiles />
        </div>
      ) : sortedProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">İçerik Bulunamadı</h2>
          <p className="text-muted-foreground max-w-lg">
            Henüz hiç profil eklenmemiş. İçerikler admin tarafından eklenecektir.
          </p>
        </div>
      )}
    </main>
  );
}
