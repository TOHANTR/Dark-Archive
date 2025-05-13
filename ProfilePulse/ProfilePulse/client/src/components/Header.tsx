import { useLocation } from 'wouter';

export default function Header() {
  const [, navigate] = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <svg 
                className="w-full h-full text-primary" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path 
                  d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" 
                  fill="currentColor" 
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Dark archive</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
