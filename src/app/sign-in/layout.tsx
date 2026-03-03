import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Access Your Account",
  description:
    "Sign in to your Softcrayons account to access your dashboard, courses, and learning materials.",
  openGraph: {
    title: "Sign In | Softcrayons Tech Solutions",
    description:
      "Sign in to your Softcrayons account to access your dashboard and learning materials.",
    url: "https://softcrayons.com/sign-in",
  },
  alternates: {
    canonical: "https://softcrayons.com/sign-in",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
