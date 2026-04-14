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
      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
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
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-secondary-foreground/15 bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary/30 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        </div>
      </div>

      <div className="pointer-events-none select-none absolute inset-x-0 bottom-[-0.6rem] sm:bottom-[-1rem] overflow-hidden px-3">
        <p className="text-center text-[clamp(3rem,10vw,9rem)] leading-none font-black tracking-[-0.01em] text-transparent bg-clip-text bg-gradient-to-b from-secondary-foreground/[0.22] via-secondary-foreground/[0.12] to-secondary-foreground/[0.03]">
          SOFTCRAYONS
        </p>
      </div>
    </footer>
  );
}
