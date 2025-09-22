import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { videoGenerationApi } from "@/lib/api";
import {
  CheckCircle,
  Download,
  Share2,
  Settings,
  Maximize2,
  Music,
  Camera,
  Play,
  MessageCircle,
  ArrowLeft,
  Video,
  ArrowRight,
} from "lucide-react";

interface VideoDownloadProps {
  videoUrl: string;
  taskId: string;
  onBack?: () => void;
}

export function VideoDownload({
  videoUrl,
  taskId,
  onBack,
}: VideoDownloadProps) {
  const [selectedQuality, setSelectedQuality] = useState<string>("1080p");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const qualityOptions = [
    {
      id: "720p",
      label: "720p HD",
      // size: "15 MB",
      icon: <div className="w-4 h-4 bg-gray-600 rounded-full"></div>,
      pro: false,
    },
    {
      id: "1080p",
      label: "1080p Full HD",
      // size: "25 MB",
      icon: <div className="w-4 h-4 bg-blue-600 rounded-full"></div>,
      pro: false,
    },
    {
      id: "4k",
      label: "4K Ultra HD",
      // size: "35 MB",
      icon: <div className="w-4 h-4 bg-gray-400 rounded-full"></div>,
      pro: false,
    },
  ];

  const platformOptions = [
    {
      id: "tiktok",
      name: "TikTok",
      icon: <Music className="w-5 h-5" />,
      description: "Format 9:16, optimal untuk TikTok",
      color: "bg-black text-white",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Camera className="w-5 h-5" />,
      description: "Format square dan story",
      color: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Play className="w-5 h-5" />,
      description: "Format 16:9 kualitas",
      color: "bg-red-600 text-white",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Kirimkan file di aplikasi",
      color: "bg-green-600 text-white",
    },
  ];

  const getSelectedQuality = () => {
    return qualityOptions.find((q) => q.id === selectedQuality);
  };

  const handleDownload = async () => {
    try {
      // Fetch the video file
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `video-${taskId}.mp4`;

      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to direct link
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = `video-${taskId}.mp4`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePlatformShare = async (platformId: string) => {
    setSelectedPlatform(platformId);

    try {
      switch (platformId) {
        case "tiktok":
          await shareToTikTok();
          break;
        case "instagram":
          await shareToInstagram();
          break;
        case "youtube":
          await shareToYouTube();
          break;
        case "whatsapp":
          await shareToWhatsApp();
          break;
        default:
          console.log(`Platform ${platformId} not implemented`);
      }
    } catch (error) {
      console.error(`Error sharing to ${platformId}:`, error);
    }
  };

  const shareToTikTok = async () => {
    try {
      // Try to convert video for TikTok format (9:16)
      const result = await videoGenerationApi.convertVideoForPlatform(
        videoUrl,
        "tiktok",
        taskId
      );

      if (result.status) {
        // Open TikTok in new window with converted video
        const tiktokUrl = `https://www.tiktok.com/upload?video_url=${encodeURIComponent(
          result.data.convertedUrl
        )}`;
        window.open(
          tiktokUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
      }
    } catch (error) {
      console.error("TikTok conversion failed, using original video:", error);
      // Fallback to original video
      const tiktokUrl = `https://www.tiktok.com/upload?video_url=${encodeURIComponent(
        videoUrl
      )}`;
      window.open(
        tiktokUrl,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    }
  };

  const shareToInstagram = async () => {
    try {
      // Try to convert video for Instagram format (square)
      const result = await videoGenerationApi.convertVideoForPlatform(
        videoUrl,
        "instagram",
        taskId
      );

      if (result.status) {
        // Open Instagram in new window with converted video
        const instagramUrl = `https://www.instagram.com/create/?video_url=${encodeURIComponent(
          result.data.convertedUrl
        )}`;
        window.open(
          instagramUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
      }
    } catch (error) {
      console.error(
        "Instagram conversion failed, using original video:",
        error
      );
      // Fallback to original video
      const instagramUrl = `https://www.instagram.com/create/?video_url=${encodeURIComponent(
        videoUrl
      )}`;
      window.open(
        instagramUrl,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    }
  };

  const shareToYouTube = async () => {
    try {
      // Try to convert video for YouTube format (16:9)
      const result = await videoGenerationApi.convertVideoForPlatform(
        videoUrl,
        "youtube",
        taskId
      );

      if (result.status) {
        // Open YouTube in new window with converted video
        const youtubeUrl = `https://www.youtube.com/upload?video_url=${encodeURIComponent(
          result.data.convertedUrl
        )}`;
        window.open(
          youtubeUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
      }
    } catch (error) {
      console.error("YouTube conversion failed, using original video:", error);
      // Fallback to original video
      const youtubeUrl = `https://www.youtube.com/upload?video_url=${encodeURIComponent(
        videoUrl
      )}`;
      window.open(
        youtubeUrl,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    }
  };

  const shareToWhatsApp = async () => {
    // For WhatsApp, we'll open WhatsApp Web with the video URL
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      videoUrl
    )}`;
    window.open(
      whatsappUrl,
      "_blank",
      "width=800,height=600,scrollbars=yes,resizable=yes"
    );
  };

  const handleCreateNewVideo = () => {
    // Clear all localStorage
    localStorage.removeItem("videoSetupData");
    localStorage.removeItem("x-api-key");

    // Redirect to main page
    window.location.href = "/";
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          )}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Video Anda Siap!
              </h1>
              <p className="text-muted-foreground">
                Video telah berhasil dibuat dengan kualitas AI terbaik. Download
                sekarang atau bagikan langsung ke platform favorit Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Video Preview - Top */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Preview Video</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="w-full h-96 bg-black rounded-lg overflow-hidden">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster=""
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>0 detik</span>
                <span>Kualitas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download & Share Cards - Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Download Video */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Video</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Pilih Kualitas
                </h3>
                <div className="space-y-3">
                  {qualityOptions.map((quality) => (
                    <div
                      key={quality.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedQuality === quality.id
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                          : "border-border hover:border-purple-300"
                      }`}
                      onClick={() => setSelectedQuality(quality.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {quality.icon}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-foreground">
                                {quality.label}
                              </span>
                              {quality.pro && (
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
                                  PRO
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {selectedQuality === quality.id && (
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Video {getSelectedQuality()?.label}
              </Button>
            </CardContent>
          </Card>

          {/* Share to Platform */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Bagikan ke Platform</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platformOptions.map((platform) => (
                  <div
                    key={platform.id}
                    className="p-4 border rounded-lg hover:border-purple-300 transition-all cursor-pointer"
                    onClick={() => handlePlatformShare(platform.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.color}`}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {platform.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {platform.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlatformShare(platform.id);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Extend Video Baru Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Extend Video Baru
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Ulang semua langkah dari awal untuk membuat video lainnya sesuai
                kebutuhan.
              </p>
              <Button
                onClick={handleCreateNewVideo}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg"
                size="lg"
              >
                Buat Video Baru
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
