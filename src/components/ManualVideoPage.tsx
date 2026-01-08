import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  ImageIcon,
  Upload,
  Sparkles,
  ArrowLeft,
  Film,
  Monitor,
  Smartphone,
  Palette,
  X,
  CheckCircle,
  Check,
  Video,
  Loader2,
  AlertCircle,
  Mail,
  Settings,
  RefreshCw,
  Clock,
  MessageCircle,
} from "lucide-react";
import { uploadApi, videoHistoryApi } from "@/lib/api";
import { videoSetupStorage } from "@/lib/videoSetupStorage";

// Translations for ManualVideoPage
const translations = {
  ID: {
    back: "Kembali",
    emailTitle: "Masuk untuk membuat video AI yang menakjubkan secara manual",
    otpTitle: "Masukkan kode verifikasi untuk mengakses form video manual",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "Akses Form Video",
    sendingOTP: "Mengirim OTP...",
    verificationCodeSent:
      "Tidak perlu kata sandi! Kode verifikasi akan dikirimkan ke email Anda.",
    verificationCodeSentDesc:
      "Kami menghargai privasi Anda. Tidak pernah ada spam.",
    securityVerification: "Security Verification",
    otpSentTo: "Kode verifikasi telah dikirim ke:",
    enter6Digit: "Masukkan 6 Digit Kode Verifikasi",
    resendIn: "Kirim ulang dalam",
    verifying: "Memverifikasi...",
    verifyEnter: "Verifikasi & Masuk",
    backToEmail: "Kembali ke Masukkan Email Anda",
    notReceived: "Tidak menerima kode?",
    resend: "Kirim ulang",
    enterEmail: "akses instan untuk membuat video AI manual yang menakjubkan",
    pageTitle: "Buat Video Manual",
    pageDescription:
      "Buat video AI secara manual dengan kontrol penuh atas setiap detail",
    uploadCharacter: "Upload Gambar yang Kamu Mau",
    uploadDescription: "Klik untuk upload atau drag & drop gambar di sini",
    supportedFormats:
      "Format: JPG, PNG, WEBP (Max 5MB per gambar, Max 5 gambar)",
    removeImage: "Hapus Gambar",
    maxImagesReached: "Maksimal 5 gambar",
    imagesSelected: "gambar dipilih",
    promptTitle: "Detail Prompt Kamu",
    promptPlaceholder:
      'Contoh detail prompt: "Medium shot, seorang samurai berpakaian kimono hitam berjalan perlahan di tengah hutan bambu lebat, cahaya matahari pagi menyinari dedaunan menciptakan efek god rays, ekspresi wajah tenang dan fokus, angin sepoi-sepoi menggerakkan daun bambu, sinematik 8K, atmosfer damai dan mistis"',
    orientationTitle: "Aspek Rasio Video",
    landscape: "16:9 (Landscape)",
    landscapeDesc: "Format horizontal (16:9)",
    portrait: "9:16 (Portrait)",
    portraitDesc: "Format vertikal (9:16)",
    categoryTitle: "Gaya Visual",
    continuePayment: "Lanjutkan ke Pembayaran",
    processing: "Memproses...",
    fillAllFields: "Mohon lengkapi semua field terlebih dahulu",
    uploadingImage: "Mengupload gambar...",
    errorUploadImage: "Gagal mengupload gambar",
  },
  EN: {
    back: "Back",
    emailTitle: "Sign in to create stunning AI videos manually",
    otpTitle: "Enter verification code to access manual video form",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "Access Video Form",
    sendingOTP: "Sending OTP...",
    verificationCodeSent:
      "No password needed! A verification code will be sent to your email.",
    verificationCodeSentDesc: "We value your privacy. Never any spam.",
    securityVerification: "Security Verification",
    otpSentTo: "Verification code has been sent to:",
    enter6Digit: "Enter 6 Digit Verification Code",
    resendIn: "Resend in",
    verifying: "Verifying...",
    verifyEnter: "Verify & Enter",
    backToEmail: "Back to Enter your Email",
    notReceived: "Didn't receive code?",
    resend: "Resend",
    enterEmail: "instant access to create stunning AI videos manually",
    pageTitle: "Create Manual Video",
    pageDescription:
      "Create AI videos manually with full control over every detail",
    uploadCharacter: "Upload Your Desired Images",
    uploadDescription: "Click to upload or drag & drop images here",
    supportedFormats:
      "Formats: JPG, PNG, WEBP (Max 5MB per image, Max 5 images)",
    removeImage: "Remove Image",
    maxImagesReached: "Maximum 5 images",
    imagesSelected: "images selected",
    promptTitle: "Your Detailed Prompt",
    promptPlaceholder:
      'Detailed prompt example: "Medium shot, a samurai wearing black kimono walking slowly through dense bamboo forest, morning sunlight illuminating leaves creating god rays effect, calm and focused facial expression, gentle breeze moving bamboo leaves, cinematic 8K, peaceful and mystical atmosphere"',
    orientationTitle: "Video Aspect Ratio",
    landscape: "16:9 (Landscape)",
    landscapeDesc: "Horizontal format (16:9)",
    portrait: "9:16 (Portrait)",
    portraitDesc: "Vertical format (9:16)",
    categoryTitle: "Visual Style",
    continuePayment: "Continue to Payment",
    processing: "Processing...",
    fillAllFields: "Please fill all fields first",
    uploadingImage: "Uploading image...",
    errorUploadImage: "Failed to upload image",
  },
  ZH: {
    back: "返回",
    emailTitle: "登入即可手动创建令人惊叹的 AI 影片",
    otpTitle: "输入验证码访问手动视频表单",
    emailAddress: "电子邮件地址",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "访问视频表单",
    sendingOTP: "发送 OTP...",
    verificationCodeSent: "没有密码需要！验证码将发送到您的电子邮件",
    verificationCodeSentDesc: "我们重视您的隐私。永远不会发送垃圾邮件。",
    securityVerification: "安全验证",
    otpSentTo: "验证码已发送至：",
    enter6Digit: "输入 6 位验证码",
    resendIn: "重新发送",
    verifying: "验证中...",
    verifyEnter: "验证并进入",
    backToEmail: "返回电子邮件",
    notReceived: "没收到代码？",
    resend: "重新发送",
    enterEmail: "即时存取以手动创建令人惊叹的 AI 影片",
    pageTitle: "手动创建视频",
    pageDescription: "手动创建AI视频，完全控制每个细节",
    uploadCharacter: "上传您想要的图片",
    uploadDescription: "点击上传或拖放图片到这里",
    supportedFormats: "格式：JPG, PNG, WEBP（每张最大5MB，最多5张）",
    removeImage: "删除图片",
    maxImagesReached: "最多5张图片",
    imagesSelected: "张图片已选择",
    promptTitle: "您的详细提示",
    promptPlaceholder:
      "详细提示示例：中景，一个穿着黑色和服的武士缓慢地走过茂密的竹林，清晨的阳光照亮树叶形成神光效果，平静而专注的面部表情，轻柔的微风吹动竹叶，电影8K，宁静而神秘的氛围",
    orientationTitle: "视频宽高比",
    landscape: "16:9 (横向)",
    landscapeDesc: "横向格式（16:9）",
    portrait: "9:16 (纵向)",
    portraitDesc: "纵向格式（9:16）",
    categoryTitle: "视觉风格",
    continuePayment: "继续付款",
    processing: "处理中...",
    fillAllFields: "请先填写所有字段",
    uploadingImage: "上传图片中...",
    errorUploadImage: "图片上传失败",
  },
  AR: {
    back: "رجوع",
    emailTitle: "قم بتسجيل الدخول لإنشاء مقاطع فيديو مذهلة يدويًا",
    otpTitle: "أدخل رمز التحقق للوصول إلى نموذج الفيديو اليدوي",
    emailAddress: "عنوان البريد الإلكتروني",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "الوصول إلى نموذج الفيديو",
    sendingOTP: "إرسال OTP...",
    verificationCodeSent:
      "لا حاجة لكلمة المرور! سيتم إرسال رمز التحقق إلى بريدك الإلكتروني.",
    verificationCodeSentDesc: "نحن نقدر خصوصيتك. لا يوجد أي لغز.",
    securityVerification: "التحقق الأمني",
    otpSentTo: "تم إرسال رمز التحقق إلى:",
    enter6Digit: "أدخل رمز التحقق المكون من 6 أرقام",
    resendIn: "إعادة الإرسال في",
    verifying: "جارٍ التحقق...",
    verifyEnter: "تحقق وادخل",
    backToEmail: "العودة إلى البريد الإلكتروني",
    notReceived: "لم تتلق الرمز؟",
    resend: "إعادة الإرسال",
    enterEmail: "وصول فوري لإنشاء مقاطع فيديو مذهلة يدويًا",
    pageTitle: "إنشاء فيديو يدويًا",
    pageDescription:
      "أنشئ مقاطع فيديو بالذكاء الاصطناعي يدويًا مع التحكم الكامل في كل التفاصيل",
    uploadCharacter: "تحميل الصور المطلوبة",
    uploadDescription: "انقر للتحميل أو اسحب وأفلت الصور هنا",
    supportedFormats:
      "التنسيقات: JPG, PNG, WEBP (الحد الأقصى 5 ميجابايت لكل صورة، 5 صور كحد أقصى)",
    removeImage: "إزالة الصورة",
    maxImagesReached: "الحد الأقصى 5 صور",
    imagesSelected: "صور محددة",
    promptTitle: "التفاصيل المطلوبة",
    promptPlaceholder:
      'مثال تفصيلي: "لقطة متوسطة، ساموراي يرتدي كيمونو أسود يسير ببطء عبر غابة خيزران كثيفة، ضوء الشمس الصباحي ينير الأوراق مما يخلق تأثير أشعة الإله، تعبير وجه هادئ ومركز، نسيم لطيف يحرك أوراق الخيزران، سينمائي 8K، جو هادئ وصوفي"',
    orientationTitle: "نسبة العرض إلى الارتفاع",
    landscape: "16:9 (أفقي)",
    landscapeDesc: "تنسيق أفقي (16:9)",
    portrait: "9:16 (عمودي)",
    portraitDesc: "تنسيق عمودي (9:16)",
    categoryTitle: "النمط البصري",
    continuePayment: "متابعة الدفع",
    processing: "معالجة...",
    fillAllFields: "يرجى ملء جميع الحقول أولاً",
    uploadingImage: "جاري رفع الصورة...",
    errorUploadImage: "فشل رفع الصورة",
  },
};

