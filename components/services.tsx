"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

const services = [
  ["01", "Sites profissionais", "Sites institucionais, landing pages e experiências digitais focadas em apresentar empresas, serviços e gerar oportunidades.", "/criacao-de-sites"],
  ["02", "Sistemas & plataformas", "Painéis administrativos, portais, plataformas de clientes, sistemas internos e aplicações web sob medida.", "/sistemas-web"],
  ["03", "Automações & integrações", "Automação de tarefas, bots, extensões, integrações entre serviços, APIs e redução de processos manuais.", "/automacoes"],
  ["04", "Software sob medida", "Ferramentas específicas para operações em que uma solução pronta simplesmente não atende ao negócio.", "/software-sob-medida"],
]

export function Services() {
  const [active, setActive] = useState<number | null>(null)
  return <section id="services" className="section-shell scroll-section py-24 md:py-36">
    <div className="mb-12 flex flex-col justify-between gap-5 md:mb-20 md:flex-row md:items-end">
      <div><p className="section-kicker">04 — SOLUÇÕES</p><h2 className="section-title mt-4">O que posso <span className="italic">construir.</span></h2></div>
      <p className="max-w-sm text-base leading-relaxed text-white/50">Cada projeto parte do problema e combina as capacidades necessárias para resolvê-lo.</p>
    </div>
    <div className="border-b border-white/10">{services.map(([number, title, description, href], index) =>
      <motion.article key={title} data-cursor-hover onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} initial={{ opacity: 0, x: index % 2 ? 28 : -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .55 }} transition={{ duration: .65 }} className={`service-row group grid gap-4 border-t border-white/10 py-8 md:grid-cols-[90px_1fr_1fr] md:items-center md:px-5 md:py-10 ${active === index ? "is-active" : ""}`}>
        <motion.span animate={{ x: active === index ? 9 : 0, opacity: active === index ? 1 : .7 }} className="font-mono text-4xl text-blue-500 md:text-6xl">{number}</motion.span>
        <motion.h3 animate={{ x: active === index ? 12 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 25 }} className="font-sans text-3xl font-light uppercase tracking-tight md:text-5xl"><Link href={href} className="focus-visible:text-blue-400">{title}</Link></motion.h3>
        <p className="max-w-xl text-base leading-relaxed text-white/55 md:justify-self-end">{description}</p>
      </motion.article>)}</div>
  </section>
}
