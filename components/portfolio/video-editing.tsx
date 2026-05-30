"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { Play, ArrowUpRight, Film, Calendar, Volume2 } from "lucide-react"

interface VideoCard {
  title: string
  skills: string
  thumbnail: string
  link: string
  duration: string
}

export function VideoEditing() {
  const { ref: sectionRef, isVisible } = useIntersection()

  const videoCards: VideoCard[] = [
    {
      title: "Wedding Cinematic Film",
      skills: "Color Grading • Sound Design • Storytelling",
      thumbnail: "/images/project-2.jpg",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      duration: "03:45"
    },
    {
      title: "Brand Promotions Film",
      skills: "DaVinci Resolve • Dynamic Cuts • Sound FX",
      thumbnail: "/images/project-1.jpg",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      duration: "01:20"
    },
    {
      title: "Corporate Webinar Ads",
      skills: "Webinar Pacing • B-roll Sync • Transitions",
      thumbnail: "/figma-showcase/NE/NE (1).png",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      duration: "02:10"
    },
    {
      title: "Agro Tourism Reels",
      skills: "Organic Color Logs • Drone Pacing • Audio Foley",
      thumbnail: "/images/project-4.jpg",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      duration: "00:59"
    },
    {
      title: "Cinematic Highlight Reels",
      skills: "DaVinci Grading • Time Remapping • Rhythmic Beats",
      thumbnail: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      duration: "01:00"
    }
  ]

  return (
    <section 
      id="motion"
      ref={sectionRef}
      className={`relative px-6 py-28 bg-[#070707] text-white border-t border-white/5 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 text-left">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500 mb-4 block">
              — 04 / POST-PRODUCTION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
              Motion & Cinematic Editing
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
            Stitch rhythm and composition to tell premium brand stories. Formulated around DaVinci Resolve color pipelines, Foley design overlays, and cinematic pacing.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoCards.map((video, idx) => (
            <div 
              key={idx}
              className="group bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/15 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-[16/9] bg-zinc-900 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-60 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                
                {/* Floating Badge duration */}
                <div className="absolute top-4 right-4 bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                  <span className="text-[8px] font-mono text-zinc-300 font-bold uppercase tracking-widest">
                    {video.duration} MIN
                  </span>
                </div>

                {/* Floating Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border border-white/20 group-hover:bg-amber-500 group-hover:text-black flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                  <Play size={16} fill="currentColor" className="translate-x-0.5" />
                </div>
              </div>

              {/* Details Block */}
              <div className="p-8 flex flex-col justify-between flex-grow text-left space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[15px] font-bold text-white tracking-tight leading-snug group-hover:text-amber-500 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.18em]">
                    {video.skills}
                  </p>
                </div>

                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-zinc-900 border border-white/10 group-hover:border-amber-500/30 px-6 py-3.5 text-[9px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-all self-start"
                >
                  <span>Watch Film</span>
                  <ArrowUpRight size={11} className="text-zinc-500 group-hover:text-amber-500 transition-colors" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
