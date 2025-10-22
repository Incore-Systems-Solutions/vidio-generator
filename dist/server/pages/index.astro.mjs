import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, o as renderScript, r as renderTemplate } from '../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { N as NavbarWithModal } from '../chunks/NavbarWithModal_BRrC7jRw.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { B as Button } from '../chunks/badge_DSQWoPdL.mjs';
import { Sparkles, Loader2, Video, Play, Calendar, X, Pause, VolumeX, Volume2, Bot, MessageCircle, Send } from 'lucide-react';
import { p as publicVideoGalleryApi } from '../chunks/api_yL4KI-YJ.mjs';
import { I as Input } from '../chunks/input_DEe1eFb5.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const translations$1 = {
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
    createdBy: "Dibuat oleh",
    videoDescription: "Deskripsi"
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
    createdBy: "Created by",
    videoDescription: "Description"
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
    createdBy: "创建者",
    videoDescription: "描述"
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
    createdBy: "تم إنشاؤه بواسطة",
    videoDescription: "الوصف"
  }
};
function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(
    null
  );
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");
  const [userEmails, setUserEmails] = useState({});
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && translations$1[savedLanguage]) {
      setSelectedLanguage(savedLanguage);
    }
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("preferredLanguage");
      if (newLanguage && translations$1[newLanguage]) {
        setSelectedLanguage(newLanguage);
      }
    };
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
          setVideos(response.data);
        } else {
          setVideos((prevVideos) => [...prevVideos, ...response.data]);
        }
        setTotalPages(response.last_page);
        const emailMap = {};
        response.data.forEach((video) => {
          if (video.user && video.user.email) {
            emailMap[video.user_id] = video.user.email;
          }
        });
        setUserEmails((prev) => ({ ...prev, ...emailMap }));
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
  const handleVideoClick = (video) => {
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = selectedLanguage === "ID" ? "id-ID" : selectedLanguage === "ZH" ? "zh-CN" : selectedLanguage === "AR" ? "ar-SA" : "en-US";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  const censorEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    if (username.length <= 4) {
      return `${username[0]}${"*".repeat(username.length - 1)}@${domain}`;
    }
    const visibleStart = Math.floor(username.length / 3);
    const visibleEnd = Math.floor(username.length * 2 / 3);
    const censored = username.substring(0, visibleStart) + "*".repeat(visibleEnd - visibleStart) + username.substring(visibleEnd);
    return `${censored}@${domain}`;
  };
  const getVideoDescription = (video) => {
    if (video.prompt && typeof video.prompt === "string") {
      const promptText = video.prompt;
      const descriptionMatch = promptText.match(
        /Deskripsi[:\s]*(.*?)(?=\n\n|\nSub Scene|$)/s
      );
      if (descriptionMatch && descriptionMatch[1]) {
        return descriptionMatch[1].trim();
      }
      return promptText.length > 200 ? promptText.substring(0, 200) + "..." : promptText;
    }
    return "No description available";
  };
  const t = translations$1[selectedLanguage];
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-purple-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-purple-300", children: t.badge })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-5xl md:text-6xl font-bold mb-6 tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient", children: t.title }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed", children: t.description })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-24", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center space-y-4 bg-slate-900/50 border border-purple-500/20 rounded-2xl px-12 py-8 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-purple-400" }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm font-medium", children: t.loadingTitle }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs mt-1", children: t.loadingDesc })
        ] })
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsx("div", { className: "text-center py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Video, { className: "w-8 h-8 text-red-400" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6 text-sm", children: t.errorMessage }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleRefresh,
          className: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-purple-500/20",
          children: t.retryButton
        }
      )
    ] }) }),
    !loading && !error && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: videos.map((videoGroup, index) => {
      const displayVideo = videoGroup.final_url_merge_video;
      if (!displayVideo) return null;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group cursor-pointer relative",
          onClick: () => handleVideoClick(videoGroup),
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 group-hover:duration-200" }),
            /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm aspect-video transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:scale-[1.02]", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full", children: [
              /* @__PURE__ */ jsx(
                "video",
                {
                  className: "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                  muted: true,
                  loop: true,
                  playsInline: true,
                  preload: "metadata",
                  onMouseEnter: (e) => {
                    e.currentTarget.play();
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  },
                  children: /* @__PURE__ */ jsx("source", { src: displayVideo, type: "video/mp4" })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-6 shadow-2xl shadow-purple-500/50", children: /* @__PURE__ */ jsx(Play, { className: "w-8 h-8 text-white fill-current" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 text-purple-400" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-300 font-medium", children: formatDate(videoGroup.created_at) })
              ] })
            ] }) })
          ]
        },
        `${videoGroup.id}-${index}`
      );
    }) }),
    !loading && !error && currentPage < totalPages && /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-20" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleLoadMore,
          size: "lg",
          disabled: loadingMore,
          className: "relative bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-xl shadow-purple-500/30 px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
          children: loadingMore ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }),
            t.loadingButton
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 mr-2" }),
            t.loadMoreButton
          ] })
        }
      )
    ] }) }),
    !loading && !error && currentPage >= totalPages && videos.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-6 py-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm font-medium", children: t.endMessage })
    ] }) }),
    selectedVideo && /* @__PURE__ */ jsx(
      VideoModal,
      {
        video: selectedVideo,
        onClose: () => setSelectedVideo(null),
        formatDate,
        translations: t,
        userEmails,
        censorEmail,
        getVideoDescription
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      ` })
  ] });
}
function VideoModal({
  video,
  onClose,
  formatDate,
  translations: translations2,
  userEmails,
  censorEmail,
  getVideoDescription
}) {
  const displayVideo = video.final_url_merge_video;
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-slate-950/95 backdrop-blur-xl",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl opacity-30 blur-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-black rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 z-20 text-white hover:text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-full p-2 transition-all duration-300 hover:scale-110 bg-black/50 backdrop-blur-sm",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative aspect-video bg-black", children: displayVideo ? /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-2xl" }),
          /* @__PURE__ */ jsxs(
            "video",
            {
              ref: videoRef,
              controls: false,
              autoPlay: true,
              loop: true,
              muted: isMuted,
              playsInline: true,
              className: "relative w-full h-full object-cover",
              onPlay: () => setIsPlaying(true),
              onPause: () => setIsPlaying(false),
              children: [
                /* @__PURE__ */ jsx("source", { src: displayVideo, type: "video/mp4" }),
                "Your browser does not support the video tag."
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 flex items-center space-x-2 pointer-events-auto", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: togglePlayPause,
                  className: "bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110",
                  children: isPlaying ? /* @__PURE__ */ jsx(Pause, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 text-white" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: toggleMute,
                  className: "bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110",
                  children: isMuted ? /* @__PURE__ */ jsx(VolumeX, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsx(Volume2, { className: "w-4 h-4 text-white" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 right-4 space-y-3 max-w-md", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-bold", children: userEmails[video.user_id] ? userEmails[video.user_id].charAt(0).toUpperCase() : "?" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-sm truncate", children: userEmails[video.user_id] ? censorEmail(userEmails[video.user_id]) : "Loading..." }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs", children: formatDate(video.created_at) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx("p", { className: "text-white text-sm leading-relaxed line-clamp-3", children: getVideoDescription(video) }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx("div", { className: "bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 text-purple-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-medium", children: formatDate(video.created_at) })
            ] }) }) })
          ] })
        ] }) : /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx(Video, { className: "w-24 h-24 mx-auto mb-6 text-purple-500/30" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-300 mb-4", children: translations2.videoNotAvailable }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: translations2.videoUnavailableDesc })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      ` })
  ] });
}

