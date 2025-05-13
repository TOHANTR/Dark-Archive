import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader, ArrowLeft } from "@/components/Icons";
import { Profile, Media } from "@shared/schema";
import { Helmet } from "react-helmet";

interface ProfileData {
  profile: Profile;
  media: Media[];
}

export default function ProfilePage() {
  const [, params] = useRoute("/profile/:id");
  const [, navigate] = useLocation();
  const profileId = params?.id;
  
  const { data, isLoading, error } = useQuery<ProfileData>({
    queryKey: [`/api/profiles/${profileId}`],
    enabled: !!profileId,
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={40} className="text-primary" />
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg">Profil yüklenirken bir hata oluştu</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }
  
  const { profile, media } = data;
  const images = media.filter(item => item.type === 'image');
  const videos = media.filter(item => item.type === 'video');
  const audio = media.filter(item => item.type === 'audio');
  
  return (
    <div className="min-h-screen fade-in">
      <Helmet>
        <title>{profile.name} | Dark Archive</title>
        <meta name="description" content={`${profile.name} - Dark Archive'deki profil sayfası. Görseller, videolar ve ses dosyalarını görüntüleyin.`} />
        <meta property="og:title" content={`${profile.name} | Dark Archive`} />
        <meta property="og:description" content={`${profile.name} - Dark Archive'deki profil sayfası. Görseller, videolar ve ses dosyalarını görüntüleyin.`} />
      </Helmet>
      
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={profile.coverImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {new Date(profile.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>
            <div className="ml-auto">
              <Button 
                variant="default"
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                GERİ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {profile.about && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-card rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Hakkında</h3>
            <p className="text-muted-foreground text-sm">{profile.about}</p>
          </div>
        </div>
      )}

      <Tabs defaultValue="images" className="w-full">
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <TabsList className="flex h-auto bg-transparent space-x-2">
              <TabsTrigger 
                value="images"
                className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground data-[state=active]:font-medium"
              >
                Görseller
              </TabsTrigger>
              <TabsTrigger 
                value="videos"
                className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground data-[state=active]:font-medium"
              >
                Videolar
              </TabsTrigger>
              <TabsTrigger 
                value="audio"
                className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground data-[state=active]:font-medium"
              >
                Sesler
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6">
          <TabsContent value="images" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.length > 0 ? (
                <>
                  <div className="md:col-span-2">
                    <img 
                      src={images[0].path} 
                      alt={`${profile.name} - Ana görsel`}
                      className="w-full h-auto rounded-lg shadow-lg object-cover" 
                    />
                  </div>
                  
                  {images.slice(1).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img 
                        src={image.path} 
                        alt={`${profile.name} görsel ${index + 2}`}
                        className="w-full h-auto" 
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-muted-foreground">Henüz görsel yüklenmemiş</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <div key={index} className={index === 0 ? "md:col-span-2" : ""}>
                    <video 
                      controls 
                      className="w-full h-auto rounded-lg"
                      src={video.path}
                    >
                      Tarayıcınız video etiketini desteklemiyor.
                    </video>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-muted-foreground">Henüz video yüklenmemiş</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="mt-0">
            <div className="space-y-4">
              {audio.length > 0 ? (
                audio.map((audioItem, index) => (
                  <div key={index} className="bg-card rounded-lg p-4">
                    <audio 
                      controls 
                      className="w-full"
                      src={audioItem.path}
                    >
                      Tarayıcınız ses etiketini desteklemiyor.
                    </audio>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Henüz ses dosyası yüklenmemiş</p>
                </div>
              )}
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
