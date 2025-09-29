import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { N as NavbarWithModal } from '../chunks/NavbarWithModal_DF7YqAOL.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { C as Card, a as CardHeader, b as CardTitle, B as Button, c as CardContent, d as Badge } from '../chunks/card_D8elN7z5.mjs';
import { I as Input } from '../chunks/input_BNBZJNyb.mjs';
import { X, Mail, Clock, AlertCircle, CheckCircle, Coins, Wallet, QrCode, CreditCard, Video, Check, User, ArrowLeft, Play } from 'lucide-react';
import { o as otpApi, a as videoStoreApi } from '../chunks/api_Zi8Etrro.mjs';
import { v as videoSetupStorage } from '../chunks/videoSetupStorage_DUxbdP36.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

function OTPModal({ isOpen, onClose, email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const handleRequestOTP = async () => {
    try {
      setIsRequestingOTP(true);
      setError(null);
      const response = await otpApi.requestOTP({ email });
      if (response.status) {
        setOtpSent(true);
        setSuccess("OTP telah dikirim ke email Anda");
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1e3);
      } else {
        setError(response.message || "Gagal mengirim OTP");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim OTP");
    } finally {
      setIsRequestingOTP(false);
    }
  };
  const handleValidateOTP = async () => {
    if (otp.length !== 6) {
      setError("OTP harus 6 digit");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await otpApi.validateOTP({
        email,
        otp: parseInt(otp)
      });
      if (response.status && response.data) {
        setSuccess("OTP berhasil divalidasi!");
        setTimeout(() => {
          onSuccess(response.data.quota);
          onClose();
        }, 1500);
      } else {
        setError(response.message || "OTP tidak valid");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memvalidasi OTP");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setOtp("");
    setError(null);
    setSuccess(null);
    setOtpSent(false);
    setCountdown(0);
    onClose();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-2xl", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Verifikasi OTP" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleClose,
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [
        /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-gray-600 dark:text-gray-400" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: email })
        ] })
      ] }),
      !otpSent && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleRequestOTP,
          disabled: isRequestingOTP,
          className: "w-full",
          children: isRequestingOTP ? "Mengirim..." : "Kirim OTP"
        }
      ) }),
      otpSent && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Masukkan Kode OTP" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              placeholder: "123456",
              value: otp,
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
                setError(null);
              },
              className: "text-center text-lg tracking-widest",
              maxLength: 6
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center", children: countdown > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Kirim ulang dalam ",
            countdown,
            "s"
          ] })
        ] }) : /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleRequestOTP,
            disabled: isRequestingOTP,
            children: isRequestingOTP ? "Mengirim..." : "Kirim Ulang OTP"
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleValidateOTP,
            disabled: isLoading || otp.length !== 6,
            className: "w-full",
            children: isLoading ? "Memvalidasi..." : "Verifikasi OTP"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-red-800 dark:text-red-200", children: error })
      ] }),
      success && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600 dark:text-green-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-green-800 dark:text-green-200", children: success })
      ] })
    ] })
  ] }) });
}

function PaymentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userQuota, setUserQuota] = useState(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    videoSetupStorage.debug();
    const existingData = videoSetupStorage.load();
    console.log("Loading existing data from localStorage:", existingData);
    if (existingData) {
      if (existingData.email) {
        setEmail(existingData.email);
      }
      if (existingData.no_wa) {
        setPhoneNumber(existingData.no_wa);
      }
    }
  }, []);
  useEffect(() => {
    handlePersonalInfoChange();
  }, [email, phoneNumber]);
  const handlePersonalInfoChange = () => {
    const isComplete = email.trim() !== "" && phoneNumber.trim() !== "";
    console.log("Personal info validation:", {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      isComplete
    });
    setIsPersonalInfoComplete(isComplete);
  };
  const handleOTPSuccess = async (quota) => {
    setUserQuota(quota);
    setIsOTPVerified(true);
    setIsOTPModalOpen(false);
    const fixedPrice = 1e4;
    videoSetupStorage.updatePaymentInfo({
      email,
      no_wa: phoneNumber,
      metode_pengiriman: "kuota",
      metode: null,
      jumlah: fixedPrice
    });
  };
  const handleVerificationClick = () => {
    if (email.trim() !== "") {
      setIsOTPModalOpen(true);
    }
  };
  const handlePaymentMethodSelect = async (methodId) => {
    setSelectedPaymentMethod(methodId);
    const fixedPrice = 1e4;
    if (methodId === "coins") {
      if (isOTPVerified) {
        videoSetupStorage.updatePaymentInfo({
          email,
          no_wa: phoneNumber,
          metode_pengiriman: "kuota",
          metode: null,
          jumlah: fixedPrice
        });
      }
    } else {
      let metode = null;
      if (methodId === "gopay") {
        metode = "gopay";
      } else if (methodId === "qris") {
        metode = "other_qris";
      } else if (methodId === "credit-card") {
        metode = "kreem";
      }
      videoSetupStorage.updatePaymentInfo({
        email,
        no_wa: phoneNumber,
        metode_pengiriman: "pembayaran",
        metode,
        jumlah: fixedPrice
      });
    }
  };
  const handleCoinsPayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const videoData = videoSetupStorage.load();
      if (!videoData) {
        throw new Error(
          "Data video tidak ditemukan. Silakan kembali ke halaman setup."
        );
      }
      const storeData = {
        prompt: videoData.prompt,
        karakter_image: videoData.karakter_image,
        background_image: videoData.background_image,
        aspek_rasio: videoData.aspek_rasio,
        seeds: null,
        model_ai: "veo3_fast",
        metode_pengiriman: "kuota",
        metode: null,
        jumlah: videoData.jumlah,
        email: videoData.email || email,
        no_wa: videoData.no_wa || phoneNumber,
        affiliate_by: ""
        // Empty string as per requirement
      };
      const result = await videoStoreApi.storeVideoData(storeData);
      if (result.status) {
        console.log(
          "Video data stored successfully with coins:",
          result.message
        );
        if (result.data && result.data["x-api-key"]) {
          localStorage.setItem("x-api-key", result.data["x-api-key"]);
        }
        window.location.href = "/generate";
      } else {
        throw new Error(result.message || "Gagal menyimpan data video");
      }
    } catch (err) {
      console.error("Error processing coins payment:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pembayaran dengan koin"
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const handleContinuePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const videoData = videoSetupStorage.load();
      if (!videoData) {
        throw new Error(
          "Data video tidak ditemukan. Silakan kembali ke halaman setup."
        );
      }
      const storeData = {
        prompt: videoData.prompt,
        karakter_image: videoData.karakter_image,
        background_image: videoData.background_image,
        aspek_rasio: videoData.aspek_rasio,
        seeds: null,
        model_ai: "veo3_fast",
        metode_pengiriman: videoData.metode_pengiriman || "pembayaran",
        metode: videoData.metode,
        jumlah: videoData.jumlah,
        email: videoData.email || email,
        no_wa: videoData.no_wa || phoneNumber,
        affiliate_by: ""
        // Empty string as per requirement
      };
      const result = await videoStoreApi.storeVideoData(storeData);
      if (result.status) {
        console.log("Video data stored successfully:", result.message);
        if (result.data && result.data["x-api-key"]) {
          localStorage.setItem("x-api-key", result.data["x-api-key"]);
        }
        if (result.data && result.data.invoice) {
          window.location.href = `/transaksi/${result.data.invoice}`;
        } else {
          alert("Pembayaran berhasil! Video Anda sedang diproses.");
        }
      } else {
        throw new Error(result.message || "Gagal menyimpan data video");
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pembayaran"
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const paymentMethods = [
    {
      id: "coins",
      name: "Gunakan Koin",
      description: isOTPVerified ? `Saldo: ${userQuota?.toLocaleString()} Koin` : "Verifikasi OTP terlebih dahulu",
      icon: /* @__PURE__ */ jsx(Coins, { className: "w-6 h-6" }),
      balance: userQuota ? `${userQuota.toLocaleString()} Koin` : "0 Koin",
      disabled: !isOTPVerified || userQuota !== null && userQuota < 7500
    },
    {
      id: "gopay",
      name: "Gopay",
      description: isOTPVerified ? "Pembayaran dengan Gopay" : "Verifikasi email terlebih dahulu",
      icon: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6" }),
      disabled: !isOTPVerified
    },
    {
      id: "qris",
      name: "QRIS",
      description: isOTPVerified ? "Pembayaran dengan QRIS" : "Verifikasi email terlebih dahulu",
      icon: /* @__PURE__ */ jsx(QrCode, { className: "w-6 h-6" }),
      disabled: !isOTPVerified
    },
    {
      id: "credit-card",
      name: "Kartu Kredit dan Internasional",
      description: isOTPVerified ? "Pembayaran dengan Kartu Kredit dan Internasional" : "Verifikasi email terlebih dahulu",
      icon: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6" }),
      disabled: !isOTPVerified
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "w-full min-h-screen  dark:from-gray-900 dark:to-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-foreground mb-4", children: "Pembayaran Video AI" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Lengkapi informasi pembayaran untuk melanjutkan proses pembuatan video AI Anda" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-card shadow-xl border-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-600 to-blue-600 text-white px-8 py-8 flex flex-col items-center w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4 w-full justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-6", children: /* @__PURE__ */ jsx(Video, { className: "w-8 h-8 text-white" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Video AI" }),
              /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg", children: "Harga tetap per video" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-5xl font-extrabold mb-2 w-full text-center", children: "Rp 7.500" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg w-full text-center", children: "1 Video HD berkualitas tinggi" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Video HD Berkualitas Tinggi" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Resolusi 720p atau 1080p sesuai pilihan" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Karakter & Background Custom" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pilihan karakter AI dan background sesuai keinginan" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Download Langsung" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Unduh video setelah proses selesai" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-blue-800 dark:text-blue-200 mb-1", children: "Rincian Penggunaan:" }),
              /* @__PURE__ */ jsxs("p", { className: "text-blue-700 dark:text-blue-300", children: [
                "• Minimal Transaksi: ",
                /* @__PURE__ */ jsx("strong", { children: "10.000" }),
                /* @__PURE__ */ jsx("br", {}),
                "• Biaya produksi video: ",
                /* @__PURE__ */ jsx("strong", { children: "7.500" }),
                /* @__PURE__ */ jsx("br", {}),
                "• Sisa ",
                /* @__PURE__ */ jsx("strong", { children: "2.500" }),
                " dikonversi menjadi koin untuk video berikutnya"
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-card shadow-xl border-0", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center text-xl", children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6 text-purple-600 mr-3" }),
          "Informasi Pembayaran"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-foreground mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-purple-600 mr-2" }),
              "Data Personal"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-foreground mb-2", children: [
                  "Email ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "email",
                    placeholder: "Masukkan email anda...",
                    value: email,
                    onChange: (e) => {
                      setEmail(e.target.value);
                      handlePersonalInfoChange();
                    },
                    className: "w-full"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-foreground mb-2", children: [
                  "Nomor Telepon ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "tel",
                      placeholder: "Masukkan nomor anda...",
                      value: phoneNumber,
                      onChange: (e) => {
                        setPhoneNumber(e.target.value);
                        handlePersonalInfoChange();
                      },
                      className: "flex-1"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "default",
                      disabled: email.trim() === "",
                      onClick: handleVerificationClick,
                      className: "bg-purple-600 hover:bg-purple-700",
                      children: "Verifikasi"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-foreground mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx(Wallet, { className: "w-5 h-5 text-purple-600 mr-2" }),
              "Metode Pembayaran"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: paymentMethods.map((method) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `p-4 border-2 rounded-xl cursor-pointer transition-all ${method.disabled ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60" : selectedPaymentMethod === method.id ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-md" : "border-gray-200 hover:border-purple-300 hover:shadow-sm"}`,
                onClick: () => !method.disabled && handlePaymentMethodSelect(method.id),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${method.disabled ? "bg-gray-200" : selectedPaymentMethod === method.id ? "bg-purple-100" : "bg-gray-100"}`,
                        children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: method.disabled ? "text-gray-400" : selectedPaymentMethod === method.id ? "text-purple-600" : "text-gray-600",
                            children: method.icon
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "h4",
                        {
                          className: `font-medium ${method.disabled ? "text-gray-400" : "text-foreground"}`,
                          children: method.name
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: `text-sm ${method.disabled ? "text-gray-400" : "text-muted-foreground"}`,
                          children: method.description
                        }
                      ),
                      method.balance && /* @__PURE__ */ jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "mt-1 text-xs",
                          children: method.balance
                        }
                      )
                    ] })
                  ] }),
                  selectedPaymentMethod === method.id && /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-white" }) })
                ] })
              },
              method.id
            )) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "lg",
          className: "flex items-center space-x-2 px-8",
          onClick: () => window.location.href = "/",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Kembali" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "lg",
          className: `px-8 ${selectedPaymentMethod === "coins" ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}`,
          disabled: !selectedPaymentMethod || !isPersonalInfoComplete || selectedPaymentMethod === "coins" && (!isOTPVerified || userQuota !== null && userQuota < 7500) || selectedPaymentMethod !== "coins" && !isOTPVerified || isProcessing,
          onClick: () => {
            console.log("Payment button clicked with state:", {
              selectedPaymentMethod,
              isPersonalInfoComplete,
              isOTPVerified,
              userQuota,
              email,
              phoneNumber,
              videoData: videoSetupStorage.load()
            });
            if (selectedPaymentMethod === "coins") {
              handleCoinsPayment();
            } else {
              handleContinuePayment();
            }
          },
          children: isProcessing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" }),
            /* @__PURE__ */ jsx("span", { children: "Memproses..." })
          ] }) : selectedPaymentMethod === "coins" ? /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Play, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Generate Video" })
          ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Bayar Sekarang" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      OTPModal,
      {
        isOpen: isOTPModalOpen,
        onClose: () => setIsOTPModalOpen(false),
        email,
        onSuccess: handleOTPSuccess
      }
    )
  ] }) });
}

const $$Astro = createAstro();
const $$Pembayaran = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pembayaran;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Pilih Paket & Pembayaran - Video Generator</title><meta name="description" content="Pilih paket yang sesuai dengan kebutuhan Anda dan metode pembayaran yang diinginkan.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <!-- Navigation with Integrated Stepper --> ${renderComponent($$result, "NavbarWithModal", NavbarWithModal, { "client:load": true, "currentStep": 2, "totalSteps": 4, "client:component-hydration": "load", "client:component-path": "@/components/NavbarWithModal", "client:component-export": "NavbarWithModal" })} <!-- Main Content --> <main class="flex-1"> <div class="container mx-auto px-8 py-12"> ${renderComponent($$result, "PaymentPage", PaymentPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/PaymentPage", "client:component-export": "PaymentPage" })} </div> </main> <!-- Footer --> <footer class="border-t py-12 mt-24"> <div class="container mx-auto px-4"> <div class="text-center text-muted-foreground"> <p>&copy; 2024 Video Generator. All rights reserved.</p> </div> </div> </footer> </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/pembayaran.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/pembayaran.astro";
const $$url = "/pembayaran";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pembayaran,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
