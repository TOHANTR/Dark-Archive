import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { FileInput } from "@/components/ui/file-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTabs, MediaContent } from "@/components/ui/admin-tabs";
import { ImageUpload, VideoUpload, AudioUpload } from "@/components/ui/media-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, Check, X, FileQuestion } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PreviewModal from "@/components/ui/preview-modal";
import { generateRandomId } from "@/lib/generate-id";
import { formatFileSize } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";
import { Log, Submission } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function AdminPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [audio, setAudio] = useState<File[]>([]);
  
  // UI state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string>("");
  
  // Generate folder ID when component mounts
  useEffect(() => {
    setFolderId(generateRandomId(10));
  }, []);
  
  // Get logs
  const { data: logs } = useQuery<Log[]>({
    queryKey: ["/api/logs"],
  });
  
  // Mutations
  const createProfileMutation = useMutation({
    mutationFn: async () => {
      // Create form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("about", about);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }
      
      // Create profile
      const res = await fetch("/api/profiles", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Profil oluşturulurken bir hata oluştu");
      }
      
      return await res.json();
    },
    onSuccess: async (data) => {
      const { profile } = data;
      
      // Upload images if any
      if (images.length > 0) {
        await uploadMedia(profile.id, "image", images);
      }
      
      // Upload videos if any
      if (videos.length > 0) {
        await uploadMedia(profile.id, "video", videos);
      }
      
      // Upload audio if any
      if (audio.length > 0) {
        await uploadMedia(profile.id, "audio", audio);
      }
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/logs"] });
      
      // Reset form
      resetForm();
      
      // Show success message
      toast({
        title: "Profil yayınlandı",
        description: `${profile.name} profili başarıyla oluşturuldu`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Upload media files
  const uploadMedia = async (profileId: number, type: string, files: File[]) => {
    const formData = new FormData();
    formData.append("type", type);
    
    files.forEach(file => {
      formData.append("files", file);
    });
    
    const res = await fetch(`/api/profiles/${profileId}/media`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    
    if (!res.ok) {
      throw new Error(`${type} yüklenirken bir hata oluştu`);
    }
    
    return await res.json();
  };
  
  // Event handlers
  const handleCoverImageChange = (file: File) => {
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };
  
  const handleAddImages = (files: File[]) => {
    setImages(prev => [...prev, ...files]);
  };
  
  const handleAddVideos = (files: File[]) => {
    setVideos(prev => [...prev, ...files]);
  };
  
  const handleAddAudio = (files: File[]) => {
    setAudio(prev => [...prev, ...files]);
  };
  
  const handlePreview = () => {
    setPreviewOpen(true);
  };
  
  const handlePublish = () => {
    setPreviewOpen(false);
    createProfileMutation.mutate();
  };
  
  const handleCancel = () => {
    if (window.confirm("Değişiklikler kaydedilmeyecek. Emin misiniz?")) {
      resetForm();
    }
  };
  
  const handleLogout = () => {
    navigate("/");
  };
  
  const resetForm = () => {
    setName("");
    setAbout("");
    setCoverImage(null);
    setCoverPreview(null);
    setImages([]);
    setVideos([]);
    setAudio([]);
    setFolderId(generateRandomId(10));
  };
  
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Panel | Dark Archive</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className="bg-muted hover:bg-muted/80 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Yeni Profil Ekle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium mb-1">
                İsim Soyisim
              </label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="İsim Soyisim girin"
                className="w-full bg-muted border-border"
                required
              />
            </div>

            <div>
              <label htmlFor="profile-about" className="block text-sm font-medium mb-1">
                Hakkında
              </label>
              <textarea
                id="profile-about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Kişi hakkında bilgi girin..."
                className="w-full bg-muted border-border rounded-md p-2 text-sm"
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="profile-cover" className="block text-sm font-medium mb-1">
                Kapak Resmi
              </label>
              <FileInput
                accept="image/*"
                onChange={handleCoverImageChange}
                label="Dosya Seç"
                previewUrl={coverPreview || undefined}
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="border-t border-border pt-4 pb-2">
                <h3 className="text-lg font-medium mb-2">Medya Ekle</h3>
              </div>
              
              <AdminTabs>
                <TabsContent value="images" className="mt-0">
                  <ImageUpload 
                    images={images}
                    onAddImages={handleAddImages}
                  />
                </TabsContent>
                
                <TabsContent value="videos" className="mt-0">
                  <VideoUpload 
                    videos={videos}
                    onAddVideos={handleAddVideos}
                  />
                </TabsContent>
                
                <TabsContent value="audio" className="mt-0">
                  <AudioUpload 
                    audio={audio}
                    onAddAudio={handleAddAudio}
                  />
                </TabsContent>
              </AdminTabs>
            </div>
          </div>
          
          <div className="border-t border-border mt-6 pt-6 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Klasör ID: </span>
              <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                {folderId}
              </span>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={handlePreview}
                disabled={!name || !coverImage}
                className="bg-muted hover:bg-muted/80 text-white"
              >
                Ön İzleme
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="bg-muted hover:bg-muted/80 text-white"
              >
                İptal Et
              </Button>
              <Button
                variant="default"
                onClick={handlePublish}
                disabled={!name || !coverImage || createProfileMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {createProfileMutation.isPending ? "Yayınlanıyor..." : "Yayınla"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Log Kayıtları</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Tarih</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">İşlem</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Detay</th>
                </tr>
              </thead>
              <tbody>
                {logs && logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-border/50">
                      <td className="py-3 px-4 text-sm">{formatDate(log.createdAt)}</td>
                      <td className="py-3 px-4 text-sm">{log.action}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{log.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-muted-foreground">
                      Henüz log kaydı bulunmuyor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onPublish={handlePublish}
        name={name}
        coverImage={coverPreview}
        images={images.map(file => URL.createObjectURL(file))}
        videos={videos.map(file => URL.createObjectURL(file))}
        audio={audio.map(file => URL.createObjectURL(file))}
      />
    </div>
  );
}
