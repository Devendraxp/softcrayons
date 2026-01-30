import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP, magicLink } from "better-auth/plugins";
import { prisma } from "./prisma";
import { sendEmail } from "./email";
import { userExists } from "./userExist";

const runInBackground = (promise: Promise<unknown>) => {
    promise.catch((error) => {
        console.error("Background task error:", error);
    });
};

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
            runInBackground(sendEmail({
                to: user.email,
                subject: 'Verify your email address',
                text: `Click the link to verify your email: ${url}`
            }));
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
                if (type === "sign-in") {
                    const exists = await userExists(email);
                    if (exists) { 
                        runInBackground(sendEmail({ 
                            to: email, 
                            subject: "Your sign-in OTP", 
                            text: `Your OTP for sign-in is: ${otp}` 
                        }));
                    }
                }
            }, 
        }),
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                const exists = await userExists(email);
                if (exists) {
                    runInBackground(sendEmail({
                        to: email,
                        subject: "Your magic sign-in link",
                        text: `Click the link to sign in: ${url}`
                    }));
                }
            }
        })
    ],
    trustedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;