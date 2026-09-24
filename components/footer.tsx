"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { CONTACT_URL, SITE_URL, socialLinks } from "@/data/site"

export function Footer() {
  const [time, setTime] = useState("")
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start 92%", "start 42%"],
  })

  const scrollFillY = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  )

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      )

    update()

    const interval = window.setInterval(update, 1000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="scroll-section relative border-t border-white/10"
    >
      <a
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="contact-cta group"
      >
        <span
          className="contact-hover-fill"
          aria-hidden="true"
        />

        <motion.span
          className="contact-scroll-fill"
          style={{ y: scrollFillY }}
          aria-hidden="true"
        />

        <div className="contact-content">
          <p className="section-kicker contact-kicker">
            08 — CONTATO
          </p>

          <div className="contact-heading-row">
            <div>
              <h2>
                Tem um projeto
                <br />
                <span>em mente?</span>
              </h2>

              <p>
                Sites, sistemas, automações ou uma ideia que ainda
                precisa ganhar forma.
              </p>
            </div>

            <ArrowUpRight
              className="contact-arrow"
              aria-hidden="true"
            />
          </div>

          <span className="contact-action">
            Falar sobre o projeto
            <ArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </a>

      <div className="px-5 py-7 md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-xs tracking-widest text-white/45">
            HORA LOCAL
            <span className="ml-2 tabular-nums text-white">
              {time}
            </span>
          </p>

          <nav
            aria-label="Redes sociais"
            className="flex flex-wrap justify-center gap-5 md:gap-7"
          >
            <a
              className="footer-link"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <a
              className="footer-link"
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              className="footer-link"
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              className="footer-link"
              href={`${SITE_URL}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Site
            </a>

            <a
              className="footer-link"
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </nav>

          <p className="font-mono text-xs tracking-widest text-white/45">
            © {new Date().getFullYear()} Jardel Sousa / Smollky7
          </p>
        </div>
      </div>
    </footer>
  )
}
