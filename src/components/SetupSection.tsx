import React, { useState, useEffect } from "react";
import { CharacterCard } from "./CharacterCard";
// import { FilterRow } from "./FilterRow";
import { BackgroundGallery } from "./BackgroundGallery";
import { VideoDetailSection } from "./VideoDetailSection";
import { Button } from "@/components/ui/button";
import { charactersApi, uploadApi, type Character } from "@/lib/api";
import { useVideoSetup } from "@/contexts/VideoSetupContext";
import { videoSetupStorage } from "@/lib/videoSetupStorage";
import { ChevronDown, ChevronUp, User } from "lucide-react";

export function SetupSection() {
  const { data, updateCharacter } = useVideoSetup();
  const [characterType, setCharacterType] = useState("all");
  const [characterStyle, setCharacterStyle] = useState("all");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isCharacterSectionOpen, setIsCharacterSectionOpen] = useState(false);
  const [isBackgroundSectionOpen, setIsBackgroundSectionOpen] = useState(false);
  const [isVideoDetailSectionOpen, setIsVideoDetailSectionOpen] =
    useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await charactersApi.getCharacters();
        setCharacters(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch characters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Auto-select character when data is loaded from localStorage
  useEffect(() => {
    if (
      data.characterImage &&
      !data.selectedCharacter &&
      characters.length > 0
    ) {
      // Find character with matching image or create a custom one
      const matchingCharacter = characters.find(
        (char) => char.image === data.characterImage
      );
      if (matchingCharacter) {
        updateCharacter(matchingCharacter.id, data.characterImage);
      } else {
        // Create a custom character entry for uploaded image
        updateCharacter("upload", data.characterImage);
      }
    }
  }, [
    data.characterImage,
    characters,
    data.selectedCharacter,
    updateCharacter,
  ]);

  const handleCharacterTypeChange = (type: string) => {
    setCharacterType(type);
  };

  const handleCharacterStyleChange = (style: string) => {
    setCharacterStyle(style);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      data.judulVideo.trim() !== "" &&
      data.prompt.trim() !== "" &&
      data.aspekRasio !== ""
    );
  };

  const handleContinueToPayment = () => {
    // Save required data to localStorage
    videoSetupStorage.save({
      prompt: data.prompt,
      karakter_image: data.characterImage || "",
      background_image: data.backgroundImage || "",
      aspek_rasio: data.aspekRasio,
      judul_video: data.judulVideo,
      bahasa: data.bahasa,
      gaya_suara: data.gayaSuara,
      voice_over: data.voiceOver,
      tone: data.tone,
      background_music: data.backgroundMusic,
      resolusi_video: data.resolusiVideo,
      is_share: data.isShare,
    });

    // Navigate to payment page
    window.location.href = "/pembayaran";
  };

  const handleCharacterSelect = async (characterId: string) => {
    // If it's an upload character, handle file upload
    if (characterId === "upload") {
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

            // Update the upload character with the uploaded image
            setCharacters((prev) =>
              prev.map((char) =>
                char.id === "upload"
                  ? {
                      ...char,
                      image: result.url,
                      description: "Foto yang diupload",
                    }
                  : char
              )
            );

            // Update context with character selection and image
            updateCharacter(characterId, result.url);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
          } finally {
            setUploading(false);
          }
        }
      };
      input.click();
    } else {
      // For regular characters, get the image URL from the character data
      const character = characters.find((char) => char.id === characterId);
      updateCharacter(characterId, character?.image || null);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
          Setup Video AI Anda
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          Lengkapi semua pengaturan untuk video AI Anda dalam satu langkah.
          Pilih karakter, tulis script, dan tentukan environment untuk hasil
          terbaik.
        </p>
      </div>

      {/* Filter Section */}
      {/* <div className="mb-8 sm:mb-12">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <FilterRow
              characterType={characterType}
              characterStyle={characterStyle}
              onCharacterTypeChange={handleCharacterTypeChange}
              onCharacterStyleChange={handleCharacterStyleChange}
            />
          </div>
        </div>
      </div> */}

      {/* Character Selection Section */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Accordion Header */}
          <button
            onClick={() => setIsCharacterSectionOpen(!isCharacterSectionOpen)}
            className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 justify-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    Pilih Avatar / Karakter AI - Opsional
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {data.selectedCharacter
                      ? `Karakter dipilih: ${
                          characters.find(
                            (c) => c.id === data.selectedCharacter
                          )?.title || "Custom"
                        }`
                      : "Pilih karakter yang sesuai dengan kebutuhan video Anda (Opsional)"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {data.selectedCharacter && (
                  <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                    Dipilih
                  </div>
                )}
                {isCharacterSectionOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </button>

          {/* Accordion Content */}
          {isCharacterSectionOpen && (
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="flex justify-center">
                <div className="w-full max-w-7xl">
                  {loading ? (
                    <div className="text-center py-6 sm:py-8">
                      <div className="text-sm sm:text-base text-muted-foreground">
                        Loading characters...
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
                      {characters.map((character) => (
                        <CharacterCard
                          key={character.id}
                          type={character.type}
                          title={character.title}
                          description={character.description || undefined}
                          image={character.image || undefined}
                          tags={character.tags || undefined}
                          isSelected={data.selectedCharacter === character.id}
                          onClick={() => handleCharacterSelect(character.id)}
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

      {/* Background Gallery Section */}
      <div className="mb-6 sm:mb-8">
        <BackgroundGallery />
      </div>

      {/* Video Detail Section */}
      <div className="mb-6 sm:mb-8">
        <VideoDetailSection />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center px-4">
        {!isFormValid() && !uploading && (
          <p className="text-sm text-red-500 mb-3 text-center">
            Lengkapi field yang wajib diisi: Judul Video, Aspek Rasio, dan
            Script
          </p>
        )}
        <Button
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm sm:text-base"
          disabled={uploading || !isFormValid()}
          onClick={handleContinueToPayment}
        >
          {uploading ? "Uploading..." : "Lanjutkan ke Pembayaran"}
        </Button>
      </div>
    </div>
  );
}
