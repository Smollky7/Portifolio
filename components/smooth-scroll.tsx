"use client"

import { ReactLenis } from "lenis/react"
import { MotionConfig } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  if (reduceMotion) return <MotionConfig reducedMotion="always">{children}</MotionConfig>

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  )
}
