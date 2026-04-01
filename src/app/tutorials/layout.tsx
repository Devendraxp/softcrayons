import type { ReactNode } from "react";
import { TutorialsNavbar } from "@/components/tutorials/TutorialsNavbar";

export default function TutorialsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TutorialsNavbar />
      {children}
    </>
  );
}
