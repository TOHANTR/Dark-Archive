import { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Profile } from '@shared/schema';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  onClickOutside: () => void;
}

export default function SearchResults({ query, onClickOutside }: SearchResultsProps) {
  const [, navigate] = useLocation();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const { data: profiles, isLoading } = useQuery<Profile[]>({
    queryKey: [`/api/profiles/search?q=${query}`],
    enabled: query.length > 0,
  });
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClickOutside]);
  
  const handleProfileClick = (id: number) => {
    navigate(`/profile/${id}`);
    onClickOutside();
  };
  
  return (
    <div 
      ref={resultsRef}
      className="absolute mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto fade-in"
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : profiles && profiles.length > 0 ? (
        profiles.map((profile) => (
          <div 
            key={profile.id}
            onClick={() => handleProfileClick(profile.id)}
            className="flex items-center p-3 hover:bg-muted cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img 
                src={profile.coverImage} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span>{profile.name}</span>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          {query.length > 0 ? 'Sonuç bulunamadı' : 'Aramak için bir isim girin'}
        </div>
      )}
    </div>
  );
}
