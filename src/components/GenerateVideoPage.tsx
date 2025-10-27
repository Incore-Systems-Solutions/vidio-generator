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
  Check,
  Clock,
  AlertCircle,
  Loader2,
  Video as VideoIcon,
  Zap,
} from "lucide-react";

const BASE_URL = "https://api.instantvideoapp.com";

// Translations for GenerateVideoPage
const translations = {
  ID: {
    backToHome: "Kembali ke Beranda",
    aiVideoGeneration: "AI Video Generation",
    consultant: "Konsultan AI",
    processing: "Video Anda sedang diproses dengan teknologi AI canggih",
    totalScenes: "Scene Total",
    completedScenes: "Scene Selesai",
    overallProgress: "Overall Progress",
    from: "dari",
    scenesCompleted: "scene selesai",
    refresh: "Refresh",
    progress: "Progress",
    sceneList: "Daftar Scene",
    processing2: "Processing...",
    waiting: "Waiting...",
    failed: "Failed",
    finalVideoMerge: "Final Video Merge",
    mergingAllScenes: "Menggabungkan semua scene menjadi satu video utuh",
    mergeProgress: "Merge Progress",
    playFinalVideo: "Play Final Video",
    download: "Download",
    videoReady: "✨ Video Final Siap!",
    allScenesMerged:
      "Semua scene telah berhasil digabungkan menjadi satu video HD berkualitas tinggi.",
    createNewVideo: "Buat Video Baru",
    viewHistory: "Lihat Riwayat Video",
    mergingScenes: "Sedang menggabungkan scene...",
    waitingAll: "Menunggu semua scene selesai...",
    takesTime:
      "Proses ini membutuhkan waktu beberapa menit. Mohon tunggu sebentar.",
    dontWantWait:
      "💡 Tidak ingin menunggu? Anda dapat melihat hasil video final di halaman riwayat setelah proses selesai.",
    processingVideo: "Memproses Video Anda",
    loadingStatus: "Memuat Status Generate",
    aiPreparing:
      "AI sedang menyiapkan video Anda. Proses ini membutuhkan waktu beberapa saat...",
    fetchingInfo: "Mengambil informasi status generate video...",
    systemProcessing: "💡 Sistem sedang memproses permintaan Anda",
    autoUpdate: "Halaman akan otomatis diperbarui saat proses selesai",
    failedToLoad: "Gagal Memuat Data",
    tryAgain: "Coba Lagi",
    batchProcessing: "Memproses Batch Scene",
    batchStatus: "Status Batch",
    regenerateBatch: "Regenerate Batch",
    generateVideo: "Generate Video",
    generatingVideo: "Generating Video...",
    allBatchSuccess: "✨ Semua Batch Selesai!",
    readyToGenerate:
      "Semua batch telah berhasil diproses. Siap untuk generate video final.",
    success: "Selesai",
  },
  EN: {
    backToHome: "Back to Home",
    aiVideoGeneration: "AI Video Generation",
    consultant: "AI Consultant",
    processing: "Your video is being processed with advanced AI technology",
    totalScenes: "Total Scenes",
    completedScenes: "Completed Scenes",
    overallProgress: "Overall Progress",
    from: "of",
    scenesCompleted: "scenes completed",
    refresh: "Refresh",
    progress: "Progress",
    sceneList: "Scene List",
    processing2: "Processing...",
    waiting: "Waiting...",
    failed: "Failed",
    finalVideoMerge: "Final Video Merge",
    mergingAllScenes: "Merging all scenes into one complete video",
    mergeProgress: "Merge Progress",
    playFinalVideo: "Play Final Video",
    download: "Download",
    videoReady: "✨ Final Video Ready!",
    allScenesMerged:
      "All scenes have been successfully merged into one high-quality HD video.",
    createNewVideo: "Create New Video",
    viewHistory: "View Video History",
    mergingScenes: "Merging scenes...",
    waitingAll: "Waiting for all scenes to complete...",
    takesTime: "This process takes a few minutes. Please wait.",
    dontWantWait:
      "💡 Don't want to wait? You can view the final video result in the history page after the process is complete.",
    processingVideo: "Processing Your Video",
    loadingStatus: "Loading Generate Status",
    aiPreparing:
      "AI is preparing your video. This process takes a few moments...",
    fetchingInfo: "Fetching video generation status information...",
    systemProcessing: "💡 System is processing your request",
    autoUpdate: "Page will automatically update when process is complete",
    failedToLoad: "Failed to Load Data",
    tryAgain: "Try Again",
    batchProcessing: "Processing Batch Scenes",
    batchStatus: "Batch Status",
    regenerateBatch: "Regenerate Batch",
    generateVideo: "Generate Video",
    generatingVideo: "Generating Video...",
    allBatchSuccess: "✨ All Batches Complete!",
    readyToGenerate:
      "All batches have been successfully processed. Ready to generate final video.",
    success: "Success",
  },
  ZH: {
    backToHome: "返回主页",
    aiVideoGeneration: "AI 视频生成",
    consultant: "AI 顾问",
    processing: "您的视频正在使用先进的 AI 技术进行处理",
    totalScenes: "总场景",
    completedScenes: "已完成场景",
    overallProgress: "总体进度",
    from: "的",
    scenesCompleted: "个场景已完成",
    refresh: "刷新",
    progress: "进度",
    sceneList: "场景列表",
    processing2: "处理中...",
    waiting: "等待中...",
    failed: "失败",
    finalVideoMerge: "最终视频合并",
    mergingAllScenes: "将所有场景合并成一个完整视频",
    mergeProgress: "合并进度",
    playFinalVideo: "播放最终视频",
    download: "下载",
    videoReady: "✨ 最终视频已准备好！",
    allScenesMerged: "所有场景已成功合并成一个高质量 HD 视频。",
    createNewVideo: "创建新视频",
    viewHistory: "查看视频历史",
    mergingScenes: "正在合并场景...",
    waitingAll: "等待所有场景完成...",
    takesTime: "此过程需要几分钟。请稍候。",
    dontWantWait: "💡 不想等待？您可以在流程完成后在历史页面查看最终视频结果。",
    processingVideo: "正在处理您的视频",
    loadingStatus: "正在加载生成状态",
    aiPreparing: "AI 正在准备您的视频。此过程需要一些时间...",
    fetchingInfo: "正在获取视频生成状态信息...",
    systemProcessing: "💡 系统正在处理您的请求",
    autoUpdate: "流程完成后页面将自动更新",
    failedToLoad: "无法加载数据",
    tryAgain: "重试",
    batchProcessing: "正在处理批次场景",
    batchStatus: "批次状态",
    regenerateBatch: "重新生成批次",
    generateVideo: "生成视频",
    generatingVideo: "正在生成视频...",
    allBatchSuccess: "✨ 所有批次已完成！",
    readyToGenerate: "所有批次已成功处理。准备生成最终视频。",
    success: "成功",
  },
  AR: {
    backToHome: "العودة إلى الصفحة الرئيسية",
    aiVideoGeneration: "إنشاء فيديو AI",
    consultant: "مستشار AI",
    processing: "يتم معالجة الفيديو الخاص بك باستخدام تقنية AI المتقدمة",
    totalScenes: "إجمالي المشاهد",
    completedScenes: "المشاهد المكتملة",
    overallProgress: "التقدم الإجمالي",
    from: "من",
    scenesCompleted: "مشهد مكتمل",
    refresh: "تحديث",
    progress: "التقدم",
    sceneList: "قائمة المشاهد",
    processing2: "جارٍ المعالجة...",
    waiting: "في الانتظار...",
    failed: "فشل",
    finalVideoMerge: "دمج الفيديو النهائي",
    mergingAllScenes: "دمج جميع المشاهد في فيديو واحد كامل",
    mergeProgress: "تقدم الدمج",
    playFinalVideo: "تشغيل الفيديو النهائي",
    download: "تنزيل",
    videoReady: "✨ الفيديو النهائي جاهز!",
    allScenesMerged: "تم دمج جميع المشاهد بنجاح في فيديو HD واحد عالي الجودة.",
    createNewVideo: "إنشاء فيديو جديد",
    viewHistory: "عرض سجل الفيديو",
    mergingScenes: "جارٍ دمج المشاهد...",
    waitingAll: "في انتظار اكتمال جميع المشاهد...",
    takesTime: "تستغرق هذه العملية بضع دقائق. يرجى الانتظار.",
    dontWantWait:
      "💡 لا تريد الانتظار؟ يمكنك عرض نتيجة الفيديو النهائية في صفحة السجل بعد اكتمال العملية.",
    processingVideo: "جارٍ معالجة الفيديو الخاص بك",
    loadingStatus: "جارٍ تحميل حالة الإنشاء",
    aiPreparing:
      "AI يقوم بإعداد الفيديو الخاص بك. تستغرق هذه العملية بعض الوقت...",
    fetchingInfo: "جارٍ جلب معلومات حالة إنشاء الفيديو...",
    systemProcessing: "💡 النظام يعالج طلبك",
    autoUpdate: "ستتم تحديث الصفحة تلقائيًا عند اكتمال العملية",
    failedToLoad: "فشل تحميل البيانات",
    tryAgain: "حاول مرة أخرى",
    batchProcessing: "معالجة دفعات المشاهد",
    batchStatus: "حالة الدفعات",
    regenerateBatch: "إعادة إنشاء الدفعة",
    generateVideo: "إنشاء الفيديو",
    generatingVideo: "جارٍ إنشاء الفيديو...",
    allBatchSuccess: "✨ اكتملت جميع الدفعات!",
    readyToGenerate:
      "تمت معالجة جميع الدفعات بنجاح. جاهز لإنشاء الفيديو النهائي.",
    success: "نجح",
  },
};

