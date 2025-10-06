import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { chatAIApi, videoHistoryApi } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleGoToPayment = () => {
    window.location.href = "/pembayaran";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

                {/* Payment Button (shown when isDone is true) */}
                {isDone && (
                  <div className="border-t p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Setup video selesai!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Lanjutkan ke pembayaran untuk membuat video Anda
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleGoToPayment}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Lanjut ke Pembayaran
                      </Button>
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t p-4 bg-background">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Ketik pertanyaan Anda di sini..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading || isInitializing}
                      className="flex-1"
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
