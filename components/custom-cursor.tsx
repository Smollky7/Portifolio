"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const x = useSpring(mouseX, { stiffness: 500, damping: 32, mass: 0.35 })
  const y = useSpring(mouseY, { stiffness: 500, damping: 32, mass: 0.35 })

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)")
    const updateCapability = () => setEnabled(media.matches)
    updateCapability()
    media.addEventListener("change", updateCapability)
    return () => media.removeEventListener("change", updateCapability)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      setIsVisible(true)
    }
    const handleOver = (event: PointerEvent) => setIsHovering(Boolean((event.target as HTMLElement).closest("a, button, [data-cursor-hover]")))
    const handleOut = () => setIsHovering(false)
    const handleLeave = () => setIsVisible(false)

    window.addEventListener("pointermove", handleMove, { passive: true })
    document.addEventListener("pointerover", handleOver, { passive: true })
    document.addEventListener("pointerout", handleOut, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("pointermove", handleMove)
      document.removeEventListener("pointerover", handleOver)
      document.removeEventListener("pointerout", handleOut)
      document.documentElement.removeEventListener("mouseleave", handleLeave)
    }
  }, [enabled, mouseX, mouseY])

  if (!enabled) return null

  return <>
    <motion.div aria-hidden="true" className="custom-cursor-dot" style={{ x, y }} animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 0 : 1 }} />
    <motion.div aria-hidden="true" className="custom-cursor-ring" style={{ x, y }} animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 1 : 0.35 }} />
  </>
}
