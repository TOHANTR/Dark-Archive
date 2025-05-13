import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface AdminTabsProps {
  children: React.ReactNode;
}

export function AdminTabs({ children }: AdminTabsProps) {
  return (
    <Tabs defaultValue="images" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="images">Görseller</TabsTrigger>
        <TabsTrigger value="videos">Videolar</TabsTrigger>
        <TabsTrigger value="audio">Sesler</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}

interface MediaContentProps {
  title: string;
  addBtnLabel: string;
  icon: React.ReactNode;
  onAddMedia: () => void;
  children: React.ReactNode;
}

export function MediaContent({ 
  title, 
  addBtnLabel, 
  icon, 
  onAddMedia, 
  children 
}: MediaContentProps) {
  return (
    <div className="flex flex-wrap border border-border rounded-lg p-4 mb-4">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">{title}</h4>
          <button 
            onClick={onAddMedia}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-lg cursor-pointer"
          >
            {icon}
            <span>{addBtnLabel}</span>
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
