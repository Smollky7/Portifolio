import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SITE_URL } from "@/data/site"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jardel Sousa — Sites, Sistemas e Automações",
  description: "Desenvolvimento de sites profissionais, sistemas web e automações sob medida para empresas. Conheça projetos e soluções desenvolvidas por Jardel Sousa.",
  authors: [{ name: "Jardel Sousa", url: SITE_URL }],
  creator: "Jardel Sousa",
  publisher: "Jardel Sousa",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Jardel Sousa — Sites, Sistemas e Automações",
    description: "Desenvolvimento de sites profissionais, sistemas web e automações sob medida para empresas.",
    url: `${SITE_URL}/`,
    siteName: "Jardel Sousa",
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
