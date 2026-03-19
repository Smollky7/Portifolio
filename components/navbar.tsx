"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#works" },
  { label: "Contato", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const { scrollY } = useScroll()

  // Detectar se e mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Controlar visibilidade da navbar no mobile
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest
    
    // Se estiver no topo, sempre mostrar
    if (currentScrollY < 50) {
      setShowNavbar(true)
      setIsScrolled(false)
      setLastScrollY(currentScrollY)
      return
    }

    setIsScrolled(true)

    // No mobile, esconder quando rolar para baixo, mostrar quando rolar para cima
    if (isMobile) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Rolando para baixo
        setShowNavbar(false)
      } else {
        // Rolando para cima
        setShowNavbar(true)
      }
    }
    
    setLastScrollY(currentScrollY)
  })

  const scrollToSection = useCallback((href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevenir scroll quando menu mobile esta aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: showNavbar ? 0 : -100,
          opacity: showNavbar ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-4 py-3 md:px-12 md:py-5">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group flex items-center gap-2 touch-manipulation"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground">JARDEL SOUSA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 group-active:scale-150 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="group relative font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="text-accent mr-1">0{index + 1}</span>
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* Status Indicator - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs tracking-wider text-muted-foreground">DISPONIVEL PARA PROJETOS</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 touch-manipulation active:bg-white/5 rounded-lg transition-colors"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-foreground origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-px bg-foreground"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-foreground origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="group text-3xl font-sans tracking-tight text-foreground touch-manipulation active:text-accent transition-colors py-2"
                >
                  <span className="text-accent font-mono text-sm mr-2">0{index + 1}</span>
                  {link.label}
                </motion.button>
              ))}
              
              {/* Status - Mobile Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mt-8 pt-8 border-t border-border/30"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-mono text-xs tracking-wider text-muted-foreground">DISPONIVEL PARA PROJETOS</span>
              </motion.div>

              {/* Social Links - Mobile Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 mt-4"
              >
                <a
                  href="https://linkedin.com/in/jardelsousadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-wider text-muted-foreground active:text-accent transition-colors touch-manipulation py-2 px-3"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Smollky7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-wider text-muted-foreground active:text-accent transition-colors touch-manipulation py-2 px-3"
                >
                  GitHub
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
