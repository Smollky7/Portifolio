"use client"

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

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
  const trackRef = useRef<HTMLDivElement>(null)
  const firstGroupRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const reducedMotion = Boolean(useReducedMotion())
  const [groupWidth, setGroupWidth] = useState(0)

  useEffect(() => {
    const measure = () => setGroupWidth(firstGroupRef.current?.getBoundingClientRect().width ?? 0)
    measure()
    const observer = new ResizeObserver(measure)
    if (firstGroupRef.current) observer.observe(firstGroupRef.current)
    window.addEventListener("resize", measure)
    return () => { observer.disconnect(); window.removeEventListener("resize", measure) }
  }, [])

  useEffect(() => {
    if (!groupWidth) return
    x.set(direction === "left" ? 0 : -groupWidth)
  }, [direction, groupWidth, x])

  useAnimationFrame((_, delta) => {
    if (reducedMotion || !groupWidth) return
    const speed = Math.max(42, Math.min(124, window.innerWidth * 0.065))
    const step = speed * (delta / 1000)
    let next = x.get() + (direction === "left" ? -step : step)
    if (direction === "left" && next <= -groupWidth) next += groupWidth
    if (direction === "right" && next >= 0) next -= groupWidth
    x.set(next)
  })

  const group = (copy: "primary" | "duplicate") => (
    <div ref={copy === "primary" ? firstGroupRef : undefined} className="marquee-group" aria-hidden={copy === "duplicate" || undefined}>
      {items.map((item) => (
        <span key={`${copy}-${item}`} className="tech-word group whitespace-nowrap font-sans text-3xl font-light tracking-tight md:text-7xl lg:text-8xl">
          {item}<span className="mx-4 md:mx-8 text-white/20">•</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden py-3 md:py-4">
      <motion.div ref={trackRef} className="marquee-track" style={{ x }}>
        {group("primary")}
        {group("duplicate")}
      </motion.div>
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
