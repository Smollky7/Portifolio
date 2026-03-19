"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isTouching, setIsTouching] = useState(false)

  useEffect(() => {
    // Detectar se e dispositivo touch
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      )
    }
    
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  useEffect(() => {
    // Se for touch device, usar eventos de touch
    if (isTouchDevice) {
      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0]
        setPosition({ x: touch.clientX, y: touch.clientY })
        setIsTouching(true)
        setIsVisible(true)
      }

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0]
        setPosition({ x: touch.clientX, y: touch.clientY })
      }

      const handleTouchEnd = () => {
        // Esconder cursor apos 300ms
        setTimeout(() => {
          setIsTouching(false)
          setIsVisible(false)
        }, 300)
      }

      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
      window.addEventListener("touchend", handleTouchEnd, { passive: true })

      return () => {
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("touchend", handleTouchEnd)
      }
    }

    // Desktop: usar eventos de mouse
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
    }
  }, [isTouchDevice])

  // Nao renderizar cursor em dispositivos touch quando nao esta tocando
  if (isTouchDevice && !isTouching) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isTouchDevice ? 2 : (isHovering ? 0 : 5),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: isTouchDevice ? 800 : 500, 
          damping: isTouchDevice ? 35 : 28, 
          mass: 0.5 
        }}
      />
      {/* Hover ring - apenas desktop */}
      {!isTouchDevice && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
          animate={{
            x: position.x - 24,
            y: position.y - 24,
            scale: isHovering ? 1 : 0,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
        />
      )}
    </>
  )
}
