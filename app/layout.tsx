import type React from "react"
import type { Metadata, Viewport } from "next"
import { Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Navigation } from "@/components/navigation"
import { GSAPInitializer } from "@/components/gsap"
import { getSocials } from "@/lib/data"
import { env } from "@/env"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "TU Brno Racing | Formula Student Team",
  description:
    "We are a student team from Brno University of Technology, designing and building Formula Student racing cars to compete worldwide.",
  keywords: ["Formula Student", "TU Brno", "Racing", "Engineering", "University"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const socials = await getSocials();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href={env.NEXT_PUBLIC_DIRECTUS_URL} />
      </head>
      <body className={`font-sans ${oswald.variable} antialiased`}>
        <Navigation socials={socials} />
        {children}
        <Analytics />
        <SpeedInsights />
        <GSAPInitializer />
      </body>
    </html>
  )
}
