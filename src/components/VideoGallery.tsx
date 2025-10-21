import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Video, X, Calendar, Play } from "lucide-react";
import { publicVideoGalleryApi, type PublicVideoItem } from "@/lib/api";

// Translations for VideoGallery
const translations = {
  ID: {
    badge: "Video yang Dibuat AI",
    title: "Galeri Video",
    description: "Koleksi video AI terbaik yang dibuat oleh pengguna kami.",
    loadingTitle: "Memuat video...",
    loadingDesc: "Mengambil galeri AI terbaru",
    errorMessage: "Gagal memuat video. Silakan coba lagi nanti.",
    retryButton: "Coba Lagi",
    loadMoreButton: "Muat Lebih Banyak Video",
    loadingButton: "Memuat...",
    endMessage: "Semua video telah ditampilkan",
    modalTitle: "Pemutar Video",
    modalCreatedOn: "Dibuat pada",
    videoNotAvailable: "Video Tidak Tersedia",
    videoUnavailableDesc: "Video ini saat ini tidak tersedia",
  },
  EN: {
    badge: "AI Generated Videos",
    title: "Video Gallery",
    description: "The best AI video collection created by our users.",
    loadingTitle: "Loading videos...",
    loadingDesc: "Fetching latest AI gallery",
    errorMessage: "Failed to load videos. Please try again later.",
    retryButton: "Try Again",
    loadMoreButton: "Load More Videos",
    loadingButton: "Loading...",
    endMessage: "All videos have been displayed",
    modalTitle: "Video Player",
    modalCreatedOn: "Created on",
    videoNotAvailable: "Video Not Available",
    videoUnavailableDesc: "This video is currently unavailable",
  },
  ZH: {
    badge: "AI 生成的视频",
    title: "视频库",
    description: "由我们用户创建的最佳 AI 视频集合。",
    loadingTitle: "加载视频中...",
    loadingDesc: "获取最新 AI 画廊",
    errorMessage: "加载视频失败。请稍后再试。",
    retryButton: "重试",
    loadMoreButton: "加载更多视频",
    loadingButton: "加载中...",
    endMessage: "所有视频已显示",
    modalTitle: "视频播放器",
    modalCreatedOn: "创建于",
    videoNotAvailable: "视频不可用",
    videoUnavailableDesc: "此视频当前不可用",
  },
  AR: {
    badge: "مقاطع فيديو منشأة بالذكاء الاصطناعي",
    title: "معرض الفيديو",
    description: "أفضل مجموعة فيديو AI تم إنشاؤها بواسطة مستخدمينا.",
    loadingTitle: "جاري تحميل مقاطع الفيديو...",
    loadingDesc: "جلب أحدث معرض AI",
    errorMessage: "فشل تحميل مقاطع الفيديو. يرجى المحاولة مرة أخرى لاحقًا.",
    retryButton: "حاول مرة أخرى",
    loadMoreButton: "تحميل المزيد من مقاطع الفيديو",
    loadingButton: "جاري التحميل...",
    endMessage: "تم عرض جميع مقاطع الفيديو",
    modalTitle: "مشغل الفيديو",
    modalCreatedOn: "تم الإنشاء في",
    videoNotAvailable: "الفيديو غير متوفر",
    videoUnavailableDesc: "هذا الفيديو غير متوفر حاليًا",
  },
};

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<PublicVideoItem | null>(
    null
  );
  const [videos, setVideos] = useState<PublicVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");

  // Load language from localStorage and listen for changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    ) {
      setSelectedLanguage(savedLanguage);
    }

    // Listen for language changes via custom event
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("preferredLanguage");
      if (
        newLanguage &&
        translations[newLanguage as keyof typeof translations]
      ) {
        setSelectedLanguage(newLanguage);
      }
    };

    // Check localStorage periodically (for same-window changes)
    const interval = setInterval(() => {
      const currentLanguage = localStorage.getItem("preferredLanguage");
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    }, 500);

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      clearInterval(interval);
    };
  }, [selectedLanguage]);

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
          12
        );

        if (currentPage === 1) {
          // First page - replace all videos
          setVideos(response.data);
        } else {
          // Load more - append to existing videos
          setVideos((prevVideos) => [...prevVideos, ...response.data]);
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

  const handleVideoClick = (video: PublicVideoItem) => {
    setSelectedVideo(video);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale =
      selectedLanguage === "ID"
        ? "id-ID"
        : selectedLanguage === "ZH"
        ? "zh-CN"
        : selectedLanguage === "AR"
        ? "ar-SA"
        : "en-US";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

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
              {t.badge}
            </span>
          </div>

          {/* Main Title with Gradient */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t.title}
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.description}
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
                  {t.loadingTitle}
                </p>
                <p className="text-gray-500 text-xs mt-1">{t.loadingDesc}</p>
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
            <p className="text-gray-300 mb-6 text-sm">{t.errorMessage}</p>
            <Button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-purple-500/20"
            >
              {t.retryButton}
            </Button>
          </div>
        </div>
      )}

      {/* Video Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((videoGroup) => {
            const displayVideo = videoGroup.final_url_merge_video;

            if (!displayVideo) return null;

            return (
              <div
                key={videoGroup.id}
                className="group cursor-pointer relative"
                onClick={() => handleVideoClick(videoGroup)}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 group-hover:duration-200" />

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm aspect-video transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:scale-[1.02]">
                  <div className="relative w-full h-full">
                    {/* Video Thumbnail */}
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
                      <source src={displayVideo} type="video/mp4" />
                    </video>

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-6 shadow-2xl shadow-purple-500/50">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>

                    {/* Date Badge - Bottom Left */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-gray-300 font-medium">
                        {formatDate(videoGroup.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
                  {t.loadingButton}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t.loadMoreButton}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* End of Results */}
      {!loading && !error && currentPage >= totalPages && videos.length > 0 && (
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            <p className="text-gray-400 text-sm font-medium">{t.endMessage}</p>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          formatDate={formatDate}
          translations={t}
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
  video: PublicVideoItem;
  onClose: () => void;
  formatDate: (dateString: string) => string;
  translations: {
    modalTitle: string;
    modalCreatedOn: string;
    videoNotAvailable: string;
    videoUnavailableDesc: string;
  };
}

function VideoModal({
  video,
  onClose,
  formatDate,
  translations,
}: VideoModalProps) {
  const displayVideo = video.final_url_merge_video;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content - Centered & Responsive */}
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-30 blur-2xl" />

        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-purple-500/30 shadow-2xl shadow-purple-500/20 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/50 to-slate-950/90 backdrop-blur-xl">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {translations.modalTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-red-500/10 border border-red-500/20 rounded-xl p-2 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative bg-black">
            {displayVideo ? (
              <div className="relative aspect-video">
                {/* Glow Effect around video */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />

                <video
                  controls
                  autoPlay
                  className="relative w-full h-full object-contain"
                >
                  <source src={displayVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-24 h-24 mx-auto mb-6 text-purple-500/30" />
                  <div className="text-2xl font-bold text-gray-300 mb-4">
                    {translations.videoNotAvailable}
                  </div>
                  <p className="text-gray-500">
                    {translations.videoUnavailableDesc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Date */}
          <div className="p-6 border-t border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/50 to-slate-950/90 backdrop-blur-xl">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">
                {translations.modalCreatedOn} {formatDate(video.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
