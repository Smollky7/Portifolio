import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
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

export default function Home() {
  return (
    <SmoothScroll>
      <StructuredData />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
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
