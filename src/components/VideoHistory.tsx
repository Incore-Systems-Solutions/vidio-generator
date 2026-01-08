import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Settings,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Download,
  Eye,
  Loader2,
  Video,
  Sparkles,
  Calendar,
  Film,
  X,
  User,
} from "lucide-react";
import {
  videoHistoryApi,
  type VideoHistoryItem,
  type VideoHistoryResponse,
} from "@/lib/api";

// Translations for VideoHistory
const translations = {
  ID: {
    back: "Kembali",
    videoHistory: "Video Saya - Akses dan unduh semua video Anda di sini.",
    accessPortal: "Access Portal",
    enterEmail: "Masukkan email untuk mengakses riwayat",
    otpTitle: "Masukkan kode verifikasi untuk mengakses riwayat video",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessHistory: "Akses Riwayat",
    sendingOTP: "Mengirim OTP...",
    verificationCodeSent: "Kode verifikasi akan dikirim ke email Anda",
    securityVerification: "Security Verification",
    otpSentTo: "Kode OTP telah dikirim ke:",
    enter6Digit: "Masukkan 6 Digit Kode Verifikasi",
    resendIn: "Kirim ulang dalam",
    verifying: "Memverifikasi...",
    verifyEnter: "Verifikasi & Masuk",
    backToEmail: "Kembali ke Email",
    notReceived: "Tidak menerima kode?",
    resend: "Kirim ulang",
    videoCount: "video tersimpan",
    logout: "Keluar",
    loadingHistory: "Memuat riwayat video...",
    pleaseWait: "Mohon tunggu sebentar",
    noVideos: "Belum Ada Video",
    noVideosDesc:
      "Anda belum memiliki riwayat video. Mulai buat video pertama Anda!",
    createVideoNow: "Buat Video Sekarang",
    sessionExpired: "Sesi telah berakhir. Silakan login ulang.",
    failedToLoad: "Gagal memuat riwayat video. Silakan coba lagi.",
    emailRequired: "Email tidak boleh kosong",
    otpRequired: "OTP tidak boleh kosong",
    failedSendOTP: "Gagal mengirim OTP",
    failedVerifyOTP: "Gagal verifikasi OTP",
    videoStatus: "Status",
    createdOn: "Dibuat:",
    uuid: "UUID:",
    sceneList: "Scene List",
    scenes: "scenes",
    downloadVideo: "Download Video",
    videoProcessing: "Video sedang diproses atau tidak tersedia",
    detailVideo: "Detail Video",
    close: "✕ Close",
    selectVideos: "Pilih Video untuk Digabung",
    mergeVideos: "Gabungkan Video",
    merging: "Menggabungkan...",
    cancelSelection: "Batal",
    videosSelected: "video dipilih",
    selectAtLeast2: "Pilih minimal 2 video untuk digabung",
    mergeSuccess: "Video berhasil digabung!",
    mergeFailed: "Gagal menggabungkan video",
    mergedVideo: "Video Hasil Gabungan",
    viewMergedVideo: "Lihat Video",
    downloadMerged: "Download Video Gabungan",
  },
  EN: {
    back: "Back",
    videoHistory: "My Videos - Access and download all your videos here.",
    accessPortal: "Access Portal",
    enterEmail: "Enter email to access history",
    otpTitle: "Enter verification code to access video history",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessHistory: "Access History",
    sendingOTP: "Sending OTP...",
    verificationCodeSent: "Verification code will be sent to your email",
    securityVerification: "Security Verification",
    otpSentTo: "OTP code has been sent to:",
    enter6Digit: "Enter 6 Digit Verification Code",
    resendIn: "Resend in",
    verifying: "Verifying...",
    verifyEnter: "Verify & Enter",
    backToEmail: "Back to Email",
    notReceived: "Didn't receive code?",
    resend: "Resend",
    videoCount: "videos saved",
    logout: "Logout",
    loadingHistory: "Loading video history...",
    pleaseWait: "Please wait a moment",
    noVideos: "No Videos Yet",
    noVideosDesc:
      "You don't have any video history yet. Start creating your first video!",
    createVideoNow: "Create Video Now",
    sessionExpired: "Session has expired. Please login again.",
    failedToLoad: "Failed to load video history. Please try again.",
    emailRequired: "Email cannot be empty",
    otpRequired: "OTP cannot be empty",
    failedSendOTP: "Failed to send OTP",
    failedVerifyOTP: "Failed to verify OTP",
    videoStatus: "Status",
    createdOn: "Created:",
    uuid: "UUID:",
    sceneList: "Scene List",
    scenes: "scenes",
    downloadVideo: "Download Video",
    videoProcessing: "Video is being processed or unavailable",
    detailVideo: "Video Detail",
    close: "✕ Close",
    selectVideos: "Select Videos to Merge",
    mergeVideos: "Merge Videos",
    merging: "Merging...",
    cancelSelection: "Cancel",
    videosSelected: "videos selected",
    selectAtLeast2: "Select at least 2 videos to merge",
    mergeSuccess: "Videos merged successfully!",
    mergeFailed: "Failed to merge videos",
    mergedVideo: "Merged Video Result",
    viewMergedVideo: "View Video",
    downloadMerged: "Download Merged Video",
  },
  ZH: {
    back: "返回",
    videoHistory: "视频历史",
    accessPortal: "访问门户",
    enterEmail: "输入电子邮件以访问历史",
    otpTitle: "输入验证码以访问视频历史",
    emailAddress: "电子邮件地址",
    emailPlaceholder: "your.email@example.com",
    accessHistory: "访问历史",
    sendingOTP: "发送 OTP...",
    verificationCodeSent: "验证码将发送到您的电子邮件",
    securityVerification: "安全验证",
    otpSentTo: "OTP 代码已发送至：",
    enter6Digit: "输入 6 位验证码",
    resendIn: "重新发送",
    verifying: "验证中...",
    verifyEnter: "验证并进入",
    backToEmail: "返回电子邮件",
    notReceived: "没收到代码？",
    resend: "重新发送",
    videoCount: "个视频已保存",
    logout: "登出",
    loadingHistory: "正在加载视频历史...",
    pleaseWait: "请稍候",
    noVideos: "暂无视频",
    noVideosDesc: "您还没有任何视频历史。开始创建您的第一个视频！",
    createVideoNow: "立即创建视频",
    sessionExpired: "会话已过期。请重新登录。",
    failedToLoad: "加载视频历史失败。请重试。",
    emailRequired: "电子邮件不能为空",
    otpRequired: "OTP 不能为空",
    failedSendOTP: "发送 OTP 失败",
    failedVerifyOTP: "验证 OTP 失败",
    videoStatus: "状态",
    createdOn: "创建于：",
    uuid: "UUID：",
    sceneList: "场景列表",
    scenes: "个场景",
    downloadVideo: "下载视频",
    videoProcessing: "视频正在处理或不可用",
    detailVideo: "视频详情",
    close: "✕ 关闭",
    selectVideos: "选择要合并的视频",
    mergeVideos: "合并视频",
    merging: "合并中...",
    cancelSelection: "取消",
    videosSelected: "个视频已选择",
    selectAtLeast2: "至少选择2个视频进行合并",
    mergeSuccess: "视频合并成功！",
    mergeFailed: "合并视频失败",
    mergedVideo: "合并视频结果",
    viewMergedVideo: "查看视频",
    downloadMerged: "下载合并视频",
  },
  AR: {
    back: "رجوع",
    videoHistory: "سجل الفيديو",
    accessPortal: "بوابة الوصول",
    enterEmail: "أدخل البريد الإلكتروني للوصول إلى السجل",
    otpTitle: "أدخل رمز التحقق للوصول إلى سجل الفيديو",
    emailAddress: "عنوان البريد الإلكتروني",
    emailPlaceholder: "your.email@example.com",
    accessHistory: "الوصول إلى السجل",
    sendingOTP: "إرسال OTP...",
    verificationCodeSent: "سيتم إرسال رمز التحقق إلى بريدك الإلكتروني",
    securityVerification: "التحقق الأمني",
    otpSentTo: "تم إرسال رمز OTP إلى:",
    enter6Digit: "أدخل رمز التحقق المكون من 6 أرقام",
    resendIn: "إعادة الإرسال في",
    verifying: "جارٍ التحقق...",
    verifyEnter: "تحقق وادخل",
    backToEmail: "العودة إلى البريد الإلكتروني",
    notReceived: "لم تتلق الرمز؟",
    resend: "إعادة الإرسال",
    videoCount: "فيديو محفوظ",
    logout: "تسجيل الخروج",
    loadingHistory: "جارٍ تحميل سجل الفيديو...",
    pleaseWait: "يرجى الانتظار",
    noVideos: "لا توجد مقاطع فيديو بعد",
    noVideosDesc: "ليس لديك أي سجل فيديو بعد. ابدأ بإنشاء أول فيديو لك!",
    createVideoNow: "إنشاء فيديو الآن",
    sessionExpired: "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.",
    failedToLoad: "فشل تحميل سجل الفيديو. يرجى المحاولة مرة أخرى.",
    emailRequired: "البريد الإلكتروني لا يمكن أن يكون فارغًا",
    otpRequired: "OTP لا يمكن أن يكون فارغًا",
    failedSendOTP: "فشل إرسال OTP",
    failedVerifyOTP: "فشل التحقق من OTP",
    videoStatus: "الحالة",
    createdOn: "تم الإنشاء في:",
    uuid: "UUID:",
    sceneList: "قائمة المشاهد",
    scenes: "مشاهد",
    downloadVideo: "تنزيل الفيديو",
    videoProcessing: "الفيديو قيد المعالجة أو غير متوفر",
    detailVideo: "تفاصيل الفيديو",
    close: "✕ إغلاق",
    selectVideos: "حدد مقاطع الفيديو للدمج",
    mergeVideos: "دمج مقاطع الفيديو",
    merging: "جارٍ الدمج...",
    cancelSelection: "إلغاء",
    videosSelected: "مقاطع فيديو محددة",
    selectAtLeast2: "حدد مقطعي فيديو على الأقل للدمج",
    mergeSuccess: "تم دمج مقاطع الفيديو بنجاح!",
    mergeFailed: "فشل دمج مقاطع الفيديو",
    mergedVideo: "نتيجة دمج الفيديو",
    viewMergedVideo: "عرض الفيديو",
    downloadMerged: "تنزيل الفيديو المدمج",
  },
};

