import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ALTERNATE_NAME, SITE_NAME, SITE_URL } from "@/data/site"
import { getPerfVariant, isPreviewDeployment } from "@/lib/perf-variant"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export function generateMetadata(): Metadata {
  const diagnostic = getPerfVariant() !== "baseline" || isPreviewDeployment()

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Jardel Sousa — Sites, Sistemas e Automações",
      template: "%s | Jardel Sousa",
    },
    description: "Desenvolvimento de sites profissionais, sistemas web e automações sob medida para empresas. Conheça projetos e soluções desenvolvidas por Jardel Sousa.",
    applicationName: SITE_NAME,
    authors: [{ name: `${SITE_NAME} (${ALTERNATE_NAME})`, url: SITE_URL }],
    creator: `${SITE_NAME} (${ALTERNATE_NAME})`,
    publisher: SITE_NAME,
    robots: diagnostic
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
    openGraph: {
      title: "Jardel Sousa — Sites, Sistemas e Automações",
      description: "Desenvolvimento de sites profissionais, sistemas web e automações sob medida para empresas.",
      url: `${SITE_URL}/`,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Jardel Sousa — Sites, Sistemas e Automações" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Jardel Sousa — Sites, Sistemas e Automações",
      description: "Desenvolvimento de sites profissionais, sistemas web e automações sob medida para empresas.",
      images: ["/og-image.jpg"],
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
