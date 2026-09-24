"use client"

import dynamic from "next/dynamic"
import { useRef, type PointerEvent } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { CONTACT_URL } from "@/data/site"

const SentientSphere = dynamic(() => import("./sentient-sphere").then((module) => module.SentientSphere), { ssr: false, loading: () => <div className="hero-sphere-fallback" aria-hidden="true" /> })
const editorialEase = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const textX = useSpring(pointerX, { stiffness: 80, damping: 28 })
  const textY = useSpring(pointerY, { stiffness: 80, damping: 28 })
  const sphereX = useSpring(pointerX, { stiffness: 55, damping: 24 })
  const sphereY = useSpring(pointerY, { stiffness: 55, damping: 24 })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])
  const contentScrollY = useTransform(scrollYProgress, [0, 0.72], [0, -78])
  const spherePointerX = useTransform(sphereX, [-.5, .5], [-14, 14])
  const spherePointerY = useTransform(sphereY, [-.5, .5], [-10, 10])
  const particleX = useTransform(pointerX, [-.5, .5], [7, -7])
  const particleY = useTransform(pointerY, [-.5, .5], [5, -5])
  const headingX = useTransform(textX, [-.5, .5], [-4, 4])
  const headingY = useTransform(textY, [-.5, .5], [-3, 3])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch") return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    pointerX.set(x)
    pointerY.set(y)
  }

  return <section id="home" ref={containerRef} className="hero-section scroll-section" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .12, duration: 1.35, ease: editorialEase }} className="hero-sphere" aria-hidden="true"><motion.div className="absolute inset-0" style={{ x: spherePointerX, y: spherePointerY }}><SentientSphere /></motion.div></motion.div>
    <motion.div style={{ x: particleX, y: particleY }} className="hero-particles" aria-hidden="true" />
    <div className="hero-vignette" aria-hidden="true" />

    <motion.div style={{ opacity: contentOpacity, y: contentScrollY }} className="hero-content">
      <motion.div style={{ x: headingX, y: headingY }} className="hero-heading-block">
        <motion.p initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .28, duration: .65, ease: editorialEase }} className="section-kicker mb-4">01 — JARDEL SOUSA</motion.p>
        <h1 className="hero-title" aria-label="Sites, sistemas e automações">
          <span className="hero-title-line hero-title-line-primary"><motion.span initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ delay: .4, duration: .86, ease: editorialEase }}>Sites, sistemas</motion.span></span>
          <span className="hero-title-line hero-title-line-accent"><motion.span initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ delay: .57, duration: .9, ease: editorialEase }}>&amp; automações</motion.span></span>
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .72, duration: .78, ease: editorialEase }} className="hero-capability"><p className="section-kicker">02 — CAPACIDADE</p><p>Software <span>sob medida</span></p></motion.div>

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .82, duration: .75, ease: editorialEase }} className="hero-copy">
        <p>Desenvolvo soluções digitais sob medida para empresas — de sites profissionais a plataformas, sistemas e automações.</p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .98, duration: .65, ease: editorialEase }} className="hero-actions">
          <a href="#projects" data-cursor-hover className="hero-cta hero-cta-primary"><span>Ver projetos</span><ArrowDownRight aria-hidden="true" /></a>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" data-cursor-hover className="hero-cta hero-cta-secondary"><span>Falar sobre um projeto</span><ArrowUpRight aria-hidden="true" /></a>
        </motion.div>
      </motion.div>

      <motion.a href="#about" aria-label="Ir para a próxima seção" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: .6 }} className="hero-scroll-indicator"><span>Explore</span><i aria-hidden="true" /></motion.a>
    </motion.div>
  </section>
}
