import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "SkillShift",
  description: "AI football training assistant for skill progression",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
