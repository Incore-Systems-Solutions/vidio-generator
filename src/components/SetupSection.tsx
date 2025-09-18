import React, { useState } from "react"
import { CharacterCard } from "./CharacterCard"
import { FilterRow } from "./FilterRow"
import { BackgroundGallery } from "./BackgroundGallery"
import { VideoDetailSection } from "./VideoDetailSection"
import { Button } from "@/components/ui/button"

export function SetupSection() {
  const [characterType, setCharacterType] = useState("all")
  const [characterStyle, setCharacterStyle] = useState("all")
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)


  const characters = [
    {
      id: "custom",
      type: "custom" as const,
      title: "Karakter AI Kustom",
      description: "Deskripsikan karakter impian anda"
    },
    {
      id: "upload",
      type: "upload" as const,
      title: "Upload Foto"
    },
    {
      id: "asian-woman",
      type: "character" as const,
      title: "Wanita Asia",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      tags: ["Realistis", "Wanita"]
    },
    {
      id: "asian-man",
      type: "character" as const,
      title: "Pria Asia",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      tags: ["Realistis", "Pria"]
    },
    {
      id: "3d-andra",
      type: "character" as const,
      title: "3D Karakter Andra",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      tags: ["3D", "Pria"]
    },
    {
      id: "cartoon-wanda",
      type: "character" as const,
      title: "Kartun Wanda",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      tags: ["Kartun", "Wanita"]
    },
    {
      id: "3d-dimas",
      type: "character" as const,
      title: "3D Karakter Dimas",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      tags: ["3D", "Pria"]
    },
    {
      id: "cartoon-fira",
      type: "character" as const,
      title: "Kartun Fira",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      tags: ["Kartun", "Wanita"]
    },
    {
      id: "anime-yun",
      type: "character" as const,
      title: "Anime Yun",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      tags: ["Anime", "Pria"]
    },
    {
      id: "anime-lala",
      type: "character" as const,
      title: "Anime Lala",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      tags: ["Anime", "Wanita"]
    }
  ]

  const handleCharacterTypeChange = (type: string) => {
    setCharacterType(type)
  }

  const handleCharacterStyleChange = (style: string) => {
    setCharacterStyle(style)
  }

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId)
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Setup Video AI Anda
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Lengkapi semua pengaturan untuk video AI Anda dalam satu langkah. Pilih karakter, tulis script, dan tentukan environment untuk hasil terbaik.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {characters.map((character) => (
                <CharacterCard 
                  key={character.id}
                  type={character.type}
                  title={character.title}
                  description={character.description}
                  image={character.image}
                  tags={character.tags}
                  isSelected={selectedCharacter === character.id}
                  onClick={() => handleCharacterSelect(character.id)}
                />
              ))}
            </div>
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
        <Button variant="outline" size="lg">
          Kembali
        </Button>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={!selectedCharacter}
        >
          Lanjutkan ke Pembayaran
        </Button>
      </div>
    </div>
  )
}
