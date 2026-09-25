import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HeroWithoutMotion } from "@/components/hero-without-motion"
import { About } from "@/components/about"
import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { StructuredData } from "@/components/structured-data"
import { getPerfVariant } from "@/lib/perf-variant"

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: "/" },
    openGraph: { url: "/" },
  }
}

export default function Home() {
  const variant = getPerfVariant()

  return (
    <SmoothScroll disableLenis={variant === "no-lenis"}>
      <StructuredData />
      <CustomCursor />
      <Navbar />
      <main>
        {variant === "no-hero-motion" ? (
          <HeroWithoutMotion />
        ) : (
          <Hero disableSphere={variant === "no-sphere"} />
        )}
        <SectionBlend />
        <About />
        <Services />
        <Works />
        <Process />
        <TechMarquee />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
