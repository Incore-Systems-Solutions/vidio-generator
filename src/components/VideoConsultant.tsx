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
} from "lucide-react";
import {
  chatAIApi,
  videoHistoryApi,
  videoStoreApi,
  type SceneData,
  type SubSceneDetail,
} from "@/lib/api";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      const response = await chatAIApi.initChat(xApiKey);

      if (response.status) {
        setChatUuid(response.data.uuid);

        // Save chat UUID to localStorage
        localStorage.setItem("konsultan-chat-uuid", response.data.uuid);

        const initialMessage: Message = {
          id: "initial",
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);

        // Save initial message to localStorage
        localStorage.setItem(
          "konsultan-chat-messages",
          JSON.stringify([initialMessage])
        );
      } else {
        setError(response.message || "Gagal menginisialisasi chat");
      }
    } catch (err) {
      console.error("Error initializing chat:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menginisialisasi chat"
      );
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
        xApiKey!
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

      const response = await chatAIApi.initChat(xApiKey);

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
        xApiKey
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
      collectingData
    );

    // Check if data collection is completed (isDone must be true)
    if (!isDone) {
      setError(
        "Silakan selesaikan pengumpulan data terlebih dahulu sebelum melanjutkan ke pembayaran"
      );
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Futuristic Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-500/20"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          {step !== "chat" && (
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
                  AI Video Consultant
                </span>
              </h1>

              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {step === "email" &&
                  "Masuk untuk berbicara dengan AI Video Consultant Anda"}
                {step === "otp" &&
                  "Masukkan kode verifikasi untuk mengakses ruang konsultasi AI"}
              </p>
            </div>
          )}

          {step === "chat" && (
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    AI Video Consultant
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-400">Online & Ready</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/20"
                  disabled={isInitializing}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Clear Chat</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 border border-orange-500/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Step 1: AI Access Gate - Login Screen */}
        {step === "email" && (
          <div className="max-w-md mx-auto">
            {/* Glassmorphism Card */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Header with Icon */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-4 border border-purple-500/30">
                    <Mail className="w-7 h-7 text-purple-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    AI Access Portal
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Masukkan email untuk mengakses sistem AI
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Email Input with Futuristic Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      {/* Input Glow on Focus */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>

                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="your.email@example.com"
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

                  {/* Submit Button with Glow */}
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
                          <span>Mengirim OTP...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Akses Portal AI</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-500 mt-6">
                  Kode verifikasi akan dikirim ke email Anda
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Secure AI Verification - OTP Screen */}
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
                    Security Verification
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">
                    Kode OTP telah dikirim ke:
                  </p>
                  <p className="font-semibold text-purple-300">{email}</p>
                </div>

                <div className="space-y-5">
                  {/* OTP Input with Futuristic Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                      Masukkan 6 Digit Kode Verifikasi
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
                        Kirim ulang dalam{" "}
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

                  {/* Verify Button with Glow */}
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
                          <span>Memverifikasi...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Verifikasi & Masuk</span>
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
                    <span>Kembali ke Email</span>
                  </button>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Tidak menerima kode?{" "}
                    {countdown === 0 && (
                      <button
                        onClick={handleRequestOTP}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        Kirim ulang
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Chat Interface */}
        {step === "chat" && (
          <>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm flex items-center animate-in fade-in slide-in-from-top duration-300">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Futuristic Chat Container */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-10 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-0">
                  {/* Futuristic Messages Area */}
                  <div className="h-[600px] overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-slate-900/0 to-slate-900/30">
                    {isInitializing && messages.length === 0 ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                            <Loader2 className="relative w-12 h-12 animate-spin text-purple-400" />
                          </div>
                          <span className="text-gray-400 font-medium">
                            Menginisialisasi AI Consultant...
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
                            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                          >
                            <div
                              className={`flex gap-3 sm:gap-4 max-w-[85%] ${
                                message.role === "user"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                            >
                              {/* Futuristic Avatar */}
                              <div className="flex-shrink-0 relative">
                                {message.role === "assistant" && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                                )}
                                <div
                                  className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 ${
                                    message.role === "user"
                                      ? "bg-gradient-to-br from-purple-500 to-blue-500 border-purple-400/50"
                                      : "bg-gradient-to-br from-emerald-500 to-cyan-500 border-emerald-400/50 shadow-lg shadow-emerald-500/30"
                                  }`}
                                >
                                  {message.role === "user" ? (
                                    <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                  ) : (
                                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                  )}
                                </div>
                              </div>

                              {/* Message Bubble */}
                              <div className="flex flex-col">
                                <div
                                  className={`rounded-2xl px-5 py-3.5 shadow-lg ${
                                    message.role === "user"
                                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/20"
                                      : "bg-slate-800/80 border border-white/10 text-gray-200 backdrop-blur-sm"
                                  }`}
                                >
                                  <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                                    {message.content}
                                  </p>
                                </div>
                                <span
                                  className={`text-xs text-gray-500 mt-2 px-2 ${
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
                          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex gap-3 sm:gap-4 max-w-[85%]">
                              <div className="flex-shrink-0 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-cyan-500 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/30">
                                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                              </div>
                              <div className="rounded-2xl px-5 py-3.5 bg-slate-800/80 border border-white/10 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                                    <div
                                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                                      style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                      style={{ animationDelay: "0.2s" }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-400 font-medium">
                                    AI sedang berpikir...
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Collecting Data Display */}

                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Futuristic Input Area */}
                  <div className="border-t border-white/10 p-4 bg-gradient-to-b from-slate-900/50 to-slate-950/80 backdrop-blur-sm">
                    {collectingData && isDone ? (
                      // When collecting_data received and is_done true, show payment button
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 py-3 bg-green-500/10 rounded-xl border border-green-500/30">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <p className="text-sm font-medium text-green-300">
                            Data telah dikumpulkan! Siap untuk melanjutkan ke
                            pembayaran.
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 hover:opacity-75 transition-opacity duration-300"></div>
                          <button
                            onClick={handleGoToPayment}
                            className="relative w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/30"
                          >
                            <CreditCard className="w-5 h-5" />
                            <span>Lanjutkan ke Pembayaran</span>
                          </button>
                        </div>
                      </div>
                    ) : jsonData && isDone ? (
                      // When all batches done, show payment button
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 py-3 bg-green-500/10 rounded-xl border border-green-500/30">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <p className="text-sm font-medium text-green-300">
                            Semua batch scene selesai! Total{" "}
                            {editedScenes.length} scene telah dibuat.
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 hover:opacity-75 transition-opacity duration-300"></div>
                          <button
                            onClick={handleGoToPayment}
                            className="relative w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/30"
                          >
                            <CreditCard className="w-5 h-5" />
                            <span>Lanjutkan ke Pembayaran</span>
                          </button>
                        </div>
                      </div>
                    ) : jsonData && !isDone ? (
                      // When batch in progress, show processing status (auto-continue)
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 py-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                          <p className="text-sm font-medium text-blue-300">
                            Mohon menunggu, AI sedang memproses scene video...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <div className="flex-1 relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300"></div>
                          <textarea
                            ref={inputRef}
                            placeholder="Ketik pertanyaan Anda di sini..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading || isInitializing}
                            className="relative w-full px-4 py-3 bg-slate-800/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 min-h-[48px] max-h-[120px] resize-none"
                            rows={1}
                          />
                        </div>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-40"></div>
                          <button
                            onClick={handleSendMessage}
                            disabled={
                              !inputMessage.trim() ||
                              isLoading ||
                              isInitializing
                            }
                            className="relative h-full px-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-purple-500/20"
                          >
                            {isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Send className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Scenes Summary Display */}

            {/* Info Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-sm">
                        Bantuan 24/7
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        AI siap membantu kapan saja untuk pertanyaan Anda
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-sm">
                        Respons Cepat
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Dapatkan jawaban instan untuk semua pertanyaan Anda
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-sm">
                        Tips & Trik
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Pelajari cara membuat video yang sempurna
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
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
