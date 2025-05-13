import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import MobileFooter from "@/components/MobileFooter";

export default function UploadPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message || !file) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Dosya gönderme işlemi
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("file", file);
      
      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Dosyanız başarıyla gönderildi. En kısa sürede incelenecektir.",
        });
        
        // Formu sıfırla
        setName("");
        setEmail("");
        setMessage("");
        setFile(null);
      } else {
        throw new Error(data.message || "Dosya gönderilirken bir hata oluştu");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Dosya gönderilirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>Dosya Gönder | Dark Archive</title>
        <meta name="description" content="Dark Archive'e dosya gönderin. Arşivimize katkıda bulunun." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dosya Gönder</h1>
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Arşivimize Katkıda Bulunun</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Sizde arşivimize katkıda bulunmak istiyorsanız, aşağıdaki formu doldurarak
              dosyalarınızı bize gönderebilirsiniz. Gönderilen her dosya yöneticilerimiz
              tarafından incelenecek ve uygun görüldüğü takdirde arşivimize eklenecektir.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  İsim Soyisim
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="İsim Soyisim"
                  className="w-full bg-muted border-border"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-posta Adresi
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@mail.com"
                  className="w-full bg-muted border-border"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Dosya hakkında bilgi verin..."
                  className="w-full bg-muted border-border rounded-md p-2 text-sm min-h-[100px]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="file" className="block text-sm font-medium mb-1">
                  Dosya
                </label>
                <FileInput
                  accept="*/*"
                  onChange={handleFileChange}
                  label="Dosya Seç"
                  previewUrl={file ? URL.createObjectURL(file) : undefined}
                />
                {file && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <MobileFooter />
    </div>
  );
}