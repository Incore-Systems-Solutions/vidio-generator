import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  History,
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
  Play,
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <History className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Riwayat Video
              </h2>
              <p className="text-sm text-muted-foreground">
                {step === "email" && "Masukkan email untuk mengakses riwayat"}
                {step === "otp" && "Verifikasi OTP yang dikirim ke email"}
                {step === "history" && "Daftar video dan saldo koin Anda"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Step 1: Email Input */}
          {step === "email" && (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
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
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleRequestOTP()
                      }
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
                    disabled={loading || !email.trim()}
                    className="w-full"
                  >
                    {loading ? (
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
                      disabled={loading || !otp.trim() || otp.length !== 6}
                      className="w-full"
                    >
                      {loading ? (
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

          {/* Step 3: Video History */}
          {step === "history" && (
            <div className="space-y-6">
              {/* Coin Balance Card */}
              {coinData && (
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Coins className="w-5 h-5 text-purple-600" />
                      <span>Saldo Koin</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {coinData.quota.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Koin
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {coinData.hari_ini.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Hari Ini
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {coinData.minggu_ini.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Minggu Ini
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "list"
                      ? "bg-white dark:bg-gray-700 text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>List Video</span>
                </button>
                <button
                  onClick={() => setActiveTab("merge")}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "merge"
                      ? "bg-white dark:bg-gray-700 text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Merge className="w-4 h-4" />
                  <span>Merge Video</span>
                </button>
              </div>

              {/* Video List/Merge */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {activeTab === "list" ? (
                        <>
                          <Video className="w-5 h-5" />
                          <span>Daftar Video ({totalVideos})</span>
                        </>
                      ) : (
                        <>
                          <Merge className="w-5 h-5" />
                          <span>
                            Merge Video ({selectedVideos.length} dipilih)
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {activeTab === "merge" && selectedVideos.length >= 2 && (
                        <Button
                          onClick={handleMergeVideos}
                          disabled={merging}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {merging ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Menggabungkan...
                            </>
                          ) : (
                            <>
                              <Merge className="w-4 h-4 mr-2" />
                              Gabungkan Video
                            </>
                          )}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadHistoryData(xApiKey!)}
                        disabled={loadingHistory}
                      >
                        <RefreshCw
                          className={`w-4 h-4 mr-2 ${
                            loadingHistory ? "animate-spin" : ""
                          }`}
                        />
                        Refresh
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingHistory ? (
                    <div className="flex justify-center items-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                      <span>Memuat data...</span>
                    </div>
                  ) : videoList.length === 0 ? (
                    <div className="text-center py-8">
                      <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Belum ada video yang dibuat
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Merge Result */}
                      {mergeResult && activeTab === "merge" && (
                        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-green-800 dark:text-green-200">
                              Video Berhasil Digabungkan!
                            </h3>
                          </div>
                          <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                            {mergeResult.list_merge_video?.length || 0} video
                            telah berhasil digabungkan
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                window.open(
                                  mergeResult.final_url_merge_video,
                                  "_blank"
                                )
                              }
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Lihat Video
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                window.open(
                                  mergeResult.final_url_merge_video,
                                  "_blank"
                                )
                              }
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Error Display */}
                      {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-800 dark:text-red-200">
                              {error}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Video List */}
                      {videoList.map((video) => (
                        <div
                          key={video.id}
                          className={`p-4 border rounded-lg transition-colors ${
                            activeTab === "merge" &&
                            video.status_video === "success" &&
                            video.url_video
                              ? "hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          } ${
                            activeTab === "merge" &&
                            selectedVideos.includes(video.url_video || "")
                              ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700"
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
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                        selectedVideos.includes(video.url_video)
                                          ? "bg-blue-600 border-blue-600"
                                          : "border-gray-300 dark:border-gray-600"
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
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge
                                    className={getStatusColor(
                                      video.status_video
                                    )}
                                  >
                                    {getStatusIcon(video.status_video)}
                                    <span className="ml-1">
                                      {getStatusText(video.status_video)}
                                    </span>
                                  </Badge>
                                  <Badge variant="outline">
                                    {video.model_ai}
                                  </Badge>
                                  <Badge variant="outline">
                                    {video.aspect_ratio}
                                  </Badge>
                                </div>

                                <p className="text-sm text-foreground mb-2 line-clamp-2">
                                  {video.prompt}
                                </p>

                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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
                                <div className="flex space-x-2 ml-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleVideoAction(video)}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Lihat
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      window.open(video.url_video!, "_blank")
                                    }
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loadingHistory}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const page = i + 1;
                            return (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                disabled={loadingHistory}
                              >
                                {page}
                              </Button>
                            );
                          }
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loadingHistory}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
