import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User as UserIcon,
  Sparkles,
  Trash2,
  ArrowLeft,
  MessageCircle,
  Loader2,
  CreditCard,
  AlertCircle,
  Mail,
  Settings,
  RefreshCw,
  Clock,
  CheckCircle,
  LogOut,
  Film,
  Calendar,
  Video,
  Check,
} from "lucide-react";
import {
  chatAIApi,
  videoHistoryApi,
  videoStoreApi,
  type SceneData,
  type SubSceneDetail,
} from "@/lib/api";

// Translations for VideoConsultant
const translations = {
  ID: {
    back: "Kembali",
    emailTitle:
      "Masuk untuk membuat video AI yang menakjubkan secara instan dengan Asisten AI kami - Tidak perlu perintah",
    otpTitle: "Masukkan kode verifikasi untuk mengakses Asisten AI",
    aiConsultant: "Buat Video Sekarang",
    onlineReady: "Online & Ready",
    clearChat: "Clear Chat",
    logout: "Logout",
    aiAccessPortal: "Portal Akses AI",
    enterEmail:
      "akses instan ke asisten AI kami — buat video menakjubkan dalam hitungan detik..",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "Akses Asisten AI",
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
    initializingAI: "Menginisialisasi AI Consultant...",
    aiThinking: "AI sedang berpikir...",
    dataCollected:
      "Data telah dikumpulkan! Siap untuk melanjutkan ke pembayaran.",
    continuePayment: "Lanjutkan ke Pembayaran",
    allBatchesDone: "Semua batch scene selesai! Total",
    scenesCreated: "scene telah dibuat.",
    pleaseWait: "Mohon menunggu, AI sedang memproses scene video...",
    typePlaceholder: "Tulis balasan Anda di sini...",
    justNow: "Baru saja",
    selectVisualStyle: "Pilih Gaya Visual",
    selectAspectRatio: "Pilih Aspek Ratio",
    selectVisualAndAspect: "Pilih Gaya Visual dan Aspek Ratio terlebih dahulu",
  },
  EN: {
    back: "Back",
    emailTitle:
      "Sign in to create stunning AI videos instantly with our AI Assistant - No prompt needed",
    otpTitle: "Enter verification code to access AI Assistant",
    aiConsultant: "Let's Create AI Video",
    onlineReady: "Online & Ready",
    clearChat: "Clear Chat",
    logout: "Logout",
    aiAccessPortal: "Access AI Assistant",
    enterEmail:
      "instant access to our AI assistant — create amazing videos in seconds.",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "Access AI Assistant",
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
    backToEmail: " Back to Enter your Email",
    notReceived: "Didn't receive code?",
    resend: "Resend",
    initializingAI: "Initializing AI Consultant...",
    aiThinking: "AI is thinking...",
    dataCollected: "Data collected! Ready to proceed to payment.",
    continuePayment: "Continue to Payment",
    allBatchesDone: "All batch scenes completed! Total",
    scenesCreated: "scenes created.",
    pleaseWait: "Please wait, AI is processing video scenes...",
    typePlaceholder: "Write your reply here...",
    justNow: "Just now",
    selectVisualStyle: "Select Visual Style",
    selectAspectRatio: "Select Aspect Ratio",
    selectVisualAndAspect: "Please select Visual Style and Aspect Ratio first",
  },
  ZH: {
    back: "返回",
    emailTitle:
      "登入即可使用我們的 AI 助理立即創建令人驚嘆的 AI 影片 - 無需提示",
    otpTitle: "輸入驗證碼訪問AI助手",
    aiConsultant: "立即制作视频",
    onlineReady: "在线并准备就绪",
    clearChat: "清除聊天",
    logout: "登出",
    aiAccessPortal: "人工智慧存取門戶",
    enterEmail: "即時存取我們的 AI 助理——在幾秒鐘內創建精彩的影片。",
    emailAddress: "电子邮件地址",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "访问 AI 门户",
    sendingOTP: "发送 OTP...",
    verificationCodeSent: "没有密码需要！验证码将发送到您的电子邮件",
    verificationCodeSentDesc: "我们重视您的隐私。永远不会发送垃圾邮件。",
    securityVerification: "安全验证",
    otpSentTo: "OTP 代码已发送至：",
    enter6Digit: "输入 6 位验证码",
    resendIn: "重新发送",
    verifying: "验证中...",
    verifyEnter: "验证并进入",
    backToEmail: "返回电子邮件",
    notReceived: "没收到代码？",
    resend: "重新发送",
    initializingAI: "初始化 AI 顾问...",
    aiThinking: "AI 正在思考...",
    dataCollected: "数据已收集！准备进行付款。",
    continuePayment: "继续付款",
    allBatchesDone: "所有批次场景已完成！总计",
    scenesCreated: "个场景已创建。",
    pleaseWait: "请稍候，AI 正在处理视频场景...",
    typePlaceholder: "在此输入您的问题...",
    justNow: "刚刚",
    selectVisualStyle: "选择视觉风格",
    selectAspectRatio: "选择宽高比",
    selectVisualAndAspect: "请先选择视觉风格和宽高比",
  },
  AR: {
    back: "رجوع",
    emailTitle:
      "قم بتسجيل الدخول لإنشاء مقاطع فيديو مذهلة بتقنية الذكاء الاصطناعي على الفور باستخدام مساعد الذكاء الاصطناعي الخاص بنا - لا حاجة إلى مطالبة",
    otpTitle: "أدخل رمز التحقق للوصول إلى مساعد الذكاء الاصطناعي",
    aiConsultant: "إنشاء فيديو الآن",
    onlineReady: "متصل وجاهز",
    clearChat: "مسح الدردشة",
    logout: "تسجيل الخروج",
    aiAccessPortal: "بوابة الوصول إلى AI",
    enterEmail:
      "أدخل البريد الإلكتروني للوصول إلى نظام AIالوصول الفوري إلى مساعد الذكاء الاصطناعي الخاص بنا - قم بإنشاء مقاطع فيديو مذهلة في ثوانٍ.",
    emailAddress: "عنوان البريد الإلكتروني",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "الوصول إلى بوابة AI",
    sendingOTP: "إرسال OTP...",
    verificationCodeSent:
      "لا حاجة لكلمة المرور! سيتم إرسال رمز التحقق إلى بريدك الإلكتروني.",
    verificationCodeSentDesc: "نحن نقدر خصوصيتك. لا يوجد أي لغز.",
    securityVerification: "التحقق الأمني",
    otpSentTo: "تم إرسال رمز OTP إلى:",
    enter6Digit: "أدخل رمز التحقق المكون من 6 أرقام",
    resendIn: "إعادة الإرسال في",
    verifying: "جارٍ التحقق...",
    verifyEnter: "تحقق وادخل",
    backToEmail: "العودة إلى البريد الإلكتروني",
    notReceived: "لم تتلق الرمز؟",
    resend: "إعادة الإرسال",
    initializingAI: "جارٍ تهيئة مستشار AI...",
    aiThinking: "AI يفكر...",
    dataCollected: "تم جمع البيانات! جاهز للمتابعة إلى الدفع.",
    continuePayment: "متابعة الدفع",
    allBatchesDone: "اكتملت جميع مشاهد الدفعة! الإجمالي",
    scenesCreated: "تم إنشاء مشاهد.",
    pleaseWait: "يرجى الانتظار، AI يعالج مشاهد الفيديو...",
    typePlaceholder: "اكتب سؤالك هنا...",
    justNow: "الآن",
    selectVisualStyle: "اختر النمط البصري",
    selectAspectRatio: "اختر نسبة العرض إلى الارتفاع",
    selectVisualAndAspect:
      "يرجى اختيار النمط البصري ونسبة العرض إلى الارتفاع أولاً",
  },
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface JsonData {
  type: string;
  batch?: number;
  total_batch?: number;
  data: SceneData[];
}

interface CollectingDataResponse {
  type: "collecting_data";
  data: {
    script_naskah?: {
      subjek: string;
      karakter: Array<{
        nama_karakter: string;
        detail_karakter: string;
        aksi: string;
        deskripsi_tambahan: string;
      }>;
      interaksi: string;
    };
    lokasi_waktu?: {
      tempat: string;
      waktu: string;
    };
    gaya_visual?: {
      style: string;
      nuansa: string;
      kualitas: {
        resolusi: string;
        frame_rate: string;
        rendering_style: string;
        lighting: string;
        color_grading: string;
        tekstur: string;
      };
      kamera: {
        angle: string;
        gerakan: string;
        aspect_ratio: string;
        depth_of_field: string;
      };
      atmosfer: string;
      tempo: string;
      efek_tambahan: string;
      audio: {
        efek_suara: string;
      };
    };
    count_scene_video?: number;
    durasi_final?: number;
  };
}

export function VideoConsultant() {
  // Authentication states
  const [step, setStep] = useState<"email" | "otp" | "chat">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatUuid, setChatUuid] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [collectingData, setCollectingData] =
    useState<CollectingDataResponse | null>(null);
  const [editedScenes, setEditedScenes] = useState<SceneData[]>([]);
  const [hasEdited, setHasEdited] = useState(false);
  const [selectedVisualStyle, setSelectedVisualStyle] = useState<string>("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check localStorage for existing session on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("x-api-key");
    const savedEmail = localStorage.getItem("konsultan-email");
    const savedChatUuid = localStorage.getItem("konsultan-chat-uuid");
    const savedMessages = localStorage.getItem("konsultan-chat-messages");
    const savedCollectingData = localStorage.getItem("collection_data");

    if (savedApiKey) {
      setXApiKey(savedApiKey);
      if (savedEmail) {
        setEmail(savedEmail);
      }

      // Restore chat UUID to prevent re-initialization
      if (savedChatUuid) {
        setChatUuid(savedChatUuid);
      }

      // Restore messages
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(
            parsedMessages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }))
          );
        } catch (err) {
          console.error("Error parsing saved messages:", err);
        }
      }

      // Restore collecting data
      if (savedCollectingData) {
        try {
          const parsedData = JSON.parse(savedCollectingData);
          setCollectingData(parsedData);
        } catch (err) {
          console.error("Error parsing collecting data:", err);
        }
      }

      setStep("chat");
    }
  }, []);

  // Countdown timer for OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Initialize chat when x-api-key is available (only if no existing chat UUID)
  useEffect(() => {
    if (xApiKey && step === "chat" && !chatUuid) {
      initializeChat();
    }
  }, [xApiKey, step, chatUuid]);

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

      setStep("chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal verifikasi OTP");
    } finally {
      setAuthLoading(false);
    }
  };

  const initializeChat = async () => {
    if (!xApiKey) return;

    try {
      setIsInitializing(true);
      const response = await chatAIApi.initChat(xApiKey, selectedLanguage);

      if (response.status) {
        setChatUuid(response.data.uuid);

        // Simpan chat UUID ke localStorage
        localStorage.setItem("konsultan-chat-uuid", response.data.uuid);

        const initialMessage: Message = {
          id: "initial",
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);

        // Simpan pesan awal ke localStorage
        localStorage.setItem(
          "konsultan-chat-messages",
          JSON.stringify([initialMessage])
        );
      } else {
        setError(response.message || "Gagal menginisialisasi chat");
      }
    } catch (err: any) {
      console.error("Error initializing chat:", err);

      // ✅ Tangani kasus Unauthorized (401)
      if (err.status === 401) {
        localStorage.removeItem("x-api-key");
        localStorage.removeItem("konsultan-email");
        localStorage.removeItem("konsultan-chat-uuid");
        localStorage.removeItem("konsultan-chat-messages");
        setError("Sesi telah berakhir. Silakan login ulang.");
        // Opsional: redirect ke halaman login
        window.location.href = "/konsultan-video";
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat menginisialisasi chat"
        );
      }
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !chatUuid) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatAIApi.sendReply(
        chatUuid,
        messageToSend,
        xApiKey!,
        selectedLanguage
      );

      if (response.status) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };

        setMessages((prev) => {
          const updatedMessages = [...prev, aiResponse];

          // Save messages to localStorage
          localStorage.setItem(
            "konsultan-chat-messages",
            JSON.stringify(updatedMessages)
          );

          return updatedMessages;
        });

        setIsDone(response.data.is_done);

        // Check if json_data exists and type is collecting_data
        if (
          response.data.json_data &&
          response.data.json_data.type === "collecting_data"
        ) {
          console.log("Received collecting_data:", response.data.json_data);
          setCollectingData(response.data.json_data as CollectingDataResponse);

          // Save to localStorage
          localStorage.setItem(
            "collection_data",
            JSON.stringify(response.data.json_data)
          );
        }

        // Check if json_data exists and type is prompt_video
        if (
          response.data.json_data &&
          response.data.json_data.type === "prompt_video"
        ) {
          console.log("Received json_data:", response.data.json_data);
          console.log("is_done:", response.data.is_done);

          setJsonData(response.data.json_data);

          // Always accumulate scenes from all batches
          setEditedScenes((prev) => {
            const newScenes = response.data.json_data?.data || [];
            const accumulated = [...prev, ...newScenes];
            console.log(
              `Accumulating scenes: ${prev.length} + ${newScenes.length} = ${accumulated.length}`
            );

            // If is_done is true, save to localStorage
            if (response.data.is_done) {
              localStorage.setItem("batch_scene", JSON.stringify(accumulated));
              console.log(
                "All scenes saved to localStorage:",
                accumulated.length
              );
            }

            return accumulated;
          });

          // Auto-continue if is_done is false (more batches coming)
          if (!response.data.is_done) {
            console.log("Auto-continuing to next batch...");
            setTimeout(() => {
              handleContinueBatchVideo();
            }, 1000); // Small delay to show the response
          }
        }
      } else {
        setError(response.message || "Gagal mengirim pesan");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengirim pesan"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!xApiKey) return;

    try {
      setIsInitializing(true);
      setMessages([]);
      setIsDone(false);
      setError(null);
      setJsonData(null);
      setCollectingData(null);
      setEditedScenes([]);
      setHasEdited(false);

      // Clear localStorage
      localStorage.removeItem("konsultan-chat-uuid");
      localStorage.removeItem("konsultan-chat-messages");
      localStorage.removeItem("collection_data");
      localStorage.removeItem("batch_scene");
      localStorage.removeItem("generate-uuid");
      localStorage.removeItem("manual-video-data");

      const response = await chatAIApi.initChat(xApiKey, selectedLanguage);

      if (response.status) {
        setChatUuid(response.data.uuid);

        // Save new chat UUID
        localStorage.setItem("konsultan-chat-uuid", response.data.uuid);

        const initialMessage: Message = {
          id: "initial-" + Date.now(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);

        // Save initial message
        localStorage.setItem(
          "konsultan-chat-messages",
          JSON.stringify([initialMessage])
        );
      } else {
        setError(response.message || "Gagal menginisialisasi chat");
      }
    } catch (err) {
      console.error("Error clearing chat:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus chat"
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("x-api-key");
    localStorage.removeItem("konsultan-email");
    localStorage.removeItem("konsultan-chat-uuid");
    localStorage.removeItem("konsultan-chat-messages");
    localStorage.removeItem("collection_data");
    localStorage.removeItem("batch_scene");
    localStorage.removeItem("konsultan-video-data");

    // Reset all states
    setXApiKey(null);
    setEmail("");
    setStep("email");
    setMessages([]);
    setIsDone(false);
    setError(null);
    setJsonData(null);
    setCollectingData(null);
    setEditedScenes([]);
    setHasEdited(false);
    setChatUuid(null);
  };

  const handleContinueBatchVideo = async () => {
    if (!chatUuid || !xApiKey) return;

    // Auto send message to continue batch creation
    const continueMessage = "lanjutkan";
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatAIApi.sendReply(
        chatUuid,
        continueMessage,
        xApiKey,
        selectedLanguage
      );

      if (response.status) {
        const aiResponse: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };

        setMessages((prev) => {
          const updatedMessages = [...prev, aiResponse];

          // Save messages to localStorage
          localStorage.setItem(
            "konsultan-chat-messages",
            JSON.stringify(updatedMessages)
          );

          return updatedMessages;
        });

        setIsDone(response.data.is_done);

        // Check if json_data exists and type is prompt_video
        if (
          response.data.json_data &&
          response.data.json_data.type === "prompt_video"
        ) {
          console.log("Received json_data:", response.data.json_data);
          console.log("is_done:", response.data.is_done);

          setJsonData(response.data.json_data);

          // Always accumulate scenes from all batches
          setEditedScenes((prev) => {
            const newScenes = response.data.json_data?.data || [];
            const accumulated = [...prev, ...newScenes];
            console.log(
              `Accumulating scenes: ${prev.length} + ${newScenes.length} = ${accumulated.length}`
            );

            // If is_done is true, save to localStorage
            if (response.data.is_done) {
              localStorage.setItem("batch_scene", JSON.stringify(accumulated));
              console.log(
                "All scenes saved to localStorage:",
                accumulated.length
              );
            }

            return accumulated;
          });

          // Auto-continue if is_done is false (more batches coming)
          if (!response.data.is_done) {
            console.log("Auto-continuing to next batch...");
            setTimeout(() => {
              handleContinueBatchVideo();
            }, 1000); // Small delay to show the response
          }
        }
      } else {
        setError(response.message || "Gagal melanjutkan batch");
      }
    } catch (err) {
      console.error("Error continuing batch:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat melanjutkan batch"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToPayment = () => {
    console.log(
      "handleGoToPayment called - isDone:",
      isDone,
      "editedScenes:",
      editedScenes.length,
      "collectingData:",
      collectingData,
      "selectedVisualStyle:",
      selectedVisualStyle,
      "selectedAspectRatio:",
      selectedAspectRatio
    );

    // Check if data collection is completed (isDone must be true)
    if (!isDone) {
      setError(
        "Silakan selesaikan pengumpulan data terlebih dahulu sebelum melanjutkan ke pembayaran"
      );
      return;
    }

    // Check if visual style and aspect ratio are selected
    if (!selectedVisualStyle || !selectedAspectRatio) {
      setError("Silakan pilih Gaya Visual dan Aspek Ratio terlebih dahulu");
      return;
    }

    // Prepare data for payment page
    const konsultanData = {
      type: "konsultan",
      uuid_chat: chatUuid,
      list: editedScenes.length > 0 ? editedScenes : [], // Use editedScenes if available, otherwise empty array
      email: email,
      xApiKey: xApiKey,
      is_share: "y",
      affiliate_by: "",
      collectingData: collectingData, // Include collecting data
      gaya_visual: selectedVisualStyle, // Add visual style
      aspek_rasio: selectedAspectRatio, // Add aspect ratio
    };

    console.log("Saving konsultan data to localStorage:", konsultanData);

    // Save to localStorage
    localStorage.setItem("konsultan-video-data", JSON.stringify(konsultanData));

    // Redirect to payment page
    console.log("Redirecting to payment page");
    window.location.href = "/pembayaran";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Visual style options with multilingual support
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

  // Aspect ratio options with multilingual support
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
        {/* Native Top Bar - Only for Chat Step */}
        {step === "chat" && (
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
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">
                    AI Assistant
                  </h1>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <p className="text-[10px] text-gray-400">{t.onlineReady}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  disabled={isInitializing}
                  className="p-2 hover:bg-slate-800/50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-slate-800/50 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4 text-gray-400" />
                </button>
              </div>
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
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {t.aiConsultant}
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

        {/* Step 3: Chat Interface - Native Style */}
        {step === "chat" && (
          <>
            {/* Error Message */}
            {error && (
              <div className="mx-4 mt-2 mb-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center">
                <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Native Chat Container */}
            <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {isInitializing && messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col items-center space-y-3">
                      <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
                      <span className="text-gray-400 text-sm">
                        {t.initializingAI}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${
                            message.role === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
                          }`}
                        >
                          {/* Simple Avatar */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.role === "user"
                                  ? "bg-gradient-to-br from-purple-500 to-blue-500"
                                  : "bg-gradient-to-br from-green-500 to-emerald-500"
                              }`}
                            >
                              {message.role === "user" ? (
                                <UserIcon className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>

                          {/* Message Bubble */}
                          <div className="flex flex-col">
                            <div
                              className={`rounded-2xl px-4 py-2.5 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                                  : "bg-slate-800/50 text-gray-200"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] text-gray-500 mt-1 px-1 ${
                                message.role === "user"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* AI Typing Indicator */}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[80%]">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div className="rounded-2xl px-4 py-2.5 bg-slate-800/50">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-400">
                                {t.aiThinking}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Native Input Area */}
              <div className="flex-shrink-0 border-t border-slate-800/50 bg-slate-950 px-4 py-3 safe-area-bottom">
                {collectingData && isDone ? (
                  // When collecting_data received and is_done true, show visual style and aspect ratio selection
                  <div className="space-y-4">
                    {/* Visual Style Selection */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white flex items-center">
                        <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                        {t.selectVisualStyle}
                      </h4>
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

                    {/* Aspect Ratio Selection */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white flex items-center">
                        <Video className="w-4 h-4 text-purple-400 mr-2" />
                        {t.selectAspectRatio}
                      </h4>
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

                    {/* Continue to Payment Button */}
                    <button
                      onClick={handleGoToPayment}
                      disabled={!selectedVisualStyle || !selectedAspectRatio}
                      className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-sm">
                        {!selectedVisualStyle || !selectedAspectRatio
                          ? t.selectVisualAndAspect
                          : t.continuePayment}
                      </span>
                    </button>
                  </div>
                ) : jsonData && isDone ? (
                  // When all batches done, show payment button
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 py-2.5 bg-green-500/10 rounded-xl border border-green-500/30">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <p className="text-xs font-medium text-green-300">
                        {t.allBatchesDone} {editedScenes.length}{" "}
                        {t.scenesCreated}
                      </p>
                    </div>
                    <button
                      onClick={handleGoToPayment}
                      className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-sm">{t.continuePayment}</span>
                    </button>
                  </div>
                ) : jsonData && !isDone ? (
                  // When batch in progress, show processing status (auto-continue)
                  <div className="flex items-center justify-center space-x-2 py-2.5 bg-blue-500/10 rounded-xl border border-blue-500/30">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <p className="text-xs font-medium text-blue-300">
                      {t.pleaseWait}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <textarea
                      ref={inputRef}
                      placeholder={t.typePlaceholder}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading || isInitializing}
                      className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none transition-colors text-sm"
                      rows={1}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={
                        !inputMessage.trim() || isLoading || isInitializing
                      }
                      className="px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
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
