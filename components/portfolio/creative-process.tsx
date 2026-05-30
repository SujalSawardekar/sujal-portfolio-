"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { Search, PenTool, LayoutTemplate, Layers, CheckCircle2 } from "lucide-react"

interface ProcessStep {
  num: string
  title: string
  icon: any
  desc: string
  assets: string[]
}

export function CreativeProcess() {
  const { ref: sectionRef, isVisible } = useIntersection()

  const steps: ProcessStep[] = [
    {
      num: "01",
      title: "Research",
      icon: Search,
      desc: "Deep diving into the client's industry, audience behaviors, competitor design schemas, and direct brand guidelines.",
      assets: ["User Interviews", "Competitive Audits", "Brand System Mapping"]
    },
    {
      num: "02",
      title: "Concept",
      icon: PenTool,
      desc: "Formulating moodboards, rough physical sketches, corporate messaging pillars, and core visual styles.",
      assets: ["Moodboards", "Logo Sketches", "Concept Wireframing"]
    },
    {
      num: "03",
      title: "Design",
      icon: LayoutTemplate,
      desc: "Drafting high-fidelity components, pixel-perfect layouts, Stark typography variables, and robust vector logos.",
      assets: ["Design System Setup", "High-Fi Visuals", "Component Kits"]
    },
    {
      num: "04",
      title: "Motion",
      icon: Layers,
      desc: "Pacing video reels, keyframe dynamic curves, custom DaVinci color grading profiles, and Foley sound layers.",
      assets: ["Color Grading Logs", "Rhythm Pacing", "SFX Overlays"]
    },
    {
      num: "05",
      title: "Delivery",
      icon: CheckCircle2,
      desc: "Exporting high-resolution assets, detailed brand guide manuals, and structured developer Figma handoffs.",
      assets: ["Brand Guide PDF", "Clean Vector Packs", "Interactive Prototype Handoff"]
    }
  ]

  return (
    <section 
      id="process"
      ref={sectionRef}
      className={`relative px-6 py-28 bg-black text-white border-t border-white/5 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 text-left">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500 mb-4 block">
              — 07 / SYSTEMATIC WORKFLOW
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
              Creative Process
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
            Every pixel represents a calculated decision. How I translate abstract goals into premium visual assets and digital interfaces.
          </p>
        </div>

        {/* Vertical Timeline Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="group bg-zinc-950 border border-white/5 hover:border-amber-500/20 p-8 rounded-[2rem] flex flex-col justify-between text-left space-y-6 hover:bg-zinc-900/40 transition-all duration-500"
            >
              <div className="space-y-4">
                {/* Step Icon & Number */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-amber-500 group-hover:rotate-12 transition-transform duration-300">
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-black font-mono text-zinc-700 group-hover:text-amber-500 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-white tracking-tight leading-snug">
                  {step.title}
                </h4>

                <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              {/* Action Deliverable list */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Deliverables</span>
                {step.assets.map((asset, aIdx) => (
                  <div key={aIdx} className="flex items-center gap-1.5 text-zinc-500">
                    <span className="w-1 h-1 bg-amber-500 rounded-full" />
                    <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400">{asset}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
