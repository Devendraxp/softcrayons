"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, KeyRound } from "lucide-react";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/forgot-password");
      return;
    }
    setEmail(storedEmail);
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedValue.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      // Focus on the next empty input or the last one
      const nextIndex = Math.min(index + pastedValue.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      // Store reset token for the reset password page
      sessionStorage.setItem("resetToken", data.resetToken);
      router.push("/reset-password");
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError("Failed to resend OTP. Please try again.");
        return;
      }

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      // Show success message (you could use a toast here)
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Enter OTP</CardTitle>
          <CardDescription>
            We sent a 6-digit code to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {inputRefs.current[index] = el}}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold"
                  disabled={isLoading}
                />
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Didn&apos;t receive the code?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-violet-600 hover:text-violet-700 dark:text-violet-400 hover:underline font-medium"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Link
              href="/forgot-password"
              className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forgot Password
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
