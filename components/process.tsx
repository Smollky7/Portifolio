"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

const steps = [
  ["01", "Entender", "Entender o negócio, o problema e o objetivo."],
  ["02", "Planejar", "Definir experiência, arquitetura e solução."],
  ["03", "Construir", "Desenvolver interface, backend, integrações e automações necessárias."],
  ["04", "Evoluir", "Publicar, acompanhar e continuar melhorando a solução."],
]

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start .8", "end .65"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  return <section id="process" ref={ref} className="section-shell scroll-section relative py-24 md:py-36">
    <p className="section-kicker">06 — COMO EU TRABALHO</p>
    <div className="mt-12 grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
      <h2 className="section-title max-w-[9ch]">Do problema à <span className="italic text-blue-500">solução.</span></h2>
      <div className="relative pl-8 md:pl-12"><div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" /><motion.div style={{ scaleY }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-blue-500" />
        {steps.map(([number, title, description]) => <div key={number} className="grid gap-3 border-b border-white/10 py-7 first:pt-0 sm:grid-cols-[70px_1fr]"><span className="font-mono text-sm text-blue-500">{number}</span><div><h3 className="text-2xl font-light uppercase md:text-3xl">{title}</h3><p className="mt-2 max-w-md text-base leading-relaxed text-white/55">{description}</p></div></div>)}
      </div>
    </div>
  </section>
}
