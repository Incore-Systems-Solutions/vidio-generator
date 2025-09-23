import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card2, CardContent } from "@/components/ui/card2";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, User, Loader2 } from "lucide-react";
import { publicVideoGalleryApi, type PublicVideoItem } from "@/lib/api";
// import { Masonry, ResponsiveMasonry } from "react-responsive-masonry";

interface VideoItem {
  id: string;
  title: string;
  creator: string;
  likes: number;
  thumbnail: string;
  duration?: string;
  tags?: string[];
  isVideo?: boolean;
  url_video?: string;
  prompt?: string;
}

// Helper function to convert API data to VideoItem format
const convertApiDataToVideoItem = (apiItem: PublicVideoItem): VideoItem => {
  // Extract tags from prompt (simple implementation)
  const tags = apiItem.prompt
    .split(" ")
    .filter((word) => word.length > 3)
    .slice(0, 3)
    .map((word) => word.replace(/[.,!?]/g, ""));

  // Generate a simple duration based on prompt length
  const duration = Math.floor(apiItem.prompt.length / 50) + 1;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return {
    id: apiItem.id.toString(),
    title:
      apiItem.prompt.length > 50
        ? apiItem.prompt.substring(0, 50) + "..."
        : apiItem.prompt,
    creator: apiItem.user.name,
    likes: Math.floor(Math.random() * 500) + 10, // Random likes for demo
    thumbnail: apiItem.url_video, // Use video URL as thumbnail
    duration: durationStr,
    tags: tags,
    isVideo: true,
    url_video: apiItem.url_video,
    prompt: apiItem.prompt,
  };
};

// Helper function to determine aspect ratio based on content
const getAspectRatio = (
  video: VideoItem
): "standard" | "wide" | "tall" | "square" => {
  // Determine aspect ratio based on video characteristics
  const titleLength = video.title.length;
  const tagCount = video.tags?.length || 0;
  const hasDuration = !!video.duration;

  // Logic to determine aspect ratio
  if (titleLength > 50 || tagCount > 3) {
    return "wide"; // Longer content gets wide format
  } else if (titleLength < 20 && tagCount <= 2) {
    return "square"; // Short content gets square format
  } else if (
    hasDuration &&
    parseInt(video.duration?.split(":")[0] || "0") > 3
  ) {
    return "tall"; // Longer videos get tall format
  } else {
    return "standard"; // Default standard format
  }
};

// Helper function to get gradient colors based on video ID
const getGradientColors = (id: string) => {
  const gradients = [
    "from-purple-400 via-pink-400 to-blue-400",
    "from-green-400 via-blue-400 to-purple-400",
    "from-yellow-400 via-orange-400 to-red-400",
    "from-blue-400 via-cyan-400 to-teal-400",
    "from-pink-400 via-rose-400 to-red-400",
    "from-indigo-400 via-purple-400 to-pink-400",
    "from-emerald-400 via-green-400 to-teal-400",
    "from-orange-400 via-yellow-400 to-lime-400",
    "from-violet-400 via-purple-400 to-fuchsia-400",
    "from-cyan-400 via-blue-400 to-indigo-400",
    "from-rose-400 via-pink-400 to-purple-400",
    "from-teal-400 via-cyan-400 to-blue-400",
  ];

  const index = parseInt(id) % gradients.length;
  return gradients[index];
};

interface VideoGalleryProps {
  onVideoClick?: (video: VideoItem) => void;
}

