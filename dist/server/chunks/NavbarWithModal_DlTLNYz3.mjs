import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as Badge, N as Navbar } from './card_BBwcWowj.mjs';
import { I as Input } from './input_Cdrza9AE.mjs';
import { History, X, User, AlertCircle, RefreshCw, Settings, Coins, Video, Calendar, Eye, Download, ChevronLeft, ChevronRight, Clock, XCircle, CheckCircle } from 'lucide-react';
import { d as videoHistoryApi } from './api_Zi8Etrro.mjs';

function VideoHistoryModal({ isOpen, onClose }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [xApiKey, setXApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [coinData, setCoinData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loadingHistory, setLoadingHistory] = useState(false);
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
    }
  }, [isOpen]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
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
      setCountdown(60);
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
      await loadHistoryData(result.data["x-api-key"]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal verifikasi OTP");
    } finally {
      setLoading(false);
    }
  };
  const loadHistoryData = async (apiKey) => {
    try {
      setLoadingHistory(true);
      const [videoResponse, coinResponse] = await Promise.all([
        videoHistoryApi.getVideoList(apiKey, currentPage, 5),
        videoHistoryApi.getCoinBalance(apiKey)
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
  const handlePageChange = async (page) => {
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
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600" });
      case "progress":
        return /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 text-blue-600 animate-spin" });
      case "failed":
        return /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-600" });
      default:
        return /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-600" });
    }
  };
  const getStatusColor = (status) => {
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
  const getStatusText = (status) => {
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
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleVideoAction = (video) => {
    if (video.status_video === "success" && video.url_video) {
      window.open(video.url_video, "_blank");
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(History, { className: "w-5 h-5 text-purple-600 dark:text-purple-400" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Riwayat Video" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              step === "email" && "Masukkan email untuk mengakses riwayat",
              step === "otp" && "Verifikasi OTP yang dikirim ke email",
              step === "history" && "Daftar video dan saldo koin Anda"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-120px)]", children: [
        step === "email" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Masukkan Email" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "email",
                  placeholder: "Masukkan email Anda...",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onKeyPress: (e) => e.key === "Enter" && handleRequestOTP()
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxs("div", { className: "flex items-center p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400 mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleRequestOTP,
                disabled: loading || !email.trim(),
                className: "w-full",
                children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Mengirim OTP..."
                ] }) : "Kirim OTP"
              }
            )
          ] })
        ] }) }),
        step === "otp" && /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Verifikasi OTP" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Kode OTP telah dikirim ke:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Kode OTP" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "text",
                  placeholder: "Masukkan 6 digit OTP...",
                  value: otp,
                  onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
                  onKeyPress: (e) => e.key === "Enter" && handleVerifyOTP(),
                  maxLength: 6
                }
              )
            ] }),
            countdown > 0 && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Kirim ulang OTP dalam ",
              countdown,
              " detik"
            ] }) }),
            error && /* @__PURE__ */ jsxs("div", { className: "flex items-center p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400 mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handleVerifyOTP,
                  disabled: loading || !otp.trim() || otp.length !== 6,
                  className: "w-full",
                  children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
                    "Memverifikasi..."
                  ] }) : "Verifikasi OTP"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setStep("email"),
                  className: "w-full",
                  children: "Kembali ke Email"
                }
              )
            ] })
          ] })
        ] }) }),
        step === "history" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          coinData && /* @__PURE__ */ jsxs(Card, { className: "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5 text-purple-600" }),
              /* @__PURE__ */ jsx("span", { children: "Saldo Koin" })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-purple-600", children: coinData.quota.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Total Koin" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600", children: coinData.hari_ini.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Hari Ini" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: coinData.minggu_ini.toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Minggu Ini" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Daftar Video (",
                  totalVideos,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => loadHistoryData(xApiKey),
                  disabled: loadingHistory,
                  children: [
                    /* @__PURE__ */ jsx(
                      RefreshCw,
                      {
                        className: `w-4 h-4 mr-2 ${loadingHistory ? "animate-spin" : ""}`
                      }
                    ),
                    "Refresh"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              loadingHistory ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center py-8", children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6 animate-spin mr-2" }),
                /* @__PURE__ */ jsx("span", { children: "Memuat data..." })
              ] }) : videoList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
                /* @__PURE__ */ jsx(Video, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Belum ada video yang dibuat" })
              ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: videoList.map((video) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                        /* @__PURE__ */ jsxs(
                          Badge,
                          {
                            className: getStatusColor(video.status_video),
                            children: [
                              getStatusIcon(video.status_video),
                              /* @__PURE__ */ jsx("span", { className: "ml-1", children: getStatusText(video.status_video) })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(Badge, { variant: "outline", children: video.model_ai }),
                        /* @__PURE__ */ jsx(Badge, { variant: "outline", children: video.aspect_ratio })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground mb-2 line-clamp-2", children: video.prompt }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                          /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
                          /* @__PURE__ */ jsx("span", { children: formatDate(video.created_at) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                          /* @__PURE__ */ jsx(Settings, { className: "w-3 h-3" }),
                          /* @__PURE__ */ jsx("span", { children: video.resolusi_video })
                        ] })
                      ] })
                    ] }),
                    video.status_video === "success" && video.url_video && /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 ml-4", children: [
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          onClick: () => handleVideoAction(video),
                          children: [
                            /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-1" }),
                            "Lihat"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          onClick: () => window.open(video.url_video, "_blank"),
                          children: [
                            /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-1" }),
                            "Download"
                          ]
                        }
                      )
                    ] })
                  ] })
                },
                video.id
              )) }),
              totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 mt-6", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handlePageChange(currentPage - 1),
                    disabled: currentPage === 1 || loadingHistory,
                    children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1", children: Array.from(
                  { length: Math.min(5, totalPages) },
                  (_, i) => {
                    const page = i + 1;
                    return /* @__PURE__ */ jsx(
                      Button,
                      {
                        variant: currentPage === page ? "default" : "outline",
                        size: "sm",
                        onClick: () => handlePageChange(page),
                        disabled: loadingHistory,
                        children: page
                      },
                      page
                    );
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handlePageChange(currentPage + 1),
                    disabled: currentPage === totalPages || loadingHistory,
                    children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

function NavbarWithModal({
  currentStep = 1,
  totalSteps = 4
}) {
  const [isVideoHistoryOpen, setIsVideoHistoryOpen] = useState(false);
  const handleVideoHistoryClick = () => {
    setIsVideoHistoryOpen(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Navbar,
      {
        currentStep,
        totalSteps,
        onVideoHistoryClick: handleVideoHistoryClick
      }
    ),
    /* @__PURE__ */ jsx(
      VideoHistoryModal,
      {
        isOpen: isVideoHistoryOpen,
        onClose: () => setIsVideoHistoryOpen(false)
      }
    )
  ] });
}

export { NavbarWithModal as N };
