import React, { useState, useEffect } from "react";
import {
  X,
  Coins,
  Video,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Eye,
  Download,
  Calendar,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Merge,
  Check,
  List,
} from "lucide-react";
import {
  videoHistoryApi,
  type VideoHistoryItem,
  type CoinData,
} from "@/lib/api";

interface VideoHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoHistoryModal({ isOpen, onClose }: VideoHistoryModalProps) {
  const [step, setStep] = useState<"email" | "otp" | "history">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Video history data
  const [videoList, setVideoList] = useState<VideoHistoryItem[]>([]);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Tab and merge functionality
  const [activeTab, setActiveTab] = useState<"list" | "merge">("list");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergeResult, setMergeResult] = useState<any>(null);

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail("");
      setOtp("");
      setXApiKey(null);
      setError(null);
      setOtpSent(false);
      setCountdown(0);
      setVideoList([]);
      setCoinData(null);
      setCurrentPage(1);
      setActiveTab("list");
      setSelectedVideos([]);
      setMergeResult(null);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
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
      setLoading(true);
      setError(null);

      await videoHistoryApi.requestOTP(email);
      setOtpSent(true);
      setStep("otp");
      setCountdown(60); // 60 seconds countdown
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError("OTP tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await videoHistoryApi.verifyOTP(email, otp);
      setXApiKey(result.data["x-api-key"]);
      setStep("history");

      // Load video history and coin data
      await loadHistoryData(result.data["x-api-key"]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal verifikasi OTP");
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryData = async (apiKey: string) => {
    try {
      setLoadingHistory(true);

      // Load both video list and coin data in parallel
      const [videoResponse, coinResponse] = await Promise.all([
        videoHistoryApi.getVideoList(apiKey, currentPage, 5),
        videoHistoryApi.getCoinBalance(apiKey),
      ]);

      setVideoList(videoResponse.data);
      setTotalPages(videoResponse.last_page);
      setTotalVideos(videoResponse.total);
      setCoinData(coinResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handlePageChange = async (page: number) => {
    if (!xApiKey || page < 1 || page > totalPages) return;

    setCurrentPage(page);
    try {
      setLoadingHistory(true);
      const response = await videoHistoryApi.getVideoList(xApiKey, page, 5);
      setVideoList(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat halaman");
    } finally {
      setLoadingHistory(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "progress":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "Selesai";
      case "progress":
        return "Diproses";
      case "failed":
        return "Gagal";
      default:
        return "Menunggu";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleVideoAction = (video: VideoHistoryItem) => {
    if (video.status_video === "success" && video.url_video) {
      window.open(video.url_video, "_blank");
    }
  };

  const handleVideoSelect = (videoUrl: string) => {
    setSelectedVideos((prev) => {
      if (prev.includes(videoUrl)) {
        return prev.filter((url) => url !== videoUrl);
      } else {
        return [...prev, videoUrl];
      }
    });
  };

  const handleMergeVideos = async () => {
    if (selectedVideos.length < 2) {
      setError("Pilih minimal 2 video untuk digabungkan");
      return;
    }

    if (!xApiKey) {
      setError("API key tidak tersedia");
      return;
    }

    try {
      setMerging(true);
      setError(null);

      const response = await fetch(
        `${
          import.meta.env.PUBLIC_API_BASE_URL ||
          "https://api.instantvideoapp.com"
        }/api/video-ai/merge-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xApiKey,
          },
          body: JSON.stringify({
            url: selectedVideos,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status) {
        setMergeResult(result.data);
        setSelectedVideos([]);
      } else {
        throw new Error(result.message || "Gagal menggabungkan video");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menggabungkan video"
      );
    } finally {
      setMerging(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-[70] bg-slate-900 rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 flex-shrink-0">
          <div>
            <h3 className="text-lg font-semibold text-white">Riwayat Video</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {step === "email" && "Masukkan email untuk mengakses riwayat"}
              {step === "otp" && "Verifikasi OTP yang dikirim ke email"}
              {step === "history" && "Daftar video dan saldo koin Anda"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Step 1: Email Input - Native Style */}
          {step === "email" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 px-1">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Masukkan email Anda..."
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
                disabled={loading || !email.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Mengirim OTP...</span>
                  </>
                ) : (
                  "Kirim OTP"
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP Verification - Native Style */}
          {step === "otp" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-400 mb-1">
                  Kode OTP telah dikirim ke:
                </p>
                <p className="font-medium text-white">{email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                  Kode OTP
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
                    Kirim ulang dalam{" "}
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

              <div className="space-y-2">
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || !otp.trim() || otp.length !== 6}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    "Verifikasi OTP"
                  )}
                </button>

                <button
                  onClick={() => setStep("email")}
                  className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-gray-300 font-medium rounded-2xl transition-all"
                >
                  Kembali ke Email
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Video History - Native Style */}
          {step === "history" && (
            <div className="space-y-4">
              {/* Coin Balance Card */}
              {coinData && (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Coins className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-semibold text-white">
                      Saldo Koin
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-xl font-bold text-purple-400">
                        {coinData.quota.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400">Total Koin</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-400">
                        {coinData.hari_ini.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400">Hari Ini</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-400">
                        {coinData.minggu_ini.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400">Minggu Ini</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "list"
                      ? "bg-slate-700 text-white"
                      : "text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>List Video</span>
                </button>
                <button
                  onClick={() => setActiveTab("merge")}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "merge"
                      ? "bg-slate-700 text-white"
                      : "text-gray-400"
                  }`}
                >
                  <Merge className="w-4 h-4" />
                  <span>Merge Video</span>
                </button>
              </div>

              {/* Video List/Merge */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                  <div className="flex items-center space-x-2">
                    {activeTab === "list" ? (
                      <>
                        <Video className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-semibold text-white">
                          Daftar Video ({totalVideos})
                        </span>
                      </>
                    ) : (
                      <>
                        <Merge className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-semibold text-white">
                          Merge Video ({selectedVideos.length} dipilih)
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {activeTab === "merge" && selectedVideos.length >= 2 && (
                      <button
                        onClick={handleMergeVideos}
                        disabled={merging}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        {merging ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Menggabungkan...</span>
                          </>
                        ) : (
                          <>
                            <Merge className="w-3 h-3" />
                            <span>Gabungkan</span>
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => loadHistoryData(xApiKey!)}
                      disabled={loadingHistory}
                      className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <RefreshCw
                        className={`w-4 h-4 text-gray-400 ${
                          loadingHistory ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {loadingHistory ? (
                    <div className="flex justify-center items-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mr-2 text-purple-400" />
                      <span className="text-gray-400">Memuat data...</span>
                    </div>
                  ) : videoList.length === 0 ? (
                    <div className="text-center py-8">
                      <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm">
                        Belum ada video yang dibuat
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Merge Result */}
                      {mergeResult && activeTab === "merge" && (
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <h3 className="text-sm font-semibold text-green-300">
                              Video Berhasil Digabungkan!
                            </h3>
                          </div>
                          <p className="text-xs text-green-400 mb-3">
                            {mergeResult.list_merge_video?.length || 0} video
                            telah berhasil digabungkan
                          </p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                window.open(
                                  mergeResult.final_url_merge_video,
                                  "_blank"
                                )
                              }
                              className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Lihat Video</span>
                            </button>
                            <button
                              onClick={() =>
                                window.open(
                                  mergeResult.final_url_merge_video,
                                  "_blank"
                                )
                              }
                              className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-gray-300 text-xs font-medium rounded-lg transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Error Display */}
                      {error && (
                        <div className="flex items-start p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-red-300">{error}</span>
                        </div>
                      )}

                      {/* Video List */}
                      {videoList.map((video) => (
                        <div
                          key={video.id}
                          className={`p-3 bg-slate-800/50 border border-slate-700 rounded-xl transition-all active:scale-[0.98] ${
                            activeTab === "merge" &&
                            video.status_video === "success" &&
                            video.url_video
                              ? "cursor-pointer"
                              : ""
                          } ${
                            activeTab === "merge" &&
                            selectedVideos.includes(video.url_video || "")
                              ? "bg-blue-500/10 border-blue-500/50"
                              : ""
                          }`}
                          onClick={() => {
                            if (
                              activeTab === "merge" &&
                              video.status_video === "success" &&
                              video.url_video
                            ) {
                              handleVideoSelect(video.url_video);
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              {/* Checkbox for merge tab */}
                              {activeTab === "merge" &&
                                video.status_video === "success" &&
                                video.url_video && (
                                  <div className="flex items-center pt-1">
                                    <div
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                        selectedVideos.includes(video.url_video)
                                          ? "bg-blue-500 border-blue-500"
                                          : "border-slate-600"
                                      }`}
                                    >
                                      {selectedVideos.includes(
                                        video.url_video
                                      ) && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                )}

                              <div className="flex-1">
                                <div className="flex items-center flex-wrap gap-1.5 mb-2">
                                  <span
                                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[10px] font-medium ${
                                      video.status_video.toLowerCase() ===
                                      "success"
                                        ? "bg-green-500/20 text-green-400"
                                        : video.status_video.toLowerCase() ===
                                          "progress"
                                        ? "bg-blue-500/20 text-blue-400"
                                        : video.status_video.toLowerCase() ===
                                          "failed"
                                        ? "bg-red-500/20 text-red-400"
                                        : "bg-gray-500/20 text-gray-400"
                                    }`}
                                  >
                                    {getStatusIcon(video.status_video)}
                                    <span className="ml-1">
                                      {getStatusText(video.status_video)}
                                    </span>
                                  </span>
                                  <span className="px-2 py-0.5 bg-slate-700/50 border border-slate-600 rounded-lg text-[10px] text-gray-300">
                                    {video.model_ai}
                                  </span>
                                  <span className="px-2 py-0.5 bg-slate-700/50 border border-slate-600 rounded-lg text-[10px] text-gray-300">
                                    {video.aspect_ratio}
                                  </span>
                                </div>

                                <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                                  {video.prompt}
                                </p>

                                <div className="flex items-center flex-wrap gap-3 text-[10px] text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(video.created_at)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Settings className="w-3 h-3" />
                                    <span>{video.resolusi_video}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action buttons for list tab */}
                            {activeTab === "list" &&
                              video.status_video === "success" &&
                              video.url_video && (
                                <div className="flex flex-col space-y-1.5 ml-3">
                                  <button
                                    onClick={() => handleVideoAction(video)}
                                    className="flex items-center space-x-1 px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-medium rounded-lg transition-colors"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>Lihat</span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      window.open(video.url_video!, "_blank")
                                    }
                                    className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-gray-300 text-[10px] font-medium rounded-lg transition-colors"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Download</span>
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loadingHistory}
                        className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-400" />
                      </button>

                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const page = i + 1;
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={loadingHistory}
                                className={`min-w-[32px] px-2 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
                                  currentPage === page
                                    ? "bg-purple-600 text-white"
                                    : "bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-400"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loadingHistory}
                        className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
