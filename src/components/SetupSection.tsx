import React, { useState, useEffect } from "react";
import { CharacterCard } from "./CharacterCard";
import { FilterRow } from "./FilterRow";
import { BackgroundGallery } from "./BackgroundGallery";
import { VideoDetailSection } from "./VideoDetailSection";
import { Button } from "@/components/ui/button";
import { charactersApi, uploadApi, type Character } from "@/lib/api";
import { useVideoSetup } from "@/contexts/VideoSetupContext";
import { videoSetupStorage } from "@/lib/videoSetupStorage";

export function SetupSection() {
  const { data, updateCharacter } = useVideoSetup();
  const [characterType, setCharacterType] = useState("all");
  const [characterStyle, setCharacterStyle] = useState("all");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleCharacterTypeChange = (type: string) => {
    setCharacterType(type);
  };

  const handleCharacterStyleChange = (style: string) => {
    setCharacterStyle(style);
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
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Setup Video AI Anda
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Lengkapi semua pengaturan untuk video AI Anda dalam satu langkah.
          Pilih karakter, tulis script, dan tentukan environment untuk hasil
          terbaik.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-12">
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
      </div>

      {/* Character Selection Section */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Pilih Karakter AI Anda
          </h2>
          <p className="text-muted-foreground">
            Pilih karakter yang sesuai dengan kebutuhan video Anda
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  Loading characters...
                </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

      {/* Background Gallery Section */}
      <div className="mb-8">
        <BackgroundGallery />
      </div>

      {/* Video Detail Section */}
      <div className="mb-8">
        <VideoDetailSection />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={!data.selectedCharacter || uploading}
          onClick={handleContinueToPayment}
        >
          {uploading ? "Uploading..." : "Lanjutkan ke Pembayaran"}
        </Button>
      </div>
    </div>
  );
}
