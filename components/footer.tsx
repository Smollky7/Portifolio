"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const [time, setTime] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      // No mobile, simplificar o relogio
      if (isMobile) {
        setTime(`${hours}:${minutes}:${seconds}`)
      } else {
        const milliseconds = now.getMilliseconds().toString().padStart(3, "0")
        setTime(`${hours}:${minutes}:${seconds}.${milliseconds}`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, isMobile ? 1000 : 10)
    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <footer id="contact" className="relative">
      {/* Main CTA */}
      <motion.a
        href="mailto:jardelsousa.dev@gmail.com"
        data-cursor-hover
        className="relative block overflow-hidden touch-manipulation"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onTouchStart={() => isMobile && setIsHovered(true)}
        onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 300)}
      >
        {/* Background Curtain */}
        <motion.div
          className="absolute inset-0 bg-[#2563eb]"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-12 md:py-24 px-5 md:px-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <motion.h2
              className="font-sans text-3xl md:text-6xl lg:text-8xl font-light tracking-tight text-center md:text-left"
              animate={{
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              Vamos <span className="italic">Colaborar</span>
            </motion.h2>

            <motion.div
              animate={{
                rotate: isHovered ? 45 : 0,
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="px-5 md:px-12 py-6 md:py-8 border-t border-white/10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          {/* Local Time */}
          <div className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground text-center md:text-left">
            <span className="mr-2">HORA LOCAL</span>
            <span className="text-white tabular-nums">{time}</span>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-6 md:gap-8">
            <a
              href="https://linkedin.com/in/jardelsousadev"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground hover:text-white active:text-accent transition-colors duration-300 touch-manipulation py-2"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Smollky7"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground hover:text-white active:text-accent transition-colors duration-300 touch-manipulation py-2"
            >
              GitHub
            </a>
            <a
              href="mailto:jardelsousa.dev@gmail.com"
              data-cursor-hover
              className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground hover:text-white active:text-accent transition-colors duration-300 touch-manipulation py-2"
            >
              Email
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} JARDEL SOUSA
          </p>
        </div>
      </div>

      {/* WhatsApp Floating Button - Mobile Only */}
      {isMobile && (
        <motion.a
          href="https://wa.me/5538998594869"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg touch-manipulation active:scale-95 transition-transform"
          aria-label="Contato via WhatsApp"
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
      )}
    </footer>
  )
}
