import React, { useState } from "react";
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
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userQuota, setUserQuota] = useState<number | null>(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalInfoChange = () => {
    const isComplete =
      name.trim() !== "" && email.trim() !== "" && phoneNumber.trim() !== "";
    setIsPersonalInfoComplete(isComplete);
  };

  const handleOTPSuccess = async (quota: number) => {
    setUserQuota(quota);
    setIsOTPVerified(true);
    setIsOTPModalOpen(false);

    // Get selected package price
    const selectedPkg = pricingPackages.find(
      (pkg) => pkg.id === selectedPackage
    );
    const packagePrice = selectedPkg
      ? parseInt(selectedPkg.currentPrice.replace(/[^\d]/g, ""))
      : null;

    // Update localStorage with payment info
    videoSetupStorage.updatePaymentInfo({
      email: email,
      no_wa: phoneNumber,
      metode_pengiriman: "kuota",
      metode: null,
      jumlah: packagePrice,
    });

    // If coins payment method is selected and quota is sufficient, proceed automatically
    if (selectedPaymentMethod === "coins" && quota >= 25000 && packagePrice) {
      await handleCoinsPayment();
    }
  };

  const handleVerificationClick = () => {
    if (email.trim() !== "") {
      setIsOTPModalOpen(true);
    }
  };

  const handlePaymentMethodSelect = async (methodId: string) => {
    setSelectedPaymentMethod(methodId);

    // Get selected package price
    const selectedPkg = pricingPackages.find(
      (pkg) => pkg.id === selectedPackage
    );
    const packagePrice = selectedPkg
      ? parseInt(selectedPkg.currentPrice.replace(/[^\d]/g, ""))
      : null;

    // Update localStorage based on payment method
    if (methodId === "coins") {
      // For coins, only update if OTP is verified
      if (isOTPVerified && packagePrice) {
        videoSetupStorage.updatePaymentInfo({
          email: email,
          no_wa: phoneNumber,
          metode_pengiriman: "kuota",
          metode: null,
          jumlah: packagePrice,
        });

        // If using coins, directly proceed to store and generate video
        await handleCoinsPayment();
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
        jumlah: packagePrice,
      });
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);

    // Get selected package price
    const selectedPkg = pricingPackages.find((pkg) => pkg.id === packageId);
    const packagePrice = selectedPkg
      ? parseInt(selectedPkg.currentPrice.replace(/[^\d]/g, ""))
      : null;

    // Update localStorage with package price
    if (packagePrice) {
      videoSetupStorage.updatePaymentInfo({
        email: email,
        no_wa: phoneNumber,
        metode_pengiriman:
          selectedPaymentMethod === "coins" ? "kuota" : "pembayaran",
        metode:
          selectedPaymentMethod === "coins"
            ? null
            : selectedPaymentMethod === "gopay"
            ? "gopay"
            : selectedPaymentMethod === "qris"
            ? "other_qris"
            : selectedPaymentMethod === "credit-card"
            ? "kreem"
            : null,
        jumlah: packagePrice,
      });
    }
  };

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
        "Download langsung",
      ],
      popular: false,
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
        "Valid 30 hari",
      ],
      popular: true,
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
        "Valid 30 hari",
      ],
      popular: false,
    },
  ];

  const paymentMethods = [
    {
      id: "coins",
      name: "Gunakan Koin",
      description: isOTPVerified
        ? `Saldo: ${userQuota?.toLocaleString()} Koin`
        : "Verifikasi OTP terlebih dahulu",
      icon: <Coins className="w-6 h-6" />,
      balance: userQuota ? `${userQuota.toLocaleString()} Koin` : "0 Koin",
      disabled: !isOTPVerified || (userQuota !== null && userQuota < 25000),
    },
    {
      id: "gopay",
      name: "Gopay",
      description: "Pembayaran dengan Gopay",
      icon: <Wallet className="w-6 h-6" />,
      disabled: false,
    },
    {
      id: "qris",
      name: "QRIS",
      description: "Pembayaran dengan QRIS",
      icon: <QrCode className="w-6 h-6" />,
      disabled: false,
    },
    {
      id: "credit-card",
      name: "Kartu Kredit dan Internasional",
      description: "Pembayaran dengan Kartu Kredit dan Internasional",
      icon: <CreditCard className="w-6 h-6" />,
      disabled: false,
    },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Pilih Paket & Pembayaran
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Pilih paket yang sesuai dengan kebutuhan Anda dan metode pembayaran
          yang diinginkan. Lengkapi informasi pembayaran untuk melanjutkan
          proses pembuatan video AI Anda.
        </p>
      </div>

      {/* Pricing Packages Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Paket Harga
          </h2>
          <p className="text-muted-foreground">
            Pilih paket yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative p-6 border rounded-xl cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-lg"
                      : "border-border hover:border-purple-300 hover:shadow-md"
                  } ${
                    pkg.popular
                      ? "ring-2 ring-purple-200 dark:ring-purple-800"
                      : ""
                  }`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-1">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Terpopuler
                      </Badge>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {pkg.title}
                    </h3>
                    <div className="mb-2">
                      {pkg.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through mr-2">
                          {pkg.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-purple-600">
                        {pkg.currentPrice}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pkg.quantity}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Selection Indicator */}
                  {selectedPackage === pkg.id && (
                    <div className="mt-6 text-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information & Payment Method Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Informasi Pembayaran
          </h2>
          <p className="text-muted-foreground">
            Lengkapi data diri dan pilih metode pembayaran untuk melanjutkan
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Payment Information */}
              <div>
                <Card className="bg-card shadow-lg h-full">
                  <CardContent className="p-8">
                    {/* Personal Information */}
                    <div className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Data Personal
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Informasi yang diperlukan untuk proses pembayaran
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email
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
                            Nomor Telepon
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
                            >
                              Verifikasi
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Metode Pembayaran
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Pilih metode pembayaran yang paling nyaman untuk
                            Anda
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${
                              method.disabled
                                ? "border-border bg-muted cursor-not-allowed opacity-60"
                                : selectedPaymentMethod === method.id
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                                : "border-border hover:border-purple-300 hover:bg-card/50"
                            }`}
                            onClick={() =>
                              !method.disabled &&
                              handlePaymentMethodSelect(method.id)
                            }
                          >
                            <div className="flex flex-col items-center text-center space-y-3">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  method.disabled
                                    ? "bg-muted"
                                    : "bg-purple-100 dark:bg-purple-900/30"
                                }`}
                              >
                                <div
                                  className={
                                    method.disabled
                                      ? "text-muted-foreground"
                                      : "text-purple-600 dark:text-purple-400"
                                  }
                                >
                                  {method.icon}
                                </div>
                              </div>
                              <div>
                                <h3
                                  className={`font-semibold text-sm ${
                                    method.disabled
                                      ? "text-muted-foreground"
                                      : "text-foreground"
                                  }`}
                                >
                                  {method.name}
                                </h3>
                                <p
                                  className={`text-xs ${
                                    method.disabled
                                      ? "text-muted-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {method.description}
                                </p>
                              </div>
                              {method.balance && (
                                <Badge
                                  variant="secondary"
                                  className="bg-muted text-muted-foreground text-xs"
                                >
                                  {method.balance}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Payment Summary */}
              {(selectedPackage ||
                selectedPaymentMethod ||
                isPersonalInfoComplete) && (
                <div>
                  <Card className="bg-card shadow-lg h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        Ringkasan Pesanan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Package Summary */}
                      {selectedPackage && (
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {
                                pricingPackages.find(
                                  (pkg) => pkg.id === selectedPackage
                                )?.title
                              }
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {
                                pricingPackages.find(
                                  (pkg) => pkg.id === selectedPackage
                                )?.quantity
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-600">
                              {
                                pricingPackages.find(
                                  (pkg) => pkg.id === selectedPackage
                                )?.currentPrice
                              }
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Total */}
                      {selectedPackage && (
                        <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h3 className="text-lg font-semibold text-foreground">
                            Total
                          </h3>
                          <p className="text-xl font-bold text-purple-600">
                            {
                              pricingPackages.find(
                                (pkg) => pkg.id === selectedPackage
                              )?.currentPrice
                            }
                          </p>
                        </div>
                      )}

                      {/* Payment Method */}
                      {selectedPaymentMethod && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">
                            Metode Pembayaran
                          </h3>
                          <p className="text-muted-foreground">
                            {
                              paymentMethods.find(
                                (method) => method.id === selectedPaymentMethod
                              )?.name
                            }
                          </p>
                        </div>
                      )}

                      {/* Buyer Data */}
                      {isPersonalInfoComplete && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-3">
                            Data Pembeli
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Nama:
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Email:
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {email}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Telepon:
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {phoneNumber}
                              </span>
                            </div>
                            {companyName && (
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Perusahaan:
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                  {companyName}
                                </span>
                              </div>
                            )}
                            {isOTPVerified && userQuota !== null && (
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Saldo Koin:
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                  {userQuota.toLocaleString()} Koin
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {isPersonalInfoComplete && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
            <span className="text-green-800 dark:text-green-200 font-medium">
              Data diri telah lengkap
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
            <span className="text-red-800 dark:text-red-200 font-medium">
              {error}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          // disabled={
          //   !selectedPaymentMethod ||
          //   !isPersonalInfoComplete ||
          //   !selectedPackage ||
          //   isProcessing
          // }
          onClick={handleContinuePayment}
        >
          {isProcessing ? "Memproses..." : "Bayar Sekarang"}
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
  );
}
