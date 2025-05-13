import { X, Image, Video, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: () => void;
  name: string;
  coverImage: string | null;
  images: string[];
  videos: string[];
  audio: string[];
}

export default function PreviewModal({
  isOpen,
  onClose,
  onPublish,
  name,
  coverImage,
  images,
  videos,
  audio
}: PreviewModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 fade-in">
      <div className="bg-card rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Profil Ön İzlemesi</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {coverImage ? (
                <img 
                  src={coverImage} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg 
                  className="h-8 w-8 text-muted-foreground" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              )}
            </div>
            <h3 className="text-2xl font-bold">{name || "Önizleme İsim"}</h3>
          </div>
          
          <div className="border-b border-border mb-6">
            <div className="flex mb-2">
              <button className="text-white py-3 px-6 border-b-2 border-primary font-medium">
                Görseller
              </button>
              <button className="text-muted-foreground hover:text-white py-3 px-6 border-b-2 border-transparent font-medium">
                Videolar
              </button>
              <button className="text-muted-foreground hover:text-white py-3 px-6 border-b-2 border-transparent font-medium">
                Sesler
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {coverImage ? (
              <div className="md:col-span-3 rounded-lg overflow-hidden">
                <img 
                  src={coverImage} 
                  alt={name} 
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="md:col-span-3 bg-muted h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Ana görsel burada görüntülenecek</p>
                </div>
              </div>
            )}
            
            {images.length > 0 ? (
              images.map((src, index) => (
                <div key={index} className="bg-muted rounded-lg overflow-hidden">
                  <img src={src} alt={`İmaj ${index + 1}`} className="w-full h-auto" />
                </div>
              ))
            ) : (
              <>
                <div className="bg-muted h-40 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="bg-muted h-40 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="bg-muted h-40 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Bu önizleme, profil yayınlandığında nasıl görüneceğini gösterir.
            </p>
            <Button 
              onClick={onPublish}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg"
            >
              Yayınla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
