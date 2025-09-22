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
        return <Wand2 className="w-8 h-8 text-purple-600" />;
      case "upload":
        return <Upload className="w-8 h-8 text-gray-600" />;
      case "character":
        return <User className="w-8 h-8 text-gray-600" />;
      default:
        return <UserCheck className="w-8 h-8 text-gray-600" />;
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
      className={`p-6 h-full flex flex-col ${getCardStyle()}`}
      onClick={handleClick}
    >
      {(type === "character" || type === "upload") && image ? (
        <div className="mb-4">
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-4">{getIcon()}</div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-center">
          {type === "custom" ? (
            <span className="text-purple-600">Buat dengan AI</span>
          ) : (
            title
          )}
        </h3>

        {type === "custom" && (
          <p className="text-sm text-gray-500 text-center mb-4">{title}</p>
        )}

        {description && (
          <p className="text-sm text-gray-500 text-center mb-4">
            {description}
          </p>
        )}

        {type === "upload" && (
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              Pilih File
            </Button>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mt-auto">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
