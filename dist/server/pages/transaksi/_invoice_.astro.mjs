import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BY5bc-G0.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, a as Badge } from '../../chunks/badge_DSQWoPdL.mjs';
import 'clsx';
import { RefreshCw, AlertCircle, Loader2, ArrowLeft, CreditCard, Sparkles, FileText, DollarSign, ExternalLink, Video, Film, Calendar, List, XCircle, Clock, CheckCircle } from 'lucide-react';
import { t as transactionApi } from '../../chunks/api_yL4KI-YJ.mjs';
import { v as videoSetupStorage } from '../../chunks/videoSetupStorage_DUxbdP36.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const BASE_URL = "https://api.instantvideoapp.com";
function TransactionDetail({
  invoiceNumber,
  onBack
}) {
  const [transaction, setTransaction] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isKonsultanMode, setIsKonsultanMode] = useState(false);
  const [konsultanData, setKonsultanData] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [isOptimizingPrompt, setIsOptimizingPrompt] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(null);
  const fetchTransaction = async () => {
    try {
      setError(null);
      const response = await transactionApi.getTransaction(invoiceNumber);
      if (response.status) {
        setTransaction(response.data);
        if (response.data && response.data["x-api-key"]) {
          localStorage.setItem(
            "x-api-key",
            response.data["x-api-key"]
          );
          console.log(
            "Saved x-api-key from transaction:",
            response.data["x-api-key"]
          );
        }
        if (response.data.transaction_status === "success") {
          localStorage.removeItem("konsultan-chat-messages");
          localStorage.removeItem("konsultan-video-data");
          console.log("Cleared konsultan chat data after successful payment");
          const uuidKonsultan = response.data.uuid_konsultan || response.data.chat_uuid;
          if (uuidKonsultan) {
            localStorage.setItem("generate-uuid", uuidKonsultan);
            console.log("Saved generate-uuid:", uuidKonsultan);
          }
        }
      } else {
        throw new Error(response.message || "Failed to fetch transaction");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transaction"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTransaction();
  };
  const checkPromptOptimization = async (uuidChat, apiKey) => {
    try {
      console.log("Checking prompt optimization for uuid_chat:", uuidChat);
      const response = await fetch(
        `${BASE_URL}/api/chat-ai/check-prompt/${uuidChat}`,
        {
          headers: {
            "x-api-key": apiKey
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message || "Gagal mengecek optimasi prompt");
      }
      console.log("Prompt optimization response:", result);
      setOptimizationProgress(result.data);
      if (result.data.prompt_video !== null) {
        console.log("Prompt optimization complete!");
        return true;
      } else {
        console.log("Prompt still optimizing...");
        return false;
      }
    } catch (err) {
      console.error("Error checking prompt optimization:", err);
      throw err;
    }
  };
  const waitForPromptOptimization = async (uuidChat, apiKey) => {
    setIsOptimizingPrompt(true);
    while (true) {
      const isComplete = await checkPromptOptimization(uuidChat, apiKey);
      if (isComplete) {
        setIsOptimizingPrompt(false);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 5e3));
    }
  };
  const handleGenerateVideo = async () => {
    try {
      const konsultanChatUuid = localStorage.getItem("konsultan-chat-uuid");
      const xApiKey = localStorage.getItem("x-api-key");
      if (!konsultanChatUuid) {
        console.log(
          "No konsultan-chat-uuid found, redirecting to generate page directly"
        );
        const generateUuid2 = localStorage.getItem("generate-uuid");
        if (generateUuid2) {
          window.location.href = `/generate/${generateUuid2}`;
        }
        return;
      }
      if (!xApiKey) {
        throw new Error("API key tidak ditemukan. Silakan login kembali.");
      }
      console.log("Starting prompt optimization check...");
      await waitForPromptOptimization(konsultanChatUuid, xApiKey);
      console.log("Prompt optimization complete, redirecting...");
      const generateUuid = localStorage.getItem("generate-uuid");
      if (generateUuid) {
        window.location.href = `/generate/${generateUuid}`;
      } else {
        throw new Error("Generate UUID tidak ditemukan");
      }
    } catch (err) {
      console.error("Error during generate video process:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses video"
      );
      setIsOptimizingPrompt(false);
    }
  };
  useEffect(() => {
    fetchTransaction();
    const konsultanDataStr = localStorage.getItem("konsultan-video-data");
    if (konsultanDataStr) {
      try {
        const parsedData = JSON.parse(konsultanDataStr);
        console.log(
          "Loading konsultan data in transaction detail:",
          parsedData
        );
        setIsKonsultanMode(true);
        setKonsultanData(parsedData);
      } catch (err) {
        console.error("Error parsing konsultan data:", err);
      }
    } else {
      const storedVideoData = videoSetupStorage.load();
      setVideoData(storedVideoData);
    }
    const collectionDataStr = localStorage.getItem("collection_data");
    if (collectionDataStr) {
      try {
        const parsedCollectionData = JSON.parse(collectionDataStr);
        console.log(
          "Loading collection data in transaction detail:",
          parsedCollectionData
        );
        setCollectionData(parsedCollectionData);
      } catch (err) {
        console.error("Error parsing collection data:", err);
      }
    }
  }, [invoiceNumber]);
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
      case "pending":
        return /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-yellow-600" });
      case "failed":
      case "expired":
        return /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-red-600" });
      default:
        return /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-gray-600" });
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return "Pembayaran Berhasil";
      case "pending":
        return "Menunggu Pembayaran";
      case "failed":
        return "Pembayaran Gagal";
      case "expired":
        return "Pembayaran Kedaluwarsa";
      default:
        return status;
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse" }),
        /* @__PURE__ */ jsx(RefreshCw, { className: "relative w-12 h-12 animate-spin text-purple-400" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Memuat detail transaksi..." })
    ] }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30" }),
        /* @__PURE__ */ jsx(AlertCircle, { className: "relative w-16 h-16 text-red-400 mx-auto" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: "Gagal Memuat Transaksi" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: error }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleRefresh,
          disabled: refreshing,
          className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
          children: refreshing ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
            "Memuat..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            "Coba Lagi"
          ] })
        }
      )
    ] }) }) });
  }
  if (!transaction) {
    return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full blur-xl opacity-20" }),
        /* @__PURE__ */ jsx(AlertCircle, { className: "relative w-16 h-16 text-gray-400 mx-auto" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: "Transaksi Tidak Ditemukan" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
        "Transaksi dengan nomor ",
        invoiceNumber,
        " tidak ditemukan."
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased relative overflow-x-hidden", children: [
    isOptimizingPrompt && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl w-full px-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" }),
            /* @__PURE__ */ jsx(Loader2, { className: "relative w-16 h-16 animate-spin text-purple-400 mx-auto" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2", children: "Optimasi Prompt Video" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-6", children: "AI sedang mengoptimalkan prompt video Anda untuk hasil terbaik" }),
          optimizationProgress && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-300 mb-2", children: optimizationProgress.minutes }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: "Estimasi Waktu" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-gray-500", children: /* @__PURE__ */ jsx("p", { children: "💡 Proses ini memastikan video Anda memiliki kualitas optimal" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-shimmer-slow" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
          style: { animationDelay: "2s" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse",
          style: { animationDelay: "4s" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: onBack && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onBack,
              className: "text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-500/20",
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                "Kembali"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleRefresh,
              disabled: refreshing,
              className: "text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 border border-blue-500/20",
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4 text-purple-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-purple-300", children: "Detail Transaksi" })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 tracking-tight", children: /* @__PURE__ */ jsxs("span", { className: "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient", children: [
              "Invoice #",
              transaction.invoice_number
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
              isKonsultanMode && /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 px-4 py-2", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                "Video Konsultan AI"
              ] }),
              collectionData && /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-200 px-4 py-2", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 mr-2" }),
                "Data Konsultasi Tersedia"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30", children: /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-purple-400" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent", children: "Status Transaksi" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-slate-800/50 rounded-2xl p-5 border border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30", children: getStatusIcon(transaction.transaction_status) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-white text-lg", children: getStatusText(transaction.transaction_status) }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: transaction.status_ref })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Badge,
                  {
                    className: getStatusColor(transaction.transaction_status),
                    children: transaction.transaction_status.toUpperCase()
                  }
                )
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-green-400" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent", children: "Informasi Pembayaran" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-5 border border-green-500/20", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Total Pembayaran" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-3xl text-white", children: formatCurrency(transaction.total_payment) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Subtotal" }),
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: formatCurrency(transaction.subtotal) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Biaya Admin" }),
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: formatCurrency(transaction.total_fee) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Diskon" }),
                    /* @__PURE__ */ jsxs("p", { className: "font-semibold text-orange-300", children: [
                      "-",
                      formatCurrency(transaction.promo)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Metode Pembayaran" }),
                    /* @__PURE__ */ jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-blue-300 border-blue-500/30 bg-blue-500/10",
                        children: transaction.payment_type
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-blue-500/30", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-400" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: "Detail Transaksi" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Order ID" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: transaction.order_id })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Tanggal Transaksi" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: formatDate(transaction.created_at) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Kedaluwarsa" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: formatDate(transaction.transaction_expired) })
                ] }),
                transaction.payment_url && /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" }),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "relative w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-orange-300 hover:text-orange-200 hover:border-orange-500/50",
                      onClick: () => {
                        const popup = window.open(
                          transaction.payment_url,
                          "payment",
                          "width=800,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no"
                        );
                        if (popup) {
                          popup.focus();
                        }
                      },
                      children: [
                        /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
                        "Buka Halaman Pembayaran"
                      ]
                    }
                  )
                ] }) }),
                transaction.transaction_status === "success" && /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "sm",
                      className: "relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30",
                      onClick: handleGenerateVideo,
                      disabled: isOptimizingPrompt,
                      children: isOptimizingPrompt ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Memproses..."
                      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 mr-2" }),
                        "Generate Video"
                      ] })
                    }
                  )
                ] }) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" }),
          /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30", children: /* @__PURE__ */ jsx(Video, { className: "w-5 h-5 text-purple-400" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent", children: "Detail Video" })
            ] }),
            collectionData ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-20 blur-lg" }),
              /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6 pb-4 border-b border-white/10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-md opacity-40 animate-pulse" }),
                    /* @__PURE__ */ jsx("div", { className: "relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Film, { className: "w-5 h-5 text-white" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent", children: "Data Konsultasi Video" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Informasi yang dikumpulkan dari diskusi" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  collectionData.data.script_naskah && /* @__PURE__ */ jsxs("div", { className: "bg-slate-900/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-purple-300 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                      "Script & Naskah"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                          "Subjek:",
                          " "
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: collectionData.data.script_naskah.subjek })
                      ] }),
                      collectionData.data.script_naskah.karakter && collectionData.data.script_naskah.karakter.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-400 block mb-2", children: "Karakter:" }),
                        /* @__PURE__ */ jsx("div", { className: "space-y-2 pl-2", children: collectionData.data.script_naskah.karakter.map(
                          (kar, idx) => /* @__PURE__ */ jsxs(
                            "div",
                            {
                              className: "bg-slate-950/50 rounded-lg p-3 border border-purple-500/10",
                              children: [
                                /* @__PURE__ */ jsx("div", { className: "font-medium text-purple-300 mb-1", children: kar.nama_karakter }),
                                /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400 space-y-1", children: [
                                  /* @__PURE__ */ jsx("div", { children: kar.detail_karakter }),
                                  /* @__PURE__ */ jsxs("div", { children: [
                                    /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Aksi:" }),
                                    " ",
                                    kar.aksi
                                  ] }),
                                  kar.deskripsi_tambahan && /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: kar.deskripsi_tambahan })
                                ] })
                              ]
                            },
                            idx
                          )
                        ) })
                      ] }),
                      collectionData.data.script_naskah.interaksi && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                          "Interaksi:",
                          " "
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.script_naskah.interaksi })
                      ] })
                    ] })
                  ] }),
                  collectionData.data.lokasi_waktu && /* @__PURE__ */ jsxs("div", { className: "bg-slate-900/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-cyan-300 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2" }),
                      "Lokasi & Waktu"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-400 block mb-1", children: "Tempat" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: collectionData.data.lokasi_waktu.tempat })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-400 block mb-1", children: "Waktu" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: collectionData.data.lokasi_waktu.waktu })
                      ] })
                    ] })
                  ] }),
                  collectionData.data.gaya_visual && /* @__PURE__ */ jsxs("div", { className: "bg-slate-900/50 rounded-xl p-4 border border-white/5", children: [
                    /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-blue-300 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 mr-2" }),
                      "Gaya Visual"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400 block mb-1", children: "Style" }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: collectionData.data.gaya_visual.style })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400 block mb-1", children: "Nuansa" }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: collectionData.data.gaya_visual.nuansa })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-slate-950/50 rounded-lg p-3 border border-blue-500/10", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-blue-300 mb-2", children: "Kualitas" }),
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Resolusi:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kualitas.resolusi })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Frame Rate:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kualitas.frame_rate })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Rendering:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kualitas.rendering_style })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Lighting:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kualitas.lighting })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Color Grading:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kualitas.color_grading })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-slate-950/50 rounded-lg p-3 border border-blue-500/10", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-blue-300 mb-2", children: "Kamera" }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-xs", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Angle:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kamera.angle })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Gerakan:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kamera.gerakan })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Aspect Ratio:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kamera.aspect_ratio })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                              "Depth of Field:",
                              " "
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: collectionData.data.gaya_visual.kamera.depth_of_field })
                          ] })
                        ] })
                      ] })
                    ] })
                  ] }),
                  (collectionData.data.count_scene_video || collectionData.data.durasi_final) && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-500/30", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-center", children: [
                    collectionData.data.count_scene_video && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-purple-300", children: collectionData.data.count_scene_video }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1", children: "Scene Video" })
                    ] }),
                    collectionData.data.durasi_final && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-blue-300", children: [
                        collectionData.data.durasi_final,
                        "s"
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1", children: "Durasi Final" })
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-gray-500", children: "📊 Data ini akan digunakan untuk membuat prompt video yang lebih detail" }) })
              ] })
            ] }) }) : isKonsultanMode && konsultanData ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(List, { className: "w-4 h-4 text-purple-600" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-white", children: [
                    "Total Scene: ",
                    konsultanData.list?.length || 0
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Badge, { className: "bg-gradient-to-r from-purple-600 to-blue-600 text-white", children: "Multiple Videos" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-[400px] overflow-y-auto", children: konsultanData.list?.map(
                (scene, index) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-slate-800/50 rounded-xl p-4 border border-white/5",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-purple-300", children: index + 1 }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm text-white line-clamp-3", children: scene.prompt || "Tidak ada prompt" }),
                        scene.aspek_rasio && /* @__PURE__ */ jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "mt-2 text-xs border-purple-500/30 text-purple-300",
                            children: scene.aspek_rasio
                          }
                        )
                      ] })
                    ] })
                  },
                  index
                )
              ) }),
              /* @__PURE__ */ jsx("div", { className: "pt-3 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                konsultanData.email && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Email" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-white truncate", children: konsultanData.email })
                ] }),
                konsultanData.is_share && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Share Status" }),
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs border-blue-500/30 text-blue-300",
                      children: konsultanData.is_share === "y" ? "Shared" : "Private"
                    }
                  )
                ] })
              ] }) })
            ] }) : videoData ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Judul Video" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: videoData.judul_video || "Tidak ada judul" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Prompt" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-white", children: videoData.prompt || "Tidak ada prompt" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Aspek Rasio" }),
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-purple-500/30 text-purple-300",
                      children: videoData.aspek_rasio
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Bahasa" }),
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-blue-500/30 text-blue-300",
                      children: videoData.bahasa
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Gaya Suara" }),
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-green-500/30 text-green-300",
                      children: videoData.gaya_suara
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 rounded-xl p-4 border border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Tone" }),
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-orange-500/30 text-orange-300",
                      children: videoData.tone
                    }
                  )
                ] })
              ] })
            ] }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Data video tidak tersedia" })
            ] })
          ] }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 3s ease-in-out infinite;
        }
      ` })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
async function getStaticPaths() {
  return [];
}
const $$invoice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$invoice;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Detail Transaksi - Video Generator</title><meta name="description" content="Lihat detail transaksi Anda dan informasi video yang telah Anda pesan.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <main class="flex-1"> ${renderComponent($$result, "TransactionDetail", TransactionDetail, { "invoiceNumber": Astro2.params.invoice || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/TransactionDetail", "client:component-export": "TransactionDetail" })} </main> </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/transaksi/[invoice].astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/transaksi/[invoice].astro";
const $$url = "/transaksi/[invoice]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$invoice,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
