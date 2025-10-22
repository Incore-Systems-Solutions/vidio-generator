import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, a as Badge } from '../chunks/badge_DSQWoPdL.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input } from '../chunks/input_DEe1eFb5.mjs';
import 'clsx';
import { X, Mail, Clock, AlertCircle, CheckCircle, Coins, Wallet, QrCode, CreditCard, Loader2, ArrowLeft, Sparkles, Video, Check, User, Play } from 'lucide-react';
import { o as otpApi, b as videoStoreApi } from '../chunks/api_yL4KI-YJ.mjs';
import { v as videoSetupStorage } from '../chunks/videoSetupStorage_DUxbdP36.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

function OTPModal({ isOpen, onClose, email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const handleRequestOTP = async () => {
    try {
      setIsRequestingOTP(true);
      setError(null);
      const response = await otpApi.requestOTP({ email });
      if (response.status) {
        setOtpSent(true);
        setSuccess("OTP telah dikirim ke email Anda");
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1e3);
      } else {
        setError(response.message || "Gagal mengirim OTP");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim OTP");
    } finally {
      setIsRequestingOTP(false);
    }
  };
  const handleValidateOTP = async () => {
    if (otp.length !== 6) {
      setError("OTP harus 6 digit");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await otpApi.validateOTP({
        email,
        otp: parseInt(otp)
      });
      if (response.status && response.data) {
        setSuccess("OTP berhasil divalidasi!");
        setTimeout(() => {
          onSuccess(response.data.quota, response.data["x-api-key"]);
          onClose();
        }, 1500);
      } else {
        setError(response.message || "OTP tidak valid");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memvalidasi OTP");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setOtp("");
    setError(null);
    setSuccess(null);
    setOtpSent(false);
    setCountdown(0);
    onClose();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-2xl", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Verifikasi OTP" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleClose,
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [
        /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-gray-600 dark:text-gray-400" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: email })
        ] })
      ] }),
      !otpSent && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleRequestOTP,
          disabled: isRequestingOTP,
          className: "w-full",
          children: isRequestingOTP ? "Mengirim..." : "Kirim OTP"
        }
      ) }),
      otpSent && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Masukkan Kode OTP" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              placeholder: "123456",
              value: otp,
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
                setError(null);
              },
              className: "text-center text-lg tracking-widest",
              maxLength: 6
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center", children: countdown > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Kirim ulang dalam ",
            countdown,
            "s"
          ] })
        ] }) : /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleRequestOTP,
            disabled: isRequestingOTP,
            children: isRequestingOTP ? "Mengirim..." : "Kirim Ulang OTP"
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleValidateOTP,
            disabled: isLoading || otp.length !== 6,
            className: "w-full",
            children: isLoading ? "Memvalidasi..." : "Verifikasi OTP"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
      ] }),
      success && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600 dark:text-green-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-green-800 dark:text-green-200", children: success })
      ] })
    ] })
  ] }) });
}

