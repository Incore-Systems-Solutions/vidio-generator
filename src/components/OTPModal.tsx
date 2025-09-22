import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { otpApi, type OTPResponse } from "@/lib/api";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess: (quota: number) => void;
}

export function OTPModal({ isOpen, onClose, email, onSuccess }: OTPModalProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
        setCountdown(60); // 60 seconds countdown

        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
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
        otp: parseInt(otp),
      });

      if (response.status && response.data) {
        setSuccess("OTP berhasil divalidasi!");
        setTimeout(() => {
          onSuccess(response.data!.quota);
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

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Verifikasi OTP
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{email}</p>
            </div>
          </div>

          {/* Request OTP Button */}
          {!otpSent && (
            <div className="text-center">
              <Button
                onClick={handleRequestOTP}
                disabled={isRequestingOTP}
                className="w-full"
              >
                {isRequestingOTP ? "Mengirim..." : "Kirim OTP"}
              </Button>
            </div>
          )}

          {/* OTP Input */}
          {otpSent && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Masukkan Kode OTP
                </label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(value);
                    setError(null);
                  }}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                {countdown > 0 ? (
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Kirim ulang dalam {countdown}s</span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRequestOTP}
                    disabled={isRequestingOTP}
                  >
                    {isRequestingOTP ? "Mengirim..." : "Kirim Ulang OTP"}
                  </Button>
                )}
              </div>

              {/* Validate Button */}
              <Button
                onClick={handleValidateOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full"
              >
                {isLoading ? "Memvalidasi..." : "Verifikasi OTP"}
              </Button>
            </div>
          )}

          {/* Status Messages */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-800 dark:text-red-200">
                {error}
              </span>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-800 dark:text-green-200">
                {success}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
