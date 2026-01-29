import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, getOTPEmailTemplate } from "@/lib/email";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

   
    if (!user) {
      return NextResponse.json({
        message: "If an account exists with this email, you will receive an OTP.",
      });
    }

    await prisma.verification.deleteMany({
      where: { identifier: email },
    });


    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verification.create({
      data: {
        id: crypto.randomUUID(),
        identifier: email,
        value: otp,
        expiresAt,
      },
    });

    const emailTemplate = getOTPEmailTemplate(otp, 10);
    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    return NextResponse.json({
      message: "If an account exists with this email, you will receive an OTP.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
