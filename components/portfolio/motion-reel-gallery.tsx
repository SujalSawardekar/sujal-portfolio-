"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, ArrowRight, Video } from "lucide-react"

interface MotionReelGalleryProps {
  mode: "uiux" | "visual"
}

export function MotionReelGallery({ mode }: MotionReelGalleryProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Smoothly transform vertical scroll percentage to horizontal translateX
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"])

  const reels = [
    {
      title: "Wedding Cinematic Edits",
      desc: "Capturing authentic emotional stories with premium editorial color grades, elegant sound design, and custom timing.",
      tag: "Cinematic Film",
      image: "/images/project-2.jpg",
      duration: "02:45",
    },
    {
      title: "Brand Promotion Reels",
      desc: "High-impact short-form creatives styled to stop the scroll, incorporating fast-paced pacing and bold overlays.",
      tag: "Social Campaign",
      image: "/images/project-3.jpg",
      duration: "01:00",
    },
    {
      title: "Webinar Ads & Promos",
      desc: "Engaging commercial trailers built to drive conversions, blending clear typography structures and high-energy music syncs.",
      tag: "Webinar Ad",
      image: "/images/project-4.jpg",
      duration: "01:30",
    },
    {
      title: "Agro Tourism Film",
      desc: "Breathtaking nature and travel cinematography capturing natural light, organic drone shots, and rustic environmental stories.",
      tag: "Travel Film",
      image: "/images/Hero Photo/project-1.jpg",
      duration: "03:15",
    }
  ]

  // If in UI/UX mode, we can show a lighter, more structured view, or let the user enjoy the premium motion reels as part of the overall multi-disciplinary showcase. We will render it in both, but style it darker and more cinematic in Visual mode!
  const isVisual = mode === "visual"

  return (
    <div 
      ref={targetRef} 
      className="relative h-[300vh] bg-black"
    >
      <div className="sticky top-0 h-[100vh] flex flex-col justify-center overflow-hidden">
        
        {/* Title Overlay */}
        <div className="absolute top-16 left-6 md:left-16 z-20 max-w-xl">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-2 block">
            — 03 / MOVEMENT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif">
            Horizontal <span className="italic font-light text-zinc-400">Motion Reels.</span>
          </h2>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute top-20 right-6 md:right-16 z-20 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Scroll Down to slide</span>
          <ArrowRight className="w-3 h-3 text-cyan-400 animate-pulse" />
        </div>

        {/* Horizontal Sliding Track */}
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-16 w-max items-center">
          {reels.map((reel, idx) => (
            <div
              key={idx}
              className="relative w-[340px] md:w-[480px] h-[340px] md:h-[420px] rounded-[2.5rem] bg-zinc-900 overflow-hidden border border-white/5 shrink-0 group hover:border-cyan-500/20 transition-colors duration-500"
            >
              {/* Background Cover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${reel.image}')` }}
              />

              {/* Immersive Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Glow Accent */}
              <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />

              {/* Card Details */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 px-3 py-1 rounded-full backdrop-blur-md">
                    {reel.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px]">
                    <Video className="w-3.5 h-3.5" />
                    {reel.duration}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-tight mb-3">
                    {reel.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light mb-6 line-clamp-3">
                    {reel.desc}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-black hover:bg-cyan-400 hover:scale-110 transition-all duration-300">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                      Play Cinematic Showcase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* End Callout Card */}
          <div className="w-[300px] md:w-[400px] h-[340px] md:h-[420px] rounded-[2.5rem] bg-zinc-950/60 border border-white/5 flex flex-col justify-center items-center text-center p-8 shrink-0 relative group">
            <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 mb-6 px-3 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/10">
              COLLABORATION
            </span>
            <h3 className="text-2xl font-serif text-white mb-4">
              Have a narrative <br />
              <span className="italic font-light text-zinc-400">in mind?</span>
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px] font-light mb-8">
              Let's craft visual campaigns and edit films that deeply engage your audience.
            </p>
            <a 
              href="#contact"
              className="px-6 py-3 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
            >
              Start Project
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
