import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "IELTS Course by Munzereen Shahid",
  description: "IELTS preparation course from 10 Minute School",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
