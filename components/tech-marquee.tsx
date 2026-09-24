"use client"

import { motion } from "framer-motion"

const techItems = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "NODE.JS",
  "EXPRESS",
  "TAILWIND CSS",
  "MYSQL",
  "MONGODB",
  "PYTHON",
  "GIT",
  "GITHUB",
  "THREE.JS",
  "APIS",
]

const concepts = [
  "SITES PROFISSIONAIS",
  "SISTEMAS WEB",
  "PLATAFORMAS",
  "INTEGRAÇÕES",
  "AUTOMAÇÕES",
  "SOFTWARE SOB MEDIDA",
]

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const group = (copy: "primary" | "duplicate") => (
    <div className="marquee-group" aria-hidden={copy === "duplicate" || undefined}>
      {items.map((item) => (
        <span
          key={`${copy}-${item}`}
          className="tech-word group whitespace-nowrap font-sans text-3xl font-light tracking-tight md:text-7xl lg:text-8xl"
        >
          {item}
          <span className="mx-4 md:mx-8 text-white/20">•</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden py-3 md:py-4">
      <div className={`marquee-track ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {group("primary")}
        {group("duplicate")}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section id="technologies" className="scroll-section relative overflow-hidden py-16 md:py-32">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-5 md:px-12 mb-8 md:mb-16"
      >
        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-4">
          07 — CAPACIDADE TÉCNICA
        </p>
        <h2 className="section-title max-w-[12ch]">Tecnologia a serviço da <span className="italic text-blue-500">solução.</span></h2>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-2 md:space-y-4">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  )
}
