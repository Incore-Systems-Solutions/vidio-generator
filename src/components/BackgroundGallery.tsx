import React, { useState } from "react";
import { BackgroundCard } from "./BackgroundCard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function BackgroundGallery() {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  const backgrounds = [
    {
      id: "upload",
      type: "upload" as const,
      title: "Upload Foto",
    },
    {
      id: "modern-office",
      type: "background" as const,
      title: "Kantor Modern",
      description:
        "Ruang kantor professional modern dengan pencahayaan natural",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      tags: ["Professional", "Modern"],
    },
    {
      id: "recording-studio",
      type: "background" as const,
      title: "Studio Rekaman",
      description: "Studio rekaman professional dengan pencahayaan dramatis",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      tags: ["Professional", "Dramatic"],
    },
    {
      id: "tropical-beach",
      type: "background" as const,
      title: "Pantai Tropis",
      description: "Pantai indah dengan pemandangan laut biru",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["Nature", "Tropical"],
    },
    {
      id: "green-nature",
      type: "background" as const,
      title: "Pemandangan Alam Hijau",
      description:
        "Pemandangan alam penuh pohon-pohon rindang, dengan udara yang sejuk",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      tags: ["Nature", "Green"],
    },
  ];

  const handleBackgroundSelect = (backgroundId: string) => {
    setSelectedBackground(backgroundId);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Galeri Background
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
        </Button>
      </div>

      {/* Background Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {backgrounds.map((background) => (
          <BackgroundCard
            key={background.id}
            type={background.type}
            title={background.title}
            description={background.description}
            image={background.image}
            tags={background.tags}
            isSelected={selectedBackground === background.id}
            onClick={() => handleBackgroundSelect(background.id)}
          />
        ))}
      </div>
    </div>
  );
}
