"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { CONTACT_URL } from "@/data/site"

const SentientSphere = dynamic(
  () => import("./sentient-sphere").then((module) => module.SentientSphere),
  { ssr: false, loading: () => <div className="hero-sphere-fallback" aria-hidden="true" /> },
)

export function HeroWithoutMotion() {
  const [sphereReady, setSphereReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const mobile = window.matchMedia("(max-width: 767px)").matches
    const reveal = () => { if (!cancelled) setSphereReady(true) }
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (id: number) => void
    }
    const idleId = idleWindow.requestIdleCallback?.(reveal, { timeout: mobile ? 1400 : 650 })
    const timeoutId = idleId === undefined ? window.setTimeout(reveal, mobile ? 900 : 250) : undefined

    return () => {
      cancelled = true
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section id="home" className="hero-section scroll-section">
      <div className="hero-sphere" aria-hidden="true">
        <div className="absolute inset-0">
          {sphereReady ? <SentientSphere /> : <div className="hero-sphere-fallback" />}
        </div>
      </div>
      <div className="hero-particles" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-heading-block">
          <p className="section-kicker mb-4">01 — JARDEL SOUSA</p>
          <h1 className="hero-title" aria-label="Sites, sistemas e automações">
            <span className="hero-title-line hero-title-line-primary"><span>Sites, sistemas</span></span>
            <span className="hero-title-line hero-title-line-accent"><span>&amp; automações</span></span>
          </h1>
        </div>

        <div className="hero-capability"><p className="section-kicker">02 — CAPACIDADE</p><p>Software <span>sob medida</span></p></div>

        <div className="hero-copy">
          <p>Desenvolvo soluções digitais sob medida para empresas — de sites profissionais a plataformas, sistemas e automações.</p>
          <div className="hero-actions">
            <a href="#projects" data-cursor-hover className="hero-cta hero-cta-primary"><span>Ver projetos</span><ArrowDownRight aria-hidden="true" /></a>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" data-cursor-hover className="hero-cta hero-cta-secondary"><span>Falar sobre um projeto</span><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

        <a href="#about" aria-label="Ir para a próxima seção" className="hero-scroll-indicator"><span>Explore</span><i aria-hidden="true" /></a>
      </div>
    </section>
  )
}
