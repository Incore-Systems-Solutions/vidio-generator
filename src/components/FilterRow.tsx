import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Palette } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  isActive?: boolean;
}

interface FilterRowProps {
  characterType: string;
  characterStyle: string;
  onCharacterTypeChange: (type: string) => void;
  onCharacterStyleChange: (style: string) => void;
}

export function FilterRow({
  characterType,
  characterStyle,
  onCharacterTypeChange,
  onCharacterStyleChange,
}: FilterRowProps) {
  const characterTypeOptions = [
    { id: "all", label: "Semua", isActive: characterType === "all" },
    { id: "male", label: "Pria", isActive: characterType === "male" },
    { id: "female", label: "Wanita", isActive: characterType === "female" },
  ];

  const characterStyleOptions = [
    { id: "all", label: "Semua", isActive: characterStyle === "all" },
    {
      id: "realistic",
      label: "Realistis",
      isActive: characterStyle === "realistic",
    },
    { id: "anime", label: "Anime", isActive: characterStyle === "anime" },
    { id: "cartoon", label: "Kartun", isActive: characterStyle === "cartoon" },
    { id: "3d", label: "3D", isActive: characterStyle === "3d" },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-3 sm:p-4">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col space-y-4 lg:hidden">
          {/* Jenis Karakter */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Jenis Karakter
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {characterTypeOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={option.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCharacterTypeChange(option.id)}
                  className={`
                    relative transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                    ${
                      option.isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
                        : "hover:border-purple-300 hover:text-purple-600"
                    }
                  `}
                >
                  {option.isActive && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-600 rounded-full" />
                    </div>
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Gaya Karakter */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Gaya Karakter
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {characterStyleOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={option.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCharacterStyleChange(option.id)}
                  className={`
                    relative transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                    ${
                      option.isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
                        : "hover:border-purple-300 hover:text-purple-600"
                    }
                  `}
                >
                  {option.isActive && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-600 rounded-full" />
                    </div>
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Jenis Karakter - Kiri */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Jenis Karakter
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {characterTypeOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={option.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCharacterTypeChange(option.id)}
                  className={`
                    relative transition-all duration-200
                    ${
                      option.isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
                        : "hover:border-purple-300 hover:text-purple-600"
                    }
                  `}
                >
                  {option.isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    </div>
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-border mx-4" />

          {/* Gaya Karakter - Kanan */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Gaya Karakter
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {characterStyleOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={option.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCharacterStyleChange(option.id)}
                  className={`
                    relative transition-all duration-200
                    ${
                      option.isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
                        : "hover:border-purple-300 hover:text-purple-600"
                    }
                  `}
                >
                  {option.isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    </div>
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
