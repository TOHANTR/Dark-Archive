import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileInputProps {
  accept: string;
  onChange: (file: File) => void;
  label: string;
  previewUrl?: string;
}

export function FileInput({ accept, onChange, label, previewUrl }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    onChange(file);
    
    // Create preview for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        type="button"
        variant="secondary"
        onClick={handleButtonClick}
        className="flex-1 bg-muted border border-border rounded-lg py-2 px-4 cursor-pointer hover:bg-muted/80"
      >
        <Upload className="mr-2 h-4 w-4" />
        <span>{label}</span>
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          accept={accept}
          onChange={handleFileChange}
        />
      </Button>
      
      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <svg 
            className="h-5 w-5 text-muted-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        )}
      </div>
    </div>
  );
}

interface MultiFileInputProps {
  accept: string;
  onChange: (files: File[]) => void;
  label: string;
  icon: React.ReactNode;
}

export function MultiFileInput({ accept, onChange, label, icon }: MultiFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileArray: File[] = Array.from(files);
    onChange(fileArray);
  };
  
  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  return (
    <Button 
      type="button"
      variant="primary"
      size="sm"
      onClick={handleButtonClick}
      className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-lg cursor-pointer"
    >
      {icon}
      <span>{label}</span>
      <input 
        ref={inputRef}
        type="file" 
        className="hidden" 
        accept={accept}
        multiple
        onChange={handleFileChange}
      />
    </Button>
  );
}
