"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      // No mobile, simplificar o relogio
      if (isMobile) {
        setTime(`${hours}:${minutes}:${seconds}`);
      } else {
        const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
        setTime(`${hours}:${minutes}:${seconds}.${milliseconds}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, isMobile ? 1000 : 10);
    return () => clearInterval(interval);
  }, [isMobile]);

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
        onTouchEnd={() =>
          isMobile && setTimeout(() => setIsHovered(false), 300)
        }
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
              Vamos <span className="italic">Trabalhar Juntos?</span>
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
    </footer>
  );
}
