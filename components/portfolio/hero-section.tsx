"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LucideIcon, Star, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [currentTime, setCurrentTime] = useState("11:11 PM")
  const [jokeHover, setJokeHover] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  
  const yParallax = useTransform(scrollY, [0, 800], [0, 320])
  const opacityParallax = useTransform(scrollY, [0, 600], [1, 0])

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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-black rounded-b-[2.5rem]"
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
    </section>
  )
}
