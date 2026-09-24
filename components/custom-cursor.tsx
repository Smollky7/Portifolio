"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const visibleRef = useRef(false)
  const reducedMotion = Boolean(useReducedMotion())
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const x = useSpring(mouseX, { stiffness: 500, damping: 32, mass: 0.35 })
  const y = useSpring(mouseY, { stiffness: 500, damping: 32, mass: 0.35 })

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover)")
    const updateCapability = () => setEnabled(media.matches)
    updateCapability()
    media.addEventListener("change", updateCapability)
    return () => media.removeEventListener("change", updateCapability)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add("custom-cursor-ready")

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setIsVisible(true)
      }
    }
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      setIsEditing(Boolean(target.closest("input, textarea, [contenteditable='true']")))
      setIsHovering(Boolean(target.closest("a, button, [role='button'], [data-cursor-hover]")))
    }
    const handleDown = () => setIsPressed(true)
    const handleUp = () => setIsPressed(false)
    const handleLeave = () => {
      visibleRef.current = false
      setIsVisible(false)
      setIsPressed(false)
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    document.addEventListener("pointerover", handleOver, { passive: true })
    document.addEventListener("pointerdown", handleDown, { passive: true })
    document.addEventListener("pointerup", handleUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleLeave)
    return () => {
      document.documentElement.classList.remove("custom-cursor-ready")
      window.removeEventListener("pointermove", handleMove)
      document.removeEventListener("pointerover", handleOver)
      document.removeEventListener("pointerdown", handleDown)
      document.removeEventListener("pointerup", handleUp)
      document.documentElement.removeEventListener("mouseleave", handleLeave)
    }
  }, [enabled, mouseX, mouseY])

  if (!enabled) return null

  return (
    <motion.svg
      aria-hidden="true"
      className={`custom-cursor-arrow${isHovering ? " is-hovering" : ""}${isEditing ? " is-editing" : ""}`}
      viewBox="0 0 18 26"
      style={{ x: reducedMotion ? mouseX : x, y: reducedMotion ? mouseY : y }}
      animate={{ opacity: isVisible && !isEditing ? 1 : 0, scale: isPressed ? 0.94 : isHovering ? 1.12 : 1 }}
      transition={{ opacity: { duration: 0.12 }, scale: { duration: reducedMotion ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] } }}
    >
      <path d="M1.5 1.5 2.1 21l5-4.5 4.1 8 4-2.1-4.1-7.8 6.2-1.1L1.5 1.5Z" />
    </motion.svg>
  )
}
