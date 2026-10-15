import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google"
import type { ReactNode } from "react"

import { SITE_URL } from "@/components/vb-seo"

import "./globals.css"

const fontSans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vb-sans",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  variable: "--font-vb-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ERP Vàng Bạc — Phần mềm chuỗi đại lý vàng bạc, bạc tích trữ & cầm đồ",
    template: "%s | ERP Vàng Bạc",
  },
  icons: { icon: "/images/logos/go-mark.png" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F1B2D" },
    { media: "(prefers-color-scheme: dark)", color: "#08090B" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="font-sans">
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  )
}
