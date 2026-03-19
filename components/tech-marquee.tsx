"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

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
]

const concepts = [
  "FULL STACK",
  "FRONT-END",
  "BACK-END",
  "API REST",
  "UI/UX",
  "SaaS",
  "E-COMMERCE",
  "AUTOMACAO",
  "WEB APPS",
  "RESPONSIVO",
  "PERFORMANCE",
  "SEGURANCA",
]

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items]
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleInteraction = useCallback((index: number, isActive: boolean) => {
    setHoveredIndex(isActive ? index : null)
  }, [])

  return (
    <div className="relative overflow-hidden py-3 md:py-4">
      <motion.div
        className={`flex gap-4 md:gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="group font-sans text-3xl md:text-7xl lg:text-8xl font-light tracking-tight whitespace-nowrap cursor-default touch-manipulation select-none"
            style={{
              WebkitTextStroke: hoveredIndex === index ? "none" : "1px rgba(255,255,255,0.3)",
              color: hoveredIndex === index ? "white" : "transparent",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={() => !isMobile && handleInteraction(index, true)}
            onMouseLeave={() => !isMobile && handleInteraction(index, false)}
            onTouchStart={() => isMobile && handleInteraction(index, true)}
            onTouchEnd={() => isMobile && setTimeout(() => handleInteraction(index, false), 500)}
          >
            {item}
            <span className="mx-4 md:mx-8 text-white/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="relative py-16 overflow-hidden md:py-32">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-5 md:px-12 mb-8 md:mb-16"
      >
        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-4">
          05 — ARSENAL TECNICO
        </p>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-2 md:space-y-4">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  )
}
