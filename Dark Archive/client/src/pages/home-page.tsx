import Header from "@/components/Header";
import ProfileGrid from "@/components/ProfileGrid";
import MobileFooter from "@/components/MobileFooter";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen fade-in">
      <Helmet>
        <title>Dark Archive | Medya Arşivi</title>
        <meta name="description" content="Dark Archive, profil tabanlı medya arşivi platformu. Kişilere ait görselleri, videoları ve sesleri görüntüleyin." />
        <meta property="og:title" content="Dark Archive | Medya Arşivi" />
        <meta property="og:description" content="Dark Archive, profil tabanlı medya arşivi platformu. Kişilere ait görselleri, videoları ve sesleri görüntüleyin." />
      </Helmet>
      
      <Header />
      
      <div className="flex-1">
        <ProfileGrid />
      </div>
      
      <MobileFooter />
    </div>
  );
}