// Helper function for status colors
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "success":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "processing":
    case "pending":
    case "progress":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "failed":
    case "error":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    default:
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
  }
};

export function VideoHistory() {
  // Authentication states
  const [step, setStep] = useState<"email" | "otp" | "history">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // History states
  const [videos, setVideos] = useState<VideoHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalVideos, setTotalVideos] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoHistoryItem | null>(
    null
  );

  // Merge states
  const [isMergeMode, setIsMergeMode] = useState(false);
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedVideo, setMergedVideo] = useState<VideoHistoryItem | null>(null);
  const [showMergeResult, setShowMergeResult] = useState(false);

  // Language state
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

    // Check localStorage periodically (for same-window changes)
    const interval = setInterval(() => {
      const currentLanguage = localStorage.getItem("preferredLanguage");
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    }, 500);

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

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      clearInterval(interval);
    };
  }, [selectedLanguage]);

  // Countdown timer for OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check for existing x-api-key in localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("x-api-key");
    const savedEmail = localStorage.getItem("riwayat-email");

    if (savedApiKey) {
      setXApiKey(savedApiKey);
      if (savedEmail) {
        setEmail(savedEmail);
      }
      setStep("history");
    }
  }, []);

  // Fetch videos when authenticated
  useEffect(() => {
    if (xApiKey && step === "history") {
      fetchVideos();
    }
  }, [xApiKey, step]);

  const handleRequestOTP = async () => {
    if (!email.trim()) {
      setError(t.emailRequired);
      return;
    }

    try {
      setAuthLoading(true);
      setError(null);

      await videoHistoryApi.requestOTP(email);
      setStep("otp");
      setCountdown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedSendOTP);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError(t.otpRequired);
      return;
    }

    try {
      setAuthLoading(true);
      setError(null);

      const result = await videoHistoryApi.verifyOTP(email, otp);
      setXApiKey(result.data["x-api-key"]);
      localStorage.setItem("x-api-key", result.data["x-api-key"]);
      localStorage.setItem("riwayat-email", email);
      setStep("history");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedVerifyOTP);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchVideos = async () => {
    if (!xApiKey) return;

    try {
      setLoading(true);
      setError(null);

      const response = await videoHistoryApi.getVideoList(xApiKey);

      setVideos(response.data);
      setTotalVideos(response.data.length);
    } catch (err: any) {
      console.error("Error fetching videos:", err);

      // ✅ Tangani error 401 Unauthorized
      if (err.status === 401) {
        localStorage.removeItem("x-api-key");
        localStorage.removeItem("riwayat-email");
        setError(t.sessionExpired);

        // Redirect ke halaman login
        window.location.href = "/riwayat-video";
      } else {
        setError(err instanceof Error ? err.message : t.failedToLoad);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("x-api-key");
    localStorage.removeItem("riwayat-email");
    setXApiKey(null);
    setStep("email");
    setEmail("");
    setOtp("");
    setVideos([]);
  };

  const toggleMergeMode = () => {
    setIsMergeMode(!isMergeMode);
    setSelectedVideoIds([]);
    setError(null);
  };

  const toggleVideoSelection = (videoId: number) => {
    setSelectedVideoIds((prev) => {
      if (prev.includes(videoId)) {
        return prev.filter((id) => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  const handleMergeVideos = async () => {
    if (selectedVideoIds.length < 2) {
      setError(t.selectAtLeast2);
      return;
    }

    if (!xApiKey) return;

    try {
      setIsMerging(true);
      setError(null);

      // Get URLs from selected videos
      const selectedVideosData = videos.filter((v) =>
        selectedVideoIds.includes(v.id)
      );
      const videoUrls = selectedVideosData
        .map((v) => v.final_url_merge_video)
        .filter((url): url is string => url !== null);

      if (videoUrls.length < 2) {
        setError("Selected videos do not have valid URLs");
        return;
      }

      // Call merge API
      const result = await videoHistoryApi.mergeVideos(xApiKey, videoUrls);

      // Show result in modal
      setMergedVideo(result.data);
      setShowMergeResult(true);
      setIsMergeMode(false);
      setSelectedVideoIds([]);

      // Refresh video list to include the new merged video
      await fetchVideos();
    } catch (err) {
      console.error("Error merging videos:", err);
      setError(err instanceof Error ? err.message : t.mergeFailed);
    } finally {
      setIsMerging(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <div className="w-full min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Native Mobile Header */}
        <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 safe-area-top">
          <div className="px-4 py-3">
            {step !== "history" ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => (window.location.href = "/index.html")}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
                <h1 className="text-base font-semibold text-white">
                  {step === "email" && "Riwayat Video"}
                  {step === "otp" && "Verifikasi OTP"}
                </h1>
                <div className="w-9"></div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Film className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-white">
                      Riwayat Video
                    </h1>
                    <p className="text-xs text-gray-400">
                      {totalVideos} {t.videoCount}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium rounded-lg transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Step 1: Email Input - Native Style */}
        {step === "email" && (
          <div className="px-4 py-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {t.accessPortal}
              </h2>
              <p className="text-sm text-gray-400">{t.enterEmail}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 px-1">
                  {t.emailAddress}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleRequestOTP()}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              <button
                onClick={handleRequestOTP}
                disabled={authLoading || !email.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{t.sendingOTP}</span>
                  </>
                ) : (
                  "Kirim OTP"
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              {t.verificationCodeSent}
            </p>
          </div>
        )}

        {/* Step 2: OTP Verification - Native Style */}
        {step === "otp" && (
          <div className="px-4 py-6">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-400 mb-1">{t.otpSentTo}</p>
              <p className="font-medium text-white">{email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                  {t.enter6Digit}
                </label>
                <input
                  type="text"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleVerifyOTP()}
                  maxLength={6}
                  className="w-full px-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white text-center text-2xl font-mono tracking-widest placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {countdown > 0 && (
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">
                    {t.resendIn}{" "}
                    <span className="text-blue-400 font-semibold">
                      {countdown}s
                    </span>
                  </span>
                </div>
              )}

              {error && (
                <div className="flex items-start p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleVerifyOTP}
                  disabled={authLoading || !otp.trim() || otp.length !== 6}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{t.verifying}</span>
                    </>
                  ) : (
                    "Verifikasi OTP"
                  )}
                </button>

                <button
                  onClick={() => setStep("email")}
                  className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-gray-300 font-medium rounded-2xl transition-all"
                >
                  {t.backToEmail}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                {t.notReceived}{" "}
                {countdown === 0 && (
                  <button
                    onClick={handleRequestOTP}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    {t.resend}
                  </button>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Video History Grid - Native Style */}
        {step === "history" && (
          <div className="px-4 py-4 pb-20">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center">
                <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="flex flex-col items-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  <div className="text-center">
                    <p className="text-gray-300 text-sm font-medium">
                      {t.loadingHistory}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{t.pleaseWait}</p>
                  </div>
                </div>
              </div>
            ) : videos.length === 0 ? (
              // Empty State
              <div className="text-center py-24">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/50 rounded-2xl flex items-center justify-center">
                  <Video className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t.noVideos}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{t.noVideosDesc}</p>
                <button
                  onClick={() =>
                    (window.location.href = "/konsultan-video.html")
                  }
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.createVideoNow}
                </button>
              </div>
            ) : (
              // Video Grid
              <>
                {/* Merge Toolbar */}
                <div className="mb-4 flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-3">
                  <div className="flex items-center space-x-3">
                    {!isMergeMode ? (
                      <button
                        onClick={toggleMergeMode}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-medium rounded-lg transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{t.selectVideos}</span>
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-purple-300 text-xs font-medium">
                            {selectedVideoIds.length} {t.videosSelected}
                          </span>
                        </div>
                        <button
                          onClick={handleMergeVideos}
                          disabled={selectedVideoIds.length < 2 || isMerging}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isMerging ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>{t.merging}</span>
                            </>
                          ) : (
                            <>
                              <Film className="w-3 h-3" />
                              <span>{t.mergeVideos}</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={toggleMergeMode}
                          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-gray-300 text-xs font-medium rounded-lg transition-all"
                        >
                          {t.cancelSelection}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {videos.map((videoGroup) => {
                    // Get the merged video or first video from list
                    const displayVideo = videoGroup.final_url_merge_video;
                    const firstVideo = videoGroup.list_video[0];
                    const status = firstVideo?.status_video || "processing";
                    const prompt = firstVideo?.prompt || "No description";

                    const isSelected = selectedVideoIds.includes(videoGroup.id);
                    const canSelect = displayVideo !== null;

                    return (
                      <div
                        key={videoGroup.id}
                        className={`group cursor-pointer relative ${
                          isMergeMode && isSelected
                            ? "ring-2 ring-purple-500"
                            : ""
                        }`}
                        onClick={() => {
                          if (isMergeMode && canSelect) {
                            toggleVideoSelection(videoGroup.id);
                          } else if (!isMergeMode) {
                            setSelectedVideo(videoGroup);
                          }
                        }}
                      >
                        {/* Selection Checkbox - Top Left */}
                        {isMergeMode && canSelect && (
                          <div className="absolute top-2 left-2 z-20">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-purple-500 border-purple-500"
                                  : "bg-slate-900/80 border-slate-600"
                              }`}
                            >
                              {isSelected && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                        )}

                        {/* Card */}
                        <div
                          className={`relative overflow-hidden rounded-xl border bg-slate-900 aspect-video transition-all active:scale-95 ${
                            isSelected
                              ? "border-purple-500/50"
                              : "border-slate-800"
                          }`}
                        >
                          <div className="relative w-full h-full">
                            {displayVideo ? (
                              <video
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              >
                                <source src={displayVideo} type="video/mp4" />
                              </video>
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <div className="text-center px-2">
                                  <Video className="w-8 h-8 mx-auto mb-1 text-gray-600" />
                                  <p className="text-[10px] text-gray-500">
                                    {status}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-between p-2">
                              {/* Status Badge */}
                              <div className="flex justify-end">
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${getStatusColor(
                                    status
                                  )}`}
                                >
                                  {status}
                                </span>
                              </div>

                              {/* Bottom Info */}
                              <div>
                                <p className="text-white text-[10px] font-medium mb-1 line-clamp-2">
                                  {prompt}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-gray-400 text-[9px]">
                                    <Calendar className="w-2.5 h-2.5 mr-0.5" />
                                    {formatDate(videoGroup.created_at)}
                                  </div>
                                  <div className="bg-purple-600 rounded-full p-1">
                                    <Eye className="w-2.5 h-2.5 text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <VideoDetailModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          t={t}
        />
      )}

      {/* Merge Result Modal */}
      {showMergeResult && mergedVideo && (
        <MergeResultModal
          video={mergedVideo}
          onClose={() => {
            setShowMergeResult(false);
            setMergedVideo(null);
          }}
          t={t}
        />
      )}

      {/* CSS for safe area */}
      <style>{`
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
      `}</style>
    </div>
  );
}

// Video Detail Modal Component
interface VideoDetailModalProps {
  video: VideoHistoryItem;
  onClose: () => void;
  t: any;
}

function VideoDetailModal({ video, onClose, t }: VideoDetailModalProps) {
  const displayVideo = video.final_url_merge_video;
  const firstVideo = video.list_video[0];
  const status = firstVideo?.status_video || "processing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/20 shadow-2xl shadow-blue-500/10 w-full h-full max-w-none max-h-none overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/50 to-slate-950/90 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-300 hover:text-white hover:bg-blue-500/10 border border-blue-500/20"
            >
              {t.back}
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t.detailVideo}
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-300 hover:text-white hover:bg-red-500/10 border border-red-500/20"
          >
            {t.close}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Player */}
          <div className="flex-1 bg-slate-900/50 relative">
            {displayVideo ? (
              <div className="w-full h-full relative p-8">
                <div className="absolute inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-2xl" />
                <video
                  controls
                  className="relative w-full h-full object-contain rounded-xl border border-blue-500/20 shadow-2xl shadow-blue-500/20"
                >
                  <source src={displayVideo} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-24 h-24 mx-auto mb-6 text-blue-500/30" />
                  <div className="text-2xl font-bold text-gray-300 mb-4">
                    Video {status}
                  </div>
                  <p className="text-gray-500">{t.videoProcessing}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="w-96 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-white/10 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-300 font-semibold text-sm">
                    {t.videoStatus}
                  </h3>
                  <Badge className={getStatusColor(status)}>{status}</Badge>
                </div>
                <div className="text-gray-400 text-xs">
                  <div className="flex justify-between mb-1">
                    <span>{t.createdOn}</span>
                    <span className="text-gray-300">
                      {new Date(video.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.uuid}</span>
                    <span className="text-gray-300 font-mono text-xs">
                      {video.uuid_flag.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Video List */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.sceneList} ({video.list_video.length} {t.scenes})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {video.list_video.map((scene, index) => (
                    <div
                      key={scene.id}
                      className="bg-slate-800/50 border border-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-300 font-semibold">
                          Scene {index + 1}
                        </span>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            scene.status_video
                          )}`}
                        >
                          {scene.status_video}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {scene.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt (First Scene) */}
              {/* <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-3 flex items-center">
                  <Film className="w-4 h-4 mr-2" />
                  First Scene Prompt
                </h3>
                <div className="bg-slate-900/80 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {firstVideo?.prompt || "No prompt available"}
                  </p>
                </div>
              </div> */}

              {/* Actions */}
              {displayVideo && (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30" />
                  <a
                    href={displayVideo}
                    download
                    className="relative block w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-lg shadow-blue-500/30"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    {t.downloadVideo}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Merge Result Modal Component
interface MergeResultModalProps {
  video: VideoHistoryItem;
  onClose: () => void;
  t: any;
}

function MergeResultModal({ video, onClose, t }: MergeResultModalProps) {
  const displayVideo = video.final_url_merge_video;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-green-500/30 shadow-2xl shadow-green-500/20 rounded-3xl overflow-hidden animate-scale-in">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border-b border-green-500/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {t.mergeSuccess}
                </h2>
                <p className="text-gray-400 text-sm">{t.mergedVideo}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-slate-800/50 border border-white/10 rounded-full p-2 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="p-6">
          {displayVideo ? (
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-2xl blur-2xl" />

              <video
                controls
                autoPlay
                className="relative w-full rounded-xl border border-green-500/30 shadow-2xl shadow-green-500/20 bg-black"
              >
                <source src={displayVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-green-500 animate-spin" />
                <p className="text-gray-400">{t.videoProcessing}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 bg-gradient-to-r from-slate-950/50 to-slate-900/50 border-t border-white/10">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">{t.createdOn}</p>
              <p className="text-white font-medium">
                {new Date(video.created_at).toLocaleString("id-ID")}
              </p>
            </div>
            {displayVideo && (
              <div className="flex items-center space-x-3">
                <a
                  href={displayVideo}
                  download
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.downloadMerged}
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 text-white font-medium rounded-xl transition-all duration-300"
                >
                  {t.close}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
