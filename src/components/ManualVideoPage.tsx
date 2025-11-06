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
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
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
  const handleUploadMultipleImages = async (
    files: File[]
  ): Promise<string[]> => {
    try {
      // Compress all images before upload (max 2MB after compression)
      const base64Promises = files.map((file) => compressImage(file, 2));
      const base64Strings = await Promise.all(base64Promises);

      // Call upload multiple images API
      const result = await uploadApi.uploadMultipleImages(base64Strings);
      return result.urls;
    } catch (error) {
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

      let imageUrls: string[] = [];

      // Upload images if provided
      if (uploadedImages.length > 0) {
        imageUrls = await handleUploadMultipleImages(uploadedImages);
        setUploadedImageUrls(imageUrls);
      }

      // Prepare data for payment page
      // For backward compatibility, we'll use the first image as karakter_image
      // and store all images in a new field
      const manualVideoData = {
        type: "manual",
        prompt: prompt,
        karakter_image: imageUrls[0] || "",
        karakter_images: imageUrls, // New field for multiple images
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
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
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

          {step !== "form" && (
            <div className="text-center mb-8">
              {/* Logo with Glow */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {t.pageTitle}
                </span>
              </h1>

              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {step === "email" && t.emailTitle}
                {step === "otp" && t.otpTitle}
              </p>
            </div>
          )}

          {step === "form" && (
            <div className="text-center mb-8">
              {/* Icon */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50">
                  <Film className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {t.pageTitle}
                </span>
              </h1>

              <p className="text-gray-400 text-lg">{t.pageDescription}</p>
            </div>
          )}
        </div>

        {/* Step 1: Email Login Screen */}
        {step === "email" && (
          <div className="max-w-md mx-auto">
            {/* Glassmorphism Card */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Header with Icon */}
                <div className="text-center mb-6 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-4 border border-purple-500/30">
                    <Mail className="w-7 h-7 text-purple-300" />
                  </div>
                  <div className="flex justify-center mb-2">
                    <img
                      src="/logo.svg"
                      alt="Instant VideoApp"
                      className="h-8 sm:h-10 md:h-11 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-gray-400 text-sm">{t.enterEmail}</p>
                </div>

                <div className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.emailAddress}
                    </label>
                    <div className="relative group">
                      {/* Input Glow on Focus */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>

                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder={t.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleRequestOTP()
                          }
                          className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-300">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="relative pt-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <button
                      onClick={handleRequestOTP}
                      disabled={authLoading || !email.trim()}
                      className="relative w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30"
                    >
                      {authLoading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>{t.sendingOTP}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>{t.accessPortal}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-500 mt-6">
                  {t.verificationCodeSentDesc}
                </p>
                <p className="text-center text-xs text-gray-500 mt-6">
                  {t.verificationCodeSent}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification Screen */}
        {step === "otp" && (
          <div className="max-w-md mx-auto">
            {/* Glassmorphism Card */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Header with Lock Icon */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-4 border border-purple-500/30">
                    <Settings className="w-7 h-7 text-purple-300 animate-spin-slow" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {t.securityVerification}
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">{t.otpSentTo}</p>
                  <p className="font-semibold text-purple-300">{email}</p>
                </div>

                <div className="space-y-5">
                  {/* OTP Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                      {t.enter6Digit}
                    </label>
                    <div className="relative group">
                      {/* Input Glow on Focus */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>

                      <input
                        type="text"
                        placeholder="• • • • • •"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleVerifyOTP()
                        }
                        maxLength={6}
                        className="relative w-full px-4 py-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white text-center text-2xl font-mono tracking-widest placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Countdown Timer */}
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

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-300">{error}</span>
                    </div>
                  )}

                  {/* Verify Button */}
                  <div className="relative pt-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <button
                      onClick={handleVerifyOTP}
                      disabled={authLoading || !otp.trim() || otp.length !== 6}
                      className="relative w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30"
                    >
                      {authLoading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>{t.verifying}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>{t.verifyEnter}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={() => setStep("email")}
                    className="w-full py-3 bg-slate-900/50 hover:bg-slate-800/50 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t.backToEmail}</span>
                  </button>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    {t.notReceived}{" "}
                    {countdown === 0 && (
                      <button
                        onClick={handleRequestOTP}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        {t.resend}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Main Form Card */}
        {step === "form" && (
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-10 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 space-y-8">
              {/* 1. Upload Character Images */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-500/30">
                      <ImageIcon className="w-4 h-4 text-purple-400" />
                    </div>
                    {t.uploadCharacter}
                  </div>
                  {uploadedImages.length > 0 && (
                    <span className="text-sm text-purple-400">
                      {uploadedImages.length} {t.imagesSelected}
                    </span>
                  )}
                </h3>

                {/* Upload Area - Always visible if under max limit */}
                {uploadedImages.length < MAX_IMAGES && (
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 bg-slate-800/30 hover:bg-slate-800/50">
                      <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                      <p className="text-gray-300 font-medium mb-2">
                        {t.uploadDescription}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t.supportedFormats}
                      </p>
                    </div>
                  </label>
                )}

                {/* Image Previews Grid */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-slate-800/30 group"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-40 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500/90 rounded-md flex items-center space-x-1.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-medium truncate max-w-[120px]">
                            {uploadedImages[index]?.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Prompt / Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  {t.promptTitle}
                </h3>

                <Textarea
                  placeholder={t.promptPlaceholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                />
              </div>

              {/* 3. Visual Style Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  {t.categoryTitle}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {visualStyleOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`relative group p-4 rounded-2xl cursor-pointer transition-all ${
                        selectedVisualStyle === option.value
                          ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                          : "bg-slate-800/50 border border-white/10 hover:border-purple-500/30 hover:bg-slate-800/70"
                      }`}
                      onClick={() => setSelectedVisualStyle(option.value)}
                    >
                      {selectedVisualStyle === option.value && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-lg -z-10"></div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-white mb-1">
                            {
                              option.label[
                                selectedLanguage as keyof typeof option.label
                              ]
                            }
                          </h5>
                          <p className="text-sm text-gray-400">
                            {
                              option.description[
                                selectedLanguage as keyof typeof option.description
                              ]
                            }
                          </p>
                        </div>
                        {selectedVisualStyle === option.value && (
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 ml-3">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Aspect Ratio Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-500/30">
                    <Video className="w-4 h-4 text-purple-400" />
                  </div>
                  {t.orientationTitle}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {aspectRatioOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`relative group p-4 rounded-2xl cursor-pointer transition-all ${
                        selectedAspectRatio === option.value
                          ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                          : "bg-slate-800/50 border border-white/10 hover:border-purple-500/30 hover:bg-slate-800/70"
                      }`}
                      onClick={() => setSelectedAspectRatio(option.value)}
                    >
                      {selectedAspectRatio === option.value && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-lg -z-10"></div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-white">
                            {
                              option.label[
                                selectedLanguage as keyof typeof option.label
                              ]
                            }
                          </h5>
                        </div>
                        {selectedAspectRatio === option.value && (
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
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
                <div className="flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              {/* 5. Continue to Payment Button */}
              <div className="relative pt-4">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 hover:opacity-75 transition-opacity duration-300"></div>
                <button
                  onClick={handleContinueToPayment}
                  disabled={
                    isProcessing ||
                    !prompt.trim() ||
                    !selectedVisualStyle ||
                    !selectedAspectRatio
                  }
                  className="relative w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg shadow-purple-500/30"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.processing}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{t.continuePayment}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
