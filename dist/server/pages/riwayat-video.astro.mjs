import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, a as Badge } from '../chunks/badge_DSQWoPdL.mjs';
import 'clsx';
import { ArrowLeft, Film, Mail, AlertCircle, RefreshCw, Sparkles, Settings, Clock, CheckCircle, Loader2, Video, Calendar, Eye, Download } from 'lucide-react';
import { a as videoHistoryApi } from '../chunks/api_BUhEShyy.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const translations = {
  ID: {
    back: "Kembali",
    videoHistory: "Riwayat Video",
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
    noVideosDesc: "Anda belum memiliki riwayat video. Mulai buat video pertama Anda!",
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
    close: "✕ Close"
  },
  EN: {
    back: "Back",
    videoHistory: "Video History",
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
    noVideosDesc: "You don't have any video history yet. Start creating your first video!",
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
    close: "✕ Close"
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
    close: "✕ 关闭"
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
    close: "✕ إغلاق"
  }
};
const getStatusColor = (status) => {
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
function VideoHistory() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalVideos, setTotalVideos] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(
    null
  );
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
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
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
    } catch (err) {
      console.error("Error fetching videos:", err);
      if (err.status === 401) {
        localStorage.removeItem("x-api-key");
        localStorage.removeItem("riwayat-email");
        setError(t.sessionExpired);
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const t = translations[selectedLanguage];
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
          style: { animationDelay: "2s" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse",
          style: { animationDelay: "4s" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 relative z-10", children: [
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
              t.back
            ]
          }
        ),
        step !== "history" && /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-2 border-blue-400/50", children: /* @__PURE__ */ jsx(Film, { className: "w-10 h-10 text-white" }) })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient", children: t.videoHistory }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-lg max-w-2xl mx-auto", children: [
            step === "email" && t.enterEmail,
            step === "otp" && t.otpTitle
          ] })
        ] }),
        step === "history" && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-40 animate-pulse" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-2 border-blue-400/50", children: /* @__PURE__ */ jsx(Film, { className: "w-6 h-6 text-white" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: t.videoHistory }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  totalVideos,
                  " ",
                  t.videoCount
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleLogout,
              className: "text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/20",
              children: t.logout
            }
          )
        ] })
      ] }),
      step === "email" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4 border border-blue-500/30", children: /* @__PURE__ */ jsx(Mail, { className: "w-7 h-7 text-blue-300" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: t.accessPortal }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: t.enterEmail })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: t.emailAddress }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" }),
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 w-5 h-5 text-gray-400" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "email",
                      placeholder: t.emailPlaceholder,
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      onKeyPress: (e) => e.key === "Enter" && handleRequestOTP(),
                      className: "w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    }
                  )
                ] })
              ] })
            ] }),
            error && /* @__PURE__ */ jsxs("div", { className: "flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-red-300", children: error })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative pt-2", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleRequestOTP,
                  disabled: authLoading || !email.trim(),
                  className: "relative w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30",
                  children: authLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }),
                    /* @__PURE__ */ jsx("span", { children: t.sendingOTP })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsx("span", { children: t.accessHistory })
                  ] })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-500 mt-6", children: t.verificationCodeSent })
        ] })
      ] }) }),
      step === "otp" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4 border border-blue-500/30", children: /* @__PURE__ */ jsx(Settings, { className: "w-7 h-7 text-blue-300 animate-spin-slow" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: t.securityVerification }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-1", children: t.otpSentTo }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-blue-300", children: email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-3 text-center", children: t.enter6Digit }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "• • • • • •",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
                    onKeyPress: (e) => e.key === "Enter" && handleVerifyOTP(),
                    maxLength: 6,
                    className: "relative w-full px-4 py-4 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white text-center text-2xl font-mono tracking-widest placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  }
                )
              ] })
            ] }),
            countdown > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-sm", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-cyan-400" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                t.resendIn,
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-cyan-400 font-semibold", children: [
                  countdown,
                  "s"
                ] })
              ] })
            ] }),
            error && /* @__PURE__ */ jsxs("div", { className: "flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-red-300", children: error })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative pt-2", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleVerifyOTP,
                  disabled: authLoading || !otp.trim() || otp.length !== 6,
                  className: "relative w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30",
                  children: authLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }),
                    /* @__PURE__ */ jsx("span", { children: t.verifying })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsx("span", { children: t.verifyEnter })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setStep("email"),
                className: "w-full py-3 bg-slate-900/50 hover:bg-slate-800/50 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2",
                children: [
                  /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: t.backToEmail })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
            t.notReceived,
            " ",
            countdown === 0 && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleRequestOTP,
                className: "text-cyan-400 hover:text-cyan-300 font-medium transition-colors",
                children: t.resend
              }
            )
          ] }) })
        ] })
      ] }) }),
      step === "history" && /* @__PURE__ */ jsxs(Fragment, { children: [
        error && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm flex items-center animate-in fade-in slide-in-from-top duration-300", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mr-3 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-red-300 text-sm", children: error })
        ] }),
        loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-24", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center space-y-4 bg-slate-900/50 border border-blue-500/20 rounded-2xl px-12 py-8 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-blue-400" }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm font-medium", children: t.loadingHistory }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs mt-1", children: t.pleaseWait })
            ] })
          ] })
        ] }) }) : videos.length === 0 ? (
          // Empty State
          /* @__PURE__ */ jsx("div", { className: "text-center py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-12 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Video, { className: "w-10 h-10 text-blue-400" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: t.noVideos }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6", children: t.noVideosDesc }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => window.location.href = "/konsultan-video",
                className: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/20",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                  t.createVideoNow
                ]
              }
            )
          ] }) })
        ) : (
          // Video Grid
          /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8", children: videos.map((videoGroup) => {
            const displayVideo = videoGroup.final_url_merge_video;
            const firstVideo = videoGroup.list_video[0];
            const status = firstVideo?.status_video || "processing";
            const prompt = firstVideo?.prompt || "No description";
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "group cursor-pointer relative",
                onClick: () => setSelectedVideo(videoGroup),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500" }),
                  /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm aspect-video transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/10", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full", children: [
                    displayVideo ? /* @__PURE__ */ jsx(
                      "video",
                      {
                        className: "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                        muted: true,
                        loop: true,
                        playsInline: true,
                        preload: "metadata",
                        children: /* @__PURE__ */ jsx("source", { src: displayVideo, type: "video/mp4" })
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center px-4", children: [
                      /* @__PURE__ */ jsx(Video, { className: "w-12 h-12 mx-auto mb-2 text-gray-500 opacity-30" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: status })
                    ] }) }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
                    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
                        Badge,
                        {
                          className: `text-xs px-2 py-1 ${getStatusColor(
                            status
                          )}`,
                          children: status
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-medium mb-2 line-clamp-2", children: prompt }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-400 text-xs", children: [
                            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 mr-1" }),
                            formatDate(videoGroup.created_at)
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-lg shadow-blue-500/30", children: /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3 text-white" }) })
                        ] })
                      ] })
                    ] })
                  ] }) })
                ]
              },
              videoGroup.id
            );
          }) }) })
        )
      ] })
    ] }),
    selectedVideo && /* @__PURE__ */ jsx(
      VideoDetailModal,
      {
        video: selectedVideo,
        onClose: () => setSelectedVideo(null),
        t
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      ` })
  ] });
}
function VideoDetailModal({ video, onClose, t }) {
  const displayVideo = video.final_url_merge_video;
  const firstVideo = video.list_video[0];
  const status = firstVideo?.status_video || "processing";
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-slate-950/95 backdrop-blur-xl",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/20 shadow-2xl shadow-blue-500/10 w-full h-full max-w-none max-h-none overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/50 to-slate-950/90 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              className: "text-gray-300 hover:text-white hover:bg-blue-500/10 border border-blue-500/20",
              children: t.back
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: t.detailVideo })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: onClose,
            className: "text-gray-300 hover:text-white hover:bg-red-500/10 border border-red-500/20",
            children: t.close
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-80px)]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 bg-slate-900/50 relative", children: displayVideo ? /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-2xl" }),
          /* @__PURE__ */ jsx(
            "video",
            {
              controls: true,
              className: "relative w-full h-full object-contain rounded-xl border border-blue-500/20 shadow-2xl shadow-blue-500/20",
              children: /* @__PURE__ */ jsx("source", { src: displayVideo, type: "video/mp4" })
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx(Video, { className: "w-24 h-24 mx-auto mb-6 text-blue-500/30" }),
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-gray-300 mb-4", children: [
            "Video ",
            status
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: t.videoProcessing })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-96 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-white/10 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-blue-300 font-semibold text-sm", children: t.videoStatus }),
              /* @__PURE__ */ jsx(Badge, { className: getStatusColor(status), children: status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-gray-400 text-xs", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
                /* @__PURE__ */ jsx("span", { children: t.createdOn }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: new Date(video.created_at).toLocaleDateString("id-ID") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: t.uuid }),
                /* @__PURE__ */ jsxs("span", { className: "text-gray-300 font-mono text-xs", children: [
                  video.uuid_flag.substring(0, 8),
                  "..."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-900/50 border border-white/10 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-blue-300 font-semibold mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
              t.sceneList,
              " (",
              video.list_video.length,
              " ",
              t.scenes,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: video.list_video.map((scene, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "bg-slate-800/50 border border-white/5 rounded-lg p-3",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-blue-300 font-semibold", children: [
                      "Scene ",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsx(
                      Badge,
                      {
                        className: `text-xs ${getStatusColor(
                          scene.status_video
                        )}`,
                        children: scene.status_video
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs line-clamp-2", children: scene.prompt })
                ]
              },
              scene.id
            )) })
          ] }),
          displayVideo && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: displayVideo,
                download: true,
                className: "relative block w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-lg shadow-blue-500/30",
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-5 h-5 inline mr-2" }),
                  t.downloadVideo
                ]
              }
            )
          ] })
        ] }) })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$RiwayatVideo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RiwayatVideo;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Riwayat Video - InstanVideo</title><meta name="description" content="Lihat semua riwayat video yang telah Anda buat dengan InstanVideo AI">${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased"> ${renderComponent($$result, "VideoHistory", VideoHistory, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/VideoHistory", "client:component-export": "VideoHistory" })} </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/riwayat-video.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/riwayat-video.astro";
const $$url = "/riwayat-video";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RiwayatVideo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
