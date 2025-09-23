import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wand2,
  Upload,
  User,
  UserCheck,
  Image as ImageIcon,
} from "lucide-react";

interface CharacterCardProps {
  type: "custom" | "upload" | "character";
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  isSelected?: boolean;
  onClick?: () => void;
}

export function CharacterCard({
  type,
  title,
  description,
  image,
  tags = [],
  isSelected = false,
  onClick,
}: CharacterCardProps) {
  const handleClick = () => {
    if (type === "custom") {
      window.location.href = "/buat-karakter-kustom";
    } else if (onClick) {
      onClick();
    }
  };
  const getIcon = () => {
    switch (type) {
      case "custom":
        return <Wand2 className="w-full h-full text-purple-600" />;
      case "upload":
        return <Upload className="w-full h-full text-gray-600" />;
      case "character":
        return <User className="w-full h-full text-gray-600" />;
      default:
        return <UserCheck className="w-full h-full text-gray-600" />;
    }
  };

  const getCardStyle = () => {
    if (type === "custom") {
      return "border-2 border-dashed border-purple-300 hover:border-purple-400 cursor-pointer transition-colors";
    }
    if (isSelected) {
      return "border-2 border-purple-500 shadow-lg cursor-pointer transition-all";
    }
    return "border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors";
  };

  return (
    <Card
      className={`p-3 sm:p-4 md:p-6 h-full flex flex-col ${getCardStyle()}`}
      onClick={handleClick}
    >
      {(type === "character" || type === "upload") && image ? (
        <div className="mb-3 sm:mb-4">
          <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
            {getIcon()}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-center leading-tight">
          {type === "custom" ? (
            <span className="text-purple-600">Buat dengan AI</span>
          ) : (
            title
          )}
        </h3>

        {type === "custom" && (
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 leading-tight">
            {title}
          </p>
        )}

        {description && (
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 leading-tight hidden sm:block">
            {description}
          </p>
        )}

        {type === "upload" && (
          <div className="space-y-1 sm:space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs sm:text-sm py-1 sm:py-2"
            >
              Pilih File
            </Button>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mt-auto">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-1 py-0 hidden sm:inline-block"
              >
                {tag}
              </Badge>
            ))}
            {/* Show only first 2 tags on mobile */}
            {tags.slice(0, 2).map((tag, index) => (
              <Badge
                key={`mobile-${index}`}
                variant="secondary"
                className="text-xs px-1 py-0 sm:hidden"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
