import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, resetToken, newPassword } = await request.json();

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json(
        { error: "Email, reset token, and new password are required" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Find the verification record
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: email,
        value: resetToken,
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Invalid or expired reset token. Please start over." },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date() > verification.expiresAt) {
      await prisma.verification.delete({
        where: { id: verification.id },
      });

      return NextResponse.json(
        { error: "Reset token has expired. Please start over." },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 12);

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Also update the account if it exists (for better-auth compatibility)
    await prisma.account.updateMany({
      where: {
        userId: user.id,
        providerId: "credential",
      },
      data: { password: hashedPassword },
    });

    // Delete the verification record
    await prisma.verification.delete({
      where: { id: verification.id },
    });

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
