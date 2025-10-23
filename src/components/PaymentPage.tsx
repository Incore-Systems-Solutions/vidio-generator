import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CreditCard,
  Coins,
  Wallet,
  QrCode,
  CheckCircle,
  ArrowLeft,
  Video,
  Check,
  Sparkles,
  AlertCircle,
  Play,
  Loader2,
} from "lucide-react";
import { OTPModal } from "./OTPModal";
import { videoSetupStorage } from "@/lib/videoSetupStorage";
import { videoStoreApi } from "@/lib/api";

const BASE_URL = "https://api.instantvideoapp.com";

// Translations for PaymentPage
const translations = {
  ID: {
    back: "Kembali",
    paymentPage: "Halaman Pembayaran",
    aiVideoPayment: "Pembayaran Video AI",
    choosePayment:
      "Pilih metode pembayaran untuk melanjutkan proses pembuatan video AI Anda",
    completeInfo:
      "Lengkapi informasi pembayaran untuk melanjutkan proses pembuatan video AI Anda",
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
    aiOptimizing:
      "AI sedang mengoptimalkan prompt video Anda untuk hasil terbaik",
    estimatedTime: "Estimasi Waktu",
    processEnsures:
      "💡 Proses ini memastikan video Anda memiliki kualitas optimal",
    processing: "Memproses...",
    generateVideo: "Generate Video",
    payNow: "Bayar Sekarang",
  },
  EN: {
    back: "Back",
    paymentPage: "Payment Page",
    aiVideoPayment: "AI Video Payment",
    choosePayment:
      "Choose payment method to continue your AI video creation process",
    completeInfo:
      "Complete payment information to continue your AI video creation process",
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
    payNow: "Pay Now",
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
    payNow: "立即付款",
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
    aiOptimizing:
      "يقوم AI بتحسين مطالبة الفيديو الخاصة بك للحصول على أفضل النتائج",
    estimatedTime: "الوقت المقدر",
    processEnsures:
      "💡 تضمن هذه العملية أن يكون الفيديو الخاص بك ذا جودة مثالية",
    processing: "جارٍ المعالجة...",
    generateVideo: "إنشاء فيديو",
    payNow: "ادفع الآن",
  },
};

