import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, a as Badge } from '../../chunks/badge_DSQWoPdL.mjs';
import { Loader2, AlertCircle, RefreshCw, ArrowLeft, Sparkles, Film, CheckCircle, Zap, Clock, Download, Video, Play } from 'lucide-react';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const BASE_URL = "https://api.instantvideoapp.com";
const translations = {
  ID: {
    backToHome: "Kembali ke Beranda",
    aiVideoGeneration: "AI Video Generation",
    consultant: "Konsultan AI",
    processing: "Video Anda sedang diproses dengan teknologi AI canggih",
    totalScenes: "Scene Total",
    completedScenes: "Scene Selesai",
    overallProgress: "Overall Progress",
    from: "dari",
    scenesCompleted: "scene selesai",
    refresh: "Refresh",
    progress: "Progress",
    sceneList: "Daftar Scene",
    processing2: "Processing...",
    waiting: "Waiting...",
    failed: "Failed",
    finalVideoMerge: "Final Video Merge",
    mergingAllScenes: "Menggabungkan semua scene menjadi satu video utuh",
    mergeProgress: "Merge Progress",
    playFinalVideo: "Play Final Video",
    download: "Download",
    videoReady: "✨ Video Final Siap!",
    allScenesMerged: "Semua scene telah berhasil digabungkan menjadi satu video HD berkualitas tinggi.",
    createNewVideo: "Buat Video Baru",
    viewHistory: "Lihat Riwayat Video",
    mergingScenes: "Sedang menggabungkan scene...",
    waitingAll: "Menunggu semua scene selesai...",
    takesTime: "Proses ini membutuhkan waktu beberapa menit. Mohon tunggu sebentar.",
    dontWantWait: "💡 Tidak ingin menunggu? Anda dapat melihat hasil video final di halaman riwayat setelah proses selesai.",
    processingVideo: "Memproses Video Anda",
    loadingStatus: "Memuat Status Generate",
    aiPreparing: "AI sedang menyiapkan video Anda. Proses ini membutuhkan waktu beberapa saat...",
    fetchingInfo: "Mengambil informasi status generate video...",
    systemProcessing: "💡 Sistem sedang memproses permintaan Anda",
    autoUpdate: "Halaman akan otomatis diperbarui saat proses selesai",
    failedToLoad: "Gagal Memuat Data",
    tryAgain: "Coba Lagi"
  },
  EN: {
    backToHome: "Back to Home",
    aiVideoGeneration: "AI Video Generation",
    consultant: "AI Consultant",
    processing: "Your video is being processed with advanced AI technology",
    totalScenes: "Total Scenes",
    completedScenes: "Completed Scenes",
    overallProgress: "Overall Progress",
    from: "of",
    scenesCompleted: "scenes completed",
    refresh: "Refresh",
    progress: "Progress",
    sceneList: "Scene List",
    processing2: "Processing...",
    waiting: "Waiting...",
    failed: "Failed",
    finalVideoMerge: "Final Video Merge",
    mergingAllScenes: "Merging all scenes into one complete video",
    mergeProgress: "Merge Progress",
    playFinalVideo: "Play Final Video",
    download: "Download",
    videoReady: "✨ Final Video Ready!",
    allScenesMerged: "All scenes have been successfully merged into one high-quality HD video.",
    createNewVideo: "Create New Video",
    viewHistory: "View Video History",
    mergingScenes: "Merging scenes...",
    waitingAll: "Waiting for all scenes to complete...",
    takesTime: "This process takes a few minutes. Please wait.",
    dontWantWait: "💡 Don't want to wait? You can view the final video result in the history page after the process is complete.",
    processingVideo: "Processing Your Video",
    loadingStatus: "Loading Generate Status",
    aiPreparing: "AI is preparing your video. This process takes a few moments...",
    fetchingInfo: "Fetching video generation status information...",
    systemProcessing: "💡 System is processing your request",
    autoUpdate: "Page will automatically update when process is complete",
    failedToLoad: "Failed to Load Data",
    tryAgain: "Try Again"
  },
  ZH: {
    backToHome: "返回主页",
    aiVideoGeneration: "AI 视频生成",
    consultant: "AI 顾问",
    processing: "您的视频正在使用先进的 AI 技术进行处理",
    totalScenes: "总场景",
    completedScenes: "已完成场景",
    overallProgress: "总体进度",
    from: "的",
    scenesCompleted: "个场景已完成",
    refresh: "刷新",
    progress: "进度",
    sceneList: "场景列表",
    processing2: "处理中...",
    waiting: "等待中...",
    failed: "失败",
    finalVideoMerge: "最终视频合并",
    mergingAllScenes: "将所有场景合并成一个完整视频",
    mergeProgress: "合并进度",
    playFinalVideo: "播放最终视频",
    download: "下载",
    videoReady: "✨ 最终视频已准备好！",
    allScenesMerged: "所有场景已成功合并成一个高质量 HD 视频。",
    createNewVideo: "创建新视频",
    viewHistory: "查看视频历史",
    mergingScenes: "正在合并场景...",
    waitingAll: "等待所有场景完成...",
    takesTime: "此过程需要几分钟。请稍候。",
    dontWantWait: "💡 不想等待？您可以在流程完成后在历史页面查看最终视频结果。",
    processingVideo: "正在处理您的视频",
    loadingStatus: "正在加载生成状态",
    aiPreparing: "AI 正在准备您的视频。此过程需要一些时间...",
    fetchingInfo: "正在获取视频生成状态信息...",
    systemProcessing: "💡 系统正在处理您的请求",
    autoUpdate: "流程完成后页面将自动更新",
    failedToLoad: "无法加载数据",
    tryAgain: "重试"
  },
  AR: {
    backToHome: "العودة إلى الصفحة الرئيسية",
    aiVideoGeneration: "إنشاء فيديو AI",
    consultant: "مستشار AI",
    processing: "يتم معالجة الفيديو الخاص بك باستخدام تقنية AI المتقدمة",
    totalScenes: "إجمالي المشاهد",
    completedScenes: "المشاهد المكتملة",
    overallProgress: "التقدم الإجمالي",
    from: "من",
    scenesCompleted: "مشهد مكتمل",
    refresh: "تحديث",
    progress: "التقدم",
    sceneList: "قائمة المشاهد",
    processing2: "جارٍ المعالجة...",
    waiting: "في الانتظار...",
    failed: "فشل",
    finalVideoMerge: "دمج الفيديو النهائي",
    mergingAllScenes: "دمج جميع المشاهد في فيديو واحد كامل",
    mergeProgress: "تقدم الدمج",
    playFinalVideo: "تشغيل الفيديو النهائي",
    download: "تنزيل",
    videoReady: "✨ الفيديو النهائي جاهز!",
    allScenesMerged: "تم دمج جميع المشاهد بنجاح في فيديو HD واحد عالي الجودة.",
    createNewVideo: "إنشاء فيديو جديد",
    viewHistory: "عرض سجل الفيديو",
    mergingScenes: "جارٍ دمج المشاهد...",
    waitingAll: "في انتظار اكتمال جميع المشاهد...",
    takesTime: "تستغرق هذه العملية بضع دقائق. يرجى الانتظار.",
    dontWantWait: "💡 لا تريد الانتظار؟ يمكنك عرض نتيجة الفيديو النهائية في صفحة السجل بعد اكتمال العملية.",
    processingVideo: "جارٍ معالجة الفيديو الخاص بك",
    loadingStatus: "جارٍ تحميل حالة الإنشاء",
    aiPreparing: "AI يقوم بإعداد الفيديو الخاص بك. تستغرق هذه العملية بعض الوقت...",
    fetchingInfo: "جارٍ جلب معلومات حالة إنشاء الفيديو...",
    systemProcessing: "💡 النظام يعالج طلبك",
    autoUpdate: "ستتم تحديث الصفحة تلقائيًا عند اكتمال العملية",
    failedToLoad: "فشل تحميل البيانات",
    tryAgain: "حاول مرة أخرى"
  }
};
function GenerateVideoPage({ uuid }) {
  const [generateData, setGenerateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isWaitingForGeneration, setIsWaitingForGeneration] = useState(false);
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
    fetchGenerateStatus();
    const interval = setInterval(() => {
      if (generateData?.final_url_merge_video) {
        console.log("Final video is ready, stopping polling");
        clearInterval(interval);
        return;
      }
      fetchGenerateStatus();
    }, 5e3);
    return () => clearInterval(interval);
  }, [uuid, generateData?.final_url_merge_video]);
  const fetchGenerateStatus = async () => {
    try {
      setError(null);
      const savedUuid = localStorage.getItem("generate-uuid") || uuid;
      console.log("Fetching generate status for UUID:", savedUuid);
      const xApiKey = localStorage.getItem("x-api-key");
      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }
      const response = await fetch(
        `${BASE_URL}/api/konsultan-video-merge/${savedUuid}`,
        {
          headers: {
            "x-api-key": xApiKey
          }
        }
      );
      if (response.status === 404) {
        console.log("Video generation not ready yet (404), will retry...");
        setIsWaitingForGeneration(true);
        setLoading(false);
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      if (!apiData.status) {
        throw new Error(apiData.message || "Gagal memuat data");
      }
      console.log("API Response:", apiData);
      setIsWaitingForGeneration(false);
      const normalizeStatus = (status) => {
        const statusMap = {
          progress: "processing",
          done: "completed",
          complete: "completed",
          fail: "failed",
          error: "failed"
        };
        return statusMap[status.toLowerCase()] || status;
      };
      const transformedScenes = apiData.data.list_video.map(
        (video, index) => ({
          scene: index + 1,
          url_video: video.url_video,
          status_video: normalizeStatus(video.status_video),
          task_id: video.task_id,
          prompt: video.prompt
        })
      );
      const completedScenes = transformedScenes.filter(
        (scene) => scene.status_video === "completed"
      ).length;
      let mergeProgress = 0;
      let mergeStatus = "waiting";
      if (completedScenes === transformedScenes.length) {
        if (apiData.data.final_url_merge_video) {
          mergeProgress = 100;
          mergeStatus = "completed";
        } else {
          mergeProgress = 75;
          mergeStatus = "merging";
        }
      } else {
        mergeProgress = Math.round(
          completedScenes / transformedScenes.length * 50
        );
        mergeStatus = "waiting";
      }
      const transformedData = {
        uuid_konsultan: apiData.data.uuid_flag,
        estimated_scene: transformedScenes,
        estimated_merge: {
          progress: mergeProgress,
          status: mergeStatus
        },
        final_url_merge_video: apiData.data.final_url_merge_video,
        total_scenes: transformedScenes.length,
        completed_scenes: completedScenes
      };
      console.log("Transformed data:", transformedData);
      setGenerateData(transformedData);
      setLoading(false);
      setRefreshing(false);
      if (transformedData.final_url_merge_video) {
        clearLocalStorageExceptKeys(["x-api-key", "konsultan-email"]);
      }
    } catch (err) {
      console.error("Error fetching generate status:", err);
      setError(
        err instanceof Error ? err.message : "Gagal memuat status generate video"
      );
      setLoading(false);
      setRefreshing(false);
    }
  };
  const clearLocalStorageExceptKeys = (keysToKeep) => {
    const itemsToKeep = {};
    keysToKeep.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        itemsToKeep[key] = value;
      }
    });
    localStorage.clear();
    Object.keys(itemsToKeep).forEach((key) => {
      localStorage.setItem(key, itemsToKeep[key]);
    });
    console.log("Cleared localStorage except:", keysToKeep);
  };
  const handleCreateNewVideo = () => {
    clearLocalStorageExceptKeys(["x-api-key", "konsultan-email"]);
    window.location.href = "/konsultan-video";
  };
  const handleViewHistory = () => {
    clearLocalStorageExceptKeys(["x-api-key", "konsultan-email"]);
    window.location.href = "/riwayat-video";
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchGenerateStatus();
  };
  const handleDownload = (url) => {
    window.open(url, "_blank");
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-400" });
      case "processing":
        return /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 text-blue-400 animate-spin" });
      case "pending":
        return /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-yellow-400" });
      case "failed":
        return /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-400" });
      default:
        return /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-400" });
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };
  const t = translations[selectedLanguage];
  if (loading || isWaitingForGeneration) {
    return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl w-full px-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" }),
            /* @__PURE__ */ jsx(Loader2, { className: "relative w-16 h-16 animate-spin text-purple-400 mx-auto" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2", children: isWaitingForGeneration ? t.processingVideo : t.loadingStatus }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-6", children: isWaitingForGeneration ? t.aiPreparing : t.fetchingInfo }),
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-blue-300", children: t.systemProcessing }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: t.autoUpdate })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-shimmer-slow" }) })
      ] })
    ] }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30" }),
        /* @__PURE__ */ jsx(AlertCircle, { className: "relative w-16 h-16 text-red-400 mx-auto" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: t.failedToLoad }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: error }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handleRefresh,
          className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            t.tryAgain
          ]
        }
      )
    ] }) });
  }
  if (!generateData) return null;
  const overallProgress = Math.round(
    generateData.completed_scenes / generateData.total_scenes * 100
  );
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "mb-6 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-500/20",
          onClick: () => window.location.href = "/",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            t.backToHome
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-purple-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-purple-300", children: t.aiVideoGeneration })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-4 tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient", children: t.consultant }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-4", children: t.processing }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-4", children: [
            /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 px-4 py-2", children: [
              /* @__PURE__ */ jsx(Film, { className: "w-4 h-4 mr-2" }),
              generateData.total_scenes,
              " ",
              t.totalScenes
            ] }),
            /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-200 px-4 py-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-2" }),
              generateData.completed_scenes,
              " ",
              t.completedScenes
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-md opacity-40 animate-pulse" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 text-white" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent", children: t.overallProgress }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                generateData.completed_scenes,
                " ",
                t.from,
                " ",
                generateData.total_scenes,
                " ",
                t.scenesCompleted
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleRefresh,
              disabled: refreshing,
              className: "text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 border border-blue-500/20",
              children: [
                /* @__PURE__ */ jsx(
                  RefreshCw,
                  {
                    className: `w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`
                  }
                ),
                t.refresh
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative h-6 bg-slate-900 rounded-full overflow-hidden border border-white/5", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-1000 ease-out relative overflow-hidden",
            style: { width: `${overallProgress}%` },
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: t.progress }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-cyan-300", children: [
            overallProgress,
            "%"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center", children: [
        /* @__PURE__ */ jsx(Film, { className: "w-6 h-6 mr-3 text-purple-400" }),
        t.sceneList
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: generateData.estimated_scene.map((scene) => /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden", children: [
            scene.url_video ? /* @__PURE__ */ jsx(
              "video",
              {
                className: "w-full h-full object-cover",
                src: scene.url_video,
                controls: true,
                preload: "metadata"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: scene.status_video === "processing" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-12 h-12 text-blue-400 animate-spin mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-300", children: t.processing2 })
            ] }) : scene.status_video === "pending" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-12 h-12 text-yellow-400 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-300", children: t.waiting })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-red-300", children: t.failed })
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxs(
              Badge,
              {
                className: `${getStatusColor(
                  scene.status_video
                )} border backdrop-blur-sm`,
                children: [
                  getStatusIcon(scene.status_video),
                  /* @__PURE__ */ jsx("span", { className: "ml-1 text-xs font-semibold uppercase", children: scene.status_video })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/50", children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-white", children: [
              "#",
              scene.scene
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 line-clamp-2 mb-3", children: scene.prompt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono", children: scene.task_id }),
              scene.url_video && /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-purple-300 hover:text-purple-200 hover:bg-purple-500/10",
                  onClick: () => handleDownload(scene.url_video),
                  children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ] })
      ] }, scene.scene)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur-md opacity-40 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Video, { className: "w-6 h-6 text-white" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent", children: t.finalVideoMerge }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: t.mergingAllScenes })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Merge Progress" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-green-300", children: [
              generateData.estimated_merge.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000 ease-out relative overflow-hidden",
              style: { width: `${generateData.estimated_merge.progress}%` },
              children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" })
            }
          ) })
        ] }),
        generateData.final_url_merge_video ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-green-500/30", children: /* @__PURE__ */ jsx(
            "video",
            {
              className: "w-full h-full",
              src: generateData.final_url_merge_video,
              controls: true,
              preload: "metadata"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1 group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "relative w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30",
                  onClick: () => window.open(generateData.final_url_merge_video, "_blank"),
                  children: [
                    /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 mr-2" }),
                    t.playFinalVideo
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30",
                  onClick: () => handleDownload(generateData.final_url_merge_video),
                  children: [
                    /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
                    t.download
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-400 mr-3 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-green-300", children: t.videoReady }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-green-400/80", children: t.allScenesMerged })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30",
                  onClick: handleCreateNewVideo,
                  children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                    t.createNewVideo
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "relative w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/30",
                  onClick: handleViewHistory,
                  children: [
                    /* @__PURE__ */ jsx(Film, { className: "w-4 h-4 mr-2" }),
                    t.viewHistory
                  ]
                }
              )
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm text-center", children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-yellow-400 animate-spin mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-yellow-300 mb-1", children: generateData.estimated_merge.status === "merging" ? t.mergingScenes : t.waitingAll }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-400/80 mb-4", children: t.takesTime })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-300 mb-2", children: t.dontWantWait }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "relative w-full bg-slate-800/50 border-purple-500/30 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 hover:border-purple-500/50",
                    onClick: handleCreateNewVideo,
                    children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                      t.createNewVideo
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "relative w-full bg-slate-800/50 border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-500/50",
                    onClick: handleViewHistory,
                    children: [
                      /* @__PURE__ */ jsx(Film, { className: "w-4 h-4 mr-2" }),
                      t.viewHistory
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 3s ease-in-out infinite;
        }
      ` })
  ] });
}

const $$Astro = createAstro();
const $$uuid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$uuid;
  const { uuid } = Astro2.params;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Generate Video - InstanVideo AI</title><meta name="description" content="Proses pembuatan video AI sedang berlangsung. Pantau progress real-time.">${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased relative overflow-x-hidden"> <!-- Animated Background Effects --> <div class="fixed inset-0 overflow-hidden pointer-events-none"> <!-- Gradient Orbs --> <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div> <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div> <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div> </div> <!-- Main Content --> <main class="flex-1 relative z-10"> ${renderComponent($$result, "GenerateVideoPage", GenerateVideoPage, { "uuid": uuid || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/GenerateVideoPage", "client:component-export": "GenerateVideoPage" })} </main> <!-- Futuristic Footer --> <footer class="relative z-10 border-t border-white/10 py-12 mt-24 bg-slate-950/50 backdrop-blur-sm"> <div class="container mx-auto px-4"> <div class="text-center"> <p class="text-gray-400 text-sm mb-2">
&copy; 2024${" "} <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">InstanVideo</span>. All rights reserved.
</p> <p class="text-gray-500 text-xs">
Powered by AI Video Generation Technology
</p> </div> </div> </footer> </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate/[uuid].astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate/[uuid].astro";
const $$url = "/generate/[uuid]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$uuid,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
