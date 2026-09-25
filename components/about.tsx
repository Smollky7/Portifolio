"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const asideY = useTransform(scrollYProgress, [0, 1], [38, -28])
  return (
    <section id="about" ref={ref} className="section-shell scroll-section py-24 md:py-40">
      <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <motion.div style={{ y: asideY }} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }}>
          <p className="section-kicker">03 — POSICIONAMENTO</p>
          <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-white/45">Design, engenharia e estratégia reunidos para transformar uma necessidade concreta em produto digital.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .11 } } }}>
          <h2 className="section-title max-w-[13ch]">
            <span className="about-reveal"><motion.span variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] } } }}>Transformo necessidades</motion.span></span>
            <span className="about-reveal"><motion.span variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] } } }}>de negócios em</motion.span></span>
            <span className="about-reveal italic text-blue-500"><motion.span variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] } } }}>produtos digitais.</motion.span></span>
          </h2>
          <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2">
            <motion.p variants={{ hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0, transition: { duration: .7 } } }} className="text-base leading-relaxed text-white/65">Sou Jardel Sousa, desenvolvedor de software também conhecido como Smollky7. Desenvolvo produtos digitais do planejamento à implementação: sites, sistemas, plataformas e automações pensados para resolver problemas reais.</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0, transition: { duration: .7 } } }} className="text-base leading-relaxed text-white/65">Front-end, back-end, UI/UX, integrações e automações entram como ferramentas para construir a solução certa — não como o centro da conversa.</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
