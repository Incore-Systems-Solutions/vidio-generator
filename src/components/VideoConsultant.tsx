import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  data: SceneData[];
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

  // Countdown timer for OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Initialize chat when x-api-key is available
  useEffect(() => {
    if (xApiKey && step === "chat") {
      initializeChat();
    }
  }, [xApiKey, step]);

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
        const initialMessage: Message = {
          id: "initial",
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
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

        setMessages((prev) => [...prev, aiResponse]);
        setIsDone(response.data.is_done);

        // Check if json_data exists and type is prompt_video
        if (response.data.json_data && response.data.json_data.type === "prompt_video") {
          console.log("Received json_data:", response.data.json_data);
          console.log("is_done:", response.data.is_done);
          
          setJsonData(response.data.json_data);
          
          // Always accumulate scenes from all batches
          setEditedScenes((prev) => {
            const newScenes = response.data.json_data?.data || [];
            const accumulated = [...prev, ...newScenes];
            console.log(`Accumulating scenes: ${prev.length} + ${newScenes.length} = ${accumulated.length}`);
            return accumulated;
          });
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
      setEditedScenes([]);
      setHasEdited(false);

      const response = await chatAIApi.initChat(xApiKey);

      if (response.status) {
        setChatUuid(response.data.uuid);
        const initialMessage: Message = {
          id: "initial-" + Date.now(),
          role: "assistant",
          content: response.data.message.content,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
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

  const handleSceneEdit = (sceneIndex: number, field: string, value: string) => {
    setEditedScenes((prev) => {
      const updated = [...prev];
      updated[sceneIndex] = {
        ...updated[sceneIndex],
        [field]: value,
      };
      return updated;
    });
    setHasEdited(true);
  };

  const handleSubSceneEdit = (
    sceneIndex: number,
    subSceneIndex: number,
    field: string,
    value: string
  ) => {
    setEditedScenes((prev) => {
      const updated = [...prev];
      const updatedSubScenes = [...updated[sceneIndex].sub_scene_detail];
      updatedSubScenes[subSceneIndex] = {
        ...updatedSubScenes[subSceneIndex],
        [field]: value,
      };
      updated[sceneIndex] = {
        ...updated[sceneIndex],
        sub_scene_detail: updatedSubScenes,
      };
      return updated;
    });
    setHasEdited(true);
  };

  const handleGoToPayment = () => {
    console.log("handleGoToPayment called - isDone:", isDone, "editedScenes:", editedScenes.length);
    
    // Check if batch is completed (isDone must be true)
    if (!isDone) {
      setError("Silakan selesaikan semua batch terlebih dahulu sebelum melanjutkan ke pembayaran");
      return;
    }

    if (!editedScenes.length || !xApiKey || !email) {
      setError("Data tidak lengkap untuk melakukan pembayaran");
      return;
    }

    try {
      // Save konsultan data to localStorage
      const konsultanData = {
        type: "konsultan",
        list: editedScenes,
        email: email,
        xApiKey: xApiKey,
        is_share: "y",
        affiliate_by: "",
      };

      localStorage.setItem("konsultan-video-data", JSON.stringify(konsultanData));
      console.log("Konsultan data saved to localStorage:", {
        ...konsultanData,
        sceneCount: editedScenes.length
      });

      // Redirect to payment page
      window.location.href = "/pembayaran";
    } catch (err) {
      console.error("Error saving konsultan data:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan data"
      );
    }
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
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mr-3" />
                Konsultan Video AI
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {step === "email" && "Masukkan email untuk memulai konsultasi"}
                {step === "otp" && "Verifikasi OTP yang dikirim ke email"}
                {step === "chat" &&
                  "Tanyakan apa saja tentang pembuatan video kepada asisten AI kami"}
              </p>
            </div>
            {step === "chat" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                className="flex items-center space-x-2"
                disabled={isInitializing}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Hapus Chat</span>
              </Button>
            )}
          </div>
        </div>

        {/* Step 1: Email Input */}
        {step === "email" && (
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5" />
                  <span>Masukkan Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleRequestOTP()}
                  />
                </div>

                {error && (
                  <div className="flex items-center p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-sm text-red-800 dark:text-red-200">
                      {error}
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleRequestOTP}
                  disabled={authLoading || !email.trim()}
                  className="w-full"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim OTP...
                    </>
                  ) : (
                    "Kirim OTP"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Verifikasi OTP</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Kode OTP telah dikirim ke:
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kode OTP
                  </label>
                  <Input
                    type="text"
                    placeholder="Masukkan 6 digit OTP..."
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    onKeyPress={(e) => e.key === "Enter" && handleVerifyOTP()}
                    maxLength={6}
                  />
                </div>

                {countdown > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Kirim ulang OTP dalam {countdown} detik
                    </p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-sm text-red-800 dark:text-red-200">
                      {error}
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={authLoading || !otp.trim() || otp.length !== 6}
                    className="w-full"
                  >
                    {authLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Memverifikasi...
                      </>
                    ) : (
                      "Verifikasi OTP"
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setStep("email")}
                    className="w-full"
                  >
                    Kembali ke Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Chat Interface */}
        {step === "chat" && (
          <>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                <span className="text-red-800 dark:text-red-200 text-sm">
                  {error}
                </span>
              </div>
            )}

            {/* Chat Container */}
            <Card className="shadow-xl border-0 bg-card">
              <CardContent className="p-0">
                {/* Messages Area */}
                <div className="h-[600px] overflow-y-auto p-4 sm:p-6 space-y-4">
                  {isInitializing && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="flex flex-col items-center space-y-3">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                        <span className="text-muted-foreground">
                          Menginisialisasi chat...
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
                            className={`flex gap-3 max-w-[85%] ${
                              message.role === "user"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}
                          >
                            {/* Avatar */}
                            <div
                              className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500"
                              }`}
                            >
                              {message.role === "user" ? (
                                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              )}
                            </div>

                            {/* Message Bubble */}
                            <div className="flex flex-col">
                              <div
                                className={`rounded-2xl px-4 py-3 ${
                                  message.role === "user"
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                    : "bg-muted border border-border"
                                }`}
                              >
                                <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                                  {message.content}
                                </p>
                              </div>
                              <span
                                className={`text-xs text-muted-foreground mt-1 px-2 ${
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

                      {isLoading && (
                        <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="flex gap-3 max-w-[85%]">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500">
                              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="rounded-2xl px-4 py-3 bg-muted border border-border">
                              <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                                <span className="text-sm text-muted-foreground">
                                  Sedang mengetik...
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

                {/* Input Area */}
                <div className="border-t p-4 bg-background">
                  {jsonData && isDone ? (
                    <div className="text-center py-2">
                      <p className="text-sm text-muted-foreground">
                        Chat telah selesai. Silakan edit detail video di bawah.
                      </p>
                    </div>
                  ) : jsonData && !isDone ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 py-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Masih ada batch berikutnya. Lanjutkan chat untuk mendapatkan scene tambahan.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Textarea
                          ref={inputRef}
                          placeholder="Lanjutkan chat untuk batch berikutnya..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={isLoading || isInitializing}
                          className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                          rows={1}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={
                            !inputMessage.trim() || isLoading || isInitializing
                          }
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Textarea
                        ref={inputRef}
                        placeholder="Ketik pertanyaan Anda di sini..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading || isInitializing}
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                        rows={1}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={
                          !inputMessage.trim() || isLoading || isInitializing
                        }
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Quick Suggestions */}
                  {/* {!isDone && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        Coba tanya:
                      </span>
                      {[
                        "Tips karakter",
                        "Cara menulis prompt",
                        "Info harga",
                        "Kualitas video",
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => {
                            setInputMessage(suggestion);
                            inputRef.current?.focus();
                          }}
                          disabled={isLoading || isInitializing}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>

            {/* Video Scenes Editor */}
            {jsonData && editedScenes.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-bold text-foreground">
                      Detail Video Prompt
                    </h2>
                    {!isDone && (
                      <Badge className="bg-yellow-500 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        Batch Berlanjut
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {editedScenes.length} Scene{editedScenes.length > 1 ? "s" : ""}
                  </Badge>
                </div>

                {editedScenes.map((scene, sceneIndex) => (
                  <Card
                    key={scene.scene}
                    className="border-2 border-purple-200 dark:border-purple-800 shadow-md"
                  >
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">Scene {scene.scene}</span>
                        <Badge className="bg-purple-600">
                          {scene.durasi_scene}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {/* Judul */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Judul
                        </label>
                        <Input
                          value={scene.judul}
                          onChange={(e) =>
                            handleSceneEdit(sceneIndex, "judul", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Bagian */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Bagian
                        </label>
                        <Input
                          value={scene.bagian}
                          onChange={(e) =>
                            handleSceneEdit(sceneIndex, "bagian", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Durasi Scene */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Durasi Scene
                        </label>
                        <Input
                          value={scene.durasi_scene}
                          onChange={(e) =>
                            handleSceneEdit(
                              sceneIndex,
                              "durasi_scene",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Deskripsi Visual */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Deskripsi Visual
                        </label>
                        <textarea
                          value={scene.deskripsi_visual}
                          onChange={(e) =>
                            handleSceneEdit(
                              sceneIndex,
                              "deskripsi_visual",
                              e.target.value
                            )
                          }
                          className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                          rows={4}
                        />
                      </div>

                      {/* Sub Scene Interval */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Sub Scene Interval
                        </label>
                        <Input
                          value={scene.sub_scene_interval}
                          onChange={(e) =>
                            handleSceneEdit(
                              sceneIndex,
                              "sub_scene_interval",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Sub Scenes */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Detail Sub Scene
                        </label>
                        <div className="space-y-3">
                          {scene.sub_scene_detail.map((subScene, subSceneIndex) => (
                            <Card
                              key={subSceneIndex}
                              className="bg-muted/50 border border-border"
                            >
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="secondary">
                                    {subScene.waktu}
                                  </Badge>
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Waktu
                                  </label>
                                  <Input
                                    value={subScene.waktu}
                                    onChange={(e) =>
                                      handleSubSceneEdit(
                                        sceneIndex,
                                        subSceneIndex,
                                        "waktu",
                                        e.target.value
                                      )
                                    }
                                    className="w-full"
                                    size={1}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Aksi dan Kamera
                                  </label>
                                  <textarea
                                    value={subScene.aksi_dan_kamera}
                                    onChange={(e) =>
                                      handleSubSceneEdit(
                                        sceneIndex,
                                        subSceneIndex,
                                        "aksi_dan_kamera",
                                        e.target.value
                                      )
                                    }
                                    className="w-full min-h-[60px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                                    rows={2}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Atmosfer
                                  </label>
                                  <textarea
                                    value={subScene.atmosfer}
                                    onChange={(e) =>
                                      handleSubSceneEdit(
                                        sceneIndex,
                                        subSceneIndex,
                                        "atmosfer",
                                        e.target.value
                                      )
                                    }
                                    className="w-full min-h-[60px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                                    rows={2}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Audio dan Suara */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Audio dan Suara
                        </label>
                        <textarea
                          value={scene.audio_dan_suara}
                          onChange={(e) =>
                            handleSceneEdit(
                              sceneIndex,
                              "audio_dan_suara",
                              e.target.value
                            )
                          }
                          className="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Confirmation Box */}
                {!isDone ? (
                  <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">
                              Batch Scene Belum Selesai
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Masih ada batch berikutnya. Lanjutkan chat dengan AI untuk mendapatkan semua scene video Anda. Saat ini {editedScenes.length} scene sudah tersedia.
                            </p>
                          </div>
                        </div>
                        <Button
                          disabled
                          size="lg"
                          className="bg-gray-400 cursor-not-allowed whitespace-nowrap ml-4 px-8"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Lanjut ke Pembayaran
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : !hasEdited ? (
                  <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">
                              Review Setup Video Anda
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Periksa detail video di atas. Anda dapat mengedit jika
                              diperlukan, atau konfirmasi untuk melanjutkan.
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setHasEdited(true)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 whitespace-nowrap ml-4"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Konfirmasi Setup
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-foreground mb-1">
                              Setup Video Selesai!
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Data video Anda ({editedScenes.length} scene) siap untuk diproses.
                              Lanjutkan ke pembayaran untuk membuat video Anda.
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleGoToPayment}
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 whitespace-nowrap ml-4 px-8"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Lanjut ke Pembayaran
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

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
    </div>
  );
}
