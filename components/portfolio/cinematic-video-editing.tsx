"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Volume2, Film, Star, Check } from "lucide-react"

interface CinematicVideoEditingProps {
  mode: "uiux" | "visual"
}

export function CinematicVideoEditing({ mode }: CinematicVideoEditingProps) {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const videos = [
    {
      title: "Wedding Cinematic Films",
      desc: "Capturing emotional peaks and personal narratives, synced to sweeping orchestral scales and premium soft tones.",
      metric: "Emotional Storytelling",
      specs: ["DaVinci Resolve Color Grade", "Orchestral Sound Design", "Time Remapping & Rhythm Sync"],
      color: "border-rose-500/20 text-rose-400 bg-rose-400/5",
    },
    {
      title: "Corporate Webinar Promos",
      desc: "High-impact sales funnel and commercial ad designs designed to maximize sign-ups through text and motion graphics.",
      metric: "Conversion & Visual Pacing",
      specs: ["After Effects Text Motion", "Clear CTA Hierarchy", "Fast Narrative Jump-Cuts"],
      color: "border-blue-500/20 text-blue-400 bg-blue-400/5",
    },
    {
      title: "Agro Tourism Social Campaign",
      desc: "Dynamic environmental cinematography, blending aerial frames, rustic sounds, and natural color balances.",
      metric: "Atmospheric Editing",
      specs: ["Drone Log Color Grade", "Foley Environmental Sound", "Smooth Glide Transitions"],
      color: "border-emerald-500/20 text-emerald-400 bg-emerald-400/5",
    }
  ]

  return (
    <section 
      id="video-editing" 
      className="relative px-6 py-28 bg-black overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
              — 05 / TIMING & RHYTHM
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif">
              Cinematic <span className="italic font-light text-zinc-400">Post-Production.</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-500 font-light text-sm leading-relaxed">
            Story-first editing pipelines. Combining rhythm, sound architecture, and cohesive grading to evoke direct feelings.
          </p>
        </div>

        {/* Video Editor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.title}
              whileHover={{ y: -8 }}
              className="relative rounded-[2rem] bg-zinc-950/80 border border-white/5 p-8 flex flex-col justify-between h-[420px] overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
            >
              {/* Top Details */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 transition-colors">
                    <Film className="w-4 h-4" />
                  </div>
                  <span className={`text-[8px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${vid.color}`}>
                    {vid.metric}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-white tracking-tight leading-snug mb-3">
                  {vid.title}
                </h3>
                
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                  {vid.desc}
                </p>
              </div>

              {/* Technical Specifications */}
              <div>
                <ul className="space-y-2 mb-8">
                  {vid.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <a 
                  href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black py-3.5 text-[9px] font-bold uppercase tracking-widest text-white transition-all duration-300"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Stream Project Clip</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Manifesto Banner */}
        <div className="mt-20 rounded-[2.5rem] bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/5 p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none" />
          
          <div className="max-w-xl">
            <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 mb-3 block">
              POST-PRODUCTION PHILOSOPHY
            </span>
            <h3 className="text-3xl font-serif text-white tracking-tight leading-tight mb-4">
              "Pacing is the difference <br />
              between a video <span className="italic font-light text-zinc-400">and a feeling."</span>
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Video editing is not just gluing clips together—it's orchestrating a precise cadence. By matching visual dynamics to frequency responses and atmospheric grading curves, a sequence becomes an experience.
            </p>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shrink-0"
          >
            Watch Full Reel Library
          </a>
        </div>

      </div>
    </section>
  )
}