export function VideoGallery({ onVideoClick }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [videoDetail, setVideoDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (currentPage === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const response = await publicVideoGalleryApi.getPublicVideos(
          currentPage,
          10
        );

        const convertedVideos = response.data.map(convertApiDataToVideoItem);

        if (currentPage === 1) {
          // First page - replace all videos
          setVideos(convertedVideos);
        } else {
          // Load more - append to existing videos
          setVideos((prevVideos) => [...prevVideos, ...convertedVideos]);
        }

        setTotalPages(response.last_page);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchVideos();
  }, [currentPage]);

  const handleVideoClick = async (video: VideoItem) => {
    setSelectedVideo(video);
    setLoadingDetail(true);
    setVideoDetail(null);

    try {
      const response = await publicVideoGalleryApi.getVideoDetail(video.id);
      setVideoDetail(response.data);
    } catch (error) {
      console.error("Error fetching video detail:", error);
    } finally {
      setLoadingDetail(false);
    }

    onVideoClick?.(video);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading && !loadingMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    setVideos([]);
    setError(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light text-foreground mb-6 tracking-tight">
          Video Gallery
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Discover creative videos from our community. Find inspiration for your
          next project.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="text-muted-foreground text-sm">
              Loading videos...
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Elegant Grid Layout */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card2
              key={video.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-2xl border-0 bg-white overflow-hidden rounded-xl aspect-video"
              onClick={() => handleVideoClick(video)}
            >
              <CardContent className="p-0 relative h-full">
                {/* Video Thumbnail - Full Card */}
                <div className="relative w-full h-full overflow-hidden">
                  {video.url_video ? (
                    <video
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => {
                        e.currentTarget.play();
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    >
                      <source src={video.url_video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-gray-500 text-center px-4">
                        <div className="text-lg font-medium mb-1">
                          {video.title.split(" ").slice(0, 2).join(" ")}
                        </div>
                        <div className="text-sm opacity-70">
                          {video.title.split(" ").slice(2).join(" ")}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay - Show on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content Overlay - Show on Hover Only */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Prompt - Only show on hover */}
                    <div className="text-white mb-4">
                      <p className="text-sm leading-relaxed line-clamp-3 font-medium">
                        {video.prompt || video.title}
                      </p>
                    </div>

                    {/* Creator - Only show on hover */}
                    <div className="flex items-center text-white/90 text-xs">
                      <User className="w-3 h-3 mr-2" />
                      <span className="truncate font-medium">
                        {video.creator}
                      </span>
                    </div>
                  </div>

                  {/* Play Button Overlay - Only show when no video URL */}
                  {!video.url_video && video.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/95 rounded-full p-4 shadow-lg">
                        <Play className="w-6 h-6 text-gray-700 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card2>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && !error && currentPage < totalPages && (
        <div className="text-center mt-12">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            disabled={loadingMore}
            className="px-8 py-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              `Load More Videos (${videos.length} of ${totalPages * 10})`
            )}
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!loading && !error && currentPage >= totalPages && videos.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            You've reached the end! ({videos.length} videos loaded)
          </p>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          videoDetail={videoDetail}
          loadingDetail={loadingDetail}
          onClose={() => {
            setSelectedVideo(null);
            setVideoDetail(null);
          }}
        />
      )}
    </div>
  );
}

interface VideoModalProps {
  video: VideoItem;
  videoDetail: any;
  loadingDetail: boolean;
  onClose: () => void;
}

function VideoModal({
  video,
  videoDetail,
  loadingDetail,
  onClose,
}: VideoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content - Full Screen with Shadcn UI */}
      <div className="relative bg-background border shadow-2xl w-full h-full max-w-none max-h-none overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-foreground hover:bg-muted"
            >
              ←
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {video.title}
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-foreground hover:bg-muted"
          >
            ✕
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Player - Left Side */}
          <div className="flex-1 bg-muted/50 relative">
            {video.url_video ? (
              <div className="w-full h-full relative">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                >
                  <source src={video.url_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
                <div className="text-foreground text-center">
                  <div className="text-4xl font-bold mb-4">
                    {video.title.split(" ").slice(0, 2).join(" ")}
                  </div>
                  <div className="text-lg opacity-80">
                    {video.title.split(" ").slice(2).join(" ")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel - Right Side */}
          <div className="w-80 bg-background border-l overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{video.creator}</p>
                  <p className="text-muted-foreground text-sm">
                    @{video.creator.toLowerCase().replace(/\s+/g, "_")}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div>
                <h3 className="text-foreground font-semibold mb-3">Details</h3>
                <div className="space-y-2">
                  {videoDetail && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="text-foreground">
                          {videoDetail.model_ai}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Aspect Ratio:
                        </span>
                        <span className="text-foreground">
                          {videoDetail.aspect_ratio}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Start Section */}
              <div>
                <h3 className="text-foreground font-semibold mb-3">Start</h3>
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  {video.url_video ? (
                    <video
                      className="w-full h-full object-cover rounded-lg"
                      muted
                    >
                      <source src={video.url_video} type="video/mp4" />
                    </video>
                  ) : (
                    <Play className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Prompt Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground font-semibold">Prompt</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      if (videoDetail?.prompt) {
                        navigator.clipboard.writeText(videoDetail.prompt);
                      }
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </Button>
                </div>
                {loadingDetail ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-foreground text-sm leading-relaxed">
                      {videoDetail?.prompt ||
                        video.prompt ||
                        "No prompt available"}
                    </p>
                  </div>
                )}
              </div>

              {/* Feature Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Video 2.1
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Professional Mode
                </Button>
              </div>

              {/* Recreate Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  if (videoDetail) {
                    // Convert video detail to localStorage format
                    const videoSetupData = {
                      prompt: videoDetail.prompt || "",
                      karakter_image:
                        videoDetail.karakter_image ||
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                      background_image:
                        videoDetail.background_image ||
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
                      aspek_rasio: videoDetail.aspect_ratio || "16:9",
                      judul_video:
                        videoDetail.prompt?.substring(0, 50) ||
                        "Recreated Video",
                      bahasa: videoDetail.bahasa || "id",
                      gaya_suara: videoDetail.gaya_suara || "natural",
                      voice_over: videoDetail.voice_over || "male",
                      tone: videoDetail.tone || "professional",
                      background_music:
                        videoDetail.background_music || "upbeat",
                      resolusi_video: videoDetail.resolusi_video || "1080p",
                      is_share: videoDetail.share_url || "y",
                    };

                    // Save to localStorage
                    localStorage.setItem(
                      "videoSetupData",
                      JSON.stringify(videoSetupData)
                    );

                    // Close modal
                    onClose();

                    // Navigate to setup page
                    window.location.href = "/";
                  }
                }}
              >
                Recreate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
