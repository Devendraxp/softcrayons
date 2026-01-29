import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find the verification record
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: email,
        value: otp,
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Invalid OTP. Please check and try again." },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (new Date() > verification.expiresAt) {
      // Delete expired verification
      await prisma.verification.delete({
        where: { id: verification.id },
      });

      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Generate a reset token (used to verify the reset password request)
    const resetToken = crypto.randomUUID();
    
    // Update the verification record with the reset token
    await prisma.verification.update({
      where: { id: verification.id },
      data: {
        value: resetToken,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes for password reset
      },
    });

    return NextResponse.json({
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP. Please try again." },
      { status: 500 }
    );
  }
}
