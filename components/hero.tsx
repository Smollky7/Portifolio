"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0 touch-manipulation">
        <SentientSphere />
      </div>

      {/* Typography Overlay */}
      <motion.div 
        style={{ opacity, scale }} 
        className="relative z-10 h-full flex flex-col justify-between p-5 pt-20 pb-8 md:p-12 md:px-12 md:py-20"
      >
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
            01 — JARDEL SOUSA
          </p>
          <h2 className="font-sans text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance">
            FULL STACK
            <br />
            <span className="italic">DEVELOPER</span>
          </h2>
        </motion.div>

        {/* Center Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <motion.button
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative px-6 py-3 md:px-8 md:py-4 border border-white/20 rounded-full font-mono text-xs md:text-sm tracking-widest uppercase bg-transparent backdrop-blur-sm hover:bg-white hover:text-black active:bg-white active:text-black transition-colors duration-500 touch-manipulation"
          >
            Explorar
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#2563eb] rounded-full animate-pulse" />
          </motion.button>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="self-end text-right"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
            02 — ESPECIALIDADE
          </p>
          <h2 className="font-sans text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance">
            FRONT-END
            <br />
            <span className="italic">& UI/UX</span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-muted-foreground uppercase">Rolar</span>
          <div className="w-px h-6 md:h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
