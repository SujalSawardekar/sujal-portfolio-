"use client"

import { researchData } from "@/lib/data"
import { useIntersection } from "@/hooks/use-intersection"
import { FileText, Download, CheckCircle2, Award, Mail } from "lucide-react"

export function ResearchSection() {
  const { ref: sectionRef, isVisible } = useIntersection()

  return (
    <section 
      id="research" 
      ref={sectionRef}
      className={`mx-auto mx-2 md:mx-6 my-4 rounded-[2rem] md:rounded-[2.5rem] bg-[#0c0c0e] py-12 px-4 md:px-8 border border-white/5 transition-all duration-1000 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4 block">
            05 — PUBLICATIONS
          </span>
          
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-8 max-w-3xl leading-tight">
            {researchData.title}
          </h2>

          {/* Highlights Grid - More Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 w-full max-w-3xl">
            {researchData.highlights?.map((highlight, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-left transition-colors hover:border-indigo-500/20">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500" />
                <span className="text-[13px] text-zinc-400 font-light leading-snug">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Main Actions - Centered & Compact */}
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={researchData.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-200 hover:scale-105"
              >
                <FileText size={14} />
                View Paper
              </a>
              <a
                href={researchData.links[0].url}
                download
                className="group flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:scale-105"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>

            {/* Supplementary Links - Clean & Proper */}
            <div className="flex flex-wrap items-center justify-center gap-8 py-6 border-t border-white/5 w-full max-w-2xl">
              <a
                href={researchData.links[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <Award size={14} className="text-indigo-400" />
                </div>
                View Certificate
              </a>
              <a
                href={researchData.links[2].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <Mail size={14} className="text-indigo-400" />
                </div>
                Acceptance Letter
              </a>
            </div>

            {/* Footer Label */}
            <div className="pt-8 border-t border-white/10 w-full flex justify-center">
              {/* Desktop version - Full text */}
              <span className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">
                Published in <span className="text-indigo-400">{researchData.publication}</span> • {researchData.date}
              </span>
              {/* Mobile version - Shorter text to fit on one line without scrolling */}
              <span className="md:hidden text-[9px] font-bold uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                Published in <span className="text-indigo-400">IJCRT, Vol. 14, Issue 4</span> • {researchData.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
