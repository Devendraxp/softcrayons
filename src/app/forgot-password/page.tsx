"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      // Store email in sessionStorage for the verify OTP page
      sessionStorage.setItem("resetEmail", email);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent a 6-digit OTP to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>The OTP will expire in 10 minutes.</p>
            <p className="mt-2">
              Didn&apos;t receive the email? Check your spam folder or try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link href="/verify-otp" className="w-full">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                Enter OTP
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                setIsSuccess(false);
                setEmail("");
              }}
              className="text-sm"
            >
              Try a different email
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you an OTP to reset your password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                  disabled={isLoading}
                />
              </div>
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
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
            <Link
              href="/sign-in"
              className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
