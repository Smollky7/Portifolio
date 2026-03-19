"use client";

import type React from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  year: string;
};

const projects: Project[] = [
  {
    title: "Plataforma Joao Gabriel Fit",
    description:
      "Sistema web completo para gestao de dietas e acompanhamento de progresso fisico com painel administrativo.",
    tags: ["Next.js 16", "React 19", "TypeScript", "MySQL"],
    images: [
      "/projects/joao-gabriel-fit/01.jpg",
      "/projects/joao-gabriel-fit/02.jpg",
      "/projects/joao-gabriel-fit/03.jpg",
      "/projects/joao-gabriel-fit/04.jpg",
      "/projects/joao-gabriel-fit/05.jpg",
      "/projects/joao-gabriel-fit/06.jpg",
      "/projects/joao-gabriel-fit/07.jpg",
      "/projects/joao-gabriel-fit/08.jpg",
      "/projects/joao-gabriel-fit/09.jpg",
      "/projects/joao-gabriel-fit/10.jpg",
      "/projects/joao-gabriel-fit/11.jpg",
    ],
    year: "2025",
  },
  {
    title: "E-commerce Santo Brigadeiro",
    description:
      "Plataforma completa de pedidos online com cardapio digital, carrinho e sistema de pagamento.",
    tags: ["Node.js", "Express", "MySQL", "API REST"],
    images: [],
    year: "2024",
  },
  {
    title: "Plataforma YOUQI",
    description:
      "Aplicacao web para gestao de usuarios, parceiros e clientes com automacoes via WhatsApp.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    images: [],
    year: "2024",
  },
  {
    title: "Radio Web Onda Livre",
    description:
      "Plataforma de streaming de audio ao vivo com player responsivo e reconexao automatica.",
    tags: ["React", "Vite", "Tailwind CSS", "Streaming"],
    images: ["/projects/radio-web-onda-livre/01.png"],
    year: "2024",
  },
];

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<
    Record<number, number>
  >({});
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const targetIndex = isMobile ? expandedIndex : hoveredIndex;

    if (targetIndex === null) {
      return;
    }

    const currentProject = projects[targetIndex];
    if (!currentProject || currentProject.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveImageIndexes((prev) => {
        const current = prev[targetIndex] ?? 0;
        return {
          ...prev,
          [targetIndex]: (current + 1) % currentProject.images.length,
        };
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [hoveredIndex, expandedIndex, isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && !isMobile) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleProjectClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  const getCurrentImage = (project: Project, index: number) => {
    if (project.images.length === 0) {
      return "";
    }
    const imageIndex = activeImageIndexes[index] ?? 0;
    return project.images[imageIndex] ?? project.images[0];
  };

  return (
    <section id="works" className="relative py-16 px-5 md:py-24 md:px-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-24"
      >
        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-3 md:mb-4">
          04 — PROJETOS SELECIONADOS
        </p>
        <h2 className="font-sans text-2xl md:text-5xl font-light italic">
          Galeria de Projetos
        </h2>
      </motion.div>

      {/* Projects List */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative border-t border-white/10 py-6 md:py-12"
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
          >
            <div
              onClick={() => handleProjectClick(index)}
              data-cursor-hover
              className="group flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4 cursor-pointer touch-manipulation"
            >
              {/* Year */}
              <span className="font-mono text-[10px] md:text-xs text-muted-foreground tracking-widest order-1 md:order-none">
                {project.year}
              </span>

              {/* Title */}
              <motion.h3
                className="font-sans text-2xl md:text-6xl lg:text-7xl font-light tracking-tight group-hover:text-white/70 group-active:text-white/70 transition-colors duration-300 flex-1"
                animate={{
                  x: hoveredIndex === index ? 20 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {project.title}
              </motion.h3>

              {/* Tags - Desktop */}
              <div className="hidden md:flex gap-2 flex-wrap order-2 md:order-none">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile Expand Indicator */}
              {isMobile && (
                <motion.span
                  animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                  className="absolute right-0 top-6 text-muted-foreground text-xl font-light"
                >
                  +
                </motion.span>
              )}
            </div>

            {/* Mobile Expanded Content */}
            {isMobile && (
              <motion.div
                initial={false}
                animate={{
                  height: expandedIndex === index ? "auto" : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-4">
                  {/* Image */}
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    {project.images.length > 0 ? (
                      <>
                        <img
                          src={getCurrentImage(project, index)}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{ filter: "grayscale(50%) contrast(1.1)" }}
                        />
                        <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay" />
                      </>
                    ) : (
                      <div className="w-full h-full border border-dashed border-white/20 rounded-lg flex items-center justify-center bg-white/5 text-xs font-mono tracking-wider text-muted-foreground uppercase">
                        Sem imagem por enquanto
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] tracking-wider px-2 py-1 border border-white/20 rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Floating Image - Desktop Only */}
        {!isMobile && (
          <motion.div
            className="absolute pointer-events-none z-50 w-64 h-40 md:w-80 md:h-48 overflow-hidden rounded-lg"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-320%",
            }}
            animate={{
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            {hoveredIndex !== null &&
              projects[hoveredIndex].images.length > 0 && (
                <motion.img
                  src={getCurrentImage(projects[hoveredIndex], hoveredIndex)}
                  alt={projects[hoveredIndex].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    filter: "grayscale(50%) contrast(1.1)",
                  }}
                />
              )}
            <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay" />
          </motion.div>
        )}
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  );
}
