import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card2, CardContent } from "@/components/ui/card2";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, User, Loader2, Sparkles, Video } from "lucide-react";
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
      {/* Futuristic Header */}
      <div className="text-center mb-16 relative">
        {/* Gradient Glow Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Badge with Icon */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              AI Generated Videos
            </span>
          </div>

          {/* Main Title with Gradient */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Galeri Video
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Klik video untuk melihat detail lengkap dan prompt yang digunakan.
          </p>
        </div>
      </div>

      {/* Loading State - Futuristic */}
      {loading && (
        <div className="flex justify-center items-center py-24">
          <div className="relative">
            {/* Glowing Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse" />

            {/* Loading Content */}
            <div className="relative flex flex-col items-center space-y-4 bg-slate-900/50 border border-purple-500/20 rounded-2xl px-12 py-8 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              <div className="text-center">
                <p className="text-gray-300 text-sm font-medium">
                  Loading videos...
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Mengambil galeri AI terbaru
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State - Futuristic */}
      {error && (
        <div className="text-center py-24">
          <div className="max-w-md mx-auto bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-2xl p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-300 mb-6 text-sm">{error}</p>
            <Button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-purple-500/20"
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      )}

      {/* AI Cinematic Grid Layout */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer relative"
              onClick={() => handleVideoClick(video)}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500 group-hover:duration-200" />

              {/* Card */}
              <Card2 className="relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm aspect-video transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                <CardContent className="p-0 relative h-full">
                  {/* Video Thumbnail - Full Card */}
                  <div className="relative w-full h-full overflow-hidden">
                    {video.url_video ? (
                      <video
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
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
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <div className="text-gray-400 text-center px-4">
                          <Video className="w-12 h-12 mx-auto mb-2 opacity-30" />
                          <div className="text-sm font-medium opacity-70">
                            {video.title.split(" ").slice(0, 3).join(" ")}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Gradient Overlay - Show on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Neon Border Effect on Hover */}
                    <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/50 rounded-2xl transition-colors duration-300" />

                    {/* Content Overlay - Show on Hover Only */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {/* Prompt - Only show on hover */}
                      <div className="text-white mb-3">
                        <p className="text-sm leading-relaxed line-clamp-2 font-medium drop-shadow-lg">
                          {video.prompt || video.title}
                        </p>
                      </div>

                      {/* Creator - Only show on hover */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/90 text-xs bg-slate-900/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                          <User className="w-3 h-3 mr-2" />
                          <span className="truncate font-medium">
                            {video.creator}
                          </span>
                        </div>

                        {/* Play Icon */}
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2 shadow-lg shadow-purple-500/30">
                          <Play className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>

                    {/* Play Button Overlay - Only show when no video URL */}
                    {!video.url_video && video.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-5 shadow-2xl shadow-purple-500/40 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card2>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button - Futuristic */}
      {!loading && !error && currentPage < totalPages && (
        <div className="text-center mt-16">
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-20" />

            <Button
              onClick={handleLoadMore}
              size="lg"
              disabled={loadingMore}
              className="relative bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-xl shadow-purple-500/30 px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Load More Videos ({videos.length} of {totalPages * 10})
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* End of Results - Futuristic */}
      {!loading && !error && currentPage >= totalPages && videos.length > 0 && (
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            <p className="text-gray-400 text-sm font-medium">
              Semua video telah ditampilkan
            </p>
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-300 border-0"
            >
              {videos.length} videos
            </Badge>
          </div>
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

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
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
      {/* Enhanced Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content - Full Screen Futuristic UI */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-purple-500/20 shadow-2xl shadow-purple-500/10 w-full h-full max-w-none max-h-none overflow-hidden">
        {/* Futuristic Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/50 to-slate-950/90 backdrop-blur-xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />

          <div className="flex items-center space-x-4 relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-300 hover:text-white hover:bg-purple-500/10 border border-purple-500/20"
            >
              ← Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {video.title}
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="relative z-10 text-gray-300 hover:text-white hover:bg-red-500/10 border border-red-500/20"
          >
            ✕ Close
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Player - Left Side with Glow */}
          <div className="flex-1 bg-slate-900/50 relative">
            {video.url_video ? (
              <div className="w-full h-full relative p-8">
                {/* Glow Effect around video */}
                <div className="absolute inset-8 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-2xl" />
                <video
                  controls
                  className="relative w-full h-full object-contain rounded-xl border border-purple-500/20 shadow-2xl shadow-purple-500/20"
                  poster={video.thumbnail}
                >
                  <source src={video.url_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-24 h-24 mx-auto mb-6 text-purple-500/30" />
                  <div className="text-3xl font-bold text-gray-300 mb-4">
                    {video.title.split(" ").slice(0, 2).join(" ")}
                  </div>
                  <div className="text-lg text-gray-500">
                    {video.title.split(" ").slice(2).join(" ")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel - Right Side Futuristic */}
          <div className="w-96 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-white/10 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* User Profile - Futuristic */}
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{video.creator}</p>
                    <p className="text-purple-300 text-sm">
                      @{video.creator.toLowerCase().replace(/\s+/g, "_")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Section - Futuristic */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                <h3 className="text-purple-300 font-semibold mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Video Details
                </h3>
                <div className="space-y-3">
                  {videoDetail && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Model AI:</span>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {videoDetail.model_ai}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Aspect Ratio:</span>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {videoDetail.aspect_ratio}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Start Section - Futuristic */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                <h3 className="text-purple-300 font-semibold mb-3 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  First Frame
                </h3>
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden border border-purple-500/20">
                  {video.url_video ? (
                    <video className="w-full h-full object-cover" muted>
                      <source src={video.url_video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-purple-500/30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Prompt Section - Futuristic */}
              <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-purple-300 font-semibold flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Prompt
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border border-purple-500/30"
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
                    <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                  </div>
                ) : (
                  <div className="bg-slate-900/80 border border-white/10 rounded-lg p-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {videoDetail?.prompt ||
                        video.prompt ||
                        "No prompt available"}
                    </p>
                  </div>
                )}
              </div>

              {/* Feature Badges */}
              <div className="flex space-x-2">
                <div className="flex-1 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg px-3 py-2 text-center">
                  <p className="text-indigo-300 text-xs font-semibold">
                    Video 2.1
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-3 py-2 text-center">
                  <p className="text-purple-300 text-xs font-semibold">
                    Professional
                  </p>
                </div>
              </div>

              {/* Recreate Button - Futuristic */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-30" />

                <Button
                  className="relative w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-105"
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
                  <Sparkles className="w-5 h-5 mr-2" />
                  Recreate Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
