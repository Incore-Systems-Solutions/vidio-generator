import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Sparkles,
  Play,
  Download,
  RefreshCw,
  Film,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Video as VideoIcon,
  Zap,
} from "lucide-react";

const BASE_URL = "https://api.instantvideoapp.com";

interface ApiSceneData {
  id: number;
  user_video_id: string;
  estimated_scene: string;
  task_id: string;
  status_video: string;
  url_video: string | null;
  flag_multiple_uuid: string;
  prompt: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    user_video_id: number;
    uuid_flag: string;
    final_url_merge_video: string | null;
    list_merge_video: string | null;
    created_at: string;
    updated_at: string;
    list_video: ApiSceneData[];
    estimated_merge: string;
  };
}

interface SceneData {
  scene: number;
  url_video: string | null;
  status_video: string;
  task_id: string;
  prompt: string;
}

interface GenerateData {
  uuid_konsultan: string;
  estimated_scene: SceneData[];
  estimated_merge: {
    progress: number;
    status: string;
  };
  final_url_merge_video: string | null;
  total_scenes: number;
  completed_scenes: number;
}

interface GenerateVideoPageProps {
  uuid: string;
}

export function GenerateVideoPage({ uuid }: GenerateVideoPageProps) {
  const [generateData, setGenerateData] = useState<GenerateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch generate status and set up polling
  useEffect(() => {
    fetchGenerateStatus();

    // Set up polling every 5 seconds
    // Stop polling when final video is ready
    const interval = setInterval(() => {
      // Check if we should stop polling
      if (generateData?.final_url_merge_video) {
        console.log("Final video is ready, stopping polling");
        clearInterval(interval);
        return;
      }
      fetchGenerateStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [uuid, generateData?.final_url_merge_video]);

  const fetchGenerateStatus = async () => {
    try {
      setError(null);

      // Get UUID from localStorage (saved by PaymentPage)
      const savedUuid = localStorage.getItem("generate-uuid") || uuid;
      console.log("Fetching generate status for UUID:", savedUuid);

      // Get x-api-key from localStorage
      const xApiKey = localStorage.getItem("x-api-key");

      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }

      // Call API
      const response = await fetch(
        `${BASE_URL}/api/konsultan-video-merge/${savedUuid}`,
        {
          headers: {
            "x-api-key": xApiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData: ApiResponse = await response.json();

      if (!apiData.status) {
        throw new Error(apiData.message || "Gagal memuat data");
      }

      console.log("API Response:", apiData);

      // Helper function to normalize status
      const normalizeStatus = (status: string): string => {
        const statusMap: Record<string, string> = {
          progress: "processing",
          done: "completed",
          complete: "completed",
          fail: "failed",
          error: "failed",
        };
        return statusMap[status.toLowerCase()] || status;
      };

      // Transform API data to component format
      const transformedScenes: SceneData[] = apiData.data.list_video.map(
        (video, index) => ({
          scene: index + 1,
          url_video: video.url_video,
          status_video: normalizeStatus(video.status_video),
          task_id: video.task_id,
          prompt: video.prompt,
        })
      );

      // Count completed scenes
      const completedScenes = transformedScenes.filter(
        (scene) => scene.status_video === "completed"
      ).length;

      // Calculate merge progress
      // If all scenes completed, progress is based on merge status
      // Otherwise, progress is based on scene completion
      let mergeProgress = 0;
      let mergeStatus = "waiting";

      if (completedScenes === transformedScenes.length) {
        // All scenes completed, now merging
        if (apiData.data.final_url_merge_video) {
          mergeProgress = 100;
          mergeStatus = "completed";
        } else {
          // Estimate merge progress (assume 50-99% during merge)
          mergeProgress = 75;
          mergeStatus = "merging";
        }
      } else {
        // Still generating scenes
        mergeProgress = Math.round(
          (completedScenes / transformedScenes.length) * 50
        );
        mergeStatus = "waiting";
      }

      const transformedData: GenerateData = {
        uuid_konsultan: apiData.data.uuid_flag,
        estimated_scene: transformedScenes,
        estimated_merge: {
          progress: mergeProgress,
          status: mergeStatus,
        },
        final_url_merge_video: apiData.data.final_url_merge_video,
        total_scenes: transformedScenes.length,
        completed_scenes: completedScenes,
      };

      console.log("Transformed data:", transformedData);

      setGenerateData(transformedData);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error("Error fetching generate status:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat status generate video"
      );
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchGenerateStatus();
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "processing":
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Loader2 className="relative w-16 h-16 animate-spin text-purple-400" />
          </div>
          <span className="text-gray-300 font-medium text-lg">
            Memuat status generate...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30"></div>
            <AlertCircle className="relative w-16 h-16 text-red-400 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Gagal Memuat Data
          </h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button
            onClick={handleRefresh}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  if (!generateData) return null;

  const overallProgress = Math.round(
    (generateData.completed_scenes / generateData.total_scenes) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-500/20"
          onClick={() => (window.location.href = "/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        {/* Title Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                AI Video Generation
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Konsultan AI #{generateData.uuid_konsultan.slice(0, 8)}
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-4">
              Video Anda sedang diproses dengan teknologi AI canggih
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 px-4 py-2">
                <Film className="w-4 h-4 mr-2" />
                {generateData.total_scenes} Scene Total
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-200 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                {generateData.completed_scenes} Scene Selesai
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-12">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-md opacity-40 animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Overall Progress
                  </h3>
                  <p className="text-sm text-gray-400">
                    {generateData.completed_scenes} dari{" "}
                    {generateData.total_scenes} scene selesai
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 border border-blue-500/20"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>

            <div className="relative h-6 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${overallProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer"></div>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-bold text-cyan-300">
                {overallProgress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scene List */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Film className="w-6 h-6 mr-3 text-purple-400" />
          Daftar Scene
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generateData.estimated_scene.map((scene) => (
            <div key={scene.scene} className="group relative">
              {/* Outer Glow on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                {/* Video Preview or Placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {scene.url_video ? (
                    <video
                      className="w-full h-full object-cover"
                      src={scene.url_video}
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {scene.status_video === "processing" ? (
                          <>
                            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-blue-300">
                              Processing...
                            </p>
                          </>
                        ) : scene.status_video === "pending" ? (
                          <>
                            <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                            <p className="text-sm text-yellow-300">
                              Waiting...
                            </p>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                            <p className="text-sm text-red-300">Failed</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${getStatusColor(
                        scene.status_video
                      )} border backdrop-blur-sm`}
                    >
                      {getStatusIcon(scene.status_video)}
                      <span className="ml-1 text-xs font-semibold uppercase">
                        {scene.status_video}
                      </span>
                    </Badge>
                  </div>

                  {/* Scene Number */}
                  <div className="absolute top-3 left-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/50">
                      <span className="text-sm font-bold text-white">
                        #{scene.scene}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {scene.prompt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-mono">
                      {scene.task_id}
                    </span>

                    {scene.url_video && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                        onClick={() => handleDownload(scene.url_video!)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Merge Status & Final Video */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-3xl opacity-20 blur-xl"></div>

        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur-md opacity-40 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <VideoIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Final Video Merge
              </h3>
              <p className="text-sm text-gray-400">
                Menggabungkan semua scene menjadi satu video utuh
              </p>
            </div>
          </div>

          {/* Merge Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Merge Progress</span>
              <span className="text-sm font-bold text-green-300">
                {generateData.estimated_merge.progress}%
              </span>
            </div>
            <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${generateData.estimated_merge.progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Final Video Player or Status */}
          {generateData.final_url_merge_video ? (
            <div className="space-y-4">
              <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-green-500/30">
                <video
                  className="w-full h-full"
                  src={generateData.final_url_merge_video}
                  controls
                  preload="metadata"
                />
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Button
                    className="relative w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30"
                    onClick={() =>
                      window.open(generateData.final_url_merge_video!, "_blank")
                    }
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Final Video
                  </Button>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Button
                    className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30"
                    onClick={() =>
                      handleDownload(generateData.final_url_merge_video!)
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Success Message */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-300">
                      ✨ Video Final Siap!
                    </p>
                    <p className="text-sm text-green-400/80">
                      Semua scene telah berhasil digabungkan menjadi satu video
                      HD berkualitas tinggi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm text-center">
              <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-3" />
              <p className="font-semibold text-yellow-300 mb-1">
                {generateData.estimated_merge.status === "merging"
                  ? "Sedang menggabungkan scene..."
                  : "Menunggu semua scene selesai..."}
              </p>
              <p className="text-sm text-yellow-400/80">
                Proses ini membutuhkan waktu beberapa menit. Mohon tunggu
                sebentar.
              </p>
            </div>
          )}
        </div>
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