const BASE_URL = "https://api.instantvideoapp.com";
const translations = {
  ID: {
    back: "Kembali",
    paymentPage: "Halaman Pembayaran",
    aiVideoPayment: "Pembayaran Video AI",
    choosePayment: "Pilih metode pembayaran untuk melanjutkan proses pembuatan video AI Anda",
    completeInfo: "Lengkapi informasi pembayaran untuk melanjutkan proses pembuatan video AI Anda",
    fromConsultant: "Video dari Konsultan AI",
    scene: "Scene",
    verifiedAccount: "Akun Terverifikasi",
    videoAI: "Video AI",
    fixedPrice: "Harga tetap per video",
    highQualityHD: "Video HD berkualitas tinggi",
    hdQualityVideo: "Video HD Berkualitas Tinggi",
    hdResolution: "Resolusi 720p atau 1080p sesuai pilihan",
    customCharacterBg: "Karakter & Background Custom",
    customChoice: "Pilihan karakter AI dan background sesuai keinginan",
    directDownload: "Download Langsung",
    downloadAfter: "Unduh video setelah proses selesai",
    usageDetails: "Rincian Penggunaan:",
    videoCount: "Jumlah Video:",
    productionCost: "Biaya produksi:",
    minTransaction: "Minimal Transaksi:",
    remaining: "Sisa",
    convertedToCoins: "dikonversi menjadi koin untuk video berikutnya",
    paymentInfo: "Informasi Pembayaran",
    personalData: "Data Personal",
    email: "Email",
    phoneNumber: "Nomor Telepon",
    verify: "Verifikasi",
    paymentMethod: "Metode Pembayaran",
    useCoins: "Gunakan Koin",
    verifyFirst: "Verifikasi OTP terlebih dahulu",
    verifyEmailFirst: "Verifikasi email terlebih dahulu",
    balance: "Saldo:",
    payWithGopay: "Pembayaran dengan Gopay",
    payWithQRIS: "Pembayaran dengan QRIS",
    payWithCard: "Pembayaran dengan Kartu Kredit dan Internasional",
    optimizingPrompt: "Optimasi Prompt Video",
    aiOptimizing: "AI sedang mengoptimalkan prompt video Anda untuk hasil terbaik",
    estimatedTime: "Estimasi Waktu",
    processEnsures: "💡 Proses ini memastikan video Anda memiliki kualitas optimal",
    processing: "Memproses...",
    generateVideo: "Generate Video",
    payNow: "Bayar Sekarang"
  },
  EN: {
    back: "Back",
    paymentPage: "Payment Page",
    aiVideoPayment: "AI Video Payment",
    choosePayment: "Choose payment method to continue your AI video creation process",
    completeInfo: "Complete payment information to continue your AI video creation process",
    fromConsultant: "Video from AI Consultant",
    scene: "Scene",
    verifiedAccount: "Verified Account",
    videoAI: "AI Video",
    fixedPrice: "Fixed price per video",
    highQualityHD: "High quality HD video",
    hdQualityVideo: "High Quality HD Video",
    hdResolution: "720p or 1080p resolution as per choice",
    customCharacterBg: "Custom Character & Background",
    customChoice: "AI character and background choices as desired",
    directDownload: "Direct Download",
    downloadAfter: "Download video after process completes",
    usageDetails: "Usage Details:",
    videoCount: "Video Count:",
    productionCost: "Production cost:",
    minTransaction: "Minimum Transaction:",
    remaining: "Remaining",
    convertedToCoins: "converted to coins for next video",
    paymentInfo: "Payment Information",
    personalData: "Personal Data",
    email: "Email",
    phoneNumber: "Phone Number",
    verify: "Verify",
    paymentMethod: "Payment Method",
    useCoins: "Use Coins",
    verifyFirst: "Verify OTP first",
    verifyEmailFirst: "Verify email first",
    balance: "Balance:",
    payWithGopay: "Payment with Gopay",
    payWithQRIS: "Payment with QRIS",
    payWithCard: "Payment with Credit Card and International",
    optimizingPrompt: "Video Prompt Optimization",
    aiOptimizing: "AI is optimizing your video prompt for best results",
    estimatedTime: "Estimated Time",
    processEnsures: "💡 This process ensures your video has optimal quality",
    processing: "Processing...",
    generateVideo: "Generate Video",
    payNow: "Pay Now"
  },
  ZH: {
    back: "返回",
    paymentPage: "付款页面",
    aiVideoPayment: "AI 视频付款",
    choosePayment: "选择付款方式继续您的 AI 视频制作过程",
    completeInfo: "完成付款信息以继续您的 AI 视频制作过程",
    fromConsultant: "来自 AI 顾问的视频",
    scene: "场景",
    verifiedAccount: "已验证账户",
    videoAI: "AI 视频",
    fixedPrice: "每个视频固定价格",
    highQualityHD: "高质量 HD 视频",
    hdQualityVideo: "高质量 HD 视频",
    hdResolution: "720p 或 1080p 分辨率可选",
    customCharacterBg: "自定义角色和背景",
    customChoice: "根据需要选择 AI 角色和背景",
    directDownload: "直接下载",
    downloadAfter: "过程完成后下载视频",
    usageDetails: "使用详情：",
    videoCount: "视频数量：",
    productionCost: "制作费用：",
    minTransaction: "最低交易：",
    remaining: "剩余",
    convertedToCoins: "转换为硬币用于下一个视频",
    paymentInfo: "付款信息",
    personalData: "个人数据",
    email: "电子邮件",
    phoneNumber: "电话号码",
    verify: "验证",
    paymentMethod: "付款方式",
    useCoins: "使用硬币",
    verifyFirst: "请先验证 OTP",
    verifyEmailFirst: "请先验证电子邮件",
    balance: "余额：",
    payWithGopay: "使用 Gopay 付款",
    payWithQRIS: "使用 QRIS 付款",
    payWithCard: "使用信用卡和国际付款",
    optimizingPrompt: "视频提示优化",
    aiOptimizing: "AI 正在优化您的视频提示以获得最佳效果",
    estimatedTime: "预计时间",
    processEnsures: "💡 此过程确保您的视频具有最佳质量",
    processing: "处理中...",
    generateVideo: "生成视频",
    payNow: "立即付款"
  },
  AR: {
    back: "رجوع",
    paymentPage: "صفحة الدفع",
    aiVideoPayment: "دفع فيديو AI",
    choosePayment: "اختر طريقة الدفع لمتابعة عملية إنشاء فيديو AI الخاص بك",
    completeInfo: "أكمل معلومات الدفع لمتابعة عملية إنشاء فيديو AI الخاص بك",
    fromConsultant: "فيديو من مستشار AI",
    scene: "مشهد",
    verifiedAccount: "حساب موثق",
    videoAI: "فيديو AI",
    fixedPrice: "سعر ثابت لكل فيديو",
    highQualityHD: "فيديو عالي الجودة HD",
    hdQualityVideo: "فيديو عالي الجودة HD",
    hdResolution: "دقة 720p أو 1080p حسب الاختيار",
    customCharacterBg: "شخصية وخلفية مخصصة",
    customChoice: "خيارات شخصية AI والخلفية حسب الرغبة",
    directDownload: "تنزيل مباشر",
    downloadAfter: "تنزيل الفيديو بعد اكتمال العملية",
    usageDetails: "تفاصيل الاستخدام:",
    videoCount: "عدد الفيديو:",
    productionCost: "تكلفة الإنتاج:",
    minTransaction: "الحد الأدنى للمعاملة:",
    remaining: "المتبقي",
    convertedToCoins: "تحويل إلى عملات معدنية للفيديو التالي",
    paymentInfo: "معلومات الدفع",
    personalData: "البيانات الشخصية",
    email: "البريد الإلكتروني",
    phoneNumber: "رقم الهاتف",
    verify: "تحقق",
    paymentMethod: "طريقة الدفع",
    useCoins: "استخدم العملات",
    verifyFirst: "تحقق من OTP أولاً",
    verifyEmailFirst: "تحقق من البريد الإلكتروني أولاً",
    balance: "الرصيد:",
    payWithGopay: "الدفع بواسطة Gopay",
    payWithQRIS: "الدفع بواسطة QRIS",
    payWithCard: "الدفع بالبطاقة الائتمانية والدولية",
    optimizingPrompt: "تحسين مطالبة الفيديو",
    aiOptimizing: "يقوم AI بتحسين مطالبة الفيديو الخاصة بك للحصول على أفضل النتائج",
    estimatedTime: "الوقت المقدر",
    processEnsures: "💡 تضمن هذه العملية أن يكون الفيديو الخاص بك ذا جودة مثالية",
    processing: "جارٍ المعالجة...",
    generateVideo: "إنشاء فيديو",
    payNow: "ادفع الآن"
  }
};
function PaymentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userQuota, setUserQuota] = useState(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isKonsultanMode, setIsKonsultanMode] = useState(false);
  const [konsultanData, setKonsultanData] = useState(null);
  const [hasExistingApiKey, setHasExistingApiKey] = useState(false);
  const [existingApiKey, setExistingApiKey] = useState(null);
  const [isOptimizingPrompt, setIsOptimizingPrompt] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(null);
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
    const savedApiKey = localStorage.getItem("x-api-key");
    const savedEmail = localStorage.getItem("konsultan-email") || localStorage.getItem("riwayat-email");
    if (savedApiKey) {
      console.log("Found existing x-api-key in localStorage");
      setHasExistingApiKey(true);
      setExistingApiKey(savedApiKey);
      setIsOTPVerified(true);
      setIsPersonalInfoComplete(true);
      if (savedEmail) {
        setEmail(savedEmail);
      }
      fetchUserQuota(savedApiKey);
    }
    const konsultanDataStr = localStorage.getItem("konsultan-video-data");
    if (konsultanDataStr) {
      try {
        const parsedData = JSON.parse(konsultanDataStr);
        console.log("Loading konsultan data:", parsedData);
        setIsKonsultanMode(true);
        setKonsultanData(parsedData);
        if (parsedData.email) {
          setEmail(parsedData.email);
        }
      } catch (err) {
        console.error("Error parsing konsultan data:", err);
      }
    } else {
      videoSetupStorage.debug();
      const existingData = videoSetupStorage.load();
      console.log("Loading existing data from localStorage:", existingData);
      if (existingData) {
        if (existingData.email) {
          setEmail(existingData.email);
        }
        if (existingData.no_wa) {
          setPhoneNumber(existingData.no_wa);
        }
      }
    }
  }, []);
  const fetchUserQuota = async (apiKey) => {
    try {
      const response = await fetch(
        "https://api.instantvideoapp.com/api/video-ai/check-koin",
        {
          headers: {
            "x-api-key": apiKey
          }
        }
      );
      const result = await response.json();
      if (result.status && result.data) {
        setUserQuota(result.data.quota);
        console.log("User quota fetched:", result.data.quota);
      }
    } catch (err) {
      console.error("Error fetching user quota:", err);
    }
  };
  useEffect(() => {
    handlePersonalInfoChange();
  }, [email, phoneNumber]);
  const handlePersonalInfoChange = () => {
    const isComplete = email.trim() !== "" && phoneNumber.trim() !== "";
    console.log("Personal info validation:", {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      isComplete
    });
    setIsPersonalInfoComplete(isComplete);
  };
  const handleOTPSuccess = async (quota, newApiKey) => {
    setUserQuota(quota);
    setIsOTPVerified(true);
    setIsOTPModalOpen(false);
    const pricePerVideo2 = 1e4;
    const totalPrice2 = isKonsultanMode && konsultanData?.list ? pricePerVideo2 * konsultanData.list.length : pricePerVideo2;
    if (!isKonsultanMode) {
      videoSetupStorage.updatePaymentInfo({
        email,
        no_wa: phoneNumber,
        metode_pengiriman: "kuota",
        metode: null,
        jumlah: totalPrice2
      });
    }
  };
  const handleVerificationClick = () => {
    if (email.trim() !== "") {
      setIsOTPModalOpen(true);
    }
  };
  const handlePaymentMethodSelect = async (methodId) => {
    setSelectedPaymentMethod(methodId);
    const pricePerVideo2 = 1e4;
    const totalPrice2 = isKonsultanMode && konsultanData?.list ? pricePerVideo2 * konsultanData.list.length : pricePerVideo2;
    if (!isKonsultanMode) {
      if (methodId === "coins") {
        if (isOTPVerified) {
          videoSetupStorage.updatePaymentInfo({
            email,
            no_wa: phoneNumber,
            metode_pengiriman: "kuota",
            metode: null,
            jumlah: totalPrice2
          });
        }
      } else {
        let metode = null;
        if (methodId === "gopay") {
          metode = "gopay";
        } else if (methodId === "qris") {
          metode = "other_qris";
        } else if (methodId === "credit-card") {
          metode = "kreem";
        }
        videoSetupStorage.updatePaymentInfo({
          email,
          no_wa: phoneNumber,
          metode_pengiriman: "pembayaran",
          metode,
          jumlah: totalPrice2
        });
      }
    }
  };
  const checkPromptOptimization = async (uuidChat, apiKey) => {
    try {
      console.log("Checking prompt optimization for uuid_chat:", uuidChat);
      const response = await fetch(
        `${BASE_URL}/api/chat-ai/check-prompt/${uuidChat}`,
        {
          headers: {
            "x-api-key": apiKey
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message || "Gagal mengecek optimasi prompt");
      }
      console.log("Prompt optimization response:", result);
      setOptimizationProgress(result.data);
      if (result.data.prompt_video !== null) {
        console.log("Prompt optimization complete!");
        return true;
      } else {
        console.log("Prompt still optimizing...");
        return false;
      }
    } catch (err) {
      console.error("Error checking prompt optimization:", err);
      throw err;
    }
  };
  const waitForPromptOptimization = async (uuidChat, apiKey) => {
    setIsOptimizingPrompt(true);
    while (true) {
      const isComplete = await checkPromptOptimization(uuidChat, apiKey);
      if (isComplete) {
        setIsOptimizingPrompt(false);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 5e3));
    }
  };
  const handleCoinsPayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const pricePerVideo2 = 1e4;
      const totalPrice2 = isKonsultanMode && konsultanData?.list ? pricePerVideo2 * konsultanData.list.length : pricePerVideo2;
      if (isKonsultanMode && konsultanData) {
        const payload = {
          uuid_chat: konsultanData.uuid_chat || null,
          metode_pengiriman: "kuota",
          metode: null,
          email,
          affiliate_by: konsultanData.affiliate_by || ""
        };
        console.log(
          "Sending konsultan payload with coins to store-multiple:",
          payload
        );
        const result = await videoStoreApi.storeMultipleVideoData(payload);
        if (result.status) {
          console.log(
            "Konsultan video data stored successfully with coins:",
            result.message
          );
          let apiKeyToUse = existingApiKey;
          if (result.data && result.data["x-api-key"]) {
            localStorage.setItem("x-api-key", result.data["x-api-key"]);
            apiKeyToUse = result.data["x-api-key"];
            console.log(
              "Saved x-api-key from store-multiple:",
              result.data["x-api-key"]
            );
          }
          const generateUuid = result.data?.uuid_konsultan || "default";
          localStorage.setItem("generate-uuid", generateUuid);
          console.log("Saved generate-uuid:", generateUuid);
          const uuidChat = konsultanData.uuid_chat;
          if (!apiKeyToUse) {
            throw new Error("API key tidak tersedia");
          }
          localStorage.setItem("konsultan-chat-uuid", uuidChat);
          console.log("Saved konsultan-chat-uuid:", uuidChat);
          console.log("Starting prompt optimization check...");
          await waitForPromptOptimization(uuidChat, apiKeyToUse);
          console.log("Prompt optimization complete, redirecting...");
          localStorage.removeItem("konsultan-video-data");
          window.location.href = `/generate/${generateUuid}`;
        } else {
          throw new Error(result.message || "Gagal menyimpan data video");
        }
      }
    } catch (err) {
      console.error("Error processing coins payment:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pembayaran dengan koin"
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const handleContinuePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      if (isKonsultanMode && konsultanData) {
        let metode = null;
        if (selectedPaymentMethod === "gopay") {
          metode = "gopay";
        } else if (selectedPaymentMethod === "qris") {
          metode = "other_qris";
        } else if (selectedPaymentMethod === "credit-card") {
          metode = "kreem";
        }
        const payload = {
          uuid_chat: konsultanData.uuid_chat || null,
          metode_pengiriman: "pembayaran",
          metode,
          // Dynamic price based on list count
          email,
          no_wa: phoneNumber || null,
          affiliate_by: konsultanData.affiliate_by || ""
        };
        console.log("Sending konsultan payload to store-multiple:", payload);
        const result = await videoStoreApi.storeMultipleVideoData(payload);
        if (result.status) {
          console.log(
            "Konsultan video data stored successfully:",
            result.message
          );
          if (result.data && result.data["x-api-key"]) {
            localStorage.setItem("x-api-key", result.data["x-api-key"]);
            console.log(
              "Saved x-api-key from store-multiple:",
              result.data["x-api-key"]
            );
          }
          if (result.data && result.data.uuid_konsultan) {
            localStorage.setItem("generate-uuid", result.data.uuid_konsultan);
            console.log("Saved generate-uuid:", result.data.uuid_konsultan);
          }
          if (result.data && result.data.invoice) {
            window.location.href = `/transaksi/${result.data.invoice}`;
          } else if (result.data && result.data.is_payment === false) {
            const generateUuid = result.data.uuid_konsultan || "default";
            window.location.href = `/generate/${generateUuid}`;
          } else {
            alert("Pembayaran berhasil! Video Anda sedang diproses.");
          }
        } else {
          throw new Error(result.message || "Gagal menyimpan data video");
        }
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pembayaran"
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const pricePerVideo = 1e4;
  const getVideoCount = () => {
    try {
      const collectionDataStr = localStorage.getItem("collection_data");
      if (collectionDataStr) {
        const collectionData = JSON.parse(collectionDataStr);
        return collectionData?.data?.count_scene_video || 1;
      }
    } catch (err) {
      console.error("Error parsing collection_data:", err);
    }
    return 1;
  };
  const videoCount = getVideoCount();
  const totalPrice = pricePerVideo * videoCount;
  const productionCost = 7500 * videoCount;
  const bonusCoins = 2500 * videoCount;
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };
  const t = translations[selectedLanguage];
  const paymentMethods = [
    {
      id: "coins",
      name: t.useCoins,
      description: isOTPVerified ? `${t.balance} ${userQuota?.toLocaleString()} Koin` : t.verifyFirst,
      icon: /* @__PURE__ */ jsx(Coins, { className: "w-6 h-6" }),
      balance: userQuota ? `${userQuota.toLocaleString()} Koin` : "0 Koin",
      disabled: !isOTPVerified || userQuota !== null && userQuota < productionCost
    },
    {
      id: "gopay",
      name: "Gopay",
      description: isOTPVerified ? t.payWithGopay : t.verifyEmailFirst,
      icon: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6" }),
      disabled: !isOTPVerified
    },
    {
      id: "qris",
      name: "QRIS",
      description: isOTPVerified ? t.payWithQRIS : t.verifyEmailFirst,
      icon: /* @__PURE__ */ jsx(QrCode, { className: "w-6 h-6" }),
      disabled: !isOTPVerified
    },
    {
      id: "credit-card",
      name: t.payWithCard,
      description: isOTPVerified ? t.payWithCard : t.verifyEmailFirst,
      icon: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6" }),
      disabled: !isOTPVerified
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased relative overflow-x-hidden", children: [
    isOptimizingPrompt && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl w-full px-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" }),
            /* @__PURE__ */ jsx(Loader2, { className: "relative w-16 h-16 animate-spin text-purple-400 mx-auto" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2", children: t.optimizingPrompt }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-6", children: t.aiOptimizing }),
          optimizationProgress && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-300 mb-2", children: optimizationProgress.minutes }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: t.estimatedTime })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-gray-500", children: /* @__PURE__ */ jsx("p", { children: t.processEnsures }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-shimmer-slow" }) })
      ] })
    ] }) }) }),
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4 text-purple-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-purple-300", children: t.paymentPage })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-6 tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient", children: t.aiVideoPayment }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-4", children: hasExistingApiKey ? t.choosePayment : t.completeInfo }),
            isKonsultanMode && /* @__PURE__ */ jsxs("div", { className: "mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-purple-400 mr-3" }),
              /* @__PURE__ */ jsxs("span", { className: "text-base font-semibold text-purple-200", children: [
                t.fromConsultant,
                " (",
                konsultanData?.list?.length || 0,
                " ",
                t.scene,
                ")"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-600 via-blue-600 to-purple-500 text-white px-8 py-10 flex flex-col items-center w-full relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center mb-4 w-full justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mr-6 backdrop-blur-sm border border-white/20", children: /* @__PURE__ */ jsx(Video, { className: "w-8 h-8 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: t.videoAI }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/90 text-lg", children: isKonsultanMode ? `${videoCount} Video x Rp ${formatCurrency(
                    productionCost / videoCount
                  )}` : t.fixedPrice })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-5xl font-extrabold mb-2 w-full text-center", children: [
                "Rp ",
                formatCurrency(productionCost)
              ] }),
              /* @__PURE__ */ jsx("p", { className: "relative z-10 text-white/90 text-lg w-full text-center", children: isKonsultanMode ? `${videoCount} ${t.highQualityHD}` : `1 ${t.highQualityHD}` })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 border border-green-500/30", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-400" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: t.hdQualityVideo }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: t.hdResolution })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 border border-green-500/30", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-400" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: t.customCharacterBg }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: t.customChoice })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 border border-green-500/30", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-400" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: t.directDownload }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: t.downloadAfter })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-5 rounded-2xl border border-blue-500/30 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-blue-200 mb-2", children: "Rincian Penggunaan:" }),
                  /* @__PURE__ */ jsx("p", { className: "text-blue-300", children: isKonsultanMode ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    "• Jumlah Video: ",
                    /* @__PURE__ */ jsx("strong", { children: videoCount }),
                    totalPrice > 1e4 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("br", {}),
                      "• Biaya produksi: ",
                      /* @__PURE__ */ jsx("strong", { children: "7.500" }),
                      " x",
                      " ",
                      /* @__PURE__ */ jsx("strong", { children: videoCount }),
                      " video =",
                      " ",
                      /* @__PURE__ */ jsx("strong", { children: formatCurrency(productionCost) })
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("br", {}),
                      "• Minimal Transaksi:",
                      " ",
                      /* @__PURE__ */ jsx("strong", { children: formatCurrency(totalPrice) }),
                      /* @__PURE__ */ jsx("br", {}),
                      "• Biaya produksi video:",
                      " ",
                      /* @__PURE__ */ jsx("strong", { children: formatCurrency(productionCost) }),
                      /* @__PURE__ */ jsx("br", {}),
                      "• Sisa",
                      " ",
                      /* @__PURE__ */ jsx("strong", { children: formatCurrency(bonusCoins) }),
                      " ",
                      "dikonversi menjadi koin untuk video berikutnya"
                    ] })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    "• Minimal Transaksi: ",
                    /* @__PURE__ */ jsx("strong", { children: "10.000" }),
                    /* @__PURE__ */ jsx("br", {}),
                    "• Biaya produksi video: ",
                    /* @__PURE__ */ jsx("strong", { children: "7.500" }),
                    /* @__PURE__ */ jsx("br", {}),
                    "• Sisa ",
                    /* @__PURE__ */ jsx("strong", { children: "2.500" }),
                    " dikonversi menjadi koin untuk video berikutnya"
                  ] }) })
                ] })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 sm:p-8 space-y-6 border-b border-white/10", children: /* @__PURE__ */ jsxs("h3", { className: "flex items-center text-xl font-bold text-white", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-500/30", children: /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-purple-400" }) }),
              /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent", children: t.paymentInfo })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8 space-y-6", children: [
              !hasExistingApiKey && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-white mb-4 flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-2 border border-purple-500/30", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-purple-400" }) }),
                  t.personalData
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: [
                      t.email,
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "email",
                        placeholder: "Masukkan email anda...",
                        value: email,
                        onChange: (e) => {
                          setEmail(e.target.value);
                          handlePersonalInfoChange();
                        },
                        className: "w-full bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: [
                      t.phoneNumber,
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "tel",
                          placeholder: "Masukkan nomor anda...",
                          value: phoneNumber,
                          onChange: (e) => {
                            setPhoneNumber(e.target.value);
                            handlePersonalInfoChange();
                          },
                          className: "flex-1 bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Button,
                        {
                          variant: "default",
                          disabled: email.trim() === "",
                          onClick: handleVerificationClick,
                          className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0",
                          children: t.verify
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-white mb-4 flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-2 border border-purple-500/30", children: /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-purple-400" }) }),
                  t.paymentMethod
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: paymentMethods.map((method) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `relative group p-4 rounded-2xl cursor-pointer transition-all ${method.disabled ? "bg-slate-900/30 border border-white/5 cursor-not-allowed opacity-50" : selectedPaymentMethod === method.id ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20" : "bg-slate-800/50 border border-white/10 hover:border-purple-500/30 hover:bg-slate-800/70"}`,
                    onClick: () => !method.disabled && handlePaymentMethodSelect(method.id),
                    children: [
                      selectedPaymentMethod === method.id && !method.disabled && /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-lg -z-10" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `w-10 h-10 rounded-xl flex items-center justify-center mr-3 border ${method.disabled ? "bg-slate-900/30 border-white/5" : selectedPaymentMethod === method.id ? "bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-purple-500/50" : "bg-slate-800/50 border-white/10"}`,
                              children: /* @__PURE__ */ jsx(
                                "div",
                                {
                                  className: method.disabled ? "text-gray-600" : selectedPaymentMethod === method.id ? "text-purple-300" : "text-gray-400",
                                  children: method.icon
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx(
                              "h4",
                              {
                                className: `font-semibold ${method.disabled ? "text-gray-600" : "text-white"}`,
                                children: method.name
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "p",
                              {
                                className: `text-xs ${method.disabled ? "text-gray-700" : "text-gray-400"}`,
                                children: method.description
                              }
                            ),
                            method.balance && !method.disabled && /* @__PURE__ */ jsx(
                              Badge,
                              {
                                variant: "secondary",
                                className: "mt-1 text-xs bg-blue-500/20 text-blue-300 border-blue-500/30",
                                children: method.balance
                              }
                            )
                          ] })
                        ] }),
                        selectedPaymentMethod === method.id && !method.disabled && /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30", children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-white" }) })
                      ] })
                    ]
                  },
                  method.id
                )) })
              ] })
            ] })
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-top duration-300", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 blur-lg" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm flex items-center", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mr-3 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-red-300 font-medium", children: error })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "lg",
            className: "px-8 bg-slate-800/50 hover:bg-slate-800/70 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white",
            onClick: () => window.location.href = "/",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: t.back })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute -inset-0.5 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300 ${selectedPaymentMethod === "coins" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-purple-500 to-blue-500"}`
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "lg",
              className: `relative px-10 py-6 text-base font-semibold shadow-lg ${selectedPaymentMethod === "coins" ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/30" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-500/30"}`,
              disabled: !selectedPaymentMethod || selectedPaymentMethod === "coins" && (!isOTPVerified || userQuota !== null && userQuota < productionCost) || selectedPaymentMethod !== "coins" && !isOTPVerified || isProcessing,
              onClick: () => {
                console.log("Payment button clicked with state:", {
                  selectedPaymentMethod,
                  isPersonalInfoComplete,
                  isOTPVerified,
                  userQuota,
                  email,
                  phoneNumber,
                  videoData: videoSetupStorage.load()
                });
                if (selectedPaymentMethod === "coins") {
                  handleCoinsPayment();
                } else {
                  handleContinuePayment();
                }
              },
              children: isProcessing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" }),
                /* @__PURE__ */ jsx("span", { children: t.processing })
              ] }) : selectedPaymentMethod === "coins" ? /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(Play, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: t.generateVideo })
              ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: t.payNow })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        OTPModal,
        {
          isOpen: isOTPModalOpen,
          onClose: () => setIsOTPModalOpen(false),
          email,
          onSuccess: handleOTPSuccess
        }
      )
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
          animation: shimmer 3s ease-in-out infinite;
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
const $$Pembayaran = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pembayaran;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Pilih Paket & Pembayaran - Video Generator</title><meta name="description" content="Pilih paket yang sesuai dengan kebutuhan Anda dan metode pembayaran yang diinginkan.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <!-- Main Content --> <main class="flex-1"> ${renderComponent($$result, "PaymentPage", PaymentPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/PaymentPage", "client:component-export": "PaymentPage" })} </main> </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/pembayaran.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/pembayaran.astro";
const $$url = "/pembayaran";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pembayaran,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
