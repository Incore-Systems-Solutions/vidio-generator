import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { N as NavbarWithModal } from '../chunks/NavbarWithModal_DF7YqAOL.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { C as Card, a as CardHeader, b as CardTitle, B as Button, c as CardContent, d as Badge } from '../chunks/card_D8elN7z5.mjs';
import { I as Input } from '../chunks/input_BNBZJNyb.mjs';
import { X, Mail, Clock, AlertCircle, CheckCircle, Coins, Wallet, QrCode, CreditCard, Sparkles, Video, Check, User, ArrowLeft } from 'lucide-react';
import { o as otpApi, a as videoStoreApi } from '../chunks/api_Zi8Etrro.mjs';
import { v as videoSetupStorage } from '../chunks/videoSetupStorage_3qmsD2TP.mjs';
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
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userQuota, setUserQuota] = useState(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const handlePersonalInfoChange = () => {
    const isComplete = name.trim() !== "" && email.trim() !== "" && phoneNumber.trim() !== "";
    setIsPersonalInfoComplete(isComplete);
  };
  const handleOTPSuccess = async (quota) => {
    setUserQuota(quota);
    setIsOTPVerified(true);
    setIsOTPModalOpen(false);
    const selectedPkg = pricingPackages.find(
      (pkg) => pkg.id === selectedPackage
    );
    const packagePrice = selectedPkg ? parseInt(selectedPkg.currentPrice.replace(/[^\d]/g, "")) : null;
    videoSetupStorage.updatePaymentInfo({
      email,
      no_wa: phoneNumber,
      metode_pengiriman: "kuota",
      metode: null,
      jumlah: packagePrice
    });
    if (selectedPaymentMethod === "coins" && quota >= 25e3 && packagePrice) {
      await handleCoinsPayment();
    }
  };
  const handleVerificationClick = () => {
    if (email.trim() !== "") {
      setIsOTPModalOpen(true);
    }
  };
  const handlePaymentMethodSelect = async (methodId) => {
    setSelectedPaymentMethod(methodId);
    const selectedPkg = pricingPackages.find(
      (pkg) => pkg.id === selectedPackage
    );
    const packagePrice = selectedPkg ? parseInt(selectedPkg.currentPrice.replace(/[^\d]/g, "")) : null;
    if (methodId === "coins") {
      if (isOTPVerified && packagePrice) {
        videoSetupStorage.updatePaymentInfo({
          email,
          no_wa: phoneNumber,
          metode_pengiriman: "kuota",
          metode: null,
          jumlah: packagePrice
        });
        await handleCoinsPayment();
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
        jumlah: packagePrice
      });
    }
  };
  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    const selectedPkg = pricingPackages.find((pkg) => pkg.id === packageId);
    const packagePrice = selectedPkg ? parseInt(selectedPkg.currentPrice.replace(/[^\d]/g, "")) : null;
    if (packagePrice) {
      videoSetupStorage.updatePaymentInfo({
        email,
        no_wa: phoneNumber,
        metode_pengiriman: selectedPaymentMethod === "coins" ? "kuota" : "pembayaran",
        metode: selectedPaymentMethod === "coins" ? null : selectedPaymentMethod === "gopay" ? "gopay" : selectedPaymentMethod === "qris" ? "other_qris" : selectedPaymentMethod === "credit-card" ? "kreem" : null,
        jumlah: packagePrice
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
  const pricingPackages = [
    {
      id: "single",
      title: "1 Video",
      originalPrice: null,
      currentPrice: "Rp 25.000",
      quantity: "1 Video",
      features: [
        "1 Video HD (720p)",
        "Mendapat 25000 koin",
        "Pilihan karakter & environment",
        "Download langsung"
      ],
      popular: false
    },
    {
      id: "package-10",
      title: "Paket 10 Video",
      originalPrice: "Rp 250.000",
      currentPrice: "Rp 200.000",
      quantity: "10 Video",
      features: [
        "10 Video HD (720p)",
        "Mendapat 200000 koin",
        "Hemat 20% dari harga satuan",
        "Valid 30 hari"
      ],
      popular: true
    },
    {
      id: "package-pro",
      title: "Paket Pro",
      originalPrice: "Rp 500.000",
      currentPrice: "Rp 450.000",
      quantity: "20 video",
      features: [
        "20 Video HD (720p)",
        "Mendapat 500000 koin",
        "Hemat 20% dari harga satuan",
        "Valid 30 hari"
      ],
      popular: false
    }
  ];
  const paymentMethods = [
    {
      id: "coins",
      name: "Gunakan Koin",
      description: isOTPVerified ? `Saldo: ${userQuota?.toLocaleString()} Koin` : "Verifikasi OTP terlebih dahulu",
      icon: /* @__PURE__ */ jsx(Coins, { className: "w-6 h-6" }),
      balance: userQuota ? `${userQuota.toLocaleString()} Koin` : "0 Koin",
      disabled: !isOTPVerified || userQuota !== null && userQuota < 25e3
    },
    {
      id: "gopay",
      name: "Gopay",
      description: "Pembayaran dengan Gopay",
      icon: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6" }),
      disabled: false
    },
    {
      id: "qris",
      name: "QRIS",
      description: "Pembayaran dengan QRIS",
      icon: /* @__PURE__ */ jsx(QrCode, { className: "w-6 h-6" }),
      disabled: false
    },
    {
      id: "credit-card",
      name: "Kartu Kredit dan Internasional",
      description: "Pembayaran dengan Kartu Kredit dan Internasional",
      icon: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6" }),
      disabled: false
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-foreground mb-4", children: "Pilih Paket & Pembayaran" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Pilih paket yang sesuai dengan kebutuhan Anda dan metode pembayaran yang diinginkan. Lengkapi informasi pembayaran untuk melanjutkan proses pembuatan video AI Anda." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Paket Harga" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Pilih paket yang sesuai dengan kebutuhan Anda" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-6xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: pricingPackages.map((pkg) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `relative p-6 border rounded-xl cursor-pointer transition-all ${selectedPackage === pkg.id ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-lg" : "border-border hover:border-purple-300 hover:shadow-md"} ${pkg.popular ? "ring-2 ring-purple-200 dark:ring-purple-800" : ""}`,
          onClick: () => handlePackageSelect(pkg.id),
          children: [
            pkg.popular && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-1", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 mr-1" }),
              "Terpopuler"
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Video, { className: "w-8 h-8 text-gray-600 dark:text-gray-400" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: pkg.title }),
              /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                pkg.originalPrice && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground line-through mr-2", children: pkg.originalPrice }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-purple-600", children: pkg.currentPrice })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: pkg.quantity })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: pkg.features.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-600 mr-3 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: feature })
            ] }, index)) }),
            selectedPackage === pkg.id && /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-white" }) }) })
          ]
        },
        pkg.id
      )) }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Informasi Pembayaran" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Lengkapi data diri dan pilih metode pembayaran untuk melanjutkan" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Card, { className: "bg-card shadow-lg h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-purple-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Data Personal" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Informasi yang diperlukan untuk proses pembayaran" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Email" }),
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
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Nomor Telepon" }),
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
                      children: "Verifikasi"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3", children: /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-purple-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Metode Pembayaran" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pilih metode pembayaran yang paling nyaman untuk Anda" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: paymentMethods.map((method) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `p-4 border rounded-xl cursor-pointer transition-all ${method.disabled ? "border-border bg-muted cursor-not-allowed opacity-60" : selectedPaymentMethod === method.id ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" : "border-border hover:border-purple-300 hover:bg-card/50"}`,
                onClick: () => !method.disabled && handlePaymentMethodSelect(method.id),
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-12 h-12 rounded-xl flex items-center justify-center ${method.disabled ? "bg-muted" : "bg-purple-100 dark:bg-purple-900/30"}`,
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: method.disabled ? "text-muted-foreground" : "text-purple-600 dark:text-purple-400",
                          children: method.icon
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `font-semibold text-sm ${method.disabled ? "text-muted-foreground" : "text-foreground"}`,
                        children: method.name
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `text-xs ${method.disabled ? "text-muted-foreground" : "text-muted-foreground"}`,
                        children: method.description
                      }
                    )
                  ] }),
                  method.balance && /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "bg-muted text-muted-foreground text-xs",
                      children: method.balance
                    }
                  )
                ] })
              },
              method.id
            )) })
          ] })
        ] }) }) }),
        (selectedPackage || selectedPaymentMethod || isPersonalInfoComplete) && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Card, { className: "bg-card shadow-lg h-full", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold text-foreground", children: "Ringkasan Pesanan" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
            selectedPackage && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground", children: pricingPackages.find(
                  (pkg) => pkg.id === selectedPackage
                )?.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: pricingPackages.find(
                  (pkg) => pkg.id === selectedPackage
                )?.quantity })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-purple-600", children: pricingPackages.find(
                (pkg) => pkg.id === selectedPackage
              )?.currentPrice }) })
            ] }),
            selectedPackage && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-purple-600", children: pricingPackages.find(
                (pkg) => pkg.id === selectedPackage
              )?.currentPrice })
            ] }),
            selectedPaymentMethod && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Metode Pembayaran" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: paymentMethods.find(
                (method) => method.id === selectedPaymentMethod
              )?.name })
            ] }),
            isPersonalInfoComplete && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Data Pembeli" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Nama:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Email:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Telepon:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: phoneNumber })
                ] }),
                companyName && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Perusahaan:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: companyName })
                ] }),
                isOTPVerified && userQuota !== null && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Saldo Koin:" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                    userQuota.toLocaleString(),
                    " Koin"
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }) }) })
    ] }),
    isPersonalInfoComplete && /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg", children: [
      /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600 dark:text-green-400 mr-3" }),
      /* @__PURE__ */ jsx("span", { className: "text-green-800 dark:text-green-200 font-medium", children: "Data diri telah lengkap" })
    ] }) }),
    error && /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-600 dark:text-red-400 mr-3" }),
      /* @__PURE__ */ jsx("span", { className: "text-red-800 dark:text-red-200 font-medium", children: error })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "lg",
          className: "flex items-center space-x-2",
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
          className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
          onClick: handleContinuePayment,
          children: isProcessing ? "Memproses..." : "Bayar Sekarang"
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
  ] });
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
