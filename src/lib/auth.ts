import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP, magicLink } from "better-auth/plugins";
import { prisma } from "./prisma";
import { sendEmail } from "./email";
import { userExists } from "./userExist";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            console.log("[Auth] Sending verification email to:", user.email);
            try {
                await sendEmail({
                    to: user.email,
                    subject: "Verify your email address",
                    text: `Click the link to verify your email: ${url}`,
                });
                console.log("[Auth] Verification email sent successfully");
            } catch (err) {
                console.error("[Auth] Failed to send verification email:", err);
            }
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "STUDENT",
                // Allow role to be read and returned in session
                input: true,
                returned: true,
            },
            phone: {
                type: "string",
                required: false,
                input: true,
                returned: true,
            },
        },
    },
    plugins: [
        admin({
            defaultRole: "STUDENT",
            adminRoles: ["ADMIN", "admin"],
            adminUserIds: ["cmkuy34fj0000m9i0p9ooulpc"],
        }),
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                console.log("[Auth] OTP request - type:", type, "email:", email);
                if (type === "sign-in") {
                    const exists = await userExists(email);
                    console.log("[Auth] User exists check:", exists);
                    if (exists) {
                        try {
                            await sendEmail({
                                to: email,
                                subject: "Your sign-in OTP",
                                text: `Your OTP for sign-in is: ${otp}`,
                            });
                            console.log("[Auth] OTP email sent successfully to:", email);
                        } catch (err) {
                            console.error("[Auth] Failed to send OTP email:", err);
                        }
                    }
                }
            },
        }),
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                console.log("[Auth] Magic link request for:", email);
                const exists = await userExists(email);
                console.log("[Auth] User exists check:", exists);
                if (exists) {
                    try {
                        await sendEmail({
                            to: email,
                            subject: "Your magic sign-in link",
                            text: `Click the link to sign in: ${url}`,
                        });
                        console.log("[Auth] Magic link email sent successfully to:", email);
                    } catch (err) {
                        console.error("[Auth] Failed to send magic link email:", err);
                    }
                }
            },
        }),
    ],
    trustedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        process.env.BETTER_AUTH_URL || "",
        "https://softcrayons.vercel.app",
    ].filter(Boolean),
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;