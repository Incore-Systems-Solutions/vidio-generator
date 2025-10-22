import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../chunks/main_DBzESP1K.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, a as Badge } from '../chunks/badge_DSQWoPdL.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from '../chunks/input_DEe1eFb5.mjs';
import { RefreshCw, AlertCircle, ArrowLeft, Clock, Video, Eye, Download, FileText, CheckCircle, Play } from 'lucide-react';
import { v as videoGenerationApi } from '../chunks/api_yL4KI-YJ.mjs';
import { v as videoSetupStorage } from '../chunks/videoSetupStorage_DUxbdP36.mjs';
import { N as NavbarWithModal } from '../chunks/NavbarWithModal_BRrC7jRw.mjs';
export { renderers } from '../renderers.mjs';

function GenerateVideo({ onBack }) {
  const [videoData, setVideoData] = useState(null);
  const [videoSetupData, setVideoSetupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepProgress, setStepProgress] = useState(0);
  const [videoResult, setVideoResult] = useState(null);
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
        if (response.data.status_video === "progress") {
          if (overallProgress === 0) {
            startProgressAnimation();
          }
        } else if (response.data.status_video === "success") {
          if (response.data.task_id) {
            try {
              const checkResult = await videoGenerationApi.checkVideoStatus(
                response.data.task_id
              );
              if (checkResult.status && checkResult.data.status_video === "success") {
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
    setOverallProgress(0);
    setCurrentStep(1);
    setStepProgress(0);
    setTimeRemaining(300);
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    const progressInterval = setInterval(() => {
      setOverallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 1500);
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          return 5;
        }
        return prev + 1;
      });
    }, 6e4);
    const stepProgressInterval = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepProgressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 600);
    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(stepProgressInterval);
    };
  };
  useEffect(() => {
    fetchVideoGeneration();
    const storedVideoData = videoSetupStorage.load();
    setVideoSetupData(storedVideoData);
  }, []);
  useEffect(() => {
    if (videoData?.status_video === "progress") {
      const cleanup = startProgressAnimation();
      const timeout = setTimeout(async () => {
        if (videoData?.task_id) {
          try {
            const checkResult = await videoGenerationApi.checkVideoStatus(
              videoData.task_id
            );
            if (checkResult.status && checkResult.data.status_video === "success") {
              setVideoResult(checkResult.data);
              setOverallProgress(100);
              setCurrentStep(5);
              setStepProgress(100);
            }
          } catch (err) {
            console.error("Error checking video status:", err);
          }
        }
      });
      return () => {
        cleanup();
        clearTimeout(timeout);
      };
    }
  }, [videoData?.status_video]);
  const getStatusColor = (status) => {
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
  const getStatusText = (status) => {
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
  const formatTime = (seconds) => {
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
        icon: /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }),
        status: "completed",
        color: "green",
        progress: 100
      },
      {
        id: 2,
        title: "Mempersiapkan Karakter AI",
        description: "Menganalisis dan memproses karakter yang dipilih",
        icon: currentStep >= 2 ? /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
        status: currentStep > 2 ? "completed" : currentStep === 2 ? "in-progress" : "waiting",
        color: currentStep > 2 ? "green" : currentStep === 2 ? "purple" : "gray",
        progress: currentStep > 2 ? 100 : currentStep === 2 ? stepProgress : 0
      },
      {
        id: 3,
        title: "Menyiapkan Environment",
        description: "Memproses background dan pengaturan lingkungan",
        icon: currentStep >= 3 ? /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
        status: currentStep > 3 ? "completed" : currentStep === 3 ? "in-progress" : "waiting",
        color: currentStep > 3 ? "green" : currentStep === 3 ? "purple" : "gray",
        progress: currentStep > 3 ? 100 : currentStep === 3 ? stepProgress : 0
      },
      {
        id: 4,
        title: "Menghasilkan Voice AI",
        description: "Membuat suara menggunakan AI",
        icon: currentStep >= 4 ? /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Play, { className: "w-5 h-5" }),
        status: currentStep > 4 ? "completed" : currentStep === 4 ? "in-progress" : "waiting",
        color: currentStep > 4 ? "green" : currentStep === 4 ? "purple" : "gray",
        progress: currentStep > 4 ? 100 : currentStep === 4 ? stepProgress : 0
      },
      {
        id: 5,
        title: "Rendering Video Final",
        description: "Menggabungkan semua elemen menjadi video final",
        icon: currentStep >= 5 ? /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
        status: currentStep > 5 ? "completed" : currentStep === 5 ? "in-progress" : "waiting",
        color: currentStep > 5 ? "green" : currentStep === 5 ? "purple" : "gray",
        progress: currentStep > 5 ? 100 : currentStep === 5 ? stepProgress : 0
      }
    ];
    return steps;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }),
      /* @__PURE__ */ jsx("span", { children: "Memuat progress generation..." })
    ] }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Gagal Memuat Progress" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: error }),
      /* @__PURE__ */ jsx(Button, { onClick: handleRefresh, disabled: refreshing, children: refreshing ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
        "Memuat..."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
        "Coba Lagi"
      ] }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        onBack && /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: onBack, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Kembali"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Progress Generation" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Video AI sedang diproses" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleRefresh,
          disabled: refreshing,
          children: [
            /* @__PURE__ */ jsx(
              RefreshCw,
              {
                className: `w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`
              }
            ),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Progress Generation" }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "Progress Keseluruhan" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-foreground", children: [
              overallProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500",
              style: { width: `${overallProgress}%` }
            }
          ) })
        ] }),
        videoData?.status_video === "progress" && /* @__PURE__ */ jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Tersisa ",
            formatTime(timeRemaining)
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Detail Proses" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Proses pembuatan video AI sedang berlangsung" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: getProcessSteps().map((step) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `p-6 border rounded-xl transition-all ${step.status === "completed" ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : step.status === "in-progress" ? "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-full flex items-center justify-center ${step.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : step.status === "in-progress" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-gray-100 dark:bg-gray-800"}`,
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: step.status === "completed" ? "text-green-600 dark:text-green-400" : step.status === "in-progress" ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400",
                      children: step.icon
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: `font-semibold ${step.status === "completed" ? "text-green-800 dark:text-green-200" : step.status === "in-progress" ? "text-purple-800 dark:text-purple-200" : "text-foreground"}`,
                    children: step.title
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: step.description }),
                step.status === "in-progress" && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300",
                      style: { width: `${step.progress}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    Math.round(step.progress),
                    "% selesai"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                className: step.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : step.status === "in-progress" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
                children: step.status === "completed" ? "Selesai" : step.status === "in-progress" ? "Sedang Proses" : "Menunggu"
              }
            )
          ] })
        },
        step.id
      )) }) })
    ] }),
    (videoData?.status_video === "success" || videoResult?.status_video === "success") && /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Video Hasil" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Video AI Anda telah selesai diproses" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Video AI Siap" })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx(Video, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Video preview akan muncul di sini" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => {
                  if (videoResult?.resultUrl) {
                    window.location.href = `/download?url=${encodeURIComponent(
                      videoResult.resultUrl
                    )}&taskId=${videoResult.task_id}`;
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-2" }),
                  "Lihat Video"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  if (videoResult?.resultUrl) {
                    window.location.href = `/download?url=${encodeURIComponent(
                      videoResult.resultUrl
                    )}&taskId=${videoResult.task_id}`;
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
                  "Download"
                ]
              }
            )
          ] })
        ] }) })
      ] }) })
    ] }),
    videoData && /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsx("span", { children: "Detail Video" })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Task ID" }),
            /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: videoData.task_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Model AI" }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: videoData.model_ai })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Aspect Ratio" }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: videoData.aspect_ratio })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsx(Badge, { className: getStatusColor(videoData.status_video), children: getStatusText(videoData.status_video) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Prompt" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg", children: videoData.prompt })
        ] })
      ] })
    ] }) })
  ] });
}

const prerender = false;
const $$Generate = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Main, { "content": { title: "Generate Video" } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-background"> <div class="container mx-auto px-4 py-8"> ${renderComponent($$result2, "NavbarWithModal", NavbarWithModal, { "client:load": true, "currentStep": 3, "totalSteps": 4, "client:component-hydration": "load", "client:component-path": "@/components/NavbarWithModal", "client:component-export": "NavbarWithModal" })} <div class="max-w-7xl mx-auto mt-8"> ${renderComponent($$result2, "GenerateVideo", GenerateVideo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/GenerateVideo", "client:component-export": "GenerateVideo" })} </div> </div> <footer class="bg-muted/50 border-t"> <div class="container mx-auto px-4 py-6"> <div class="text-center text-muted-foreground"> <p>&copy; 2025 Video Generator. All rights reserved.</p> </div> </div> </footer> </main> ` })}`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate.astro";
const $$url = "/generate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Generate,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
