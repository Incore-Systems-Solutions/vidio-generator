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

  const fetchTransaction = async () => {
    try {
      setError(null);
      const response = await transactionApi.getTransaction(invoiceNumber);
      if (response.status) {
        setTransaction(response.data);
        
        // Save x-api-key if available in response
        if (response.data && (response.data as any)["x-api-key"]) {
          localStorage.setItem("x-api-key", (response.data as any)["x-api-key"]);
          console.log("Saved x-api-key from transaction:", (response.data as any)["x-api-key"]);
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
        console.log("Loading konsultan data in transaction detail:", parsedData);
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
      <div className="w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Memuat detail transaksi...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Gagal Memuat Transaksi
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRefresh} disabled={refreshing}>
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
      <div className="w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Transaksi Tidak Ditemukan
            </h3>
            <p className="text-muted-foreground">
              Transaksi dengan nomor {invoiceNumber} tidak ditemukan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Detail Transaksi
            </h1>
            <div className="flex items-center space-x-2">
              <p className="text-muted-foreground">
                Invoice: {transaction.invoice_number}
              </p>
              {isKonsultanMode && (
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Video Konsultan
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Transaction Info */}
        <div className="space-y-6">
          {/* Transaction Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Status Transaksi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(transaction.transaction_status)}
                  <div>
                    <p className="font-semibold text-foreground">
                      {getStatusText(transaction.transaction_status)}
                    </p>
                    <p className="text-sm text-muted-foreground">
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
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Informasi Pembayaran</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Pembayaran
                  </p>
                  <p className="font-semibold text-lg text-foreground">
                    {formatCurrency(transaction.total_payment)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(transaction.subtotal)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Biaya Admin</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(transaction.total_fee)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Diskon</p>
                  <p className="font-semibold text-foreground">
                    -{formatCurrency(transaction.promo)}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Metode Pembayaran
                  </span>
                  <Badge variant="outline">{transaction.payment_type}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Detail Transaksi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium">{transaction.order_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Transaksi</span>
                <span className="font-medium">
                  {formatDate(transaction.created_at)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kedaluwarsa</span>
                <span className="font-medium">
                  {formatDate(transaction.transaction_expired)}
                </span>
              </div>
              {transaction.payment_url && (
                <div className="pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
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
              )}

              {/* Generate Video Button - Show when payment is successful */}
              {transaction.transaction_status === "success" && (
                <div className="pt-3 border-t">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => {
                      window.location.href = "/generate";
                    }}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Generate Video
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Video Information */}
        <div className="space-y-6">
          {/* Video Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="w-5 h-5" />
                <span>Detail Video</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isKonsultanMode && konsultanData ? (
                <>
                  {/* Konsultan Mode - Show list of scenes */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <List className="w-4 h-4 text-purple-600" />
                      <p className="text-sm font-medium text-foreground">
                        Total Scene: {konsultanData.list?.length || 0}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Multiple Videos
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {konsultanData.list?.map((scene: any, index: number) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground line-clamp-3">
                              {scene.prompt || "Tidak ada prompt"}
                            </p>
                            {scene.aspek_rasio && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                {scene.aspek_rasio}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="grid grid-cols-2 gap-3">
                      {konsultanData.email && (
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium truncate">{konsultanData.email}</p>
                        </div>
                      )}
                      {konsultanData.is_share && (
                        <div>
                          <p className="text-xs text-muted-foreground">Share Status</p>
                          <Badge variant="outline" className="text-xs">
                            {konsultanData.is_share === 'y' ? 'Shared' : 'Private'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : videoData ? (
                <>
                  {/* Regular Mode - Show single video details */}
                  <div>
                    <p className="text-sm text-muted-foreground">Judul Video</p>
                    <p className="font-semibold text-foreground">
                      {videoData.judul_video || "Tidak ada judul"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prompt</p>
                    <p className="text-sm text-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {videoData.prompt || "Tidak ada prompt"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Aspek Rasio
                      </p>
                      <Badge variant="outline">{videoData.aspek_rasio}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bahasa</p>
                      <Badge variant="outline">{videoData.bahasa}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Gaya Suara
                      </p>
                      <Badge variant="outline">{videoData.gaya_suara}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tone</p>
                      <Badge variant="outline">{videoData.tone}</Badge>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Data video tidak tersedia
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
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
                      <p className="text-xs text-muted-foreground mb-1">Affiliate By</p>
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
          </Card>
        </div>
      </div>
    </div>
  );
}
