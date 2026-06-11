"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Compass, Shield, Heart, Eye, ArrowUpRight, Palette } from "lucide-react"

interface HeroSectionProps {
  mode: "uiux" | "visual"
  setMode: (mode: "uiux" | "visual") => void
}

export function HeroSection({ mode, setMode }: HeroSectionProps) {
  const [currentTime, setCurrentTime] = useState("11:11 PM")
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  
  const yParallax = useTransform(scrollY, [0, 800], [0, 320])
  const opacityParallax = useTransform(scrollY, [0, 600], [1, 0])

  // Coordinate tracking for the mouse parallax effects
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 25
    const y = (e.clientY - rect.top - rect.height / 2) / 25
    setCoords({ x, y })
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const ampm = hours >= 12 ? "PM" : "AM"
      hours = hours % 12
      hours = hours ? hours : 12
      setCurrentTime(`${hours}:${minutes} ${ampm}`)
    }
    
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-black rounded-b-[2.5rem] transition-colors duration-1000"
    >
      
      {/* Master Mode Toggler — perfectly balanced pill toggle */}
      <motion.div 
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 450, damping: 18 }}
      >
        <div className={`relative inline-flex items-stretch gap-0 rounded-full border bg-zinc-950/80 p-1.5 backdrop-blur-md transition-all duration-500 ${
          mode === "uiux" 
            ? "border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.12)]" 
            : "border-stone-800/60 shadow-[0_0_30px_rgba(231,229,228,0.06)]"
        }`}>

          {/* UI/UX button */}
          <button
            onClick={() => setMode("uiux")}
            className={`relative z-10 min-w-[112px] px-6 py-2.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
              mode === "uiux" ? "text-indigo-400" : "text-zinc-500 hover:text-white"
            }`}
          >
            UI/UX Mode
            {/* Active pill sits behind this button */}
            {mode === "uiux" && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full bg-indigo-500/20 border border-indigo-500/30 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Visual Designer button */}
          <button
            onClick={() => setMode("visual")}
            className={`relative z-10 min-w-[148px] px-6 py-2.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
              mode === "visual" ? "text-stone-100" : "text-zinc-500 hover:text-white"
            }`}
          >
            Visual Designer
            {/* Active pill sits behind this button */}
            {mode === "visual" && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full bg-stone-100/10 border border-stone-100/20 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {mode === "uiux" ? (
          
          /* ========================================================================= */
          /* 1. ORIGINAL UI/UX HERO (RESTORED EXACTLY)                                 */
          /* ========================================================================= */
          <motion.div
            key="uiux-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <div className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-screen overflow-hidden">
                <img 
                  src="https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png?width=1536&height=1024" 
                  alt="Atmosphere" 
                  className="w-full h-full object-cover object-center opacity-80 brightness-[0.5] hue-rotate-[200deg] contrast-[1.2]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
            </div>

            {/* Floating Surrealist Elements */}
            <motion.div 
              className="absolute -left-[10%] top-[-10%] md:left-[-5%] md:top-[-15%] w-[50vw] md:w-[40vw] max-w-[800px] z-10 pointer-events-none mix-blend-hard-light opacity-80"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img 
                src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320" 
                alt="Hand Reaching" 
                className="w-full h-auto object-contain brightness-90 grayscale-[0.5]"
              />
            </motion.div>

            <motion.div 
              className="absolute -right-[10%] bottom-[-10%] md:right-[-5%] md:bottom-[-5%] w-[45vw] md:w-[35vw] max-w-[700px] z-10 pointer-events-none mix-blend-hard-light opacity-80"
              animate={{
                y: [0, 20, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img 
                src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002" 
                alt="Hand Receiving" 
                className="w-full h-auto object-contain brightness-90 grayscale-[0.5]"
              />
            </motion.div>

            {/* Hero Content */}
            <motion.div 
              style={{ y: yParallax, opacity: opacityParallax }}
              className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center h-full"
            >
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <h1 className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight mb-16 font-serif text-white" 
                      style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                    <span className="text-white/40">A User Interface is</span> <br />
                    <span className="text-6xl md:text-8xl font-bold transition-all">Not a{" "}
                      <span className="italic font-serif">
                        joke.
                      </span>
                    </span> <br />
                    <span className="text-2xl md:text-3xl italic font-light text-white/40">If you have to explain it, it&apos;s not that good.</span>
                  </h1>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Status badge - Indigo Refinement */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                      Open to opportunities
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a href="#work" className="group relative flex items-center gap-6 rounded-full bg-white pl-8 pr-2 py-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900">View Projects</span>
                      <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center transition-colors group-hover:bg-zinc-700">
                         <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>

                    <a href="#contact" className="group relative flex items-center gap-6 rounded-full bg-white/5 border border-white/10 pl-8 pr-2 py-2 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:scale-105 transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Get in Touch</span>
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-white/20">
                         <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Massive Background Text from Spec */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-1/2 pointer-events-none select-none overflow-hidden h-[30vh] z-0">
              <span className="text-[20vw] leading-none font-bold text-white/[0.03] blur-[2px] whitespace-nowrap">
                DESIGN
              </span>
            </div>
          </motion.div>
        ) : (
          
          /* ========================================================================= */
          /* 2. CREATIVE MATHEMATICAL VECTOR CANVAS VISUAL HERO                       */
          /* ========================================================================= */
          <motion.div
            key="visual-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-[#050507] select-none overflow-hidden"
          >
            {/* === Animated Deep Purple/Magenta Gradient Base === */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 100%, rgba(126,34,206,0.2) 0%, rgba(192,38,211,0.08) 40%, transparent 80%)",
              }}
            />

            {/* === Moving Color Orbs === */}
            <motion.div
              animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
            />
            
            <motion.div
              animate={{ x: [0, -80, 80, 0], y: [0, 100, -50, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 -right-20 w-[800px] h-[800px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(192,38,211,0.05) 0%, transparent 70%)", filter: "blur(90px)" }}
            />

            {/* === Grid Pattern with Feathered Edges (Radial Mask) === */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                backgroundSize: "4rem 4rem",
                maskImage: "radial-gradient(ellipse 90% 90% at 50% 40%, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 40%, black 30%, transparent 80%)"
              }}
            />

            {/* === Top Vignette for Depth === */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(5,5,7,0.8) 0%, transparent 20%, transparent 100%)" }}
            />

            {/* === Center hero content === */}
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center max-w-4xl">
              <div className="space-y-4">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="flex flex-col items-center justify-center"
                >
                  {/* Waving hand with wrist-pivot physics */}
                  <motion.div 
                    animate={{ 
                      y: [30, 0, 0, 0, 0, 0, 0, 30], 
                      opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                      rotate: [0, 0, 18, -10, 18, -10, 0, 0]
                    }}
                    transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                    style={{ transformOrigin: "70% 85%" }}
                    className="text-5xl md:text-6xl mb-4 pointer-events-none select-none"
                  >
                    👋
                  </motion.div>

                  <h1 
                    className="font-black text-stone-100 leading-[0.85] uppercase tracking-tighter filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] flex flex-col select-none"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    <span className="text-[12vw] sm:text-[9vw] lg:text-[7.5vw] font-extrabold tracking-tighter">SUJAL</span>
                    <span className="text-[6vw] sm:text-[4.5vw] lg:text-[3.8vw] font-bold text-stone-400 tracking-widest mt-1">SAYS</span>
                    <span className="text-[12vw] sm:text-[9vw] lg:text-[7.5vw] font-extrabold tracking-tighter">HELLO</span>
                  </h1>

                  <div className="mt-6 inline-flex items-center gap-2 bg-stone-900/50 backdrop-blur-md border border-stone-850 px-6 py-2.5 rounded-full mb-2">
                    <span className="text-stone-300 font-mono font-medium text-xs tracking-widest uppercase">
                      Creative Visual Designer
                    </span>
                  </div>

                  <a 
                    href="#contact-visual" 
                    className="mt-6 group relative inline-flex items-center gap-4 rounded-full bg-indigo-600/20 border border-indigo-500/30 pl-6 pr-2 py-2 backdrop-blur-md hover:bg-indigo-600/40 hover:scale-105 transition-all duration-300 pointer-events-auto cursor-pointer shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Let's Connect</span>
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center transition-colors">
                       <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* === Bottom info bar === */}
            <div className="absolute bottom-8 inset-x-0 px-6 md:px-12 flex justify-between items-end z-20 pointer-events-none">
              <div className="text-stone-400 font-mono text-xs pointer-events-auto">
                ©2026
              </div>
              <div className="flex flex-col items-end gap-3 text-right max-w-xs pointer-events-auto">
                <p className="text-stone-300 font-medium text-[11px] md:text-[12px] leading-relaxed font-serif">
                  Hi! I am Sujal, A Visual Designer who loves creating Visuals that click and makes an Impact.
                </p>
                <a href="#about-visual" className="w-8 h-8 rounded-full border border-stone-850 bg-stone-900/30 backdrop-blur-sm flex items-center justify-center text-stone-300 animate-bounce cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
