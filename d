[1mdiff --git a/app/globals.css b/app/globals.css[m
[1mindex c4b0603..e398a5a 100644[m
[1m--- a/app/globals.css[m
[1m+++ b/app/globals.css[m
[36m@@ -257,8 +257,12 @@[m
   .contact-cta { padding: 8rem 3rem; }[m
 }[m
 [m
[32m+[m[32m@media (min-width: 768px) {[m
[32m+[m[32m  .hero-copy { grid-column: 1 / -1; justify-self: center; width: min(100%, 37rem); }[m
[32m+[m[32m}[m
[32m+[m
 @media (max-width: 767px) {[m
[31m-  .hero-content { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto auto; gap: 1rem; padding: 5.75rem 1.25rem 1.5rem; }[m
[32m+[m[32m  .hero-content { grid-template-columns: 1fr; grid-template-rows: auto minmax(9rem, 1fr) auto; gap: 1rem; padding: 5.75rem 1.25rem 1rem; }[m
   .hero-heading-block { grid-column: 1; }[m
   .hero-title { max-width: 10ch; font-size: clamp(2.7rem, 12.8vw, 3.7rem); line-height: .84; }[m
   .hero-capability { grid-column: 1; grid-row: 2; align-self: end; justify-self: end; max-width: 12rem; padding-bottom: .5rem; text-align: right; }[m
[36m@@ -277,6 +281,8 @@[m
   .contact-heading-row h2 { font-size: clamp(3rem, 15.5vw, 4.6rem); }[m
   .contact-heading-row p { line-height: 1.55; }[m
   .contact-arrow { width: 2.75rem; }[m
[32m+[m[32m  .section-blend { height: 5rem !important; margin-top: -5rem !important; }[m
[32m+[m[32m  #about { padding-top: 4rem; }[m
 }[m
 [m
 @media (hover: none), (pointer: coarse) {[m
[36m@@ -322,6 +328,19 @@[m
 .marquee-track { display: flex; width: max-content; will-change: transform; }[m
 .marquee-group { display: flex; flex: none; align-items: center; }[m
 [m
[32m+[m[32m@keyframes marquee-left {[m
[32m+[m[32m  from { transform: translate3d(0, 0, 0); }[m
[32m+[m[32m  to { transform: translate3d(-50%, 0, 0); }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m@keyframes marquee-right {[m
[32m+[m[32m  from { transform: translate3d(-50%, 0, 0); }[m
[32m+[m[32m  to { transform: translate3d(0, 0, 0); }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.animate-marquee-left { animation: marquee-left 42s linear infinite; }[m
[32m+[m[32m.animate-marquee-right { animation: marquee-right 32s linear infinite; }[m
[32m+[m
 @media (hover: hover) and (pointer: fine) {[m
   .contact-cta:hover .contact-hover-fill,[m
   .contact-cta:focus-visible .contact-hover-fill { transform: translateY(0); }[m
[36m@@ -337,4 +356,6 @@[m
     animation-iteration-count: 1 !important;[m
     transition-duration: 0.01ms !important;[m
   }[m
[32m+[m[32m  .animate-marquee-left { animation: marquee-left 64s linear infinite !important; }[m
[32m+[m[32m  .animate-marquee-right { animation: marquee-right 49s linear infinite !important; }[m
 }[m
[1mdiff --git a/components/hero.tsx b/components/hero.tsx[m
[1mindex 4b3fc4b..cd5c30f 100644[m
[1m--- a/components/hero.tsx[m
[1m+++ b/components/hero.tsx[m
[36m@@ -37,7 +37,7 @@[m [mexport function Hero() {[m
   }[m
 [m
   return <section id="home" ref={containerRef} className="hero-section scroll-section" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>[m
[31m-    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: 1.35, ease: editorialEase }} className="hero-sphere" aria-hidden="true"><motion.div className="h-full w-full" style={{ x: spherePointerX, y: spherePointerY }}><SentientSphere /></motion.div></motion.div>[m
[32m+[m[32m    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .12, duration: 1.35, ease: editorialEase }} className="hero-sphere" aria-hidden="true"><motion.div className="absolute inset-0" style={{ x: spherePointerX, y: spherePointerY }}><SentientSphere /></motion.div></motion.div>[m
     <motion.div style={{ x: particleX, y: particleY }} className="hero-particles" aria-hidden="true" />[m
     <div className="hero-vignette" aria-hidden="true" />[m
 [m
[1mdiff --git a/components/navbar.tsx b/components/navbar.tsx[m
[1mindex bb59156..d98775a 100644[m
[1m--- a/components/navbar.tsx[m
[1m+++ b/components/navbar.tsx[m
[36m@@ -2,7 +2,7 @@[m
 [m
 import { useState, useEffect } from "react"[m
 import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"[m
[31m-import { socialLinks } from "@/data/site"[m
[32m+[m[32mimport { CONTACT_URL, socialLinks } from "@/data/site"[m
 [m
 const navLinks = [[m
   { label: "Início", href: "#home" },[m
[36m@@ -126,7 +126,7 @@[m [mexport function Navbar() {[m
             ))}[m
           </ul>[m
 [m
[31m-          <a href="#contact" className="hidden rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/70 transition-colors hover:border-blue-500 hover:text-white lg:block">Falar comigo ↗</a>[m
[32m+[m[32m          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/70 transition-colors hover:border-blue-500 hover:text-white lg:block">Falar comigo ↗</a>[m
 [m
           {/* Mobile Menu Button */}[m
           <button[m
[1mdiff --git a/components/tech-marquee.tsx b/components/tech-marquee.tsx[m
[1mindex 5ef5518..68c43a6 100644[m
[1m--- a/components/tech-marquee.tsx[m
[1m+++ b/components/tech-marquee.tsx[m
[36m@@ -1,7 +1,6 @@[m
 "use client"[m
 [m
[31m-import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion"[m
[31m-import { useEffect, useRef, useState } from "react"[m
[32m+[m[32mimport { motion } from "framer-motion"[m
 [m
 const techItems = [[m
   "NEXT.JS",[m
[36m@@ -30,38 +29,8 @@[m [mconst concepts = [[m
 ][m
 [m
 function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {[m
[31m-  const trackRef = useRef<HTMLDivElement>(null)[m
[31m-  const firstGroupRef = useRef<HTMLDivElement>(null)[m
[31m-  const x = useMotionValue(0)[m
[31m-  const reducedMotion = Boolean(useReducedMotion())[m
[31m-  const [groupWidth, setGroupWidth] = useState(0)[m
[31m-[m
[31m-  useEffect(() => {[m
[31m-    const measure = () => setGroupWidth(firstGroupRef.current?.getBoundingClientRect().width ?? 0)[m
[31m-    measure()[m
[31m-    const observer = new ResizeObserver(measure)[m
[31m-    if (firstGroupRef.current) observer.observe(firstGroupRef.current)[m
[31m-    window.addEventListener("resize", measure)[m
[31m-    return () => { observer.disconnect(); window.removeEventListener("resize", measure) }[m
[31m-  }, [])[m
[31m-[m
[31m-  useEffect(() => {[m
[31m-    if (!groupWidth) return[m
[31m-    x.set(direction === "left" ? 0 : -groupWidth)[m
[31m-  }, [direction, groupWidth, x])[m
[31m-[m
[31m-  useAnimationFrame((_, delta) => {[m
[31m-    if (reducedMotion || !groupWidth) return[m
[31m-    const speed = Math.max(42, Math.min(124, window.innerWidth * 0.065))[m
[31m-    const step = speed * (delta / 1000)[m
[31m-    let next = x.get() + (direction === "left" ? -step : step)[m
[31m-    if (direction === "left" && next <= -groupWidth) next += groupWidth[m
[31m-    if (direction === "right" && next >= 0) next -= groupWidth[m
[31m-    x.set(next)[m
[31m-  })[m
[31m-[m
   const group = (copy: "primary" | "duplicate") => ([m
[31m-    <div ref={copy === "primary" ? firstGroupRef : undefined} className="marquee-group" aria-hidden={copy === "duplicate" || undefined}>[m
[32m+[m[32m    <div className="marquee-group" aria-hidden={copy === "duplicate" || undefined}>[m
       {items.map((item) => ([m
         <span key={`${copy}-${item}`} className="tech-word group whitespace-nowrap font-sans text-3xl font-light tracking-tight md:text-7xl lg:text-8xl">[m
           {item}<span className="mx-4 md:mx-8 text-white/20">•</span>[m
[36m@@ -72,10 +41,10 @@[m [mfunction MarqueeRow({ items, direction = "left" }: { items: string[]; direction?[m
 [m
   return ([m
     <div className="relative overflow-hidden py-3 md:py-4">[m
[31m-      <motion.div ref={trackRef} className="marquee-track" style={{ x }}>[m
[32m+[m[32m      <div className={`marquee-track ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>[m
         {group("primary")}[m
         {group("duplicate")}[m
[31m-      </motion.div>[m
[32m+[m[32m      </div>[m
     </div>[m
   )[m
 }[m
[1mdiff --git a/data/site.ts b/data/site.ts[m
[1mindex 6f0abd9..75ce3c2 100644[m
[1m--- a/data/site.ts[m
[1m+++ b/data/site.ts[m
[36m@@ -1,11 +1,12 @@[m
 export const SITE_URL = "https://www.jardelsousadev.com.br"[m
[31m-export const CONTACT_EMAIL = "jardelsousa.dev@gmail.com"[m
 [m
 export const socialLinks = {[m
   linkedin: "https://www.linkedin.com/in/jardelsousadev",[m
   github: "https://github.com/Smollky7",[m
   instagram: "https://instagram.com/smollky7",[m
[32m+[m[32m  whatsapp: "https://wa.me/+5538997394643",[m
 } as const[m
 [m
[31m-// Substitua pelo endereço wa.me somente quando o número comercial estiver confirmado.[m
[31m-export const CONTACT_URL = `mailto:${CONTACT_EMAIL}`[m
[32m+[m[32mexport const CONTACT_URL = `${socialLinks.whatsapp}?text=${encodeURIComponent([m
[32m+[m[32m  "Olá, Jardel! Vi seu portfólio e gostaria de conversar sobre um projeto."[m
[32m+[m[32m)}`[m
\ No newline at end of file[m
