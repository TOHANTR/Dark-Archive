import { useState } from "react";
import { useLocation } from "wouter";
import { Home, Search, Image, InfoIcon, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResults from './SearchResults';

export default function MobileFooter() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleClickOutside = () => {
    setShowResults(false);
  };
  
  return (
    <footer className="bg-background border-t border-border py-3 fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-1 mb-3">
          <button 
            className={`flex flex-col items-center justify-center ${location === '/upload' ? 'text-white' : 'text-muted-foreground'}`}
            onClick={() => navigate('/upload')}
          >
            <Image className="h-5 w-5" />
            <span className="text-xs mt-1">Gönder</span>
          </button>
          
          <button 
            className={`flex flex-col items-center justify-center ${location === '/about' ? 'text-white' : 'text-muted-foreground'}`}
            onClick={() => navigate('/about')}
          >
            <InfoIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Hakkında</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center text-muted-foreground"
            onClick={() => window.open("https://t.me/DarkArchiveBot", "_blank")}
          >
            <Phone className="h-5 w-5" />
            <span className="text-xs mt-1">İletişim</span>
          </button>
        </div>
        
        <div className="flex items-center">
          <button 
            className={`flex flex-col items-center justify-center mr-3 ${location === '/' ? 'text-white' : 'text-muted-foreground'}`}
            onClick={() => navigate('/')}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Ana Sayfa</span>
          </button>
          
          <div className="flex-1 relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="İsim veya soyisim ara..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-secondary border-border rounded-full py-1 pl-10 pr-4 text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            {showResults && (
              <div className="absolute bottom-12 left-0 right-0">
                <SearchResults 
                  query={searchQuery} 
                  onClickOutside={handleClickOutside}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
