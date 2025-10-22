import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, a as Badge } from './badge_DSQWoPdL.mjs';
import { Sparkles, MessageCircle, History, Globe, ChevronDown, X, Menu, User, AlertCircle, RefreshCw, Settings, Coins, List, Merge, Video, CheckCircle, Eye, Download, Check, Calendar, ChevronLeft, ChevronRight, Clock, XCircle } from 'lucide-react';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input } from './input_DEe1eFb5.mjs';
import { a as videoHistoryApi } from './api_yL4KI-YJ.mjs';

const translations = {
  ID: {
    brandName: "Instant!!",
    tagline: "Pembuatan Video AI",
    videoGallery: "Galeri Video",
    consultant: "Konsultan Pembuatan Video",
    videoHistory: "Riwayat Video",
    language: "Bahasa"
  },
  EN: {
    brandName: "Instant!!",
    tagline: "AI Video Generation",
    videoGallery: "Video Gallery",
    consultant: "Video Making Consultant",
    videoHistory: "Video History",
    language: "Language"
  },
  ZH: {
    brandName: "即时!!",
    tagline: "AI 视频生成",
    videoGallery: "视频库",
    consultant: "视频制作顾问",
    videoHistory: "视频历史",
    language: "语言"
  },
  AR: {
    brandName: "فوري!!",
    tagline: "إنشاء فيديو بالذكاء الاصطناعي",
    videoGallery: "معرض الفيديو",
    consultant: "مستشار صناعة الفيديو",
    videoHistory: "سجل الفيديو",
    language: "اللغة"
  }
};
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");
  const languages = [
    { code: "ID", label: "Indonesia", nativeLabel: "Indonesia" },
    { code: "EN", label: "English", nativeLabel: "English" },
    { code: "ZH", label: "Mandarin", nativeLabel: "中文" },
    { code: "AR", label: "Arabic", nativeLabel: "العربية" }
  ];
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && translations[savedLanguage]) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (languageDropdownOpen && !target.closest(".language-dropdown-container")) {
        setLanguageDropdownOpen(false);
      }
    };
    if (languageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageDropdownOpen]);
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem("preferredLanguage", langCode);
    setLanguageDropdownOpen(false);
    window.dispatchEvent(new Event("languageChanged"));
  };
  const t = translations[selectedLanguage];
  return /* @__PURE__ */ jsxs("nav", { className: "sticky top-0 z-[100] w-full border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/90 to-slate-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-80", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative", children: /* @__PURE__ */ jsx("div", { className: "py-3 sm:py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center group", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/logo.svg",
              alt: "Instant VideoApp",
              className: "h-8 sm:h-10 md:h-11 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]", children: t.brandName }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-light tracking-wider", children: t.tagline })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "group relative overflow-hidden bg-gradient-to-r from-slate-500/10 to-gray-500/10 hover:from-slate-500/20 hover:to-gray-500/20 border border-slate-500/20 hover:border-slate-500/40 text-slate-300 hover:text-slate-200 transition-all duration-300 px-4",
            onClick: () => window.location.href = "/",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-500/0 via-slate-500/10 to-slate-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" }),
              /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2 relative z-10" }),
              /* @__PURE__ */ jsx("span", { className: "relative z-10 text-sm font-medium", children: t.videoGallery })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-xl opacity-30 blur-lg group-hover:opacity-50 animate-pulse" }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "group relative overflow-hidden bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border-2 border-purple-400/50 hover:border-purple-400/70 text-white hover:text-white transition-all duration-300 px-5 py-2.5 font-semibold shadow-lg shadow-purple-500/30",
              onClick: () => window.location.href = "/konsultan-video",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" }),
                /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 mr-2 relative z-10" }),
                /* @__PURE__ */ jsx("span", { className: "relative z-10 text-sm", children: t.consultant })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 transition-all duration-300 px-4",
            onClick: () => window.location.href = "/riwayat-video",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" }),
              /* @__PURE__ */ jsx(History, { className: "w-4 h-4 mr-2 relative z-10" }),
              /* @__PURE__ */ jsx("span", { className: "relative z-10 text-sm font-medium", children: t.videoHistory })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative language-dropdown-container", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "group relative overflow-hidden bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-all duration-300 px-4",
              onClick: (e) => {
                e.stopPropagation();
                setLanguageDropdownOpen(!languageDropdownOpen);
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" }),
                /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 mr-2 relative z-10" }),
                /* @__PURE__ */ jsx("span", { className: "relative z-10 text-sm font-medium", children: selectedLanguage }),
                /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 ml-1 relative z-10" })
              ]
            }
          ),
          languageDropdownOpen && /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute right-0 mt-2 w-40 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/20 rounded-lg shadow-xl overflow-hidden z-[110]",
              onClick: (e) => e.stopPropagation(),
              children: languages.map((lang) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: `w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 flex items-center justify-between ${selectedLanguage === lang.code ? "bg-emerald-500/20 text-emerald-200" : "text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-200"}`,
                  onClick: (e) => {
                    e.stopPropagation();
                    handleLanguageChange(lang.code);
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: lang.nativeLabel }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: lang.code })
                  ]
                },
                lang.code
              ))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex md:hidden items-center space-x-2", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-purple-300 hover:text-purple-200 hover:bg-purple-500/10",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
        }
      ) })
    ] }) }) }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-top duration-300", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4 space-y-2", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "w-full justify-start bg-gradient-to-r from-slate-500/10 to-gray-500/10 hover:from-slate-500/20 hover:to-gray-500/20 border border-slate-500/20 text-slate-300 hover:text-slate-200",
          onClick: () => {
            window.location.href = "/";
            setMobileMenuOpen(false);
          },
          children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-3" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: t.videoGallery })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-20 blur-md animate-pulse" }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "relative w-full justify-start bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border-2 border-purple-400/50 text-white hover:text-white font-semibold shadow-lg shadow-purple-500/20",
            onClick: () => {
              window.location.href = "/konsultan-video";
              setMobileMenuOpen(false);
            },
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 mr-3" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: t.consultant })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "w-full justify-start bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/20 text-blue-300 hover:text-blue-200",
          onClick: () => {
            window.location.href = "/riwayat-video";
            setMobileMenuOpen(false);
          },
          children: [
            /* @__PURE__ */ jsx(History, { className: "w-4 h-4 mr-3" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: t.videoHistory })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-white/10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400 mb-2 px-2 flex items-center", children: [
          /* @__PURE__ */ jsx(Globe, { className: "w-3 h-3 mr-1" }),
          t.language
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: languages.map((lang) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedLanguage === lang.code ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-2 border-emerald-400/50 text-emerald-200" : "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/40"}`,
            onClick: (e) => {
              e.stopPropagation();
              handleLanguageChange(lang.code);
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs", children: lang.nativeLabel }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] opacity-70", children: lang.code })
            ]
          },
          lang.code
        )) })
      ] })
    ] }) }),
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

