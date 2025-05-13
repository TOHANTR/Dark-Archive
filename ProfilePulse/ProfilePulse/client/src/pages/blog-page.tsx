import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MobileFooter from "@/components/MobileFooter";

// Blog yazılarını temsil eden tip
interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

// Örnek blog yazıları
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Dijital Arşivleme: Geleceğin Hafızası",
    date: "12 Mayıs 2023",
    excerpt: "Modern dünyada dijital arşivlemenin önemi ve geleceği hakkında bir değerlendirme.",
    content: `
      <p>Dijital arşivleme, günümüzde bilgi saklama ve koruma yöntemlerinin en önemlilerinden biri haline gelmiştir. Geleneksel fiziksel arşivleme yöntemlerinin aksine, dijital arşivler daha az fiziksel alan kaplar, daha kolay erişilebilir ve doğru kullanıldığında daha uzun ömürlü olabilir.</p>
      
      <p>Ancak dijital arşivlemenin de kendi zorlukları vardır. Teknolojinin hızla değişmesi, dosya formatlarının eskimesi ve donanım uyumluluğu sorunları, dijital içeriğin uzun vadeli korunmasını zorlaştırabilir. Bu nedenle, etkin bir dijital arşivleme stratejisi, içeriğin düzenli olarak yeni formatlara dönüştürülmesini ve yedeklenmesini içermelidir.</p>
      
      <p>Dark Archive olarak misyonumuz, değerli dijital içerikleri korumak ve gelecek nesillere aktarmaktır. Her bir medya öğesi, bir kültürün veya toplumun hafızasının bir parçasıdır ve bu hafızayı canlı tutmak bizim sorumluluğumuzdur.</p>
    `,
    author: "Ahmet Yılmaz",
    tags: ["dijital", "arşivleme", "teknoloji", "koruma"]
  },
  {
    id: 2,
    title: "Ses Kayıtlarının Kültürel Önemi",
    date: "5 Nisan 2023",
    excerpt: "Geçmişten günümüze ses kayıtlarının kültürel miras açısından değeri ve korunma yöntemleri.",
    content: `
      <p>Ses kayıtları, sözlü tarihin ve müzikal mirasın korunmasında paha biçilmez bir role sahiptir. İlk ses kayıt teknolojilerinin ortaya çıkışından bu yana, insan sesi ve müzik, gelecek nesiller için saklanabilir hale gelmiştir.</p>
      
      <p>Ancak, ses kayıtlarının korunması özel zorluklar içerir. Fiziksel medya (plaklar, kasetler, vb.) zamanla bozulabilir ve dijital ses dosyaları sıkıştırma veya format değişiklikleri nedeniyle kalite kaybına uğrayabilir. Bu nedenle, ses arşivciliği hem teknik bilgi hem de titiz bir yaklaşım gerektirir.</p>
      
      <p>Dark Archive'de, önemli ses kayıtlarını en yüksek kalitede korumak ve bu kayıtların kültürel ve tarihsel bağlamını belgelemek için çalışıyoruz. Her ses kaydı, bir zamanın, bir yerin veya bir topluluğun benzersiz bir yansımasıdır.</p>
    `,
    author: "Zeynep Kaya",
    tags: ["ses", "kültürel miras", "arşivleme", "müzik"]
  },
  {
    id: 3,
    title: "Fotoğrafların Belgesel Değeri",
    date: "18 Mart 2023",
    excerpt: "Fotoğrafçılığın toplumsal bellek oluşturmadaki rolü ve arşivleme teknikleri üzerine.",
    content: `
      <p>Fotoğraflar, anları yakalama ve gerçekliği belgeleme gücüyle, tarih boyunca önemli bir belgesel araç olmuştur. Bir fotoğraf, binlerce kelimeye bedel olabilir ve tarihsel olayları, kültürel uygulamaları ve gündelik yaşamı gelecek nesiller için canlı bir şekilde aktarabilir.</p>
      
      <p>Dijital çağda, fotoğraf üretimi muazzam bir şekilde artmıştır. Bu bolluk, arşivciler için hem bir fırsat hem de bir zorluk sunar. Hangi fotoğrafların saklanacağına karar vermek, meta verileri doğru bir şekilde kaydetmek ve uzun vadeli erişimi sağlamak, modern fotoğraf arşivciliğinin temel taşlarıdır.</p>
      
      <p>Dark Archive olarak, fotoğrafları yalnızca görsel nesneler olarak değil, aynı zamanda sosyal, kültürel ve tarihsel bağlamlarıyla birlikte ele alıyoruz. Her fotoğraf koleksiyonu, belirli bir zaman ve mekânın benzersiz bir penceresini sunar.</p>
    `,
    author: "Mehmet Demir",
    tags: ["fotoğraf", "belgesel", "tarih", "arşivleme"]
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>Blog | Dark Archive</title>
        <meta name="description" content="Dark Archive blog yazıları. Dijital arşivleme, medya koruma ve kültürel miras hakkında makaleler." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Blog</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle>Yazılar</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div 
                        key={post.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedPost?.id === post.id 
                            ? 'bg-primary/10 border border-primary/30' 
                            : 'bg-muted/50 hover:bg-muted border border-transparent'
                        }`}
                        onClick={() => setSelectedPost(post)}
                      >
                        <h3 className="font-medium mb-1">{post.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{post.date} | {post.author}</p>
                        <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-background">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-full">
              {selectedPost ? (
                <>
                  <CardHeader>
                    <CardTitle>{selectedPost.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{selectedPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedPost.author}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-350px)]">
                      <div className="prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedPost.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-background">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-[calc(100vh-350px)]">
                  <div className="text-center text-muted-foreground">
                    <p className="mb-2">Okumak için bir yazı seçin</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
      
      <MobileFooter />
    </div>
  );
}