interface ApiSceneData {
  id: number;
  user_video_id: string;
  estimated_scene: string;
  task_id: string;
  status_video: string;
  url_video: string | null;
  flag_multiple_uuid: string;
  prompt: string;
  msg_err: string | null;
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

// Batch API interfaces
interface ApiBatchData {
  id: number;
  video_chat_ai_id: number;
  batch_number: number;
  status: string; // "success", "antri", "progress", "failed"
  created_at: string;
  updated_at: string;
  batch_label: string;
  videochatai: {
    id: number;
    user_video_id: number;
  };
}

interface ApiBatchResponse {
  status: boolean;
  message: string;
  data: {
    list_batch: ApiBatchData[];
  };
}

interface BatchData {
  id: number;
  batch_number: number;
  batch_label: string;
  status: string;
}

interface SceneData {
  scene: number;
  url_video: string | null;
  status_video: string;
  task_id: string;
  prompt: string;
  msg_err: string | null;
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
  const [isWaitingForGeneration, setIsWaitingForGeneration] = useState(false);

  // Batch processing states
  const [batchData, setBatchData] = useState<BatchData[]>([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(true);
  const [generatingVideo, setGeneratingVideo] = useState(false);

  // Manual merge states
  const [selectedVideos, setSelectedVideos] = useState<Set<number>>(new Set());
  const [isMergingManual, setIsMergingManual] = useState(false);
  const [manualMergeResult, setManualMergeResult] = useState<string | null>(
    null
  );

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

  // Fetch batch status first, then video merge status
  useEffect(() => {
    // Check if we should fetch batch status or video merge status
    if (isBatchProcessing) {
      fetchBatchStatus();
    } else {
      fetchGenerateStatus();
    }

    // Set up polling every 5 seconds
    const interval = setInterval(() => {
      if (isBatchProcessing) {
        fetchBatchStatus();
      } else {
        // Check if we should stop polling
        if (generateData?.final_url_merge_video) {
          console.log("Final video is ready, stopping polling");
          clearInterval(interval);
          return;
        }
        fetchGenerateStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [uuid, isBatchProcessing, generateData?.final_url_merge_video]);

  const fetchBatchStatus = async () => {
    try {
      setError(null);

      // Get UUID from localStorage (saved by PaymentPage)
      const savedUuid = localStorage.getItem("generate-uuid") || uuid;
      console.log("Fetching batch status for UUID:", savedUuid);

      // Get x-api-key from localStorage
      const xApiKey = localStorage.getItem("x-api-key");

      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }

      // Call batch status API
      const response = await fetch(
        `${BASE_URL}/api/chat-ai/status-batch/${savedUuid}`,
        {
          headers: {
            "x-api-key": xApiKey,
          },
        }
      );

      // Handle 404 - batch not ready yet
      if (response.status === 404) {
        console.log("Batch not ready yet (404), will retry...");
        setIsWaitingForGeneration(true);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData: ApiBatchResponse = await response.json();

      if (!apiData.status) {
        throw new Error(apiData.message || "Gagal memuat data batch");
      }

      console.log("Batch API Response:", apiData);

      // If we get here with valid data, batch is ready
      setIsWaitingForGeneration(false);

      // Transform batch data
      const transformedBatches: BatchData[] = apiData.data.list_batch.map(
        (batch) => ({
          id: batch.id,
          batch_number: batch.batch_number,
          batch_label: batch.batch_label,
          status: batch.status,
        })
      );

      setBatchData(transformedBatches);
      setLoading(false);
      setRefreshing(false);

      // Check if all batches are successful - stop polling batch status
      const allSuccess = transformedBatches.every(
        (batch) => batch.status === "success"
      );

      if (allSuccess) {
        console.log("All batches are successful!");
        // Don't automatically generate video, wait for user action
      }
    } catch (err) {
      console.error("Error fetching batch status:", err);
      setError(
        err instanceof Error ? err.message : "Gagal memuat status batch"
      );
      setLoading(false);
      setRefreshing(false);
    }
  };

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

      // Handle 404 - video generation not ready yet
      if (response.status === 404) {
        console.log("Video generation not ready yet (404), will retry...");
        setIsWaitingForGeneration(true);
        setLoading(false);
        return; // Don't throw error, just return and let polling continue
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData: ApiResponse = await response.json();

      if (!apiData.status) {
        throw new Error(apiData.message || "Gagal memuat data");
      }

      console.log("API Response:", apiData);

      // If we get here with valid data, generation is ready
      setIsWaitingForGeneration(false);

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
          msg_err: video.msg_err,
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

      // If final video is ready, clear localStorage except x-api-key and konsultan-email
      if (transformedData.final_url_merge_video) {
        clearLocalStorageExceptKeys(["x-api-key", "konsultan-email"]);
      }
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

  const clearLocalStorageExceptKeys = (keysToKeep: string[]) => {
    const itemsToKeep: { [key: string]: string } = {};

    // Save items we want to keep
    keysToKeep.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        itemsToKeep[key] = value;
      }
    });

    // Clear all localStorage
    localStorage.clear();

    // Restore saved items
    Object.keys(itemsToKeep).forEach((key) => {
      localStorage.setItem(key, itemsToKeep[key]);
    });

    console.log("Cleared localStorage except:", keysToKeep);
  };

  const handleCreateNewVideo = () => {
    clearLocalStorageExceptKeys(["x-api-key", "konsultan-email"]);
    window.location.href = "/konsultan-video";
  };

  const handleViewHistory = () => {
    clearLocalStorageExceptKeys(["x-api-key", "konsultan-email"]);
    window.location.href = "/riwayat-video";
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchGenerateStatus();
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const handleRegenerateBatch = async (batchId: number) => {
    try {
      const xApiKey = localStorage.getItem("x-api-key");
      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }

      const response = await fetch(
        `${BASE_URL}/api/chat-ai/refetch-batch/${batchId}`,
        {
          method: "GET",
          headers: {
            "x-api-key": xApiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Regenerate batch result:", result);

      // Refresh batch status
      fetchBatchStatus();
    } catch (err) {
      console.error("Error regenerating batch:", err);
      alert(err instanceof Error ? err.message : "Gagal meregenerasi batch");
    }
  };

  const handleGenerateVideo = async () => {
    try {
      setGeneratingVideo(true);
      const xApiKey = localStorage.getItem("x-api-key");
      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }

      const savedUuid = localStorage.getItem("generate-uuid") || uuid;

      const response = await fetch(
        `${BASE_URL}/api/generate-video/${savedUuid}`,
        {
          method: "GET",
          headers: {
            "x-api-key": xApiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Generate video result:", result);

      // Switch to video merge status tracking
      setIsBatchProcessing(false);
      setGeneratingVideo(false);
    } catch (err) {
      console.error("Error generating video:", err);
      alert(err instanceof Error ? err.message : "Gagal generate video");
      setGeneratingVideo(false);
    }
  };

  const handleVideoCheckbox = (sceneNumber: number) => {
    setSelectedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sceneNumber)) {
        newSet.delete(sceneNumber);
      } else {
        newSet.add(sceneNumber);
      }
      return newSet;
    });
  };

  const handleManualMerge = async () => {
    try {
      if (selectedVideos.size < 2) {
        alert(
          selectedLanguage === "ID"
            ? "Pilih minimal 2 video untuk digabungkan"
            : "Select at least 2 videos to merge"
        );
        return;
      }

      setIsMergingManual(true);
      setManualMergeResult(null);

      const xApiKey = localStorage.getItem("x-api-key");
      const uuidChat = localStorage.getItem("konsultan-chat-uuid");

      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }

      if (!uuidChat) {
        throw new Error("UUID chat tidak ditemukan.");
      }

      // Get video URLs from selected scene numbers
      const selectedUrls =
        generateData?.estimated_scene
          .filter((scene) => selectedVideos.has(scene.scene) && scene.url_video)
          .map((scene) => scene.url_video) || [];

      const payload = {
        uuid_chat: uuidChat,
        url: selectedUrls,
      };

      console.log("Merging videos with payload:", payload);

      const response = await fetch(
        `${BASE_URL}/api/video-ai/merge-video-konsultan`,
        {
          method: "POST",
          headers: {
            "x-api-key": xApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Manual merge result:", result);

      if (result.status && result.data.final_url_merge_video) {
        setManualMergeResult(result.data.final_url_merge_video);
        // Clear selected videos after successful merge
        setSelectedVideos(new Set());
      } else {
        throw new Error(result.message || "Gagal merge video");
      }

      setIsMergingManual(false);
    } catch (err) {
      console.error("Error merging videos:", err);
      alert(err instanceof Error ? err.message : "Gagal merge video");
      setIsMergingManual(false);
    }
  };

  // For scene status
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

  // For batch status
  const getBatchStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "progress":
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case "antri":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getBatchStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "antri":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getBatchStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return t.success;
      case "progress":
        return t.processing2;
      case "antri":
        return t.waiting;
      case "failed":
        return t.failed;
      default:
        return status;
    }
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  // Check if all batches are successful
  const allBatchesSuccess = batchData.every(
    (batch) => batch.status === "success"
  );

  // Batch Processing Modal
  if (isBatchProcessing) {
    // Calculate total scenes (1 batch = 3 scenes)
    const totalScenes = batchData.length * 3;
    const scenesPerBatch = 3;

    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  {loading || isWaitingForGeneration ? (
                    <Loader2 className="relative w-16 h-16 animate-spin text-purple-400 mx-auto" />
                  ) : allBatchesSuccess ? (
                    <CheckCircle className="relative w-16 h-16 text-green-400 mx-auto" />
                  ) : (
                    <Loader2 className="relative w-16 h-16 animate-spin text-purple-400 mx-auto" />
                  )}
                </div>

                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {loading || isWaitingForGeneration
                    ? t.loadingStatus
                    : allBatchesSuccess
                    ? t.allBatchSuccess
                    : selectedLanguage === "ID"
                    ? "Memproses Batch Naskah"
                    : "Processing Script Batches"}
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  {loading || isWaitingForGeneration
                    ? t.fetchingInfo
                    : allBatchesSuccess
                    ? selectedLanguage === "ID"
                      ? "Semua batch telah selesai diproses. Anda dapat melanjutkan untuk generate video."
                      : "All batches have been processed successfully. You can proceed to generate video."
                    : selectedLanguage === "ID"
                    ? "AI sedang memproses naskah video Anda per batch"
                    : "AI is processing your video script per batch"}
                </p>

                {/* Batch & Scene Info */}
                {batchData.length > 0 && (
                  <div className="inline-flex flex-col items-center px-6 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <VideoIcon className="w-5 h-5 text-purple-400" />
                      <span className="text-base font-semibold text-purple-200">
                        {selectedLanguage === "ID"
                          ? `Membagi naskah menjadi ${batchData.length} batch of scenes`
                          : `Dividing script into ${batchData.length} batch of scenes`}
                      </span>
                    </div>
                    <div className="text-sm text-purple-300">
                      {selectedLanguage === "ID"
                        ? `Total scenes: ${totalScenes} (${scenesPerBatch} scenes per batch)`
                        : `Total scenes: ${totalScenes} (${scenesPerBatch} scenes per batch)`}
                    </div>
                  </div>
                )}
              </div>

              {/* Batch Progress List */}
              {batchData.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">
                    {selectedLanguage === "ID"
                      ? "Progress Pembuatan Batch:"
                      : "Batch Creation Progress:"}
                  </h4>
                  {batchData.map((batch) => (
                    <div
                      key={batch.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        batch.status === "success"
                          ? "bg-green-500/10 border-green-500/30"
                          : batch.status === "progress"
                          ? "bg-blue-500/10 border-blue-500/30"
                          : batch.status === "antri"
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : batch.status === "failed"
                          ? "bg-red-500/10 border-red-500/30"
                          : "bg-slate-800/30 border-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">
                            #{batch.batch_number}
                          </span>
                        </div>
                        <div>
                          <span className="text-white font-semibold">
                            {batch.batch_label}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {selectedLanguage === "ID"
                              ? `${scenesPerBatch} scenes dalam batch ini`
                              : `${scenesPerBatch} scenes in this batch`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Circular Progress Indicator */}
                        <div className="relative flex items-center">
                          {/* Circular Progress */}
                          <div className="relative w-14 h-14">
                            {/* Background Circle */}
                            <svg className="w-14 h-14 transform -rotate-90">
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className={
                                  batch.status === "success"
                                    ? "text-green-500/20"
                                    : batch.status === "progress"
                                    ? "text-blue-500/20"
                                    : batch.status === "antri"
                                    ? "text-yellow-500/20"
                                    : "text-red-500/20"
                                }
                              />
                              {/* Progress Circle */}
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 24}`}
                                strokeDashoffset={
                                  batch.status === "success"
                                    ? 0
                                    : batch.status === "progress"
                                    ? 2 * Math.PI * 24 * 0.35
                                    : batch.status === "antri"
                                    ? 2 * Math.PI * 24 * 0.85
                                    : 2 * Math.PI * 24
                                }
                                className={`transition-all duration-1000 ease-out ${
                                  batch.status === "success"
                                    ? "text-green-400"
                                    : batch.status === "progress"
                                    ? "text-blue-400"
                                    : batch.status === "antri"
                                    ? "text-yellow-400"
                                    : "text-red-400"
                                }`}
                                strokeLinecap="round"
                              />
                            </svg>

                            {/* Center Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {batch.status === "success" ? (
                                <Check className="w-5 h-5 text-green-400 font-bold stroke-[3]" />
                              ) : batch.status === "progress" ? (
                                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                              ) : batch.status === "antri" ? (
                                <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                          </div>

                          {/* Status Text */}
                          <div className="ml-3">
                            <p
                              className={`text-sm font-semibold leading-tight ${
                                batch.status === "success"
                                  ? "text-green-300"
                                  : batch.status === "progress"
                                  ? "text-blue-300"
                                  : batch.status === "antri"
                                  ? "text-yellow-300"
                                  : "text-red-300"
                              }`}
                            >
                              {batch.status === "success"
                                ? selectedLanguage === "ID"
                                  ? "Selesai"
                                  : "Done"
                                : batch.status === "proses"
                                ? selectedLanguage === "ID"
                                  ? "Proses"
                                  : "Processing"
                                : batch.status === "antri"
                                ? selectedLanguage === "ID"
                                  ? "Antri"
                                  : "Queue"
                                : selectedLanguage === "ID"
                                ? "Gagal"
                                : "Failed"}
                            </p>
                          </div>
                        </div>

                        {/* Regenerate Button for Failed */}
                        {batch.status === "failed" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/30"
                            onClick={() => handleRegenerateBatch(batch.id)}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            {t.regenerateBatch}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Success Message & Generate Button */}
              {allBatchesSuccess && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-300">
                          {selectedLanguage === "ID"
                            ? "Semua Batch Selesai Diproses!"
                            : "All Batches Processed Successfully!"}
                        </p>
                        <p className="text-sm text-green-400/80">
                          {selectedLanguage === "ID"
                            ? "Anda dapat melanjutkan untuk generate video sekarang."
                            : "You can proceed to generate video now."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <Button
                      className="relative w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30 text-lg py-6"
                      onClick={handleGenerateVideo}
                      disabled={generatingVideo}
                    >
                      {generatingVideo ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {t.generatingVideo}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          {t.generateVideo}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Animated Progress Bar - Only show when not all done */}
              {!allBatchesSuccess && batchData.length > 0 && (
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {selectedLanguage === "ID" ? "Progress:" : "Progress:"}
                    </span>
                    <span className="text-purple-300 font-semibold">
                      {batchData.filter((b) => b.status === "success").length} /{" "}
                      {batchData.length}{" "}
                      {selectedLanguage === "ID"
                        ? "batch selesai"
                        : "batches done"}
                    </span>
                  </div>
                  <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-500"
                      style={{
                        width: `${
                          (batchData.filter((b) => b.status === "success")
                            .length /
                            batchData.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    {selectedLanguage === "ID"
                      ? "💡 Proses ini membutuhkan waktu beberapa menit"
                      : "💡 This process takes a few minutes"}
                  </div>
                </div>
              )}

              {/* Loading State Progress Bar */}
              {(loading || isWaitingForGeneration) &&
                batchData.length === 0 && (
                  <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 mt-6">
                    <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-shimmer-slow"></div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state for video merge status
  if (loading || isWaitingForGeneration) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <Loader2 className="relative w-16 h-16 animate-spin text-purple-400 mx-auto" />
                </div>

                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {isWaitingForGeneration ? t.processingVideo : t.loadingStatus}
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  {isWaitingForGeneration ? t.aiPreparing : t.fetchingInfo}
                </p>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="space-y-3 text-sm text-center">
                    <p className="text-blue-300">{t.systemProcessing}</p>
                    <p className="text-gray-400">{t.autoUpdate}</p>
                  </div>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-shimmer-slow"></div>
              </div>
            </div>
          </div>
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
            {t.failedToLoad}
          </h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button
            onClick={handleRefresh}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.tryAgain}
          </Button>
        </div>
      </div>
    );
  }

  if (!generateData) return null;

  const overallProgress = Math.round(
    (generateData.completed_scenes / generateData.total_scenes) * 100
  );

  // Check if any scene has failed
  const hasFailedScenes = generateData.estimated_scene.some(
    (scene) => scene.status_video === "failed"
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
          {t.backToHome}
        </Button>

        {/* Title Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                {t.aiVideoGeneration}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {t.consultant}
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-4">{t.processing}</p>

            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 px-4 py-2">
                <Film className="w-4 h-4 mr-2" />
                {generateData.total_scenes} {t.totalScenes}
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-200 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                {generateData.completed_scenes} {t.completedScenes}
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
                    {t.overallProgress}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {generateData.completed_scenes} {t.from}{" "}
                    {generateData.total_scenes} {t.scenesCompleted}
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
                {t.refresh}
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
              <span className="text-sm text-gray-400">{t.progress}</span>
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
          {t.sceneList}
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
                              {t.processing2}
                            </p>
                          </>
                        ) : scene.status_video === "pending" ? (
                          <>
                            <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                            <p className="text-sm text-yellow-300">
                              {t.waiting}
                            </p>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                            <p className="text-sm text-red-300">{t.failed}</p>
                            {scene.msg_err && (
                              <p className="text-xs text-red-200">
                                {scene.msg_err}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  {/* <div className="absolute top-3 right-3">
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
                  </div> */}

                  {/* Checkbox for manual merge - Only show if video is available and there are failed scenes */}
                  {scene.url_video && hasFailedScenes && (
                    <div className="absolute top-3 right-3">
                      <label className="relative flex items-center cursor-pointer group/checkbox">
                        {/* Glowing background effect on hover/checked */}
                        <div
                          className={`absolute -inset-1 rounded-lg transition-opacity duration-300 ${
                            selectedVideos.has(scene.scene)
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-60"
                              : "bg-gradient-to-r from-purple-500 to-blue-500 blur-md opacity-0 group-hover/checkbox:opacity-40"
                          }`}
                        ></div>

                        {/* Checkbox container with animation */}
                        <div
                          className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-xl border transition-all duration-300 ${
                            selectedVideos.has(scene.scene)
                              ? "bg-gradient-to-r from-purple-600/90 to-pink-600/90 border-purple-400/50 shadow-lg shadow-purple-500/50 scale-105"
                              : "bg-slate-900/90 border-white/20 group-hover/checkbox:border-purple-400/50 group-hover/checkbox:bg-slate-800/90"
                          }`}
                        >
                          {/* Custom checkbox */}
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedVideos.has(scene.scene)}
                              onChange={() => handleVideoCheckbox(scene.scene)}
                              className="sr-only peer"
                            />
                            <div
                              className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                                selectedVideos.has(scene.scene)
                                  ? "bg-white border-white scale-110"
                                  : "bg-transparent border-purple-400 group-hover/checkbox:border-purple-300 group-hover/checkbox:scale-110"
                              }`}
                            >
                              {selectedVideos.has(scene.scene) && (
                                <Check className="w-4 h-4 text-purple-600 animate-in zoom-in duration-200" />
                              )}
                            </div>
                          </div>

                          {/* Label text */}
                          <span
                            className={`text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                              selectedVideos.has(scene.scene)
                                ? "text-white"
                                : "text-gray-300 group-hover/checkbox:text-white"
                            }`}
                          >
                            {selectedVideos.has(scene.scene)
                              ? selectedLanguage === "ID"
                                ? "Terpilih"
                                : "Selected"
                              : selectedLanguage === "ID"
                              ? "Pilih"
                              : "Select"}
                          </span>
                        </div>
                      </label>
                    </div>
                  )}

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

      {/* Manual Merge Section - Only show if there are completed videos and failed scenes exist */}
      {hasFailedScenes &&
        generateData.estimated_scene.some((s) => s.url_video) && (
          <div className="mb-12">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-md opacity-40 animate-pulse"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Film className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {selectedLanguage === "ID"
                          ? "Merge Video Manual"
                          : "Manual Video Merge"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedLanguage === "ID"
                          ? "Pilih video yang berhasil untuk digabungkan"
                          : "Select successful videos to merge"}
                      </p>
                    </div>
                  </div>

                  {selectedVideos.size > 0 && (
                    <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-200 px-4 py-2">
                      {selectedVideos.size}{" "}
                      {selectedLanguage === "ID"
                        ? "video terpilih"
                        : "videos selected"}
                    </Badge>
                  )}
                </div>

                {/* Merge Button */}
                {selectedVideos.size >= 2 &&
                  !isMergingManual &&
                  !manualMergeResult && (
                    <div className="mb-6">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <Button
                          className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 text-lg py-6"
                          onClick={handleManualMerge}
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          {selectedLanguage === "ID"
                            ? "Merge Video Sekarang"
                            : "Merge Videos Now"}
                        </Button>
                      </div>
                    </div>
                  )}

                {/* Merging Progress */}
                {isMergingManual && (
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm text-center">
                      <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
                      <p className="font-semibold text-indigo-300 text-lg mb-2">
                        {selectedLanguage === "ID"
                          ? "Menggabungkan Video..."
                          : "Merging Videos..."}
                      </p>
                      <p className="text-sm text-indigo-400/80">
                        {selectedLanguage === "ID"
                          ? "Mohon tunggu, video sedang digabungkan"
                          : "Please wait, videos are being merged"}
                      </p>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer-slow"></div>
                    </div>
                  </div>
                )}

                {/* Manual Merge Result */}
                {manualMergeResult && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-300">
                            {selectedLanguage === "ID"
                              ? "✨ Video Berhasil Digabungkan!"
                              : "✨ Videos Merged Successfully!"}
                          </p>
                          <p className="text-sm text-green-400/80">
                            {selectedLanguage === "ID"
                              ? "Video Anda telah berhasil digabungkan"
                              : "Your videos have been successfully merged"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-indigo-500/30">
                      <video
                        className="w-full h-full"
                        src={manualMergeResult}
                        controls
                        preload="metadata"
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="relative flex-1 group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <Button
                          className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
                          onClick={() =>
                            window.open(manualMergeResult, "_blank")
                          }
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {selectedLanguage === "ID"
                            ? "Putar Video"
                            : "Play Video"}
                        </Button>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <Button
                          className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30"
                          onClick={() => handleDownload(manualMergeResult)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {selectedLanguage === "ID" ? "Unduh" : "Download"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Merge Status & Final Video - Only show if no scenes have failed */}
      {!hasFailedScenes && (
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
                  {t.finalVideoMerge}
                </h3>
                <p className="text-sm text-gray-400">{t.mergingAllScenes}</p>
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
                        window.open(
                          generateData.final_url_merge_video!,
                          "_blank"
                        )
                      }
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t.playFinalVideo}
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
                      {t.download}
                    </Button>
                  </div>
                </div>

                {/* Success Message */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-300">
                        {t.videoReady}
                      </p>
                      <p className="text-sm text-green-400/80">
                        {t.allScenesMerged}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <Button
                      className="relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
                      onClick={handleCreateNewVideo}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t.createNewVideo}
                    </Button>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <Button
                      className="relative w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/30"
                      onClick={handleViewHistory}
                    >
                      <Film className="w-4 h-4 mr-2" />
                      {t.viewHistory}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm text-center">
                  <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-3" />
                  <p className="font-semibold text-yellow-300 mb-1">
                    {generateData.estimated_merge.status === "merging"
                      ? t.mergingScenes
                      : t.waitingAll}
                  </p>
                  <p className="text-sm text-yellow-400/80 mb-4">
                    {t.takesTime}
                  </p>
                </div>

                {/* Info box - dapat melihat di riwayat */}
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-center mb-3">
                    <p className="text-sm text-blue-300 mb-2">
                      {t.dontWantWait}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <Button
                        variant="outline"
                        className="relative w-full bg-slate-800/50 border-purple-500/30 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 hover:border-purple-500/50"
                        onClick={handleCreateNewVideo}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t.createNewVideo}
                      </Button>
                    </div>

                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <Button
                        variant="outline"
                        className="relative w-full bg-slate-800/50 border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                        onClick={handleViewHistory}
                      >
                        <Film className="w-4 h-4 mr-2" />
                        {t.viewHistory}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fixed Merge Button - Show when videos are selected */}
      {/* {selectedVideos.size > 0 && hasFailedScenes && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>


            <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border border-purple-500/50 shadow-2xl p-4 z-index-10">
              <div className="flex items-center space-x-4">

                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl border border-purple-500/30">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">
                    {selectedVideos.size}{" "}
                    {selectedLanguage === "ID"
                      ? "video dipilih"
                      : "videos selected"}
                  </span>
                </div>

                <Button
                  onClick={handleManualMerge}
                  disabled={selectedVideos.size < 2}
                  className={`relative px-8 py-6 text-lg font-bold transition-all duration-300 ${
                    selectedVideos.size < 2
                      ? "bg-gray-600 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 hover:scale-105"
                  }`}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {selectedLanguage === "ID"
                    ? "Merge Video Sekarang"
                    : "Merge Videos Now"}
                  {selectedVideos.size < 2 && (
                    <span className="ml-2 text-xs opacity-75">
                      (
                      {selectedLanguage === "ID"
                        ? "min. 2 video"
                        : "min. 2 videos"}
                      )
                    </span>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setSelectedVideos(new Set())}
                  className="text-gray-400 hover:text-white hover:bg-slate-700/50"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )} */}

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
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