function VideoHistoryModal({ isOpen, onClose }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [coinData, setCoinData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [merging, setMerging] = useState(false);
  const [mergeResult, setMergeResult] = useState(null);
  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail("");
      setOtp("");
      setXApiKey(null);
      setError(null);
      setOtpSent(false);
      setCountdown(0);
      setVideoList([]);
      setCoinData(null);
      setCurrentPage(1);
      setActiveTab("list");
      setSelectedVideos([]);
      setMergeResult(null);
    }
  }, [isOpen]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const handleRequestOTP = async () => {
    if (!email.trim()) {
      setError("Email tidak boleh kosong");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await videoHistoryApi.requestOTP(email);
      setOtpSent(true);
      setStep("otp");
      setCountdown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError("OTP tidak boleh kosong");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const result = await videoHistoryApi.verifyOTP(email, otp);
      setXApiKey(result.data["x-api-key"]);
      setStep("history");
      await loadHistoryData(result.data["x-api-key"]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal verifikasi OTP");
    } finally {
      setLoading(false);
    }
  };
  const loadHistoryData = async (apiKey) => {
    try {
      setLoadingHistory(true);
      const [videoResponse, coinResponse] = await Promise.all([
        videoHistoryApi.getVideoList(apiKey, currentPage, 5),
        videoHistoryApi.getCoinBalance(apiKey)
      ]);
      setVideoList(videoResponse.data);
      setTotalPages(videoResponse.last_page);
      setTotalVideos(videoResponse.total);
      setCoinData(coinResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoadingHistory(false);
    }
  };
  const handlePageChange = async (page) => {
    if (!xApiKey || page < 1 || page > totalPages) return;
    setCurrentPage(page);
    try {
      setLoadingHistory(true);
      const response = await videoHistoryApi.getVideoList(xApiKey, page, 5);
      setVideoList(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat halaman");
    } finally {
      setLoadingHistory(false);
    }
  };
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600" });
      case "progress":
        return /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 text-blue-600 animate-spin" });
      case "failed":
        return /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-600" });
      default:
        return /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-600" });
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "Selesai";
      case "progress":
        return "Diproses";
      case "failed":
        return "Gagal";
      default:
        return "Menunggu";
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleVideoAction = (video) => {
    if (video.status_video === "success" && video.url_video) {
      window.open(video.url_video, "_blank");
    }
  };
  const handleVideoSelect = (videoUrl) => {
    setSelectedVideos((prev) => {
      if (prev.includes(videoUrl)) {
        return prev.filter((url) => url !== videoUrl);
      } else {
        return [...prev, videoUrl];
      }
    });
  };
  const handleMergeVideos = async () => {
    if (selectedVideos.length < 2) {
      setError("Pilih minimal 2 video untuk digabungkan");
      return;
    }
    if (!xApiKey) {
      setError("API key tidak tersedia");
      return;
    }
    try {
      setMerging(true);
      setError(null);
      const response = await fetch(
        `${undefined                                    || "https://api.instantvideoapp.com"}/api/video-ai/merge-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xApiKey
          },
          body: JSON.stringify({
            url: selectedVideos
          })
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.status) {
        setMergeResult(result.data);
        setSelectedVideos([]);
      } else {
        throw new Error(result.message || "Gagal menggabungkan video");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menggabungkan video"
      );
    } finally {
      setMerging(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(History, { className: "w-5 h-5 text-purple-600 dark:text-purple-400" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Riwayat Video" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              step === "email" && "Masukkan email untuk mengakses riwayat",
              step === "otp" && "Verifikasi OTP yang dikirim ke email",
              step === "history" && "Daftar video dan saldo koin Anda"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-120px)]", children: [
        step === "email" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Masukkan Email" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "email",
                  placeholder: "Masukkan email Anda...",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onKeyPress: (e) => e.key === "Enter" && handleRequestOTP()
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxs("div", { className: "flex items-center p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400 mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleRequestOTP,
                disabled: loading || !email.trim(),
                className: "w-full",
                children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Mengirim OTP..."
                ] }) : "Kirim OTP"
              }
            )
          ] })
        ] }) }),
        step === "otp" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Verifikasi OTP" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Kode OTP telah dikirim ke:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Kode OTP" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "text",
                  placeholder: "Masukkan 6 digit OTP...",
                  value: otp,
                  onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
                  onKeyPress: (e) => e.key === "Enter" && handleVerifyOTP(),
                  maxLength: 6
                }
              )
            ] }),
            countdown > 0 && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Kirim ulang OTP dalam ",
              countdown,
              " detik"
            ] }) }),
            error && /* @__PURE__ */ jsxs("div", { className: "flex items-center p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400 mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handleVerifyOTP,
                  disabled: loading || !otp.trim() || otp.length !== 6,
                  className: "w-full",
                  children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                    "Memverifikasi..."
                  ] }) : "Verifikasi OTP"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setStep("email"),
                  className: "w-full",
                  children: "Kembali ke Email"
                }
              )
            ] })
          ] })
        ] }) }),
        step === "history" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          coinData && /* @__PURE__ */ jsxs(Card, { className: "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5 text-purple-600" }),
              /* @__PURE__ */ jsx("span", { children: "Saldo Koin" })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-purple-600", children: coinData.quota.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Total Koin" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600", children: coinData.hari_ini.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Hari Ini" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: coinData.minggu_ini.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Minggu Ini" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("list"),
                className: `flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "list" ? "bg-white dark:bg-gray-700 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsx(List, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "List Video" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("merge"),
                className: `flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "merge" ? "bg-white dark:bg-gray-700 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsx(Merge, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Merge Video" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: activeTab === "list" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Daftar Video (",
                  totalVideos,
                  ")"
                ] })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Merge, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Merge Video (",
                  selectedVideos.length,
                  " dipilih)"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                activeTab === "merge" && selectedVideos.length >= 2 && /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: handleMergeVideos,
                    disabled: merging,
                    className: "bg-green-600 hover:bg-green-700",
                    children: merging ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                      "Menggabungkan..."
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Merge, { className: "w-4 h-4 mr-2" }),
                      "Gabungkan Video"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => loadHistoryData(xApiKey),
                    disabled: loadingHistory,
                    children: [
                      /* @__PURE__ */ jsx(
                        RefreshCw,
                        {
                          className: `w-4 h-4 mr-2 ${loadingHistory ? "animate-spin" : ""}`
                        }
                      ),
                      "Refresh"
                    ]
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              loadingHistory ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center py-8", children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6 animate-spin mr-2" }),
                /* @__PURE__ */ jsx("span", { children: "Memuat data..." })
              ] }) : videoList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
                /* @__PURE__ */ jsx(Video, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Belum ada video yang dibuat" })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                mergeResult && activeTab === "merge" && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold text-green-800 dark:text-green-200", children: "Video Berhasil Digabungkan!" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-green-700 dark:text-green-300 mb-3", children: [
                    mergeResult.list_merge_video?.length || 0,
                    " video telah berhasil digabungkan"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
                    /* @__PURE__ */ jsxs(
                      Button,
                      {
                        size: "sm",
                        onClick: () => window.open(
                          mergeResult.final_url_merge_video,
                          "_blank"
                        ),
                        className: "bg-green-600 hover:bg-green-700",
                        children: [
                          /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-1" }),
                          "Lihat Video"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        onClick: () => window.open(
                          mergeResult.final_url_merge_video,
                          "_blank"
                        ),
                        children: [
                          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-1" }),
                          "Download"
                        ]
                      }
                    )
                  ] })
                ] }),
                error && /* @__PURE__ */ jsx("div", { className: "p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
                ] }) }),
                videoList.map((video) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `p-4 border rounded-lg transition-colors ${activeTab === "merge" && video.status_video === "success" && video.url_video ? "hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"} ${activeTab === "merge" && selectedVideos.includes(video.url_video || "") ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700" : ""}`,
                    onClick: () => {
                      if (activeTab === "merge" && video.status_video === "success" && video.url_video) {
                        handleVideoSelect(video.url_video);
                      }
                    },
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3 flex-1", children: [
                        activeTab === "merge" && video.status_video === "success" && video.url_video && /* @__PURE__ */ jsx("div", { className: "flex items-center pt-1", children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `w-5 h-5 rounded border-2 flex items-center justify-center ${selectedVideos.includes(video.url_video) ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600"}`,
                            children: selectedVideos.includes(
                              video.url_video
                            ) && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-white" })
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            /* @__PURE__ */ jsxs(
                              Badge,
                              {
                                className: getStatusColor(
                                  video.status_video
                                ),
                                children: [
                                  getStatusIcon(video.status_video),
                                  /* @__PURE__ */ jsx("span", { className: "ml-1", children: getStatusText(video.status_video) })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: video.model_ai }),
                            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: video.aspect_ratio })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground mb-2 line-clamp-2", children: video.prompt }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted-foreground", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
                              /* @__PURE__ */ jsx("span", { children: formatDate(video.created_at) })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                              /* @__PURE__ */ jsx(Settings, { className: "w-3 h-3" }),
                              /* @__PURE__ */ jsx("span", { children: video.resolusi_video })
                            ] })
                          ] })
                        ] })
                      ] }),
                      activeTab === "list" && video.status_video === "success" && video.url_video && /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 ml-4", children: [
                        /* @__PURE__ */ jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            onClick: () => handleVideoAction(video),
                            children: [
                              /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-1" }),
                              "Lihat"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            onClick: () => window.open(video.url_video, "_blank"),
                            children: [
                              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-1" }),
                              "Download"
                            ]
                          }
                        )
                      ] })
                    ] })
                  },
                  video.id
                ))
              ] }),
              totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 mt-6", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handlePageChange(currentPage - 1),
                    disabled: currentPage === 1 || loadingHistory,
                    children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1", children: Array.from(
                  { length: Math.min(5, totalPages) },
                  (_, i) => {
                    const page = i + 1;
                    return /* @__PURE__ */ jsx(
                      Button,
                      {
                        variant: currentPage === page ? "default" : "outline",
                        size: "sm",
                        onClick: () => handlePageChange(page),
                        disabled: loadingHistory,
                        children: page
                      },
                      page
                    );
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handlePageChange(currentPage + 1),
                    disabled: currentPage === totalPages || loadingHistory,
                    children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

function NavbarWithModal({
  currentStep = 1,
  totalSteps = 4
}) {
  const [isVideoHistoryOpen, setIsVideoHistoryOpen] = useState(false);
  const handleVideoHistoryClick = () => {
    setIsVideoHistoryOpen(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Navbar,
      {
        currentStep,
        totalSteps,
        onVideoHistoryClick: handleVideoHistoryClick
      }
    ),
    /* @__PURE__ */ jsx(
      VideoHistoryModal,
      {
        isOpen: isVideoHistoryOpen,
        onClose: () => setIsVideoHistoryOpen(false)
      }
    )
  ] });
}

export { NavbarWithModal as N };
