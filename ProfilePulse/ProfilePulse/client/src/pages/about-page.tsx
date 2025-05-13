import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import MobileFooter from "@/components/MobileFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>Hakkında | Dark Archive</title>
        <meta name="description" content="Dark Archive hakkında bilgi. Misyonumuz, vizyonumuz ve tarihçemiz." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Hakkında</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Dark Archive Nedir?</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Dark Archive, değerli dijital içerikleri koruma ve gelecek nesillere aktarma 
                      misyonuyla kurulmuş bir dijital arşivleme platformudur. İsmimiz, kütüphanecilik 
                      terminolojisindeki "dark archive" (karanlık arşiv) kavramından gelmektedir - 
                      yani aktif kullanımda olmayan, ancak koruma ve saklama amacıyla tutulan arşivler.
                    </p>
                    
                    <h3>Misyonumuz</h3>
                    <p>
                      Kültürel, tarihi ve kişisel öneme sahip dijital içerikleri en yüksek kalitede 
                      koruyarak, bu değerli materyallerin gelecek nesillere aktarılmasını sağlamak.
                      Her bir medya öğesi, bir kültürün, bir topluluğun veya bir bireyin hikâyesinin
                      bir parçasıdır ve bu hikayeleri canlı tutmak bizim sorumluluğumuzdur.
                    </p>
                    
                    <h3>Vizyonumuz</h3>
                    <p>
                      Dijital içeriğin sürekli olarak değiştiği ve bazen kaybolduğu bir dünyada, 
                      Dark Archive değerli materyalleri korumak için en güvenilir platform olmayı 
                      hedeflemektedir. Teknolojinin gelişimiyle birlikte arşivleme yöntemlerimizi 
                      de sürekli olarak geliştirerek, her zaman en yüksek standartlarda hizmet 
                      vermeyi amaçlıyoruz.
                    </p>
                    
                    <h3>Değerlerimiz</h3>
                    <ul>
                      <li>
                        <strong>Koruma:</strong> İçerikleri orijinal formatlarında ve en yüksek 
                        kalitede korumaya özen gösteriyoruz.
                      </li>
                      <li>
                        <strong>Erişilebilirlik:</strong> Arşivlenen materyallerin gerektiğinde 
                        kolayca erişilebilir olmasını sağlıyoruz.
                      </li>
                      <li>
                        <strong>Gizlilik:</strong> Hassas içerikler için en yüksek güvenlik 
                        standartlarını uyguluyoruz.
                      </li>
                      <li>
                        <strong>Sürdürülebilirlik:</strong> Uzun vadeli koruma için sürdürülebilir 
                        arşivleme stratejileri geliştiriyoruz.
                      </li>
                    </ul>
                    
                    <h3>Tarihçemiz</h3>
                    <p>
                      Dark Archive, 2023 yılında, dijital içeriğin hızla arttığı ve aynı zamanda 
                      kaybolma riskinin de yükseldiği bir dönemde kurulmuştur. Kurucularımız, 
                      değerli dijital materyallerin kaybolmasını önlemek ve gelecek nesillere 
                      aktarılmasını sağlamak amacıyla bir araya gelmiştir.
                    </p>
                    <p>
                      Başlangıçta küçük bir koleksiyonla yola çıkan platformumuz, zamanla büyüyerek 
                      çeşitli medya türlerini kapsayan geniş bir arşive dönüşmüştür. Teknolojik 
                      gelişmeleri yakından takip ederek, arşivleme yöntemlerimizi sürekli olarak 
                      güncellemekteyiz.
                    </p>
                    
                    <h3>Nasıl Çalışıyoruz?</h3>
                    <p>
                      Dark Archive'de, her bir medya öğesini dikkatle değerlendiriyor ve katalogluyoruz. 
                      Materyalleri yalnızca dijital nesneler olarak değil, aynı zamanda sosyal, kültürel 
                      ve tarihsel bağlamlarıyla birlikte ele alıyoruz.
                    </p>
                    <p>
                      Her materyal için detaylı meta veriler oluşturuyor, formatları düzenli olarak 
                      güncelleme planları yapıyor ve çoklu yedekleme sistemleri kullanıyoruz. Böylece, 
                      içeriğin uzun vadeli korunmasını ve gerektiğinde erişilebilir olmasını sağlıyoruz.
                    </p>
                    
                    <Separator className="my-6" />
                    
                    <h3>İletişim</h3>
                    <p>
                      Dark Archive ile ilgili sorularınız veya önerileriniz için bizimle iletişime 
                      geçebilirsiniz:
                    </p>
                    <p>
                      E-posta: info@darkarchive.com<br />
                      Telefon: +90 212 123 45 67<br />
                      Adres: Merkez Mahallesi, Dijital Sokak No: 23, İstanbul
                    </p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle>Ekibimiz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Prof. Dr. Ali Yılmaz</h3>
                    <p className="text-sm text-muted-foreground">Kurucu & Direktör</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Ayşe Demir</h3>
                    <p className="text-sm text-muted-foreground">Baş Arşivci</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Mehmet Kaya</h3>
                    <p className="text-sm text-muted-foreground">Dijital Koruma Uzmanı</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Zeynep Şahin</h3>
                    <p className="text-sm text-muted-foreground">Metadata Yöneticisi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>İstatistikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Toplam Profil</span>
                    <span className="text-primary">1,250+</span>
                  </div>
                  <div className="flex justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Arşivlenen Görsel</span>
                    <span className="text-primary">25,400+</span>
                  </div>
                  <div className="flex justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Video Materyali</span>
                    <span className="text-primary">8,750+</span>
                  </div>
                  <div className="flex justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Ses Kaydı</span>
                    <span className="text-primary">12,300+</span>
                  </div>
                  <div className="flex justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Kuruluş</span>
                    <span className="text-primary">2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <MobileFooter />
    </div>
  );
}