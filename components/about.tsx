"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const statements = [
  "Transformo problemas reais em soluções funcionais.",
  "Desenvolvo sistemas que evoluem com seu negócio.",
  "Interfaces devem ser intuitivas e performáticas.",
  "Cada projeto é uma oportunidade de inovar.",
  "Código bem estruturado é arte aplicada.",
]

const skills = [
  { category: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Back-end", items: ["Node.js", "Express", "Python", "API REST"] },
  { category: "Banco de Dados", items: ["MySQL", "MongoDB", "SQLite", "PlanetScale"] },
  { category: "Ferramentas", items: ["Git", "GitHub", "Figma", "Linux"] },
]

const timeline = [
  { year: "2020", event: "Inicio da jornada como desenvolvedor na Northi Empreendimentos" },
  { year: "2022", event: "Transicao para Full Stack Freelancer" },
  { year: "2024", event: "Desenvolvedor Destaque do Ano" },
  { year: "2025", event: "5 anos de experiencia, +50 projetos entregues" },
]

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 })

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-32 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-12 mb-12 md:mb-0 md:py-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">03 — SOBRE MIM</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Quem sou eu</h2>
      </motion.div>

      {/* Bio Section */}
      <div className="px-6 md:px-12 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Sou <span className="text-foreground font-medium">Jardel Sousa</span>, desenvolvedor Full Stack 
              de Minas Gerais, Brasil. Ha 5 anos transformo ideias em solucoes digitais funcionais, sempre 
              guiado pela curiosidade e pela vontade de resolver problemas reais.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Minha jornada comecou em 2020 na Northi Empreendimentos, onde desenvolvi meu primeiro site 
              profissional enquanto gerenciava operacoes administrativas. Essa experiencia me ensinou que 
              tecnologia nao e apenas codigo — e sobre entender o negocio e entregar valor.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Desde 2022, atuo como freelancer, entregando projetos completos para empresas e empreendedores. 
              Ja desenvolvi plataformas SaaS, e-commerces, sistemas de automacao, bots para WhatsApp e Discord, 
              e aplicacoes web de alta performance. Sou autodidata, proativo e orientado a resultados.
            </p>
          </motion.div>

          {/* Right - Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {skills.map((skill, index) => (
              <div 
                key={skill.category} 
                className="p-4 md:p-6 border border-border/50 bg-background/50 backdrop-blur-sm rounded-lg hover:border-accent/50 transition-colors duration-300"
              >
                <p className="font-mono text-xs tracking-wider text-accent mb-3">{skill.category.toUpperCase()}</p>
                <ul className="space-y-1.5">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-12 mb-16 md:mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8">TRAJETORIA</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-4 border-l border-border/50 hover:border-accent transition-colors duration-300"
            >
              <span className="font-mono text-2xl md:text-3xl font-light text-accent">{item.year}</span>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Philosophy Marquee */}
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 px-6 md:px-12">FILOSOFIA</p>
      </div>
      <div className="relative flex items-center overflow-hidden py-0 gap-0 h-12 md:h-16">
        <motion.div style={{ x: smoothX }} className="flex gap-8 md:gap-24 px-6 md:px-12 whitespace-nowrap">
          {statements.map((statement, index) => (
            <motion.p
              key={index}
              className="text-2xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white/90"
              style={{
                WebkitTextStroke: index % 2 === 0 ? "none" : "1px rgba(255,255,255,0.3)",
                color: index % 2 === 0 ? "inherit" : "transparent",
              }}
            >
              {statement}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-16 mx-6 md:mx-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />
    </section>
  )
}
