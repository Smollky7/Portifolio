"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { projects, type Project } from "@/data/projects"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

function ProjectDetail({ project }: { project: Project }) {
  const [imageIndex, setImageIndex] = useState(0)
  const images = project.images ?? []
  const alt = project.imageAlts?.[imageIndex] ?? `Tela do projeto ${project.title}`
  const move = (direction: number) => setImageIndex((current) => (current + direction + images.length) % images.length)
  return <div className="project-detail">
    <div className="project-gallery">
      {images.length ? <AnimatePresence mode="wait" initial={false}><motion.div key={images[imageIndex]} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: .3 }} className="absolute inset-0"><Image src={images[imageIndex]} alt={alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-3 sm:p-6 lg:p-8" /></motion.div></AnimatePresence> : <div className="project-empty">Case sem imagens públicas</div>}
      {images.length > 1 && <div className="project-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Imagem anterior" className="project-control"><ChevronLeft aria-hidden="true" /></button><span>{String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><button type="button" onClick={() => move(1)} aria-label="Próxima imagem" className="project-control"><ChevronRight aria-hidden="true" /></button></div>}
    </div>
    <div className="project-detail-copy"><p className="section-kicker">{project.category}</p><DialogTitle className="mt-5 max-w-[11ch] font-sans text-4xl font-light uppercase leading-none sm:text-5xl lg:text-6xl">{project.title}</DialogTitle><DialogDescription className="mt-6 text-base leading-relaxed text-white/65">{project.summary}</DialogDescription>{project.status && <p className="mt-5 inline-block border border-blue-500/40 px-3 py-2 font-mono text-xs uppercase tracking-wider text-blue-400">{project.status}</p>}<dl className="mt-10 space-y-7 border-t border-white/10 pt-8"><div><dt>Contexto</dt><dd>{project.context}</dd></div><div><dt>Problema</dt><dd>{project.problem}</dd></div><div><dt>Solução</dt><dd>{project.solution}</dd></div></dl><div className="mt-9"><h3 className="font-mono text-xs uppercase tracking-[.2em] text-white/45">Principais funcionalidades</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{project.features.map((feature) => <li key={feature} className="border-l border-blue-500/60 pl-3 text-sm text-white/65">{feature}</li>)}</ul></div>{project.technologies && <div className="mt-9 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/50">{technology}</span>)}</div>}</div>
  </div>
}

export function Works() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [previewImage, setPreviewImage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const pointerX = useMotionValue(-500)
  const pointerY = useMotionValue(-500)
  const previewX = useSpring(pointerX, { stiffness: 185, damping: 25, mass: .42 })
  const previewY = useSpring(pointerY, { stiffness: 185, damping: 25, mass: .42 })
  const hoveredProject = hovered === null ? null : projects[hovered]

  useEffect(() => {
    const images = hoveredProject?.images ?? []
    if (reduceMotion || images.length < 2) return
    const interval = window.setInterval(() => setPreviewImage((current) => (current + 1) % images.length), 1550)
    return () => window.clearInterval(interval)
  }, [hoveredProject, reduceMotion])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current || event.pointerType === "touch") return
    const bounds = containerRef.current.getBoundingClientRect()
    pointerX.set(Math.min(Math.max(event.clientX - bounds.left + 28, 170), bounds.width - 170))
    pointerY.set(event.clientY - bounds.top - 24)
  }

  return <section id="projects" className="section-shell scroll-section py-24 md:py-36">
    <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: .5 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }} className="mb-12 md:mb-20"><p className="section-kicker">05 — PROJETOS SELECIONADOS</p><h2 className="section-title mt-4">Soluções construídas para <span className="italic">problemas reais.</span></h2></motion.div>
    <div ref={containerRef} className="projects-interactive" onPointerMove={handlePointerMove} onPointerLeave={() => setHovered(null)}>
      <div className="border-b border-white/10">{projects.map((project, index) => {
        const isActive = hovered === index
        return <motion.button type="button" key={project.slug} data-cursor-hover onPointerEnter={(event) => { if (event.pointerType !== "touch") { setPreviewImage(0); setHovered(index) } }} onFocus={(event) => { setPreviewImage(0); setHovered(index); if (containerRef.current) { pointerX.set(containerRef.current.clientWidth * .72); pointerY.set(event.currentTarget.offsetTop + 280) } }} onBlur={() => setHovered(null)} onClick={() => setSelected(project)} initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: .38 }} transition={{ duration: .72, delay: index * .05, ease: [0.16, 1, 0.3, 1] }} className={`project-row ${isActive ? "is-active" : ""}`} aria-label={`Abrir case ${project.title}`}>
          <motion.span animate={{ x: isActive ? 7 : 0 }} className="project-index">{String(index + 1).padStart(2, "0")}</motion.span>
          <div className="min-w-0"><motion.h3 animate={{ x: isActive ? 20 : 0 }} transition={{ type: "spring", stiffness: 280, damping: 24 }}>{project.title}</motion.h3><p>{project.category}</p></div>
          <motion.span animate={{ opacity: isActive ? 1 : .38, x: isActive ? 4 : 0 }} className="project-open">Abrir case <ArrowUpRight aria-hidden="true" /></motion.span>
          <div className="project-mobile-preview">{project.images?.[0] ? <Image src={project.images[0]} alt={project.imageAlts?.[0] ?? `Prévia do projeto ${project.title}`} fill sizes="(max-width: 767px) 92vw, 1px" className="object-contain" /> : <span aria-hidden="true">{project.title}</span>}</div>
        </motion.button>
      })}</div>

      <AnimatePresence>
        {hoveredProject && <motion.div className="project-floating-preview" style={{ x: reduceMotion ? pointerX : previewX, y: reduceMotion ? pointerY : previewY }} initial={{ opacity: 0, scale: .82, rotate: -1.2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: .88, rotate: 1 }} transition={{ duration: .24, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div key={`${hoveredProject.slug}-${previewImage}`} initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)", scale: 1.06 }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", scale: 1 }} exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)", scale: .98 }} transition={{ duration: .42, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
              {hoveredProject.images?.[previewImage] ? <Image src={hoveredProject.images[previewImage]} alt="" fill sizes="380px" className="object-cover" /> : <div className="project-floating-type">{hoveredProject.title}</div>}
            </motion.div>
          </AnimatePresence>
          <div className="project-floating-shade" /><span>{hoveredProject.category}</span>
        </motion.div>}
      </AnimatePresence>
    </div>

    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>{selected && <DialogContent className="max-h-[calc(100svh-1rem)] max-w-[min(1280px,calc(100%-1rem))] overflow-hidden border-white/15 bg-[#070707] p-0 shadow-2xl sm:max-h-[92svh]" showCloseButton><ProjectDetail project={selected} /></DialogContent>}</Dialog>
  </section>
}