const translations = {
  ID: {
    welcomeMessage: "👋 Halo! Anda bisa membuat video realistic tanpa harus mengetik prompt lengkap. Apakah ada yang bisa saya bantu?",
    startConsultation: "Mulai Konsultasi",
    aiAssistant: "AI Assistant",
    readyToHelp: "Siap membantu Anda",
    greetingBold: "Halo!",
    greetingMessage: "Saya adalah AI Assistant yang siap membantu Anda membuat video realistic tanpa harus mengetik prompt lengkap!",
    canIHelp: "Apakah ada yang bisa saya bantu?",
    tellMe: "Ceritakan saja apa yang ingin Anda buat, dan saya akan membantu mewujudkannya.",
    justNow: "Baru saja",
    placeholder: "Ketik pesan Anda di sini...",
    pressEnter: "Tekan Enter untuk mengirim pesan"
  },
  EN: {
    welcomeMessage: "👋 Hello! You can create realistic videos without typing full prompts. Can I help you with something?",
    startConsultation: "Start Consultation",
    aiAssistant: "AI Assistant",
    readyToHelp: "Ready to help you",
    greetingBold: "Hello!",
    greetingMessage: "I am an AI Assistant ready to help you create realistic videos without typing full prompts!",
    canIHelp: "Can I help you with something?",
    tellMe: "Just tell me what you want to create, and I'll help make it happen.",
    justNow: "Just now",
    placeholder: "Type your message here...",
    pressEnter: "Press Enter to send message"
  },
  ZH: {
    welcomeMessage: "👋 你好！您可以在不输入完整提示的情况下创建逼真的视频。我能帮您什么吗？",
    startConsultation: "开始咨询",
    aiAssistant: "AI 助手",
    readyToHelp: "随时为您服务",
    greetingBold: "你好！",
    greetingMessage: "我是 AI 助手，可以帮助您在不输入完整提示的情况下创建逼真的视频！",
    canIHelp: "我能帮您什么吗？",
    tellMe: "只需告诉我您想创建什么，我会帮助实现它。",
    justNow: "刚刚",
    placeholder: "在此输入您的消息...",
    pressEnter: "按 Enter 发送消息"
  },
  AR: {
    welcomeMessage: "👋 مرحبًا! يمكنك إنشاء مقاطع فيديو واقعية دون كتابة مطالبات كاملة. هل يمكنني مساعدتك في شيء؟",
    startConsultation: "بدء الاستشارة",
    aiAssistant: "مساعد الذكاء الاصطناعي",
    readyToHelp: "جاهز لمساعدتك",
    greetingBold: "مرحبًا!",
    greetingMessage: "أنا مساعد الذكاء الاصطناعي جاهز لمساعدتك في إنشاء مقاطع فيديو واقعية دون كتابة مطالبات كاملة!",
    canIHelp: "هل يمكنني مساعدتك في شيء؟",
    tellMe: "فقط أخبرني بما تريد إنشاءه، وسأساعد في تحقيقه.",
    justNow: "الآن",
    placeholder: "اكتب رسالتك هنا...",
    pressEnter: "اضغط Enter لإرسال الرسالة"
  }
};
function AIAssistantBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && translations[savedLanguage]) {
      setSelectedLanguage(savedLanguage);
    }
    const interval = setInterval(() => {
      const currentLanguage = localStorage.getItem("preferredLanguage");
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    }, 500);
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("preferredLanguage");
      if (newLanguage && translations[newLanguage]) {
        setSelectedLanguage(newLanguage);
      }
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      clearInterval(interval);
    };
  }, [selectedLanguage]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2e3);
    return () => clearTimeout(timer);
  }, []);
  const handleSendMessage = () => {
    if (message.trim()) {
      localStorage.setItem("user-initial-message", message.trim());
      window.location.href = "/konsultan-video";
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const t = translations[selectedLanguage];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showWelcome && !isOpen && /* @__PURE__ */ jsx("div", { className: "fixed bottom-24 right-6 z-[9999] animate-in slide-in-from-right duration-500", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-4 max-w-xs", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "relative w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 text-white" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-white text-sm leading-relaxed mb-3", children: t.welcomeMessage }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setIsOpen(true),
              className: "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg",
              children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                t.startConsultation
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => setShowWelcome(false),
            className: "text-gray-400 hover:text-white hover:bg-white/10 p-1 h-auto",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6 z-50", children: !isOpen ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse" }),
      showWelcome && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 z-10", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-red-500 rounded-full blur-sm animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "relative w-3 h-3 bg-red-500 rounded-full border-2 border-white" })
      ] }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => setIsOpen(true),
          size: "lg",
          className: "relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl shadow-purple-500/50 border-0 transition-all duration-300 hover:scale-110",
          children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-7 h-7 text-white" })
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl w-96 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 text-white" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-white font-semibold flex items-center", children: [
                t.aiAssistant,
                /* @__PURE__ */ jsx("div", { className: "ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: t.readyToHelp })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setIsOpen(false),
              className: "text-gray-400 hover:text-white hover:bg-white/10",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-6 space-y-4 h-80 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3 animate-in slide-in-from-left duration-500", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-sm opacity-40" }),
            /* @__PURE__ */ jsx("div", { className: "relative w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4 text-white" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl rounded-tl-none p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-white text-sm leading-relaxed", children: [
              "👋 ",
              /* @__PURE__ */ jsx("strong", { children: t.greetingBold }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              t.greetingMessage,
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              "✨ ",
              /* @__PURE__ */ jsx("strong", { children: t.canIHelp }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              t.tellMe
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: t.justNow })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-white/10 p-4 bg-slate-950/50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-end space-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
              Input,
              {
                value: message,
                onChange: (e) => setMessage(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: t.placeholder,
                className: "bg-slate-900/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 rounded-xl",
                autoFocus: true
              }
            ) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleSendMessage,
                disabled: !message.trim(),
                className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl",
                children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: t.pressEnter })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-from-left {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
        .slide-in-from-left {
          animation-name: slide-in-from-left;
        }
      ` })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Video Generator - Create Amazing Videos</title><meta name="description" content="Create professional videos with our easy-to-use video generator. Follow simple steps to generate, customize, and download your videos.">${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased relative overflow-x-hidden"> <!-- Animated Background Effects --> <div class="fixed inset-0 overflow-hidden pointer-events-none"> <!-- Gradient Orbs --> <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div> <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div> <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div> </div> <!-- Navigation with Integrated Stepper --> <div class="relative z-[100]"> ${renderComponent($$result, "NavbarWithModal", NavbarWithModal, { "client:load": true, "currentStep": 1, "totalSteps": 4, "client:component-hydration": "load", "client:component-path": "@/components/NavbarWithModal.tsx", "client:component-export": "NavbarWithModal" })} </div> <!-- Main Content --> <main class="flex-1 relative"> <!-- Video Gallery Section --> <section class="py-16"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result, "VideoGallery", VideoGallery, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/VideoGallery", "client:component-export": "VideoGallery" })} </div> </section> </main> <!-- Futuristic Footer --> <footer class="relative z-10 border-t border-white/10 py-12 mt-24 bg-slate-950/50 backdrop-blur-sm"> <div class="container mx-auto px-4"> <div class="text-center"> <p class="text-gray-400 text-sm mb-2">
&copy; 2025<span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">InstanVideoApp</span>. All rights reserved.
</p> <p class="text-gray-500 text-xs">
Powered by AI Video Generation Technology
</p> </div> </div> </footer> <!-- AI Assistant Bubble --> ${renderComponent($$result, "AIAssistantBubble", AIAssistantBubble, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/AIAssistantBubble", "client:component-export": "AIAssistantBubble" })} ${renderScript($$result, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
