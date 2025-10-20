import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Settings,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Play,
  Download,
  Eye,
  Loader2,
  Video,
  Sparkles,
  Calendar,
  Film,
} from "lucide-react";
import {
  videoHistoryApi,
  type VideoHistoryItem,
  type VideoHistoryResponse,
} from "@/lib/api";

// Helper function for status colors
const getStatusColor = (status: string) => {
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

export function VideoHistory() {
  // Authentication states
  const [step, setStep] = useState<"email" | "otp" | "history">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // History states
  const [videos, setVideos] = useState<VideoHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalVideos, setTotalVideos] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoHistoryItem | null>(
    null
  );

  // Countdown timer for OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check for existing x-api-key in localStorage
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

  // Fetch videos when authenticated
  useEffect(() => {
    if (xApiKey && step === "history") {
      fetchVideos();
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
      localStorage.setItem("riwayat-email", email);
      setStep("history");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal verifikasi OTP");
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
      setError("Gagal memuat riwayat video. Silakan coba lagi.");
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
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

          {step !== "history" && (
            <div className="text-center mb-8">
              {/* Logo with Glow */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-2 border-blue-400/50">
                  <Film className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Riwayat Video
                </span>
              </h1>

              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {step === "email" &&
                  "Masuk untuk melihat semua video yang telah Anda buat"}
                {step === "otp" &&
                  "Masukkan kode verifikasi untuk mengakses riwayat video"}
              </p>
            </div>
          )}

          {step === "history" && (
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-2 border-blue-400/50">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Riwayat Video
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-400">
                      {totalVideos} video tersimpan
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/20"
              >
                Keluar
              </Button>
            </div>
          )}
        </div>

        {/* Step 1: Email Input */}
        {step === "email" && (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4 border border-blue-500/30">
                    <Mail className="w-7 h-7 text-blue-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Access Portal
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Masukkan email untuk mengakses riwayat
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>

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
                          className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-300">{error}</span>
                    </div>
                  )}

                  <div className="relative pt-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <button
                      onClick={handleRequestOTP}
                      disabled={authLoading || !email.trim()}
                      className="relative w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                    >
                      {authLoading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Mengirim OTP...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Akses Riwayat</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                  Kode verifikasi akan dikirim ke email Anda
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4 border border-blue-500/30">
                    <Settings className="w-7 h-7 text-blue-300 animate-spin-slow" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Security Verification
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">
                    Kode OTP telah dikirim ke:
                  </p>
                  <p className="font-semibold text-blue-300">{email}</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                      Masukkan 6 Digit Kode Verifikasi
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>

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
                        className="relative w-full px-4 py-4 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white text-center text-2xl font-mono tracking-widest placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {countdown > 0 && (
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-400">
                        Kirim ulang dalam{" "}
                        <span className="text-cyan-400 font-semibold">
                          {countdown}s
                        </span>
                      </span>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-start p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-300">{error}</span>
                    </div>
                  )}

                  <div className="relative pt-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <button
                      onClick={handleVerifyOTP}
                      disabled={authLoading || !otp.trim() || otp.length !== 6}
                      className="relative w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
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

                  <button
                    onClick={() => setStep("email")}
                    className="w-full py-3 bg-slate-900/50 hover:bg-slate-800/50 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Email</span>
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Tidak menerima kode?{" "}
                    {countdown === 0 && (
                      <button
                        onClick={handleRequestOTP}
                        className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
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

        {/* Step 3: Video History Grid */}
        {step === "history" && (
          <>
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm flex items-center animate-in fade-in slide-in-from-top duration-300">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative flex flex-col items-center space-y-4 bg-slate-900/50 border border-blue-500/20 rounded-2xl px-12 py-8 backdrop-blur-sm">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                    <div className="text-center">
                      <p className="text-gray-300 text-sm font-medium">
                        Memuat riwayat video...
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Mohon tunggu sebentar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : videos.length === 0 ? (
              // Empty State
              <div className="text-center py-24">
                <div className="max-w-md mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-12 backdrop-blur-sm">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                    <Video className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Belum Ada Video
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Anda belum memiliki riwayat video. Mulai buat video pertama
                    Anda!
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/konsultan-video")}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/20"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Buat Video Sekarang
                  </Button>
                </div>
              </div>
            ) : (
              // Video Grid
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {videos.map((videoGroup) => {
                    // Get the merged video or first video from list
                    const displayVideo = videoGroup.final_url_merge_video;
                    const firstVideo = videoGroup.list_video[0];
                    const status = firstVideo?.status_video || "processing";
                    const prompt = firstVideo?.prompt || "No description";

                    return (
                      <div
                        key={videoGroup.id}
                        className="group cursor-pointer relative"
                        onClick={() => setSelectedVideo(videoGroup)}
                      >
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>

                        {/* Card */}
                        <div className="relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm aspect-video transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                          <div className="relative w-full h-full">
                            {displayVideo ? (
                              <video
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              >
                                <source src={displayVideo} type="video/mp4" />
                              </video>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <div className="text-center px-4">
                                  <Video className="w-12 h-12 mx-auto mb-2 text-gray-500 opacity-30" />
                                  <p className="text-xs text-gray-500">
                                    {status}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              {/* Status Badge */}
                              <div className="flex justify-end">
                                <Badge
                                  className={`text-xs px-2 py-1 ${getStatusColor(
                                    status
                                  )}`}
                                >
                                  {status}
                                </Badge>
                              </div>

                              {/* Bottom Info */}
                              <div>
                                <p className="text-white text-sm font-medium mb-2 line-clamp-2">
                                  {prompt}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-gray-400 text-xs">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {formatDate(videoGroup.created_at)}
                                  </div>
                                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-lg shadow-blue-500/30">
                                    <Eye className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <VideoDetailModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

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

// Video Detail Modal Component
interface VideoDetailModalProps {
  video: VideoHistoryItem;
  onClose: () => void;
}

function VideoDetailModal({ video, onClose }: VideoDetailModalProps) {
  const displayVideo = video.final_url_merge_video;
  const firstVideo = video.list_video[0];
  const status = firstVideo?.status_video || "processing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/20 shadow-2xl shadow-blue-500/10 w-full h-full max-w-none max-h-none overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/50 to-slate-950/90 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-300 hover:text-white hover:bg-blue-500/10 border border-blue-500/20"
            >
              ← Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Detail Video
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-300 hover:text-white hover:bg-red-500/10 border border-red-500/20"
          >
            ✕ Close
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Player */}
          <div className="flex-1 bg-slate-900/50 relative">
            {displayVideo ? (
              <div className="w-full h-full relative p-8">
                <div className="absolute inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-2xl" />
                <video
                  controls
                  className="relative w-full h-full object-contain rounded-xl border border-blue-500/20 shadow-2xl shadow-blue-500/20"
                >
                  <source src={displayVideo} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-24 h-24 mx-auto mb-6 text-blue-500/30" />
                  <div className="text-2xl font-bold text-gray-300 mb-4">
                    Video {status}
                  </div>
                  <p className="text-gray-500">
                    Video sedang diproses atau tidak tersedia
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="w-96 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-white/10 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-300 font-semibold text-sm">
                    Status
                  </h3>
                  <Badge className={getStatusColor(status)}>{status}</Badge>
                </div>
                <div className="text-gray-400 text-xs">
                  <div className="flex justify-between mb-1">
                    <span>Dibuat:</span>
                    <span className="text-gray-300">
                      {new Date(video.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>UUID:</span>
                    <span className="text-gray-300 font-mono text-xs">
                      {video.uuid_flag.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Video List */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Scene List ({video.list_video.length} scenes)
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {video.list_video.map((scene, index) => (
                    <div
                      key={scene.id}
                      className="bg-slate-800/50 border border-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-300 font-semibold">
                          Scene {index + 1}
                        </span>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            scene.status_video
                          )}`}
                        >
                          {scene.status_video}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {scene.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt (First Scene) */}
              {/* <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-3 flex items-center">
                  <Film className="w-4 h-4 mr-2" />
                  First Scene Prompt
                </h3>
                <div className="bg-slate-900/80 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {firstVideo?.prompt || "No prompt available"}
                  </p>
                </div>
              </div> */}

              {/* Actions */}
              {displayVideo && (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30" />
                  <a
                    href={displayVideo}
                    download
                    className="relative block w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-lg shadow-blue-500/30"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    Download Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
