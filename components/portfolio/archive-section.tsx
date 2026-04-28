"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { Film, PenTool, ArrowUpRight } from "lucide-react"

export function ArchiveSection() {
  const { ref: sectionRef, isVisible } = useIntersection()

  const archives = [
    {
      title: "Video Editing Portfolio",
      description: "A complete collection of my cinematic edits, storytelling projects, and video productions.",
      cta: "View Video Work",
      link: "https://drive.google.com/drive/folders/1Z-lEX48o2UZxFA7GrYbwKuXNaTQBGfPt?usp=drive_link",
      icon: <Film className="w-8 h-8 text-indigo-400" />,
      bgClass: "bg-indigo-500",
      hoverClass: "group-hover:border-indigo-500/30"
    },
    {
      title: "Graphic Design Portfolio",
      description: "Detailed graphic design work including branding, social media creatives, and marketing visuals.",
      cta: "View Graphic Work",
      link: "https://drive.google.com/drive/folders/1TzdMf2CGGZcVOnUueLoWJlrPbyqHUycw?usp=sharing",
      icon: <PenTool className="w-8 h-8 text-rose-400" />,
      bgClass: "bg-rose-500",
      hoverClass: "group-hover:border-rose-500/30"
    }
  ]

  return (
    <section 
      id="archive" 
      ref={sectionRef}
      className={`mx-auto mx-2 md:mx-6 my-6 md:my-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#0c0c0e] py-20 px-6 border border-white/5 transition-all duration-1000 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <span className="mb-4 block text-[10px] font-bold tracking-[0.3em] text-indigo-400 uppercase">
          Archive
        </span>
        <h2 className="mb-6 text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
          Explore Full Work Archive
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
          Want to explore more of my work in depth? Access complete collections below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        {archives.map((archive, index) => (
          <a
            key={index}
            href={archive.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white/[0.02] p-10 border border-white/10 transition-all duration-500 hover:-translate-y-2 ${archive.hoverClass}`}
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 transition-opacity duration-500 ${archive.bgClass} group-hover:opacity-30`} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-transform duration-500 group-hover:scale-110">
                {archive.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {archive.title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed font-light mb-12 flex-grow">
                {archive.description}
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors duration-300 group-hover:text-white">
                  {archive.cta}
                  <ArrowUpRight size={16} className="text-zinc-500 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 text-center relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Best viewed on desktop for full experience
        </span>
      </div>
    </section>
  )
}

