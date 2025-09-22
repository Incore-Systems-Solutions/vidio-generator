import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  CreditCard,
  DollarSign,
  FileText,
  ExternalLink,
  Video,
  User,
  Mail,
  Phone,
  Play,
  Download,
  Eye,
} from "lucide-react";
import { videoGenerationApi, type VideoGenerationData } from "@/lib/api";
import { videoSetupStorage } from "@/lib/videoSetupStorage";

interface GenerateVideoProps {
  onBack?: () => void;
}

export function GenerateVideo({ onBack }: GenerateVideoProps) {
  const [videoData, setVideoData] = useState<VideoGenerationData | null>(null);
  const [videoSetupData, setVideoSetupData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutes in seconds
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepProgress, setStepProgress] = useState<number>(0);
  const [videoResult, setVideoResult] = useState<{
    status_video: string;
    task_id: string;
    resultUrl: string;
  } | null>(null);

  const fetchVideoGeneration = async () => {
    try {
      setError(null);
      const xApiKey = localStorage.getItem("x-api-key");

      if (!xApiKey) {
        throw new Error(
          "API key tidak ditemukan. Silakan lakukan pembayaran terlebih dahulu."
        );
      }

      const response = await videoGenerationApi.generateVideo(xApiKey);
      if (response.status) {
        setVideoData(response.data);

        // Calculate progress based on status
        if (response.data.status_video === "progress") {
          // Start progress animation if not already started
          if (overallProgress === 0) {
            startProgressAnimation();
          }
        } else if (response.data.status_video === "success") {
          // If status is already success, check video status immediately
          if (response.data.task_id) {
            try {
              const checkResult = await videoGenerationApi.checkVideoStatus(
                response.data.task_id
              );
              if (
                checkResult.status &&
                checkResult.data.status_video === "success"
              ) {
                setVideoResult(checkResult.data);
              }
            } catch (err) {
              console.error("Error checking video status:", err);
            }
          }
          setOverallProgress(100);
          setTimeRemaining(0);
          setCurrentStep(5);
          setStepProgress(100);
        } else if (response.data.status_video === "failed") {
          setOverallProgress(0);
          setTimeRemaining(0);
          setCurrentStep(1);
          setStepProgress(0);
        }
      } else {
        throw new Error(response.message || "Failed to fetch video generation");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch video generation"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchVideoGeneration();
  };

  const startProgressAnimation = () => {
    // Reset progress
    setOverallProgress(0);
    setCurrentStep(1);
    setStepProgress(0);
    setTimeRemaining(300); // 5 minutes

    // Start countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start progress animation
    const progressInterval = setInterval(() => {
      setOverallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5; // Increase by 0.5% every 1.5 seconds (300 seconds total)
      });
    }, 1500);

    // Start step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          return 5;
        }
        return prev + 1;
      });
    }, 60000); // Move to next step every minute

    // Start step progress animation
    const stepProgressInterval = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepProgressInterval);
          return 100;
        }
        return prev + 1; // Increase by 1% every 600ms
      });
    }, 600);

    // Cleanup function
    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(stepProgressInterval);
    };
  };

  useEffect(() => {
    fetchVideoGeneration();
    // Load video setup data from localStorage
    const storedVideoData = videoSetupStorage.load();
    setVideoSetupData(storedVideoData);
  }, []);

  // Polling effect for progress status
  useEffect(() => {
    if (videoData?.status_video === "progress") {
      // Start progress animation when status is progress
      const cleanup = startProgressAnimation();

      // After 5 minutes, check video status
      const timeout = setTimeout(async () => {
        if (videoData?.task_id) {
          try {
            const checkResult = await videoGenerationApi.checkVideoStatus(
              videoData.task_id
            );
            if (
              checkResult.status &&
              checkResult.data.status_video === "success"
            ) {
              setVideoResult(checkResult.data);
              setOverallProgress(100);
              setCurrentStep(5);
              setStepProgress(100);
            }
          } catch (err) {
            console.error("Error checking video status:", err);
          }
        }
      }); // 5 minutes

      return () => {
        cleanup();
        clearTimeout(timeout);
      };
    }
  }, [videoData?.status_video]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "progress":
        return <RefreshCw className="w-5 h-5 text-purple-600 animate-spin" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "progress":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "Video Berhasil Dihasilkan";
      case "progress":
        return "Sedang Dihasilkan";
      case "failed":
        return "Gagal Dihasilkan";
      default:
        return "Menunggu";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getProcessSteps = () => {
    const steps = [
      {
        id: 1,
        title: "Memproses Pembayaran",
        description: "Verifikasi pembayaran dan mengaktifkan layanan",
        icon: <CheckCircle className="w-5 h-5" />,
        status: "completed",
        color: "green",
        progress: 100,
      },
      {
        id: 2,
        title: "Mempersiapkan Karakter AI",
        description: "Menganalisis dan memproses karakter yang dipilih",
        icon:
          currentStep >= 2 ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Video className="w-5 h-5" />
          ),
        status:
          currentStep > 2
            ? "completed"
            : currentStep === 2
            ? "in-progress"
            : "waiting",
        color:
          currentStep > 2 ? "green" : currentStep === 2 ? "purple" : "gray",
        progress: currentStep > 2 ? 100 : currentStep === 2 ? stepProgress : 0,
      },
      {
        id: 3,
        title: "Menyiapkan Environment",
        description: "Memproses background dan pengaturan lingkungan",
        icon:
          currentStep >= 3 ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Video className="w-5 h-5" />
          ),
        status:
          currentStep > 3
            ? "completed"
            : currentStep === 3
            ? "in-progress"
            : "waiting",
        color:
          currentStep > 3 ? "green" : currentStep === 3 ? "purple" : "gray",
        progress: currentStep > 3 ? 100 : currentStep === 3 ? stepProgress : 0,
      },
      {
        id: 4,
        title: "Menghasilkan Voice AI",
        description: "Membuat suara menggunakan AI",
        icon:
          currentStep >= 4 ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          ),
        status:
          currentStep > 4
            ? "completed"
            : currentStep === 4
            ? "in-progress"
            : "waiting",
        color:
          currentStep > 4 ? "green" : currentStep === 4 ? "purple" : "gray",
        progress: currentStep > 4 ? 100 : currentStep === 4 ? stepProgress : 0,
      },
      {
        id: 5,
        title: "Rendering Video Final",
        description: "Menggabungkan semua elemen menjadi video final",
        icon:
          currentStep >= 5 ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Video className="w-5 h-5" />
          ),
        status:
          currentStep > 5
            ? "completed"
            : currentStep === 5
            ? "in-progress"
            : "waiting",
        color:
          currentStep > 5 ? "green" : currentStep === 5 ? "purple" : "gray",
        progress: currentStep > 5 ? 100 : currentStep === 5 ? stepProgress : 0,
      },
    ];

    return steps;
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Memuat progress generation...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Gagal Memuat Progress
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Memuat...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Coba Lagi
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Progress Generation
            </h1>
            <p className="text-muted-foreground">Video AI sedang diproses</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Progress Generation Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Progress Generation
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Overall Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Progress Keseluruhan
              </span>
              <span className="text-sm font-bold text-foreground">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Time Remaining */}
          {videoData?.status_video === "progress" && (
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Tersisa {formatTime(timeRemaining)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Process Details Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Detail Proses
          </h2>
          <p className="text-muted-foreground">
            Proses pembuatan video AI sedang berlangsung
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {getProcessSteps().map((step) => (
              <div
                key={step.id}
                className={`p-6 border rounded-xl transition-all ${
                  step.status === "completed"
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : step.status === "in-progress"
                    ? "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : step.status === "in-progress"
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <div
                        className={
                          step.status === "completed"
                            ? "text-green-600 dark:text-green-400"
                            : step.status === "in-progress"
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-600 dark:text-gray-400"
                        }
                      >
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          step.status === "completed"
                            ? "text-green-800 dark:text-green-200"
                            : step.status === "in-progress"
                            ? "text-purple-800 dark:text-purple-200"
                            : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>

                      {/* Step Progress Bar */}
                      {step.status === "in-progress" && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round(step.progress)}% selesai
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    className={
                      step.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : step.status === "in-progress"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }
                  >
                    {step.status === "completed"
                      ? "Selesai"
                      : step.status === "in-progress"
                      ? "Sedang Proses"
                      : "Menunggu"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Result Section */}
      {(videoData?.status_video === "success" ||
        videoResult?.status_video === "success") && (
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Video Hasil
            </h2>
            <p className="text-muted-foreground">
              Video AI Anda telah selesai diproses
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Video AI Siap</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Video preview akan muncul di sini
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => {
                        if (videoResult?.resultUrl) {
                          window.location.href = `/download?url=${encodeURIComponent(
                            videoResult.resultUrl
                          )}&taskId=${videoResult.task_id}`;
                        }
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat Video
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (videoResult?.resultUrl) {
                          window.location.href = `/download?url=${encodeURIComponent(
                            videoResult.resultUrl
                          )}&taskId=${videoResult.task_id}`;
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Video Details */}
      {videoData && (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Detail Video</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Task ID</p>
                  <p className="font-medium text-foreground">
                    {videoData.task_id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model AI</p>
                  <Badge variant="outline">{videoData.model_ai}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aspect Ratio</p>
                  <Badge variant="outline">{videoData.aspect_ratio}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(videoData.status_video)}>
                    {getStatusText(videoData.status_video)}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prompt</p>
                <p className="text-sm text-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {videoData.prompt}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