export function PaymentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  // Removed selectedPackage - using fixed price of 10,000
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userQuota, setUserQuota] = useState<number | null>(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKonsultanMode, setIsKonsultanMode] = useState(false);
  const [konsultanData, setKonsultanData] = useState<any>(null);
  const [hasExistingApiKey, setHasExistingApiKey] = useState(false);
  const [existingApiKey, setExistingApiKey] = useState<string | null>(null);
  const [isOptimizingPrompt, setIsOptimizingPrompt] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState<any>(null);
  const [sceneStatuses, setSceneStatuses] = useState<
    Array<{ scene: number; status: "Antri" | "Proses" | "Selesai" }>
  >([]);

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

  // Load existing data from localStorage on component mount
  useEffect(() => {
    // Check for existing x-api-key
    const savedApiKey = localStorage.getItem("x-api-key");
    const savedEmail =
      localStorage.getItem("konsultan-email") ||
      localStorage.getItem("riwayat-email");

    if (savedApiKey) {
      console.log("Found existing x-api-key in localStorage");
      setHasExistingApiKey(true);
      setExistingApiKey(savedApiKey);
      setIsOTPVerified(true);
      setIsPersonalInfoComplete(true);

      if (savedEmail) {
        setEmail(savedEmail);
      }

      // Fetch user quota with existing API key
      fetchUserQuota(savedApiKey);
    }

    // Check if there's konsultan data
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
      // Load regular video setup data
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
    // Note: We'll call handlePersonalInfoChange in a separate useEffect
  }, []);

  // Fetch user quota using x-api-key
  const fetchUserQuota = async (apiKey: string) => {
    try {
      const response = await fetch(
        "https://api.instantvideoapp.com/api/video-ai/check-koin",
        {
          headers: {
            "x-api-key": apiKey,
          },
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

  // Update personal info validation when email or phone changes
  useEffect(() => {
    handlePersonalInfoChange();
  }, [email, phoneNumber]);

  const handlePersonalInfoChange = () => {
    const isComplete = email.trim() !== "" && phoneNumber.trim() !== "";
    console.log("Personal info validation:", {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      isComplete,
    });
    setIsPersonalInfoComplete(isComplete);
  };

  const handleOTPSuccess = async (quota: number, newApiKey?: string) => {
    setUserQuota(quota);
    setIsOTPVerified(true);
    setIsOTPModalOpen(false);

    // Calculate price based on mode
    const pricePerVideo = 10000;
    const totalPrice =
      isKonsultanMode && konsultanData?.list
        ? pricePerVideo * konsultanData.list.length
        : pricePerVideo;

    // Update localStorage with payment info (for regular mode only)
    // For konsultan mode, x-api-key will be obtained from store-multiple response
    if (!isKonsultanMode) {
      videoSetupStorage.updatePaymentInfo({
        email: email,
        no_wa: phoneNumber,
        metode_pengiriman: "kuota",
        metode: null,
        jumlah: totalPrice,
      });
    }

    // Note: x-api-key will be saved after successful store/store-multiple API call
  };

  const handleVerificationClick = () => {
    if (email.trim() !== "") {
      setIsOTPModalOpen(true);
    }
  };

  const handlePaymentMethodSelect = async (methodId: string) => {
    setSelectedPaymentMethod(methodId);

    // Calculate price based on mode
    const pricePerVideo = 10000;
    const totalPrice =
      isKonsultanMode && konsultanData?.list
        ? pricePerVideo * konsultanData.list.length
        : pricePerVideo;

    // Update localStorage based on payment method (only for regular mode)
    if (!isKonsultanMode) {
      if (methodId === "coins") {
        // For coins, only update if OTP is verified
        if (isOTPVerified) {
          videoSetupStorage.updatePaymentInfo({
            email: email,
            no_wa: phoneNumber,
            metode_pengiriman: "kuota",
            metode: null,
            jumlah: totalPrice,
          });

          // Note: Removed automatic video generation - user must click "Generate Video" button
        }
      } else {
        // For other payment methods, update immediately
        let metode = null;
        if (methodId === "gopay") {
          metode = "gopay";
        } else if (methodId === "qris") {
          metode = "other_qris";
        } else if (methodId === "credit-card") {
          metode = "kreem";
        }

        videoSetupStorage.updatePaymentInfo({
          email: email,
          no_wa: phoneNumber,
          metode_pengiriman: "pembayaran",
          metode: metode,
          jumlah: totalPrice,
        });
      }
    }
  };

  // Removed handlePackageSelect - using fixed pricing

  // Check prompt optimization status
  const checkPromptOptimization = async (
    uuidChat: string,
    apiKey: string
  ): Promise<boolean> => {
    try {
      console.log("Checking prompt optimization for uuid_chat:", uuidChat);

      const response = await fetch(
        `${BASE_URL}/api/chat-ai/check-prompt/${uuidChat}`,
        {
          headers: {
            "x-api-key": apiKey,
          },
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

      // If prompt_video is not null, optimization is complete
      if (result.data.prompt_video !== null) {
        console.log("Prompt optimization complete!");
        return true;
      } else {
        // Still optimizing, return false
        console.log("Prompt still optimizing...");
        return false;
      }
    } catch (err) {
      console.error("Error checking prompt optimization:", err);
      throw err;
    }
  };

  // Poll prompt optimization until complete with scene-by-scene simulation
  const waitForPromptOptimization = async (
    uuidChat: string,
    apiKey: string
  ): Promise<void> => {
    setIsOptimizingPrompt(true);

    // Get total scenes from videoCount
    const totalScenes = videoCount;

    // Initialize all scenes with "Antri" status
    const initialScenes = Array.from({ length: totalScenes }, (_, i) => ({
      scene: i + 1,
      status: "Antri" as const,
    }));
    setSceneStatuses(initialScenes);

    // First API call to get estimation time
    let estimationTime = 60; // Default 60 seconds
    let isComplete = await checkPromptOptimization(uuidChat, apiKey);
    
    if (optimizationProgress && optimizationProgress.estimation_time) {
      estimationTime = optimizationProgress.estimation_time;
    }

    // If already complete, fast forward all to "Selesai"
    if (isComplete) {
      const completedScenes = initialScenes.map((scene) => ({
        ...scene,
        status: "Selesai" as const,
      }));
      setSceneStatuses(completedScenes);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsOptimizingPrompt(false);
      return;
    }

    // Calculate duration per scene
    const sceneDuration = Math.max(5, estimationTime / totalScenes); // Minimum 5 seconds per scene
    let currentSceneIndex = 0;
    let promptReady = false;

    // Start scene simulation
    while (currentSceneIndex < totalScenes || !promptReady) {
      // Update current scene to "Proses"
      if (currentSceneIndex < totalScenes) {
        setSceneStatuses((prev) =>
          prev.map((scene, idx) =>
            idx === currentSceneIndex
              ? { ...scene, status: "Proses" as const }
              : scene
          )
        );

        // Wait for half of scene duration
        await new Promise((resolve) =>
          setTimeout(resolve, (sceneDuration * 1000) / 2)
        );

        // Check API status
        isComplete = await checkPromptOptimization(uuidChat, apiKey);

        if (isComplete) {
          promptReady = true;
          // Fast forward all remaining scenes to "Selesai"
          setSceneStatuses((prev) =>
            prev.map((scene) => ({ ...scene, status: "Selesai" as const }))
          );
          await new Promise((resolve) => setTimeout(resolve, 1000));
          break;
        }

        // Complete current scene
        setSceneStatuses((prev) =>
          prev.map((scene, idx) =>
            idx === currentSceneIndex
              ? { ...scene, status: "Selesai" as const }
              : scene
          )
        );

        // Wait for remaining half of scene duration
        await new Promise((resolve) =>
          setTimeout(resolve, (sceneDuration * 1000) / 2)
        );

        currentSceneIndex++;
      } else {
        // All scenes completed, but prompt not ready yet - keep polling
        await new Promise((resolve) => setTimeout(resolve, 3000));
        isComplete = await checkPromptOptimization(uuidChat, apiKey);
        if (isComplete) {
          promptReady = true;
          break;
        }
      }
    }

    setIsOptimizingPrompt(false);
  };

  const handleCoinsPayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Calculate price based on mode
      const pricePerVideo = 10000;
      const totalPrice =
        isKonsultanMode && konsultanData?.list
          ? pricePerVideo * konsultanData.list.length
          : pricePerVideo;

      // Check if this is konsultan mode
      if (isKonsultanMode && konsultanData) {
        // Use store-multiple API for konsultan with coins
        const payload = {
          uuid_chat: konsultanData.uuid_chat || null,
          metode_pengiriman: "kuota" as const,
          metode: null,
          email: email,
          affiliate_by: konsultanData.affiliate_by || "",
          gaya_visual: konsultanData.gaya_visual || "",
          aspek_rasio: konsultanData.aspek_rasio || "",
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

          // Save x-api-key from response to localStorage
          let apiKeyToUse = existingApiKey;
          if (result.data && result.data["x-api-key"]) {
            localStorage.setItem("x-api-key", result.data["x-api-key"]);
            apiKeyToUse = result.data["x-api-key"];
            console.log(
              "Saved x-api-key from store-multiple:",
              result.data["x-api-key"]
            );
          }

          // Get uuid_konsultan from response for dynamic redirect
          const generateUuid = result.data?.uuid_konsultan || "default";

          // Save generate UUID to localStorage for tracking
          localStorage.setItem("generate-uuid", generateUuid);
          console.log("Saved generate-uuid:", generateUuid);

          // Get uuid_chat for prompt optimization check
          const uuidChat = konsultanData.uuid_chat;

          if (!apiKeyToUse) {
            throw new Error("API key tidak tersedia");
          }

          // Save konsultan-chat-uuid to localStorage
          localStorage.setItem("konsultan-chat-uuid", uuidChat);
          console.log("Saved konsultan-chat-uuid:", uuidChat);

          // Wait for prompt optimization to complete
          console.log("Starting prompt optimization check...");
          await waitForPromptOptimization(uuidChat, apiKeyToUse);
          console.log("Prompt optimization complete, redirecting...");

          // Clear konsultan data from localStorage
          localStorage.removeItem("konsultan-video-data");

          // Redirect to dynamic generate page with UUID
          window.location.href = `/generate/${generateUuid}`;
        } else {
          throw new Error(result.message || "Gagal menyimpan data video");
        }
      }
    } catch (err) {
      console.error("Error processing coins payment:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses pembayaran dengan koin"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinuePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Check if this is konsultan mode
      if (isKonsultanMode && konsultanData) {
        // Use store-multiple API for konsultan
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
          metode_pengiriman: "pembayaran" as const,
          metode: metode, // Dynamic price based on list count
          email: email,
          no_wa: phoneNumber || null,
          affiliate_by: konsultanData.affiliate_by || "",
          gaya_visual: konsultanData.gaya_visual || "",
          aspek_rasio: konsultanData.aspek_rasio || "",
        };

        console.log("Sending konsultan payload to store-multiple:", payload);

        const result = await videoStoreApi.storeMultipleVideoData(payload);

        if (result.status) {
          console.log(
            "Konsultan video data stored successfully:",
            result.message
          );

          // Save x-api-key from response to localStorage
          if (result.data && result.data["x-api-key"]) {
            localStorage.setItem("x-api-key", result.data["x-api-key"]);
            console.log(
              "Saved x-api-key from store-multiple:",
              result.data["x-api-key"]
            );
          }

          // Save uuid_konsultan to localStorage for generate page
          if (result.data && result.data.uuid_konsultan) {
            localStorage.setItem("generate-uuid", result.data.uuid_konsultan);
            console.log("Saved generate-uuid:", result.data.uuid_konsultan);
          }

          // Clear konsultan data from localStorage
          // localStorage.removeItem("konsultan-video-data");

          // Redirect to transaction detail page or generate page
          if (result.data && result.data.invoice) {
            window.location.href = `/transaksi/${result.data.invoice}`;
          } else if (result.data && result.data.is_payment === false) {
            // No payment required, redirect to generate page
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
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses pembayaran"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate dynamic pricing
  const pricePerVideo = 10000;

  // Get videoCount from collection_data in localStorage
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

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  // Removed pricingPackages - using dynamic pricing

  const paymentMethods = [
    {
      id: "coins",
      name: t.useCoins,
      description: isOTPVerified
        ? `${t.balance} ${userQuota?.toLocaleString()} Koin`
        : t.verifyFirst,
      icon: <Coins className="w-6 h-6" />,
      balance: userQuota ? `${userQuota.toLocaleString()} Koin` : "0 Koin",
      disabled:
        !isOTPVerified || (userQuota !== null && userQuota < productionCost),
    },
    {
      id: "gopay",
      name: "Gopay",
      description: isOTPVerified ? t.payWithGopay : t.verifyEmailFirst,
      icon: <Wallet className="w-6 h-6" />,
      disabled: !isOTPVerified,
    },
    {
      id: "qris",
      name: "QRIS",
      description: isOTPVerified ? t.payWithQRIS : t.verifyEmailFirst,
      icon: <QrCode className="w-6 h-6" />,
      disabled: !isOTPVerified,
    },
    {
      id: "credit-card",
      name: t.payWithCard,
      description: isOTPVerified ? t.payWithCard : t.verifyEmailFirst,
      icon: <CreditCard className="w-6 h-6" />,
      disabled: !isOTPVerified,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased relative overflow-x-hidden">
      {/* Prompt Optimization Overlay */}
      {isOptimizingPrompt && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <Loader2 className="relative w-16 h-16 animate-spin text-purple-400 mx-auto" />
                  </div>

                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {selectedLanguage === "ID"
                      ? "Optimasi Naskah Video"
                      : "Video Script Optimization"}
                  </h3>
                  <p className="text-gray-400 text-lg mb-6">
                    {selectedLanguage === "ID"
                      ? "AI sedang membuat naskah video Anda untuk hasil terbaik"
                      : "AI is creating your video script for best results"}
                  </p>

                  {/* Video Count Info */}
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm mb-6">
                    <Video className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-base font-semibold text-purple-200">
                      {selectedLanguage === "ID"
                        ? `Membuat ${videoCount} video (total ${videoCount} scene${
                            videoCount > 1 ? "s" : ""
                          })`
                        : `Creating ${videoCount} video${
                            videoCount > 1 ? "s" : ""
                          } (total ${videoCount} scene${
                            videoCount > 1 ? "s" : ""
                          })`}
                    </span>
                  </div>

                  {/* Estimation Time */}
                  {optimizationProgress && optimizationProgress.estimation_time && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-300 mb-2">
                          ~{Math.ceil(optimizationProgress.estimation_time / 60)}{" "}
                          {selectedLanguage === "ID" ? "menit" : "minutes"}
                        </div>
                        <div className="text-sm text-gray-400">
                          {t.estimatedTime}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scene Progress List */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">
                    {selectedLanguage === "ID"
                      ? "Progress Pembuatan:"
                      : "Creation Progress:"}
                  </h4>
                  {sceneStatuses.map((sceneStatus) => (
                    <div
                      key={sceneStatus.scene}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        sceneStatus.status === "Selesai"
                          ? "bg-green-500/10 border-green-500/30"
                          : sceneStatus.status === "Proses"
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-slate-800/30 border-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {sceneStatus.status === "Selesai" ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : sceneStatus.status === "Proses" ? (
                          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                        )}
                        <span className="text-white font-medium">
                          {selectedLanguage === "ID"
                            ? `Scene ${sceneStatus.scene}: Memahami deskripsi dan membuat naskah video`
                            : `Scene ${sceneStatus.scene}: Understanding description and creating script`}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${
                          sceneStatus.status === "Selesai"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : sceneStatus.status === "Proses"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-slate-700/30 text-gray-400 border-slate-600/30"
                        }`}
                      >
                        {sceneStatus.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Info Message */}
                <div className="text-center text-sm text-gray-500 mb-6">
                  <p>{t.processEnsures}</p>
                </div>

                {/* Animated Progress Bar */}
                <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-500"
                    style={{
                      width: `${
                        (sceneStatuses.filter((s) => s.status === "Selesai")
                          .length /
                          sceneStatuses.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Progress Percentage */}
                <div className="text-center mt-3 text-sm font-medium text-purple-300">
                  {sceneStatuses.length > 0
                    ? Math.round(
                        (sceneStatuses.filter((s) => s.status === "Selesai")
                          .length /
                          sceneStatuses.length) *
                          100
                      )
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Futuristic Header Section */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-500/20"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>

          <div className="text-center mb-12 relative">
            {/* Gradient Glow Background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Badge with Icon */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  {t.paymentPage}
                </span>
              </div>

              {/* Main Title with Gradient */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {t.aiVideoPayment}
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-4">
                {hasExistingApiKey ? t.choosePayment : t.completeInfo}
              </p>

              {isKonsultanMode && (
                <div className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-purple-400 mr-3" />
                  <span className="text-base font-semibold text-purple-200">
                    {t.fromConsultant} ({konsultanData?.list?.length || 0}{" "}
                    {t.scene})
                  </span>
                </div>
              )}

              {/* {hasExistingApiKey && (
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-sm font-medium text-green-300">
                    Akun Terverifikasi
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Pricing Information */}
          <div className="relative">
            {/* Outer Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              {/* Full-width gradient header */}
              <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-500 text-white px-8 py-10 flex flex-col items-center w-full relative overflow-hidden">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></div>
                <div className="relative z-10 flex items-center mb-4 w-full justify-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mr-6 backdrop-blur-sm border border-white/20">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{t.videoAI}</h2>
                    <p className="text-white/90 text-lg">
                      {isKonsultanMode
                        ? `${videoCount} Video x Rp ${formatCurrency(
                            productionCost / videoCount
                          )}`
                        : t.fixedPrice}
                    </p>
                  </div>
                </div>
                <div className="relative z-10 text-5xl font-extrabold mb-2 w-full text-center">
                  Rp {formatCurrency(productionCost)}
                </div>
                <p className="relative z-10 text-white/90 text-lg w-full text-center">
                  {isKonsultanMode
                    ? `${videoCount} ${t.highQualityHD}`
                    : `1 ${t.highQualityHD}`}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 border border-green-500/30">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {t.hdQualityVideo}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {t.hdResolution}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 border border-green-500/30">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {t.customCharacterBg}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {t.customChoice}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 rounded-xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 border border-green-500/30">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {t.directDownload}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {t.downloadAfter}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-5 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
                  <div className="flex items-start">
                    <Coins className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-200 mb-2">
                        Rincian Penggunaan:
                      </p>
                      <p className="text-blue-300">
                        {isKonsultanMode ? (
                          <>
                            • Jumlah Video: <strong>{videoCount}</strong>
                            {totalPrice > 10000 ? (
                              <>
                                <br />• Biaya produksi: <strong>7.500</strong> x{" "}
                                <strong>{videoCount}</strong> video ={" "}
                                <strong>
                                  {formatCurrency(productionCost)}
                                </strong>
                              </>
                            ) : (
                              <>
                                <br />• Minimal Transaksi:{" "}
                                <strong>{formatCurrency(totalPrice)}</strong>
                                <br />• Biaya produksi video:{" "}
                                <strong>
                                  {formatCurrency(productionCost)}
                                </strong>
                                <br />• Sisa{" "}
                                <strong>{formatCurrency(bonusCoins)}</strong>{" "}
                                dikonversi menjadi koin untuk video berikutnya
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            • Minimal Transaksi: <strong>10.000</strong>
                            <br />• Biaya produksi video: <strong>7.500</strong>
                            <br />• Sisa <strong>2.500</strong> dikonversi
                            menjadi koin untuk video berikutnya
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Information */}
          <div className="relative">
            {/* Outer Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 sm:p-8 space-y-6 border-b border-white/10">
                <h3 className="flex items-center text-xl font-bold text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-500/30">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {t.paymentInfo}
                  </span>
                </h3>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Personal Information - Only show if no existing API key */}
                {!hasExistingApiKey && (
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-2 border border-purple-500/30">
                          <User className="w-4 h-4 text-purple-400" />
                        </div>
                        {t.personalData}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.email} <span className="text-red-400">*</span>
                          </label>
                          <Input
                            type="email"
                            placeholder="Masukkan email anda..."
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              handlePersonalInfoChange();
                            }}
                            className="w-full bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.phoneNumber}{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="tel"
                              placeholder="Masukkan nomor anda..."
                              value={phoneNumber}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                handlePersonalInfoChange();
                              }}
                              className="flex-1 bg-slate-800/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                            />
                            <Button
                              variant="default"
                              disabled={email.trim() === ""}
                              onClick={handleVerificationClick}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
                            >
                              {t.verify}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Methods */}
                <div>
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-2 border border-purple-500/30">
                      <Wallet className="w-4 h-4 text-purple-400" />
                    </div>
                    {t.paymentMethod}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative group p-4 rounded-2xl cursor-pointer transition-all ${
                          method.disabled
                            ? "bg-slate-900/30 border border-white/5 cursor-not-allowed opacity-50"
                            : selectedPaymentMethod === method.id
                            ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                            : "bg-slate-800/50 border border-white/10 hover:border-purple-500/30 hover:bg-slate-800/70"
                        }`}
                        onClick={() =>
                          !method.disabled &&
                          handlePaymentMethodSelect(method.id)
                        }
                      >
                        {/* Glow effect for selected */}
                        {selectedPaymentMethod === method.id &&
                          !method.disabled && (
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-lg -z-10"></div>
                          )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 border ${
                                method.disabled
                                  ? "bg-slate-900/30 border-white/5"
                                  : selectedPaymentMethod === method.id
                                  ? "bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-purple-500/50"
                                  : "bg-slate-800/50 border-white/10"
                              }`}
                            >
                              <div
                                className={
                                  method.disabled
                                    ? "text-gray-600"
                                    : selectedPaymentMethod === method.id
                                    ? "text-purple-300"
                                    : "text-gray-400"
                                }
                              >
                                {method.icon}
                              </div>
                            </div>
                            <div>
                              <h4
                                className={`font-semibold ${
                                  method.disabled
                                    ? "text-gray-600"
                                    : "text-white"
                                }`}
                              >
                                {method.name}
                              </h4>
                              <p
                                className={`text-xs ${
                                  method.disabled
                                    ? "text-gray-700"
                                    : "text-gray-400"
                                }`}
                              >
                                {method.description}
                              </p>
                              {method.balance && !method.disabled && (
                                <Badge
                                  variant="secondary"
                                  className="mt-1 text-xs bg-blue-500/20 text-blue-300 border-blue-500/30"
                                >
                                  {method.balance}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {selectedPaymentMethod === method.id &&
                            !method.disabled && (
                              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section - Full Width at Bottom */}
        {/* <Card className="bg-card shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              Ringkasan Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Detail Pesanan
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-foreground">1 Video AI</span>
                    <span className="font-bold text-purple-600">Rp 10.000</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Video HD berkualitas tinggi
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">
                      Total Pembayaran
                    </span>
                    <span className="text-xl font-bold text-purple-600">
                      Rp 10.000
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Metode Pembayaran
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-foreground font-medium">
                    {selectedPaymentMethod
                      ? paymentMethods.find(
                          (m) => m.id === selectedPaymentMethod
                        )?.name
                      : "Belum dipilih"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPaymentMethod
                      ? "Metode pembayaran telah dipilih"
                      : "Silakan pilih metode pembayaran"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Konversi Koin</h3>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">
                        Biaya produksi:
                      </span>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        7.500 koin
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">
                        Koin bonus:
                      </span>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        2.500 koin
                      </span>
                    </div>
                    <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                      <div className="flex justify-between">
                        <span className="font-medium text-blue-800 dark:text-blue-200">
                          Total koin:
                        </span>
                        <span className="font-bold text-blue-800 dark:text-blue-200">
                          10.000 koin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Debug Information - Remove this after fixing */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mb-8">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Debug Info</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>selectedPaymentMethod:</strong>{" "}
                      {selectedPaymentMethod || "null"}
                    </p>
                    <p>
                      <strong>isPersonalInfoComplete:</strong>{" "}
                      {isPersonalInfoComplete.toString()}
                    </p>
                    <p>
                      <strong>isOTPVerified:</strong> {isOTPVerified.toString()}
                    </p>
                    <p>
                      <strong>userQuota:</strong> {userQuota || "null"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>email:</strong> "{email}"
                    </p>
                    <p>
                      <strong>phoneNumber:</strong> "{phoneNumber}"
                    </p>
                    <p>
                      <strong>isProcessing:</strong> {isProcessing.toString()}
                    </p>
                    <p>
                      <strong>videoSetupData exists:</strong>{" "}
                      {videoSetupStorage.exists().toString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p>
                    <strong>Button disabled reasons:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {!selectedPaymentMethod && (
                      <li>No payment method selected</li>
                    )}
                    {!isPersonalInfoComplete && (
                      <li>Personal info incomplete (need email + phone)</li>
                    )}
                    {selectedPaymentMethod === "coins" &&
                      (!isOTPVerified ||
                        (userQuota !== null && userQuota < 7500)) && (
                        <li>Coins: Need OTP verification and 7500+ coins</li>
                      )}
                    {selectedPaymentMethod !== "coins" && !isOTPVerified && (
                      <li>Other methods: Need OTP verification</li>
                    )}
                    {isProcessing && <li>Currently processing</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )} */}

        {/* Status Messages */}
        {/* <div className="space-y-4 mb-8">
          {isPersonalInfoComplete && (
            <div className="flex justify-center">
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                  Data diri telah lengkap
                </span>
              </div>
            </div>
          )}

          {!isOTPVerified && isPersonalInfoComplete && (
            <div className="flex justify-center">
              <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" />
                <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                  Verifikasi email terlebih dahulu untuk memilih metode
                  pembayaran
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="flex items-center p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <span className="text-red-800 dark:text-red-200 font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}
        </div> */}

        {/* Error Message */}
        {error && (
          <div className="mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-top duration-300">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <span className="text-red-300 font-medium">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="lg"
              className="px-8 bg-slate-800/50 hover:bg-slate-800/70 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>{t.back}</span>
            </Button>
          </div>

          <div className="relative group">
            {/* Outer glow for button */}
            <div
              className={`absolute -inset-0.5 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300 ${
                selectedPaymentMethod === "coins"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-purple-500 to-blue-500"
              }`}
            ></div>

            <Button
              size="lg"
              className={`relative px-10 py-6 text-base font-semibold shadow-lg ${
                selectedPaymentMethod === "coins"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/30"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-500/30"
              }`}
              disabled={
                !selectedPaymentMethod ||
                (selectedPaymentMethod === "coins" &&
                  (!isOTPVerified ||
                    (userQuota !== null && userQuota < productionCost))) ||
                (selectedPaymentMethod !== "coins" && !isOTPVerified) ||
                isProcessing
              }
              onClick={() => {
                console.log("Payment button clicked with state:", {
                  selectedPaymentMethod,
                  isPersonalInfoComplete,
                  isOTPVerified,
                  userQuota,
                  email,
                  phoneNumber,
                  videoData: videoSetupStorage.load(),
                });

                if (selectedPaymentMethod === "coins") {
                  // For coins, directly generate video
                  handleCoinsPayment();
                } else {
                  // For other payment methods, go to payment page
                  handleContinuePayment();
                }
              }}
            >
              {isProcessing ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>{t.processing}</span>
                </span>
              ) : selectedPaymentMethod === "coins" ? (
                <span className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>{t.generateVideo}</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>{t.payNow}</span>
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* OTP Modal */}
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          email={email}
          onSuccess={handleOTPSuccess}
        />
      </div>

      {/* CSS for animations */}
      <style>{`
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
      `}</style>
    </div>
  );
}
