import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LocalizationProvider } from "@/contexts/LocalizationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IELTS Course - 10 Minute School",
  description: "Complete IELTS preparation course with expert instructors",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalizationProvider>{children}</LocalizationProvider>
      </body>
    </html>
  )
}
