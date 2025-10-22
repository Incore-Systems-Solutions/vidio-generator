import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { B as Button } from '../chunks/badge_DSQWoPdL.mjs';
import 'clsx';
import { ArrowLeft, MessageCircle, Bot, Trash2, LogOut, Mail, AlertCircle, RefreshCw, Sparkles, Settings, Clock, CheckCircle, Loader2, User, CreditCard, Send } from 'lucide-react';
import { c as chatAIApi, a as videoHistoryApi } from '../chunks/api_yL4KI-YJ.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const translations = {
  ID: {
    back: "Kembali",
    emailTitle: "Masuk untuk berbicara dengan AI Video Consultant Anda",
    otpTitle: "Masukkan kode verifikasi untuk mengakses ruang konsultasi AI",
    aiConsultant: "AI Video Consultant",
    onlineReady: "Online & Ready",
    clearChat: "Clear Chat",
    logout: "Logout",
    aiAccessPortal: "AI Access Portal",
    enterEmail: "Masukkan email untuk mengakses sistem AI",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "Akses Portal AI",
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
    initializingAI: "Menginisialisasi AI Consultant...",
    aiThinking: "AI sedang berpikir...",
    dataCollected: "Data telah dikumpulkan! Siap untuk melanjutkan ke pembayaran.",
    continuePayment: "Lanjutkan ke Pembayaran",
    allBatchesDone: "Semua batch scene selesai! Total",
    scenesCreated: "scene telah dibuat.",
    pleaseWait: "Mohon menunggu, AI sedang memproses scene video...",
    typePlaceholder: "Ketik pertanyaan Anda di sini...",
    justNow: "Baru saja"
  },
  EN: {
    back: "Back",
    emailTitle: "Sign in to talk with your AI Video Consultant",
    otpTitle: "Enter verification code to access AI consultation room",
    aiConsultant: "AI Video Consultant",
    onlineReady: "Online & Ready",
    clearChat: "Clear Chat",
    logout: "Logout",
    aiAccessPortal: "AI Access Portal",
    enterEmail: "Enter email to access AI system",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "Access AI Portal",
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
    initializingAI: "Initializing AI Consultant...",
    aiThinking: "AI is thinking...",
    dataCollected: "Data collected! Ready to proceed to payment.",
    continuePayment: "Continue to Payment",
    allBatchesDone: "All batch scenes completed! Total",
    scenesCreated: "scenes created.",
    pleaseWait: "Please wait, AI is processing video scenes...",
    typePlaceholder: "Type your question here...",
    justNow: "Just now"
  },
  ZH: {
    back: "返回",
    emailTitle: "登录与您的 AI 视频顾问交谈",
    otpTitle: "输入验证码以访问 AI 咨询室",
    aiConsultant: "AI 视频顾问",
    onlineReady: "在线并准备就绪",
    clearChat: "清除聊天",
    logout: "登出",
    aiAccessPortal: "AI 访问门户",
    enterEmail: "输入电子邮件以访问 AI 系统",
    emailAddress: "电子邮件地址",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "访问 AI 门户",
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
    initializingAI: "初始化 AI 顾问...",
    aiThinking: "AI 正在思考...",
    dataCollected: "数据已收集！准备进行付款。",
    continuePayment: "继续付款",
    allBatchesDone: "所有批次场景已完成！总计",
    scenesCreated: "个场景已创建。",
    pleaseWait: "请稍候，AI 正在处理视频场景...",
    typePlaceholder: "在此输入您的问题...",
    justNow: "刚刚"
  },
  AR: {
    back: "رجوع",
    emailTitle: "قم بتسجيل الدخول للتحدث مع مستشار الفيديو AI الخاص بك",
    otpTitle: "أدخل رمز التحقق للوصول إلى غرفة استشارة AI",
    aiConsultant: "مستشار فيديو AI",
    onlineReady: "متصل وجاهز",
    clearChat: "مسح الدردشة",
    logout: "تسجيل الخروج",
    aiAccessPortal: "بوابة الوصول إلى AI",
    enterEmail: "أدخل البريد الإلكتروني للوصول إلى نظام AI",
    emailAddress: "عنوان البريد الإلكتروني",
    emailPlaceholder: "your.email@example.com",
    accessPortal: "الوصول إلى بوابة AI",
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
    initializingAI: "جارٍ تهيئة مستشار AI...",
    aiThinking: "AI يفكر...",
    dataCollected: "تم جمع البيانات! جاهز للمتابعة إلى الدفع.",
    continuePayment: "متابعة الدفع",
    allBatchesDone: "اكتملت جميع مشاهد الدفعة! الإجمالي",
    scenesCreated: "تم إنشاء مشاهد.",
    pleaseWait: "يرجى الانتظار، AI يعالج مشاهد الفيديو...",
    typePlaceholder: "اكتب سؤالك هنا...",
    justNow: "الآن"
  }
};
function VideoConsultant() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatUuid, setChatUuid] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [collectingData, setCollectingData] = useState(null);
  const [editedScenes, setEditedScenes] = useState([]);
  const [hasEdited, setHasEdited] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
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
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
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
      if (savedChatUuid) {
        setChatUuid(savedChatUuid);
      }
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(
            parsedMessages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          );
        } catch (err) {
          console.error("Error parsing saved messages:", err);
        }
      }
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
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
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
      setCountdown(60);
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
      const response = await chatAIApi.initChat(xApiKey);
      if (response.status) {
        setChatUuid(response.data.uuid);
        localStorage.setItem("konsultan-chat-uuid", response.data.uuid);
        const initialMessage = {
          id: "initial",
          role: "assistant",
          content: response.data.message.content,
          timestamp: /* @__PURE__ */ new Date()
        };
        setMessages([initialMessage]);
        localStorage.setItem(
          "konsultan-chat-messages",
          JSON.stringify([initialMessage])
        );
      } else {
        setError(response.message || "Gagal menginisialisasi chat");
      }
    } catch (err) {
      console.error("Error initializing chat:", err);
      if (err.status === 401) {
        localStorage.removeItem("x-api-key");
        localStorage.removeItem("konsultan-email");
        localStorage.removeItem("konsultan-chat-uuid");
        localStorage.removeItem("konsultan-chat-messages");
        setError("Sesi telah berakhir. Silakan login ulang.");
        window.location.href = "/konsultan-video";
      } else {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan saat menginisialisasi chat"
        );
      }
    } finally {
      setIsInitializing(false);
    }
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !chatUuid) return;
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: /* @__PURE__ */ new Date()
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
        xApiKey
      );
      if (response.status) {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: /* @__PURE__ */ new Date()
        };
        setMessages((prev) => {
          const updatedMessages = [...prev, aiResponse];
          localStorage.setItem(
            "konsultan-chat-messages",
            JSON.stringify(updatedMessages)
          );
          return updatedMessages;
        });
        setIsDone(response.data.is_done);
        if (response.data.json_data && response.data.json_data.type === "collecting_data") {
          console.log("Received collecting_data:", response.data.json_data);
          setCollectingData(response.data.json_data);
          localStorage.setItem(
            "collection_data",
            JSON.stringify(response.data.json_data)
          );
        }
        if (response.data.json_data && response.data.json_data.type === "prompt_video") {
          console.log("Received json_data:", response.data.json_data);
          console.log("is_done:", response.data.is_done);
          setJsonData(response.data.json_data);
          setEditedScenes((prev) => {
            const newScenes = response.data.json_data?.data || [];
            const accumulated = [...prev, ...newScenes];
            console.log(
              `Accumulating scenes: ${prev.length} + ${newScenes.length} = ${accumulated.length}`
            );
            if (response.data.is_done) {
              localStorage.setItem("batch_scene", JSON.stringify(accumulated));
              console.log(
                "All scenes saved to localStorage:",
                accumulated.length
              );
            }
            return accumulated;
          });
          if (!response.data.is_done) {
            console.log("Auto-continuing to next batch...");
            setTimeout(() => {
              handleContinueBatchVideo();
            }, 1e3);
          }
        }
      } else {
        setError(response.message || "Gagal mengirim pesan");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim pesan"
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
      localStorage.removeItem("konsultan-chat-uuid");
      localStorage.removeItem("konsultan-chat-messages");
      localStorage.removeItem("collection_data");
      localStorage.removeItem("batch_scene");
      const response = await chatAIApi.initChat(xApiKey);
      if (response.status) {
        setChatUuid(response.data.uuid);
        localStorage.setItem("konsultan-chat-uuid", response.data.uuid);
        const initialMessage = {
          id: "initial-" + Date.now(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: /* @__PURE__ */ new Date()
        };
        setMessages([initialMessage]);
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
        err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus chat"
      );
    } finally {
      setIsInitializing(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("x-api-key");
    localStorage.removeItem("konsultan-email");
    localStorage.removeItem("konsultan-chat-uuid");
    localStorage.removeItem("konsultan-chat-messages");
    localStorage.removeItem("collection_data");
    localStorage.removeItem("batch_scene");
    localStorage.removeItem("konsultan-video-data");
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
    const continueMessage = "lanjutkan";
    setIsLoading(true);
    setError(null);
    try {
      const response = await chatAIApi.sendReply(
        chatUuid,
        continueMessage,
        xApiKey
      );
      if (response.status) {
        const aiResponse = {
          id: Date.now().toString(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: /* @__PURE__ */ new Date()
        };
        setMessages((prev) => {
          const updatedMessages = [...prev, aiResponse];
          localStorage.setItem(
            "konsultan-chat-messages",
            JSON.stringify(updatedMessages)
          );
          return updatedMessages;
        });
        setIsDone(response.data.is_done);
        if (response.data.json_data && response.data.json_data.type === "prompt_video") {
          console.log("Received json_data:", response.data.json_data);
          console.log("is_done:", response.data.is_done);
          setJsonData(response.data.json_data);
          setEditedScenes((prev) => {
            const newScenes = response.data.json_data?.data || [];
            const accumulated = [...prev, ...newScenes];
            console.log(
              `Accumulating scenes: ${prev.length} + ${newScenes.length} = ${accumulated.length}`
            );
            if (response.data.is_done) {
              localStorage.setItem("batch_scene", JSON.stringify(accumulated));
              console.log(
                "All scenes saved to localStorage:",
                accumulated.length
              );
            }
            return accumulated;
          });
          if (!response.data.is_done) {
            console.log("Auto-continuing to next batch...");
            setTimeout(() => {
              handleContinueBatchVideo();
            }, 1e3);
          }
        }
      } else {
        setError(response.message || "Gagal melanjutkan batch");
      }
    } catch (err) {
      console.error("Error continuing batch:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat melanjutkan batch"
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
      collectingData
    );
    if (!isDone) {
      setError(
        "Silakan selesaikan pengumpulan data terlebih dahulu sebelum melanjutkan ke pembayaran"
      );
      return;
    }
    const konsultanData = {
      type: "konsultan",
      uuid_chat: chatUuid,
      list: editedScenes.length > 0 ? editedScenes : [],
      // Use editedScenes if available, otherwise empty array
      email,
      xApiKey,
      is_share: "y",
      affiliate_by: "",
      collectingData
      // Include collecting data
    };
    console.log("Saving konsultan data to localStorage:", konsultanData);
    localStorage.setItem("konsultan-video-data", JSON.stringify(konsultanData));
    console.log("Redirecting to payment page");
    window.location.href = "/pembayaran";
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 relative z-10", children: [
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
        step !== "chat" && /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "relative w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-10 h-10 text-white" }) })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient", children: t.aiConsultant }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-lg max-w-2xl mx-auto", children: [
            step === "email" && t.emailTitle,
            step === "otp" && t.otpTitle
          ] })
        ] }),
        step === "chat" && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50", children: /* @__PURE__ */ jsx(Bot, { className: "w-6 h-6 text-white" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent", children: t.aiConsultant }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: t.onlineReady })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: handleClearChat,
                className: "text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/20",
                disabled: isInitializing,
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: t.clearChat })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: handleLogout,
                className: "text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 border border-orange-500/20",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: t.logout })
                ]
              }
            )
          ] })
        ] })
      ] }),
      step === "email" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-4 border border-purple-500/30", children: /* @__PURE__ */ jsx(Mail, { className: "w-7 h-7 text-purple-300" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: t.aiAccessPortal }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: t.enterEmail })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: t.emailAddress }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" }),
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
                      className: "w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
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
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleRequestOTP,
                  disabled: authLoading || !email.trim(),
                  className: "relative w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30",
                  children: authLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }),
                    /* @__PURE__ */ jsx("span", { children: t.sendingOTP })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsx("span", { children: t.accessPortal })
                  ] })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-500 mt-6", children: t.verificationCodeSent })
        ] })
      ] }) }),
      step === "otp" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-4 border border-purple-500/30", children: /* @__PURE__ */ jsx(Settings, { className: "w-7 h-7 text-purple-300 animate-spin-slow" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: t.securityVerification }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-1", children: t.otpSentTo }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-purple-300", children: email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-3 text-center", children: t.enter6Digit }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "• • • • • •",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
                    onKeyPress: (e) => e.key === "Enter" && handleVerifyOTP(),
                    maxLength: 6,
                    className: "relative w-full px-4 py-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white text-center text-2xl font-mono tracking-widest placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  }
                )
              ] })
            ] }),
            countdown > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-sm", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-400" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                t.resendIn,
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-semibold", children: [
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
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleVerifyOTP,
                  disabled: authLoading || !otp.trim() || otp.length !== 6,
                  className: "relative w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30",
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
                className: "text-purple-400 hover:text-purple-300 font-medium transition-colors",
                children: t.resend
              }
            )
          ] }) })
        ] })
      ] }) }),
      step === "chat" && /* @__PURE__ */ jsxs(Fragment, { children: [
        error && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm flex items-center animate-in fade-in slide-in-from-top duration-300", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mr-3 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-red-300 text-sm", children: error })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-10 blur-xl" }),
          /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-0", children: [
            /* @__PURE__ */ jsx("div", { className: "h-[600px] overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-slate-900/0 to-slate-900/30", children: isInitializing && messages.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse" }),
                /* @__PURE__ */ jsx(Loader2, { className: "relative w-12 h-12 animate-spin text-purple-400" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-medium", children: t.initializingAI })
            ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              messages.map((message) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`,
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `flex gap-3 sm:gap-4 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 relative", children: [
                          message.role === "assistant" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-md opacity-40 animate-pulse" }),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 ${message.role === "user" ? "bg-gradient-to-br from-purple-500 to-blue-500 border-purple-400/50" : "bg-gradient-to-br from-emerald-500 to-cyan-500 border-emerald-400/50 shadow-lg shadow-emerald-500/30"}`,
                              children: message.role === "user" ? /* @__PURE__ */ jsx(User, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" }) : /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `rounded-2xl px-5 py-3.5 shadow-lg ${message.role === "user" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/20" : "bg-slate-800/80 border border-white/10 text-gray-200 backdrop-blur-sm"}`,
                              children: /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base whitespace-pre-line leading-relaxed", children: message.content })
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `text-xs text-gray-500 mt-2 px-2 ${message.role === "user" ? "text-right" : "text-left"}`,
                              children: formatTime(message.timestamp)
                            }
                          )
                        ] })
                      ]
                    }
                  )
                },
                message.id
              )),
              isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 sm:gap-4 max-w-[85%]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-md opacity-40 animate-pulse" }),
                  /* @__PURE__ */ jsx("div", { className: "relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-cyan-500 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/30", children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "rounded-2xl px-5 py-3.5 bg-slate-800/80 border border-white/10 backdrop-blur-sm shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-emerald-400 rounded-full animate-bounce" }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-2 h-2 bg-cyan-400 rounded-full animate-bounce",
                        style: { animationDelay: "0.1s" }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-2 h-2 bg-blue-400 rounded-full animate-bounce",
                        style: { animationDelay: "0.2s" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 font-medium", children: t.aiThinking })
                ] }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 p-4 bg-gradient-to-b from-slate-900/50 to-slate-950/80 backdrop-blur-sm", children: collectingData && isDone ? (
              // When collecting_data received and is_done true, show payment button
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 py-3 bg-green-500/10 rounded-xl border border-green-500/30", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-400" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-green-300", children: t.dataCollected })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 hover:opacity-75 transition-opacity duration-300" }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: handleGoToPayment,
                      className: "relative w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/30",
                      children: [
                        /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5" }),
                        /* @__PURE__ */ jsx("span", { children: t.continuePayment })
                      ]
                    }
                  )
                ] })
              ] })
            ) : jsonData && isDone ? (
              // When all batches done, show payment button
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 py-3 bg-green-500/10 rounded-xl border border-green-500/30", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-400" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-green-300", children: [
                    t.allBatchesDone,
                    " ",
                    editedScenes.length,
                    " ",
                    t.scenesCreated
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 hover:opacity-75 transition-opacity duration-300" }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: handleGoToPayment,
                      className: "relative w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/30",
                      children: [
                        /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5" }),
                        /* @__PURE__ */ jsx("span", { children: t.continuePayment })
                      ]
                    }
                  )
                ] })
              ] })
            ) : jsonData && !isDone ? (
              // When batch in progress, show processing status (auto-continue)
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 py-3 bg-blue-500/10 rounded-xl border border-blue-500/30", children: [
                /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 text-blue-400 animate-spin" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-blue-300", children: t.pleaseWait })
              ] }) })
            ) : /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    ref: inputRef,
                    placeholder: t.typePlaceholder,
                    value: inputMessage,
                    onChange: (e) => setInputMessage(e.target.value),
                    onKeyPress: handleKeyPress,
                    disabled: isLoading || isInitializing,
                    className: "relative w-full px-4 py-3 bg-slate-800/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 min-h-[48px] max-h-[120px] resize-none",
                    rows: 1
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-40" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleSendMessage,
                    disabled: !inputMessage.trim() || isLoading || isInitializing,
                    className: "relative h-full px-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-purple-500/20",
                    children: isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] }) })
          ] }) })
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

const $$Astro = createAstro();
const $$KonsultanVideo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$KonsultanVideo;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Konsultan Video AI - Video Generator</title><meta name="description" content="Chat dengan AI assistant kami untuk mendapatkan bantuan dalam membuat video yang sempurna. Dapatkan tips, trik, dan panduan lengkap.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <!-- Navigation --> <!-- <Navbar client:load currentStep={0} totalSteps={4} /> --> <!-- Main Content --> <main class="flex-1"> ${renderComponent($$result, "VideoConsultant", VideoConsultant, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/VideoConsultant", "client:component-export": "VideoConsultant" })} </main> <!-- Footer --> <!-- <footer class="border-t py-12 mt-12">
			<div class="container mx-auto px-4">
				<div class="text-center text-muted-foreground">
					<p>&copy; 2024 Video Generator. All rights reserved.</p>
				</div>
			</div>
		</footer> --> </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/konsultan-video.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/konsultan-video.astro";
const $$url = "/konsultan-video";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$KonsultanVideo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
