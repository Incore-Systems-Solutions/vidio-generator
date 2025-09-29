import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Lightbulb,
  FileText,
  Volume2,
  Mic,
  Briefcase,
  Smile,
  GraduationCap,
  BarChart3,
  BookOpen,
  Newspaper,
} from "lucide-react";
import { useVideoSetup } from "@/contexts/VideoSetupContext";

export function VideoDetailSection() {
  const {
    data,
    updatePrompt,
    updateAspectRatio,
    updateJudulVideo,
    updateBahasa,
    updateGayaSuara,
    updateVoiceOver,
    updateTone,
    updateBackgroundMusic,
    updateResolusiVideo,
    updateIsShare,
  } = useVideoSetup();
  const [script, setScript] = useState(data.prompt || "");

  // Update script when data.prompt changes
  useEffect(() => {
    setScript(data.prompt || "");
  }, [data.prompt]);

  const toneOptions = [
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "friendly", label: "Friendly", icon: Smile },
    { id: "educational", label: "Educational", icon: GraduationCap },
    { id: "marketing", label: "Marketing", icon: BarChart3 },
    { id: "storytelling", label: "Storytelling", icon: BookOpen },
    { id: "news", label: "News", icon: Newspaper },
  ];

  const wordCount = script
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Detail Video & Script
        </h2>
        <p className="text-sm text-muted-foreground">
          <span className="text-red-500">*</span> Field wajib diisi |
          <span className="text-gray-500 ml-2">(Opsional)</span> Field tidak
          wajib diisi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informasi Dasar - Kiri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Informasi Dasar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Judul Video <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Masukkan judul video anda..."
                value={data.judulVideo}
                onChange={(e) => updateJudulVideo(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Aspek Rasio <span className="text-red-500">*</span>
              </label>
              <Select value={data.aspekRasio} onValueChange={updateAspectRatio}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih rasio video anda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                  <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Script/Naskah Video <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Masukkan script video anda..."
                value={script}
                onChange={(e) => {
                  setScript(e.target.value);
                  updatePrompt(e.target.value);
                }}
                className="min-h-32"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {wordCount} kata
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pengaturan Suara & Bahasa - Tengah */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>Pengaturan Suara & Bahasa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Bahasa <span className="text-gray-500">(Opsional)</span>
              </label>
              <Select value={data.bahasa} onValueChange={updateBahasa}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih bahasa untuk video anda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Gaya Suara <span className="text-gray-500">(Opsional)</span>
              </label>
              <Select value={data.gayaSuara} onValueChange={updateGayaSuara}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih gaya suara untuk video anda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Voice Over <span className="text-gray-500">(Opsional)</span>
              </label>
              <Select value={data.voiceOver} onValueChange={updateVoiceOver}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih voice over untuk video anda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male Voice</SelectItem>
                  <SelectItem value="female">Female Voice</SelectItem>
                  <SelectItem value="child">Child Voice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Tone/Nada Video{" "}
                <span className="text-gray-500">(Opsional)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toneOptions.map((tone) => {
                  const Icon = tone.icon;
                  return (
                    <Button
                      key={tone.id}
                      variant={data.tone === tone.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateTone(tone.id)}
                      className={`flex items-center space-x-2 ${
                        data.tone === tone.id
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          : ""
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tone.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pengaturan Lanjutan - Kanan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Pengaturan Lanjutan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Background Music{" "}
                <span className="text-gray-500">(Opsional)</span>
              </label>
              <Select
                value={data.backgroundMusic}
                onValueChange={updateBackgroundMusic}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih background music" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upbeat">Upbeat</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                  <SelectItem value="none">Tidak ada musik</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Resolusi Video <span className="text-gray-500">(Opsional)</span>
              </label>
              <Select
                value={data.resolusiVideo}
                onValueChange={updateResolusiVideo}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih resolusi video" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Share Video Public{" "}
                <span className="text-gray-500">(Opsional)</span>
              </label>
              <Select value={data.isShare} onValueChange={updateIsShare}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih visibility video" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="y">Share Public</SelectItem>
                  <SelectItem value="n">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bahasa:</span>
              <Badge variant="secondary">
                {data.bahasa || "Belum dipilih"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Gaya Suara:</span>
              <Badge variant="secondary">
                {data.gayaSuara || "Belum dipilih"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tone:</span>
              <Badge variant="secondary">{data.tone || "Belum dipilih"}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Background Musik:
              </span>
              <Badge variant="secondary">
                {data.backgroundMusic || "Belum dipilih"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Resolusi:</span>
              <Badge variant="secondary">
                {data.resolusiVideo || "Belum dipilih"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Voice Over:</span>
              <Badge variant="secondary">
                {data.voiceOver || "Belum dipilih"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Gunakan kalimat yang jelas dan tidak terlalu panjang</li>
              <li>• Tambahkan jeda dengan tanda koma atau titik</li>
              <li>• Hindari singkatan yang sulit diucapkan</li>
              <li>
                • Jelaskan script dengan detail agar menghasilkan video yang
                diinginkan
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
