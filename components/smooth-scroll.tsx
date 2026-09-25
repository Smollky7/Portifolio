"use client"

import { MotionConfig } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"

type IdleWindow = Window & typeof globalThis & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    const idleWindow = window as IdleWindow
    let disposed = false
    let lenis: { destroy: () => void } | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const initialize = async () => {
      const { default: Lenis } = await import("lenis")
      if (disposed) return
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, duration: 1.2, smoothWheel: true, anchors: true })
    }

    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(() => void initialize(), { timeout: 1800 })
      : undefined

    if (idleId === undefined) timeoutId = setTimeout(() => void initialize(), 900)

    return () => {
      disposed = true
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      lenis?.destroy()
    }
  }, [reduceMotion])

  return <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>{children}</MotionConfig>
}
