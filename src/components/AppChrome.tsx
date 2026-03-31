"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isTutorialDetail = pathname?.startsWith("/tutorials/") && (pathname?.split("/").filter(Boolean).length ?? 0) >= 2;
  const hideFooter = isDashboard || isTutorialDetail;

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
