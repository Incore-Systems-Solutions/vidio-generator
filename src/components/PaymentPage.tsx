import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CreditCard,
  Coins,
  Wallet,
  QrCode,
  CheckCircle,
  ArrowLeft,
  Video,
  Check,
  Sparkles,
  AlertCircle,
  Play,
} from "lucide-react";
import { OTPModal } from "./OTPModal";
import { videoSetupStorage } from "@/lib/videoSetupStorage";
import { videoStoreApi } from "@/lib/api";

export function PaymentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  // Removed selectedPackage - using fixed price of 10,000
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userQuota, setUserQuota] = useState<number | null>(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data from localStorage on component mount
  useEffect(() => {
    // Debug localStorage
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
    // Note: We'll call handlePersonalInfoChange in a separate useEffect
  }, []);

  // Update personal info validation when email or phone changes
  useEffect(() => {
    handlePersonalInfoChange();
  }, [email, phoneNumber]);

  const handlePersonalInfoChange = () => {
    const isComplete = email.trim() !== "" && phoneNumber.trim() !== "";
    console.log("Personal info validation:", {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      isComplete,
    });
    setIsPersonalInfoComplete(isComplete);
  };

  const handleOTPSuccess = async (quota: number) => {
    setUserQuota(quota);
    setIsOTPVerified(true);
    setIsOTPModalOpen(false);

    // Fixed price for payment methods
    const fixedPrice = 10000;

    // Update localStorage with payment info
    videoSetupStorage.updatePaymentInfo({
      email: email,
      no_wa: phoneNumber,
      metode_pengiriman: "kuota",
      metode: null,
      jumlah: fixedPrice,
    });

    // Note: Removed automatic video generation - user must click "Generate Video" button
  };

  const handleVerificationClick = () => {
    if (email.trim() !== "") {
      setIsOTPModalOpen(true);
    }
  };

  const handlePaymentMethodSelect = async (methodId: string) => {
    setSelectedPaymentMethod(methodId);

    // Fixed price for all payment methods
    const fixedPrice = 10000;

    // Update localStorage based on payment method
    if (methodId === "coins") {
      // For coins, only update if OTP is verified
      if (isOTPVerified) {
        videoSetupStorage.updatePaymentInfo({
          email: email,
          no_wa: phoneNumber,
          metode_pengiriman: "kuota",
          metode: null,
          jumlah: fixedPrice,
        });

        // Note: Removed automatic video generation - user must click "Generate Video" button
      }
    } else {
      // For other payment methods, update immediately
      let metode = null;
      if (methodId === "gopay") {
        metode = "gopay";
      } else if (methodId === "qris") {
        metode = "other_qris";
      } else if (methodId === "credit-card") {
        metode = "kreem";
      }

      videoSetupStorage.updatePaymentInfo({
        email: email,
        no_wa: phoneNumber,
        metode_pengiriman: "pembayaran",
        metode: metode,
        jumlah: fixedPrice,
      });
    }
  };

  // Removed handlePackageSelect - using fixed pricing

  const handleCoinsPayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Get all data from localStorage
      const videoData = videoSetupStorage.load();
      if (!videoData) {
        throw new Error(
          "Data video tidak ditemukan. Silakan kembali ke halaman setup."
        );
      }

      // Prepare data for API call
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
        affiliate_by: "", // Empty string as per requirement
      };

      // Call the store API
      const result = await videoStoreApi.storeVideoData(storeData);

      if (result.status) {
        // Success - save x-api-key and redirect to generate video
        console.log(
          "Video data stored successfully with coins:",
          result.message
        );

        // Save x-api-key to localStorage for video generation
        if (result.data && result.data["x-api-key"]) {
          localStorage.setItem("x-api-key", result.data["x-api-key"]);
        }

        // Redirect directly to generate video page since payment is completed
        window.location.href = "/generate";
      } else {
        throw new Error(result.message || "Gagal menyimpan data video");
      }
    } catch (err) {
      console.error("Error processing coins payment:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses pembayaran dengan koin"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinuePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Get all data from localStorage
      const videoData = videoSetupStorage.load();
      if (!videoData) {
        throw new Error(
          "Data video tidak ditemukan. Silakan kembali ke halaman setup."
        );
      }

      // Prepare data for API call
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
        affiliate_by: "", // Empty string as per requirement
      };

      // Call the store API
      const result = await videoStoreApi.storeVideoData(storeData);

      if (result.status) {
        // Success - redirect to transaction detail page
        console.log("Video data stored successfully:", result.message);

        // Save x-api-key to localStorage for video generation
        if (result.data && result.data["x-api-key"]) {
          localStorage.setItem("x-api-key", result.data["x-api-key"]);
        }

        // Extract invoice number from result.data.invoice
        if (result.data && result.data.invoice) {
          // Redirect to transaction detail page
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
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses pembayaran"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Removed pricingPackages - using fixed pricing of Rp 10.000

  const paymentMethods = [
    {
      id: "coins",
      name: "Gunakan Koin",
      description: isOTPVerified
        ? `Saldo: ${userQuota?.toLocaleString()} Koin`
        : "Verifikasi OTP terlebih dahulu",
      icon: <Coins className="w-6 h-6" />,
      balance: userQuota ? `${userQuota.toLocaleString()} Koin` : "0 Koin",
      disabled: !isOTPVerified || (userQuota !== null && userQuota < 7500),
    },
    {
      id: "gopay",
      name: "Gopay",
      description: isOTPVerified
        ? "Pembayaran dengan Gopay"
        : "Verifikasi email terlebih dahulu",
      icon: <Wallet className="w-6 h-6" />,
      disabled: !isOTPVerified,
    },
    {
      id: "qris",
      name: "QRIS",
      description: isOTPVerified
        ? "Pembayaran dengan QRIS"
        : "Verifikasi email terlebih dahulu",
      icon: <QrCode className="w-6 h-6" />,
      disabled: !isOTPVerified,
    },
    {
      id: "credit-card",
      name: "Kartu Kredit dan Internasional",
      description: isOTPVerified
        ? "Pembayaran dengan Kartu Kredit dan Internasional"
        : "Verifikasi email terlebih dahulu",
      icon: <CreditCard className="w-6 h-6" />,
      disabled: !isOTPVerified,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pembayaran Video AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Lengkapi informasi pembayaran untuk melanjutkan proses pembuatan
            video AI Anda
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Pricing Information */}
          <div>
            <Card className="bg-card shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Video AI</h2>
                    <p className="text-white/80">Harga tetap per video</p>
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">Rp 10.000</div>
                <p className="text-white/80">1 Video HD berkualitas tinggi</p>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Video HD Berkualitas Tinggi
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Resolusi 720p atau 1080p sesuai pilihan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Karakter & Background Custom
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pilihan karakter AI dan background sesuai keinginan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Download Langsung
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Unduh video setelah proses selesai
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start">
                    <Coins className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                        Rincian Penggunaan:
                      </p>
                      <p className="text-blue-700 dark:text-blue-300">
                        • Biaya produksi video: <strong>7.500 koin</strong>
                        <br />• Sisa <strong>2.500</strong> dikonversi menjadi
                        koin untuk video berikutnya
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Information */}
          <div>
            <Card className="bg-card shadow-xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <CreditCard className="w-6 h-6 text-purple-600 mr-3" />
                  Informasi Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <User className="w-5 h-5 text-purple-600 mr-2" />
                    Data Personal
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="Masukkan email anda..."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          handlePersonalInfoChange();
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="tel"
                          placeholder="Masukkan nomor anda..."
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            handlePersonalInfoChange();
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="default"
                          disabled={email.trim() === ""}
                          onClick={handleVerificationClick}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Verifikasi
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <Wallet className="w-5 h-5 text-purple-600 mr-2" />
                    Metode Pembayaran
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          method.disabled
                            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                            : selectedPaymentMethod === method.id
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-md"
                            : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
                        }`}
                        onClick={() =>
                          !method.disabled &&
                          handlePaymentMethodSelect(method.id)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                                method.disabled
                                  ? "bg-gray-200"
                                  : selectedPaymentMethod === method.id
                                  ? "bg-purple-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <div
                                className={
                                  method.disabled
                                    ? "text-gray-400"
                                    : selectedPaymentMethod === method.id
                                    ? "text-purple-600"
                                    : "text-gray-600"
                                }
                              >
                                {method.icon}
                              </div>
                            </div>
                            <div>
                              <h4
                                className={`font-medium ${
                                  method.disabled
                                    ? "text-gray-400"
                                    : "text-foreground"
                                }`}
                              >
                                {method.name}
                              </h4>
                              <p
                                className={`text-sm ${
                                  method.disabled
                                    ? "text-gray-400"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {method.description}
                              </p>
                              {method.balance && (
                                <Badge
                                  variant="secondary"
                                  className="mt-1 text-xs"
                                >
                                  {method.balance}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Summary Section - Full Width at Bottom */}
        {/* <Card className="bg-card shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              Ringkasan Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Detail Pesanan
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-foreground">1 Video AI</span>
                    <span className="font-bold text-purple-600">Rp 10.000</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Video HD berkualitas tinggi
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">
                      Total Pembayaran
                    </span>
                    <span className="text-xl font-bold text-purple-600">
                      Rp 10.000
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Metode Pembayaran
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-foreground font-medium">
                    {selectedPaymentMethod
                      ? paymentMethods.find(
                          (m) => m.id === selectedPaymentMethod
                        )?.name
                      : "Belum dipilih"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPaymentMethod
                      ? "Metode pembayaran telah dipilih"
                      : "Silakan pilih metode pembayaran"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Konversi Koin</h3>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">
                        Biaya produksi:
                      </span>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        7.500 koin
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">
                        Koin bonus:
                      </span>
                      <span className="font-medium text-blue-800 dark:text-blue-200">
                        2.500 koin
                      </span>
                    </div>
                    <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                      <div className="flex justify-between">
                        <span className="font-medium text-blue-800 dark:text-blue-200">
                          Total koin:
                        </span>
                        <span className="font-bold text-blue-800 dark:text-blue-200">
                          10.000 koin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Debug Information - Remove this after fixing */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mb-8">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Debug Info</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>selectedPaymentMethod:</strong>{" "}
                      {selectedPaymentMethod || "null"}
                    </p>
                    <p>
                      <strong>isPersonalInfoComplete:</strong>{" "}
                      {isPersonalInfoComplete.toString()}
                    </p>
                    <p>
                      <strong>isOTPVerified:</strong> {isOTPVerified.toString()}
                    </p>
                    <p>
                      <strong>userQuota:</strong> {userQuota || "null"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>email:</strong> "{email}"
                    </p>
                    <p>
                      <strong>phoneNumber:</strong> "{phoneNumber}"
                    </p>
                    <p>
                      <strong>isProcessing:</strong> {isProcessing.toString()}
                    </p>
                    <p>
                      <strong>videoSetupData exists:</strong>{" "}
                      {videoSetupStorage.exists().toString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p>
                    <strong>Button disabled reasons:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {!selectedPaymentMethod && (
                      <li>No payment method selected</li>
                    )}
                    {!isPersonalInfoComplete && (
                      <li>Personal info incomplete (need email + phone)</li>
                    )}
                    {selectedPaymentMethod === "coins" &&
                      (!isOTPVerified ||
                        (userQuota !== null && userQuota < 7500)) && (
                        <li>Coins: Need OTP verification and 7500+ coins</li>
                      )}
                    {selectedPaymentMethod !== "coins" && !isOTPVerified && (
                      <li>Other methods: Need OTP verification</li>
                    )}
                    {isProcessing && <li>Currently processing</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )} */}

        {/* Status Messages */}
        {/* <div className="space-y-4 mb-8">
          {isPersonalInfoComplete && (
            <div className="flex justify-center">
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                  Data diri telah lengkap
                </span>
              </div>
            </div>
          )}

          {!isOTPVerified && isPersonalInfoComplete && (
            <div className="flex justify-center">
              <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" />
                <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                  Verifikasi email terlebih dahulu untuk memilih metode
                  pembayaran
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="flex items-center p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <span className="text-red-800 dark:text-red-200 font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}
        </div> */}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 px-8"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Button>
          <Button
            size="lg"
            className={`px-8 ${
              selectedPaymentMethod === "coins"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            }`}
            disabled={
              !selectedPaymentMethod ||
              !isPersonalInfoComplete ||
              (selectedPaymentMethod === "coins" &&
                (!isOTPVerified || (userQuota !== null && userQuota < 7500))) ||
              (selectedPaymentMethod !== "coins" && !isOTPVerified) ||
              isProcessing
            }
            onClick={() => {
              console.log("Payment button clicked with state:", {
                selectedPaymentMethod,
                isPersonalInfoComplete,
                isOTPVerified,
                userQuota,
                email,
                phoneNumber,
                videoData: videoSetupStorage.load(),
              });

              if (selectedPaymentMethod === "coins") {
                // For coins, directly generate video
                handleCoinsPayment();
              } else {
                // For other payment methods, go to payment page
                handleContinuePayment();
              }
            }}
          >
            {isProcessing ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Memproses...</span>
              </span>
            ) : selectedPaymentMethod === "coins" ? (
              <span className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Generate Video</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Bayar Sekarang</span>
              </span>
            )}
          </Button>
        </div>

        {/* OTP Modal */}
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          email={email}
          onSuccess={handleOTPSuccess}
        />
      </div>
    </div>
  );
}
