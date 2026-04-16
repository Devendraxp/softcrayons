import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  courses: [
    { name: "Web Development", href: "/courses?category=web-development" },
    { name: "Machine Learning", href: "/courses?category=data-science" },
    { name: "DevOps", href: "/courses?category=devops" },
    { name: "Mobile Development", href: "/courses?category=mobile-development" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Feedback", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/softcrayons", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/TechSoftcrayons", label: "X" },
  { icon: Instagram, href: "https://www.instagram.com/softcrayons", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/softcrayons-it-education", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-secondary-foreground/15 bg-secondary text-secondary-foreground">
      <div className="relative z-10 w-full px-6 pt-16 pb-8 sm:px-10 lg:px-16 lg:pt-20 lg:pb-10 xl:px-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6 lg:gap-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8">
                <Image
                  src="https://i.ibb.co/tphyBYTY/sc-logo.png"
                  alt="Soft Crayons Logo"
                  width={120}
                  height={32}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-secondary-foreground/70 text-sm mb-6 max-w-xs">
              Empowering developers worldwide with industry-focused education and
              mentorship.
            </p>
            <div className="flex gap-5 text-secondary-foreground/75">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center text-inherit transition-colors duration-300 ease-out hover:text-primary"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-secondary-foreground/95">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors duration-300 ease-out hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-secondary-foreground/95">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors duration-300 ease-out hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-secondary-foreground/95">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors duration-300 ease-out hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-secondary-foreground/95">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors duration-300 ease-out hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pointer-events-none select-none mt-20 overflow-hidden sm:mt-24">
          <p className="font-heading text-center text-[clamp(7rem,13vw,14rem)] leading-none font-black tracking-[-0.01em] text-transparent bg-clip-text bg-gradient-to-b from-secondary-foreground/[0.22] via-secondary-foreground/[0.12] to-secondary-foreground/[0.03]">
            SOFTCRAYONS
          </p>
        </div>
      </div>
    </footer>
  );
}
