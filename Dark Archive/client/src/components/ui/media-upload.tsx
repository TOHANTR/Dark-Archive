import { useState } from "react";
import { Plus, Image, Video, Music } from "lucide-react";
import { MultiFileInput } from "./file-input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageUploadProps {
  images: File[];
  onAddImages: (files: File[]) => void;
}

export function ImageUpload({ images, onAddImages }: ImageUploadProps) {
  const imagePreviews = images.map(file => URL.createObjectURL(file));
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Resimler</h4>
        <MultiFileInput
          accept="image/*"
          onChange={onAddImages}
          label="Resim Ekle"
          icon={<Plus className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {imagePreviews.length > 0 ? (
          imagePreviews.map((preview, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src={preview} 
                alt={`Preview ${index}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="aspect-w-1 aspect-h-1 bg-muted rounded-lg flex items-center justify-center">
              <Image className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="aspect-w-1 aspect-h-1 bg-muted rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface VideoUploadProps {
  videos: File[];
  onAddVideos: (files: File[]) => void;
}

export function VideoUpload({ videos, onAddVideos }: VideoUploadProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Videolar</h4>
        <MultiFileInput
          accept="video/*"
          onChange={onAddVideos}
          label="Video Ekle"
          icon={<Plus className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
              <Video className="h-8 w-8 text-muted-foreground" />
              <div className="absolute bottom-2 left-2 text-xs bg-black bg-opacity-70 px-2 py-1 rounded">
                {video.name}
              </div>
            </div>
          ))
        ) : (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}

interface AudioUploadProps {
  audio: File[];
  onAddAudio: (files: File[]) => void;
}

export function AudioUpload({ audio, onAddAudio }: AudioUploadProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Ses Dosyaları</h4>
        <MultiFileInput
          accept="audio/*"
          onChange={onAddAudio}
          label="Ses Ekle"
          icon={<Plus className="h-4 w-4" />}
        />
      </div>
      
      <div className="space-y-2">
        {audio.length > 0 ? (
          audio.map((audioFile, index) => (
            <div key={index} className="bg-muted rounded-lg p-3 flex items-center">
              <Music className="h-5 w-5 mr-3 text-muted-foreground" />
              <span className="text-sm">{audioFile.name}</span>
            </div>
          ))
        ) : (
          <div className="bg-muted rounded-lg p-3 flex items-center">
            <Music className="h-5 w-5 mr-3 text-muted-foreground" />
            <span className="text-muted-foreground">Ses dosyası ekleyin</span>
          </div>
        )}
      </div>
    </div>
  );
}
