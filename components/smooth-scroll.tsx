"use client"

import { MotionConfig } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"

/**
 * Keeps the global reduced-motion policy without installing a permanent
 * requestAnimationFrame loop. Anchor scrolling remains smooth through CSS
 * (`html { scroll-behavior: smooth }`) and falls back to native scrolling
 * for users that request reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>{children}</MotionConfig>
}
