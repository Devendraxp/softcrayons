import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Training Solutions | Softcrayons",
  description:
    "Corporate IT training and skill development solutions by Softcrayons. Customized upskilling programs for enterprises — team training, workshops, and tech consulting across Noida, Ghaziabad & Delhi NCR.",
  keywords: [
    "Enterprise Training Noida",
    "Corporate IT Training",
    "Team Upskilling Programs",
    "Corporate Coding Training",
    "Business Tech Solutions",
    "Corporate Training Delhi NCR",
    "Enterprise Skill Development",
    "Custom Training Programs",
  ],
  openGraph: {
    title: "Enterprise Training Solutions | Softcrayons",
    description:
      "Customized corporate IT training and upskilling programs by Softcrayons for enterprises across Delhi NCR.",
    url: "https://softcrayons.com/enterprise",
  },
  alternates: {
    canonical: "https://softcrayons.com/enterprise",
  },
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
