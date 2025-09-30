import React, { useState, useEffect } from "react";
import { BackgroundCard } from "./BackgroundCard";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown, ChevronUp, Image } from "lucide-react";
import { backgroundsApi, uploadApi, type Background } from "@/lib/api";
import { useVideoSetup } from "@/contexts/VideoSetupContext";

export function BackgroundGallery() {
  const { data, updateBackground } = useVideoSetup();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  // Auto-select background when data is loaded from localStorage
  useEffect(() => {
    if (
      data.backgroundImage &&
      !data.selectedBackground &&
      backgrounds.length > 0
    ) {
      // Find background with matching image or create a custom one
      const matchingBackground = backgrounds.find(
        (bg) => bg.image === data.backgroundImage
      );
      if (matchingBackground) {
        updateBackground(matchingBackground.id, data.backgroundImage);
      } else {
        // Create a custom background entry for uploaded image
        updateBackground("upload", data.backgroundImage);
      }
    }
  }, [
    data.backgroundImage,
    backgrounds,
    data.selectedBackground,
    updateBackground,
  ]);

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
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Accordion Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 justify-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Pilih Latar Belakang - Opsional
                </h2>
                <p className="text-sm text-muted-foreground">
                  {data.selectedBackground
                    ? `Background dipilih: ${
                        backgrounds.find(
                          (bg) => bg.id === data.selectedBackground
                        )?.title || "Custom"
                      }`
                    : "Pilih latar belakang yang sesuai dengan kebutuhan video Anda (Opsional)"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {data.selectedBackground && (
                <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                  Dipilih
                </div>
              )}
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>
        </button>

        {/* Accordion Content */}
        {isOpen && (
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="flex justify-center">
              <div className="w-full max-w-7xl">
                {loading ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="text-sm sm:text-base text-muted-foreground">
                      Loading backgrounds...
                    </div>
                  </div>
                ) : uploading ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="text-sm sm:text-base text-muted-foreground">
                      Uploading image...
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="text-sm sm:text-base text-red-500">
                      Error: {error}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
