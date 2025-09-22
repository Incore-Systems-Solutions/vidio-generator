import React, { useState, useEffect } from "react";
import { BackgroundCard } from "./BackgroundCard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { backgroundsApi, uploadApi, type Background } from "@/lib/api";
import { useVideoSetup } from "@/contexts/VideoSetupContext";

export function BackgroundGallery() {
  const { data, updateBackground } = useVideoSetup();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        setLoading(true);
        const data = await backgroundsApi.getBackgrounds();
        setBackgrounds(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch backgrounds"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

  const handleBackgroundSelect = async (backgroundId: string) => {
    // If it's an upload background, handle file upload
    if (backgroundId === "upload") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            setUploading(true);
            setError(null);

            // Convert file to base64
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });

            // Upload image
            const result = await uploadApi.uploadImage(base64);

            // Update the upload background with the uploaded image
            setBackgrounds((prev) =>
              prev.map((bg) =>
                bg.id === "upload"
                  ? {
                      ...bg,
                      image: result.url,
                      description: "Background yang diupload",
                    }
                  : bg
              )
            );

            // Update context with background selection and image
            updateBackground(backgroundId, result.url);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
          } finally {
            setUploading(false);
          }
        }
      };
      input.click();
    } else {
      // For regular backgrounds, get the image URL from the background data
      const background = backgrounds.find((bg) => bg.id === backgroundId);
      updateBackground(backgroundId, background?.image || null);
    }
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
      {loading ? (
        <div className="text-center py-8">
          <div className="text-muted-foreground">Loading backgrounds...</div>
        </div>
      ) : uploading ? (
        <div className="text-center py-8">
          <div className="text-muted-foreground">Uploading image...</div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="text-red-500">Error: {error}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {backgrounds.map((background) => (
            <BackgroundCard
              key={background.id}
              type={background.type}
              title={background.title}
              description={background.description || undefined}
              image={background.image || undefined}
              tags={background.tags || undefined}
              isSelected={data.selectedBackground === background.id}
              onClick={() => handleBackgroundSelect(background.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
