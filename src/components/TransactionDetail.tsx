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
  Calendar,
  DollarSign,
  FileText,
  ExternalLink,
  Video,
  User,
  Mail,
  Phone,
  Sparkles,
  List,
  Film,
} from "lucide-react";
import { transactionApi, type TransactionData } from "@/lib/api";
import { videoSetupStorage } from "@/lib/videoSetupStorage";

interface TransactionDetailProps {
  invoiceNumber: string;
  onBack?: () => void;
}

export function TransactionDetail({
  invoiceNumber,
  onBack,
}: TransactionDetailProps) {
  const [transaction, setTransaction] = useState<TransactionData | null>(null);
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isKonsultanMode, setIsKonsultanMode] = useState(false);
  const [konsultanData, setKonsultanData] = useState<any>(null);
  const [collectionData, setCollectionData] = useState<any>(null);

  const fetchTransaction = async () => {
    try {
      setError(null);
      const response = await transactionApi.getTransaction(invoiceNumber);
      if (response.status) {
        setTransaction(response.data);

        // Save x-api-key if available in response
        if (response.data && (response.data as any)["x-api-key"]) {
          localStorage.setItem(
            "x-api-key",
            (response.data as any)["x-api-key"]
          );
          console.log(
            "Saved x-api-key from transaction:",
            (response.data as any)["x-api-key"]
          );
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

  useEffect(() => {
    fetchTransaction();

    // Check if there's konsultan data
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
        // For konsultan mode, we'll display the list of scenes
      } catch (err) {
        console.error("Error parsing konsultan data:", err);
      }
    } else {
      // Load regular video setup data
      const storedVideoData = videoSetupStorage.load();
      setVideoData(storedVideoData);
    }

    // Load collection data from localStorage (from Video Consultant)
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "failed":
      case "expired":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <RefreshCw className="relative w-12 h-12 animate-spin text-purple-400" />
            </div>
            <span className="text-gray-300 font-medium">
              Memuat detail transaksi...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30"></div>
              <AlertCircle className="relative w-16 h-16 text-red-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Gagal Memuat Transaksi
            </h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
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

  if (!transaction) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full blur-xl opacity-20"></div>
              <AlertCircle className="relative w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Transaksi Tidak Ditemukan
            </h3>
            <p className="text-gray-400">
              Transaksi dengan nomor {invoiceNumber} tidak ditemukan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 antialiased relative overflow-x-hidden">
      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-500/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              )}
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

          {/* Title Section with Gradient */}
          <div className="text-center mb-8 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  Detail Transaksi
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Invoice #{transaction.invoice_number}
                </span>
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {isKonsultanMode && (
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Video Konsultan AI
                  </Badge>
                )}
                {collectionData && (
                  <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-200 px-4 py-2">
                    <FileText className="w-4 h-4 mr-2" />
                    Data Konsultasi Tersedia
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Transaction Info */}
          <div className="space-y-6">
            {/* Transaction Status */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Status Transaksi
                  </h3>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                        {getStatusIcon(transaction.transaction_status)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">
                          {getStatusText(transaction.transaction_status)}
                        </p>
                        <p className="text-sm text-gray-400">
                          {transaction.status_ref}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={getStatusColor(transaction.transaction_status)}
                    >
                      {transaction.transaction_status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Informasi Pembayaran
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-5 border border-green-500/20">
                    <p className="text-sm text-gray-400 mb-2">
                      Total Pembayaran
                    </p>
                    <p className="font-bold text-3xl text-white">
                      {formatCurrency(transaction.total_payment)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                      <p className="font-semibold text-white">
                        {formatCurrency(transaction.subtotal)}
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Biaya Admin</p>
                      <p className="font-semibold text-white">
                        {formatCurrency(transaction.total_fee)}
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Diskon</p>
                      <p className="font-semibold text-orange-300">
                        -{formatCurrency(transaction.promo)}
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">
                        Metode Pembayaran
                      </p>
                      <Badge
                        variant="outline"
                        className="text-blue-300 border-blue-500/30 bg-blue-500/10"
                      >
                        {transaction.payment_type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Detail Transaksi
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between">
                    <span className="text-gray-400">Order ID</span>
                    <span className="font-semibold text-white">
                      {transaction.order_id}
                    </span>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between">
                    <span className="text-gray-400">Tanggal Transaksi</span>
                    <span className="font-medium text-white">
                      {formatDate(transaction.created_at)}
                    </span>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between">
                    <span className="text-gray-400">Kedaluwarsa</span>
                    <span className="font-medium text-white">
                      {formatDate(transaction.transaction_expired)}
                    </span>
                  </div>

                  {transaction.payment_url && (
                    <div className="pt-2">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="relative w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-orange-300 hover:text-orange-200 hover:border-orange-500/50"
                          onClick={() => {
                            const popup = window.open(
                              transaction.payment_url,
                              "payment",
                              "width=800,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no"
                            );
                            if (popup) {
                              popup.focus();
                            }
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Buka Halaman Pembayaran
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Generate Video Button - Show when payment is successful */}
                  {transaction.transaction_status === "success" && (
                    <div className="pt-2">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <Button
                          size="sm"
                          className="relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
                          onClick={() => {
                            window.location.href = "/generate";
                          }}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Generate Video
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Video Information */}
          <div className="space-y-6">
            {/* Video Details */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                      <Video className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Detail Video
                    </h3>
                  </div>

                  {collectionData ? (
                    <>
                      {/* Collection Data Display - Same as VideoConsultant */}
                      <div className="relative">
                        {/* Outer Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>

                        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
                          {/* Header */}
                          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-md opacity-40 animate-pulse"></div>
                              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Film className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Data Konsultasi Video
                              </h3>
                              <p className="text-xs text-gray-400">
                                Informasi yang dikumpulkan dari diskusi
                              </p>
                            </div>
                          </div>

                          {/* Content Grid */}
                          <div className="space-y-4">
                            {/* Script/Naskah */}
                            {collectionData.data.script_naskah && (
                              <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                                <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center">
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Script & Naskah
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-gray-400">
                                      Subjek:{" "}
                                    </span>
                                    <span className="text-white">
                                      {collectionData.data.script_naskah.subjek}
                                    </span>
                                  </div>
                                  {collectionData.data.script_naskah.karakter &&
                                    collectionData.data.script_naskah.karakter
                                      .length > 0 && (
                                      <div className="mt-3">
                                        <span className="text-gray-400 block mb-2">
                                          Karakter:
                                        </span>
                                        <div className="space-y-2 pl-2">
                                          {collectionData.data.script_naskah.karakter.map(
                                            (kar: any, idx: number) => (
                                              <div
                                                key={idx}
                                                className="bg-slate-950/50 rounded-lg p-3 border border-purple-500/10"
                                              >
                                                <div className="font-medium text-purple-300 mb-1">
                                                  {kar.nama_karakter}
                                                </div>
                                                <div className="text-xs text-gray-400 space-y-1">
                                                  <div>
                                                    {kar.detail_karakter}
                                                  </div>
                                                  <div>
                                                    <span className="text-gray-500">
                                                      Aksi:
                                                    </span>{" "}
                                                    {kar.aksi}
                                                  </div>
                                                  {kar.deskripsi_tambahan && (
                                                    <div className="text-gray-500">
                                                      {kar.deskripsi_tambahan}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  {collectionData.data.script_naskah
                                    .interaksi && (
                                    <div className="mt-2">
                                      <span className="text-gray-400">
                                        Interaksi:{" "}
                                      </span>
                                      <span className="text-gray-300">
                                        {
                                          collectionData.data.script_naskah
                                            .interaksi
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Lokasi & Waktu */}
                            {collectionData.data.lokasi_waktu && (
                              <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                                <h4 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Lokasi & Waktu
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-gray-400 block mb-1">
                                      Tempat
                                    </span>
                                    <span className="text-white">
                                      {collectionData.data.lokasi_waktu.tempat}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400 block mb-1">
                                      Waktu
                                    </span>
                                    <span className="text-white">
                                      {collectionData.data.lokasi_waktu.waktu}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Gaya Visual */}
                            {collectionData.data.gaya_visual && (
                              <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                                <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center">
                                  <Video className="w-4 h-4 mr-2" />
                                  Gaya Visual
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <span className="text-gray-400 block mb-1">
                                        Style
                                      </span>
                                      <span className="text-white">
                                        {collectionData.data.gaya_visual.style}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-400 block mb-1">
                                        Nuansa
                                      </span>
                                      <span className="text-white">
                                        {collectionData.data.gaya_visual.nuansa}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Kualitas */}
                                  <div className="bg-slate-950/50 rounded-lg p-3 border border-blue-500/10">
                                    <div className="text-xs font-medium text-blue-300 mb-2">
                                      Kualitas
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="text-gray-500">
                                          Resolusi:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kualitas.resolusi
                                          }
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">
                                          Frame Rate:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kualitas.frame_rate
                                          }
                                        </span>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-gray-500">
                                          Rendering:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kualitas.rendering_style
                                          }
                                        </span>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-gray-500">
                                          Lighting:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kualitas.lighting
                                          }
                                        </span>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-gray-500">
                                          Color Grading:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kualitas.color_grading
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Kamera */}
                                  <div className="bg-slate-950/50 rounded-lg p-3 border border-blue-500/10">
                                    <div className="text-xs font-medium text-blue-300 mb-2">
                                      Kamera
                                    </div>
                                    <div className="space-y-1 text-xs">
                                      <div>
                                        <span className="text-gray-500">
                                          Angle:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kamera.angle
                                          }
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">
                                          Gerakan:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kamera.gerakan
                                          }
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">
                                          Aspect Ratio:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kamera.aspect_ratio
                                          }
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500">
                                          Depth of Field:{" "}
                                        </span>
                                        <span className="text-gray-300">
                                          {
                                            collectionData.data.gaya_visual
                                              .kamera.depth_of_field
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <span className="text-gray-400 block mb-1">
                                        Atmosfer
                                      </span>
                                      <span className="text-gray-300">
                                        {
                                          collectionData.data.gaya_visual
                                            .atmosfer
                                        }
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-400 block mb-1">
                                        Tempo
                                      </span>
                                      <span className="text-gray-300">
                                        {collectionData.data.gaya_visual.tempo}
                                      </span>
                                    </div>
                                  </div> */}

                                  {/* {collectionData.data.gaya_visual
                                    .efek_tambahan && (
                                    <div>
                                      <span className="text-gray-400 block mb-1">
                                        Efek Tambahan
                                      </span>
                                      <span className="text-gray-300">
                                        {
                                          collectionData.data.gaya_visual
                                            .efek_tambahan
                                        }
                                      </span>
                                    </div>
                                  )}

                                  {collectionData.data.gaya_visual.audio && (
                                    <div>
                                      <span className="text-gray-400 block mb-1">
                                        Audio
                                      </span>
                                      <span className="text-gray-300">
                                        {
                                          collectionData.data.gaya_visual.audio
                                            .efek_suara
                                        }
                                      </span>
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            )}

                            {/* Summary Info */}
                            {(collectionData.data.count_scene_video ||
                              collectionData.data.durasi_final) && (
                              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-500/30">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                  {collectionData.data.count_scene_video && (
                                    <div>
                                      <div className="text-2xl font-bold text-purple-300">
                                        {collectionData.data.count_scene_video}
                                      </div>
                                      <div className="text-xs text-gray-400 mt-1">
                                        Scene Video
                                      </div>
                                    </div>
                                  )}
                                  {collectionData.data.durasi_final && (
                                    <div>
                                      <div className="text-2xl font-bold text-blue-300">
                                        {collectionData.data.durasi_final}s
                                      </div>
                                      <div className="text-xs text-gray-400 mt-1">
                                        Durasi Final
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Footer Note */}
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-center text-gray-500">
                              📊 Data ini akan digunakan untuk membuat prompt
                              video yang lebih detail
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : isKonsultanMode && konsultanData ? (
                    <>
                      {/* Konsultan Mode - Show list of scenes */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <List className="w-4 h-4 text-purple-600" />
                          <p className="text-sm font-medium text-white">
                            Total Scene: {konsultanData.list?.length || 0}
                          </p>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          Multiple Videos
                        </Badge>
                      </div>

                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {konsultanData.list?.map(
                          (scene: any, index: number) => (
                            <div
                              key={index}
                              className="bg-slate-800/50 rounded-xl p-4 border border-white/5"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-semibold text-purple-300">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-white line-clamp-3">
                                    {scene.prompt || "Tidak ada prompt"}
                                  </p>
                                  {scene.aspek_rasio && (
                                    <Badge
                                      variant="outline"
                                      className="mt-2 text-xs border-purple-500/30 text-purple-300"
                                    >
                                      {scene.aspek_rasio}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-3">
                          {konsultanData.email && (
                            <div>
                              <p className="text-xs text-gray-400">Email</p>
                              <p className="text-sm font-medium text-white truncate">
                                {konsultanData.email}
                              </p>
                            </div>
                          )}
                          {konsultanData.is_share && (
                            <div>
                              <p className="text-xs text-gray-400">
                                Share Status
                              </p>
                              <Badge
                                variant="outline"
                                className="text-xs border-blue-500/30 text-blue-300"
                              >
                                {konsultanData.is_share === "y"
                                  ? "Shared"
                                  : "Private"}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : videoData ? (
                    <>
                      {/* Regular Mode - Show single video details */}
                      <div className="space-y-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                          <p className="text-sm text-gray-400 mb-2">
                            Judul Video
                          </p>
                          <p className="font-semibold text-white">
                            {videoData.judul_video || "Tidak ada judul"}
                          </p>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                          <p className="text-sm text-gray-400 mb-2">Prompt</p>
                          <p className="text-sm text-white">
                            {videoData.prompt || "Tidak ada prompt"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <p className="text-sm text-gray-400 mb-2">
                              Aspek Rasio
                            </p>
                            <Badge
                              variant="outline"
                              className="border-purple-500/30 text-purple-300"
                            >
                              {videoData.aspek_rasio}
                            </Badge>
                          </div>
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <p className="text-sm text-gray-400 mb-2">Bahasa</p>
                            <Badge
                              variant="outline"
                              className="border-blue-500/30 text-blue-300"
                            >
                              {videoData.bahasa}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <p className="text-sm text-gray-400 mb-2">
                              Gaya Suara
                            </p>
                            <Badge
                              variant="outline"
                              className="border-green-500/30 text-green-300"
                            >
                              {videoData.gaya_suara}
                            </Badge>
                          </div>
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <p className="text-sm text-gray-400 mb-2">Tone</p>
                            <Badge
                              variant="outline"
                              className="border-orange-500/30 text-orange-300"
                            >
                              {videoData.tone}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Data video tidak tersedia</p>
                    </div>
                  )}
                </div>

                {/* Customer Information */}
                {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informasi Pelanggan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isKonsultanMode && konsultanData ? (
                <>
                  {konsultanData.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {konsultanData.email}
                      </span>
                    </div>
                  )}
                  {konsultanData.no_wa && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {konsultanData.no_wa}
                      </span>
                    </div>
                  )}
                  {konsultanData.affiliate_by && (
                    <div className="pt-3 border-t">
                            <p className="text-xs text-muted-foreground mb-1">
                              Affiliate By
                            </p>
                      <Badge variant="outline" className="text-xs">
                        {konsultanData.affiliate_by}
                      </Badge>
                    </div>
                  )}
                </>
              ) : videoData ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {videoData.email || "Tidak ada email"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {videoData.no_wa || "Tidak ada nomor telepon"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    Data pelanggan tidak tersedia
                  </p>
                </div>
              )}
            </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
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
      `}</style>
    </div>
  );
}