export function ManualVideoPage() {
  // Language state
  const [selectedLanguage, setSelectedLanguage] = useState("ID");

  // Authentication states
  const [step, setStep] = useState<"email" | "otp" | "form">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);

  // Form states
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selectedVisualStyle, setSelectedVisualStyle] = useState<string>("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_IMAGES = 5;

  // Check for existing x-api-key on mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("x-api-key");
    const savedEmail =
      localStorage.getItem("konsultan-email") ||
      localStorage.getItem("riwayat-email");

    if (savedApiKey) {
      console.log("Found existing x-api-key in localStorage");
      setXApiKey(savedApiKey);
      setStep("form");

      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, []);

  // Load language from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    ) {
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
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRequestOTP = async () => {
    if (!email.trim()) {
      setError("Email tidak boleh kosong");
      return;
    }

    try {
      setAuthLoading(true);
      setError(null);

      await videoHistoryApi.requestOTP(email);
      setOtpSent(true);
      setStep("otp");
      setCountdown(60); // 60 seconds countdown
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim OTP");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError("OTP tidak boleh kosong");
      return;
    }

    try {
      setAuthLoading(true);
      setError(null);

      const result = await videoHistoryApi.verifyOTP(email, otp);
      setXApiKey(result.data["x-api-key"]);

      // Save to localStorage for future use
      localStorage.setItem("x-api-key", result.data["x-api-key"]);
      localStorage.setItem("konsultan-email", email);

      setStep("form");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal verifikasi OTP");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle multiple image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const t = translations[selectedLanguage as keyof typeof translations];

    if (files.length === 0) return;

    // Check if adding these files would exceed max limit
    if (uploadedImages.length + files.length > MAX_IMAGES) {
      setError(`${t.maxImagesReached} (${MAX_IMAGES})`);
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError(`${file.name}: Please upload an image file`);
        continue;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name}: File size must be less than 5MB`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Add valid files to state
    setUploadedImages((prev) => [...prev, ...validFiles]);

    // Create previews for valid files
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Clear error if upload successful
    setError(null);
  };

  // Handle remove single image
  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle image compression and resize
  const compressImage = (
    file: File,
    maxSizeMB: number = 2
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize if image is too large
          const maxDimension = 1920;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress with quality adjustment
          let quality = 0.9;
          let result = canvas.toDataURL("image/jpeg", quality);

          // Keep reducing quality until size is acceptable (< maxSizeMB)
          const maxBytes = maxSizeMB * 1024 * 1024;
          while (result.length > maxBytes && quality > 0.1) {
            quality -= 0.1;
            result = canvas.toDataURL("image/jpeg", quality);
          }

          resolve(result);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle multiple images upload to server
  const handleUploadMultipleImages = async (files: File[]): Promise<string> => {
    try {
      // Compress all images before upload (max 2MB after compression)
      const base64Promises = files.map((file) => compressImage(file, 2));
      const base64Strings = await Promise.all(base64Promises);

      // Call upload multiple images API
      const result = await uploadApi.uploadMultipleImages(base64Strings);

      console.log("Upload API response:", result);

      // API returns array of URLs in result.urls
      if (result.urls && result.urls.length > 0) {
        // Return the first URL (merged image)
        return result.urls[0];
      }

      throw new Error("Invalid API response: missing image URL");
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // Handle continue to payment
  const handleContinueToPayment = async () => {
    const t = translations[selectedLanguage as keyof typeof translations];

    // Validate all fields
    if (!prompt.trim() || !selectedVisualStyle || !selectedAspectRatio) {
      setError(t.fillAllFields);
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      let mergedImageUrl = "";

      // Upload images if provided
      if (uploadedImages.length > 0) {
        mergedImageUrl = await handleUploadMultipleImages(uploadedImages);
        console.log("Merged image URL:", mergedImageUrl);
      }

      // Prepare data for payment page
      const manualVideoData = {
        type: "manual",
        prompt: prompt,
        karakter_image: mergedImageUrl, // Single merged image URL
        aspek_rasio: selectedAspectRatio,
        gaya_video: selectedVisualStyle,
        is_share: "y",
        affiliate_by: "",
      };

      console.log("Saving manual video data to localStorage:", manualVideoData);

      // Save to localStorage
      localStorage.setItem(
        "manual-video-data",
        JSON.stringify(manualVideoData)
      );

      // Redirect to payment page
      window.location.href = "/pembayaran";
    } catch (err) {
      console.error("Error preparing video data:", err);
      setError(err instanceof Error ? err.message : t.errorUploadImage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Visual style options (same as VideoConsultant.tsx)
  const visualStyleOptions = [
    {
      value: "Ultra-realistic 8K ASMR cinematic realism",
      label: {
        ID: "Ultra Realistic",
        EN: "Ultra Realistic",
        ZH: "超现实主义",
        AR: "واقعية فائقة",
      },
      description: {
        ID: "Realisme sinematik 8K ASMR ultra-realistis",
        EN: "Ultra-realistic 8K ASMR cinematic realism",
        ZH: "超现实8K ASMR电影现实主义",
        AR: "واقعية سينمائية 8K ASMR فائقة الواقعية",
      },
    },
    {
      value: "Realistic 8K ASMR cinematic realism",
      label: {
        ID: "Realistic / Live Action",
        EN: "Realistic / Live Action",
        ZH: "现实主义/真人动作",
        AR: "واقعي / حركة حية",
      },
      description: {
        ID: "Realisme sinematik 8K ASMR realistis",
        EN: "Realistic 8K ASMR cinematic realism",
        ZH: "现实主义8K ASMR电影现实主义",
        AR: "واقعية سينمائية 8K ASMR واقعية",
      },
    },
    {
      value: "Cinematic 3D 8K ASMR cinematic realism",
      label: {
        ID: "Cinematic 3D",
        EN: "Cinematic 3D",
        ZH: "电影3D",
        AR: "سينمائي ثلاثي الأبعاد",
      },
      description: {
        ID: "Realisme sinematik 3D 8K ASMR",
        EN: "Cinematic 3D 8K ASMR cinematic realism",
        ZH: "电影3D 8K ASMR电影现实主义",
        AR: "واقعية سينمائية ثلاثية الأبعاد 8K ASMR",
      },
    },
    {
      value: "Cartoon 8K cinematic animation realism",
      label: {
        ID: "Cartoon / 2D Animation",
        EN: "Cartoon / 2D Animation",
        ZH: "卡通/2D动画",
        AR: "كرتون / رسوم متحركة ثنائية الأبعاد",
      },
      description: {
        ID: "Realisme animasi kartun 8K sinematik",
        EN: "Cartoon 8K cinematic animation realism",
        ZH: "卡通8K电影动画现实主义",
        AR: "واقعية رسوم متحركة كرتونية 8K سينمائية",
      },
    },
    {
      value: "Anime 8K cinematic illustration realism",
      label: {
        ID: "Anime Style",
        EN: "Anime Style",
        ZH: "动漫风格",
        AR: "أسلوب الأنمي",
      },
      description: {
        ID: "Realisme ilustrasi sinematik anime 8K",
        EN: "Anime 8K cinematic illustration realism",
        ZH: "动漫8K电影插画现实主义",
        AR: "واقعية رسوم توضيحية سينمائية أنمي 8K",
      },
    },
    {
      value: "Motion Graphics 8K cinematic realism",
      label: {
        ID: "Motion Graphics / Explainer",
        EN: "Motion Graphics / Explainer",
        ZH: "动态图形/解释器",
        AR: "رسوم متحركة / توضيحية",
      },
      description: {
        ID: "Realisme sinematik Motion Graphics 8K",
        EN: "Motion Graphics 8K cinematic realism",
        ZH: "动态图形8K电影现实主义",
        AR: "واقعية سينمائية رسوم متحركة 8K",
      },
    },
  ];

  // Aspect ratio options (same as VideoConsultant.tsx)
  const aspectRatioOptions = [
    {
      value: "16:9",
      label: {
        ID: "16:9 (Landscape)",
        EN: "16:9 (Landscape)",
        ZH: "16:9 (横向)",
        AR: "16:9 (أفقي)",
      },
    },
    {
      value: "9:16",
      label: {
        ID: "9:16 (Portrait)",
        EN: "9:16 (Portrait)",
        ZH: "9:16 (纵向)",
        AR: "9:16 (عمودي)",
      },
    },
  ];

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <div className="w-full min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 h-screen flex flex-col">
        {/* Native Top Bar - Only for Form Step */}
        {step === "form" && (
          <div className="flex-shrink-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 px-4 py-3 safe-area-top">
            <div className="flex items-center justify-between">
              <button
                onClick={() => (window.location.href = "/index.html")}
                className="p-2 hover:bg-slate-800/50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">
                    {t.pageTitle}
                  </h1>
                  <p className="text-[10px] text-gray-400">
                    {t.pageDescription}
                  </p>
                </div>
              </div>

              <div className="w-9"></div>
            </div>
          </div>
        )}

        {/* Step 1: Email Login - Native Style */}
        {step === "email" && (
          <div className="flex-1 flex flex-col justify-center px-6 py-8">
            {/* Back Button */}
            <button
              onClick={() => (window.location.href = "/index.html")}
              className="absolute top-4 left-4 p-2 hover:bg-slate-800/50 rounded-full transition-colors safe-area-top"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>

            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {t.pageTitle}
              </h1>
              <p className="text-sm text-gray-400 px-4">{t.emailTitle}</p>
            </div>

            {/* Email Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 px-1">
                  {t.emailAddress}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
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
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.sendingOTP}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{t.accessPortal}</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 px-4">
                {t.verificationCodeSent}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification - Native Style */}
        {step === "otp" && (
          <div className="flex-1 flex flex-col justify-center px-6 py-8">
            {/* Back Button */}
            <button
              onClick={() => setStep("email")}
              className="absolute top-4 left-4 p-2 hover:bg-slate-800/50 rounded-full transition-colors safe-area-top"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>

            {/* Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                <Settings className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.securityVerification}
              </h2>
              <p className="text-sm text-gray-400 mb-1">{t.otpSentTo}</p>
              <p className="text-sm font-semibold text-purple-400">{email}</p>
            </div>

            {/* OTP Input */}
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

              <button
                onClick={handleVerifyOTP}
                disabled={authLoading || !otp.trim() || otp.length !== 6}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.verifying}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{t.verifyEnter}</span>
                  </>
                )}
              </button>

              {countdown === 0 && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    {t.notReceived}{" "}
                    <button
                      onClick={handleRequestOTP}
                      className="text-purple-400 hover:text-purple-300 font-medium"
                    >
                      {t.resend}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Main Form - Native Style */}
        {step === "form" && (
          <>
            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 safe-area-bottom">
              {/* 1. Upload Character Images */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <ImageIcon className="w-4 h-4 text-purple-400 mr-2" />
                    {t.uploadCharacter}
                  </div>
                  {uploadedImages.length > 0 && (
                    <span className="text-xs text-purple-400">
                      {uploadedImages.length} {t.imagesSelected}
                    </span>
                  )}
                </h3>

                {/* Upload Area */}
                {uploadedImages.length < MAX_IMAGES && (
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-900/30 active:bg-slate-900/50">
                      <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-gray-300 text-sm font-medium mb-1">
                        {t.uploadDescription}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t.supportedFormats}
                      </p>
                    </div>
                  </label>
                )}

                {/* Image Previews Grid */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900/30 group"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500 rounded-md flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-medium truncate max-w-[100px]">
                            {uploadedImages[index]?.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Prompt / Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                  {t.promptTitle}
                </h3>

                <Textarea
                  placeholder={t.promptPlaceholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none text-sm"
                />
              </div>

              {/* 3. Visual Style Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <Palette className="w-4 h-4 text-purple-400 mr-2" />
                  {t.categoryTitle}
                </h3>

                <div className="grid grid-cols-1 gap-2">
                  {visualStyleOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        selectedVisualStyle === option.value
                          ? "bg-purple-500/20 border-2 border-purple-500"
                          : "bg-slate-800/50 border-2 border-slate-700 active:bg-slate-800"
                      }`}
                      onClick={() => setSelectedVisualStyle(option.value)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-white text-sm">
                            {
                              option.label[
                                selectedLanguage as keyof typeof option.label
                              ]
                            }
                          </h5>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {
                              option.description[
                                selectedLanguage as keyof typeof option.description
                              ]
                            }
                          </p>
                        </div>
                        {selectedVisualStyle === option.value && (
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center ml-2">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Aspect Ratio Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <Video className="w-4 h-4 text-purple-400 mr-2" />
                  {t.orientationTitle}
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {aspectRatioOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        selectedAspectRatio === option.value
                          ? "bg-purple-500/20 border-2 border-purple-500"
                          : "bg-slate-800/50 border-2 border-slate-700 active:bg-slate-800"
                      }`}
                      onClick={() => setSelectedAspectRatio(option.value)}
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white text-sm">
                          {
                            option.label[
                              selectedLanguage as keyof typeof option.label
                            ]
                          }
                        </h5>
                        {selectedAspectRatio === option.value && (
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              {/* 5. Continue to Payment Button */}
              <button
                onClick={handleContinueToPayment}
                disabled={
                  isProcessing ||
                  !prompt.trim() ||
                  !selectedVisualStyle ||
                  !selectedAspectRatio
                }
                className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">{t.processing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm">{t.continuePayment}</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
