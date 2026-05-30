"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { ShieldCheck, Palette, FileText, LayoutGrid } from "lucide-react"

interface BrandingItem {
  logoImage: string
  brandName: string
  industry: string
  deliverables: string
  color: string
}

export function BrandIdentity() {
  const { ref: sectionRef, isVisible } = useIntersection()

  const brandingItems: BrandingItem[] = [
    {
      logoImage: "/figma-showcase/AC/AC (2).png",
      brandName: "Amppere Cable",
      industry: "Electrical Industry",
      deliverables: "Logo • Branding • Packaging • Campaign Visuals",
      color: "#ef4444"
    },
    {
      logoImage: "/figma-showcase/NE/NE (2).png",
      brandName: "Nexus Engineering",
      industry: "Infrastructure & Security",
      deliverables: "Visual Identity • Proposal Deck • Stationary • Safety Collateral",
      color: "#f97316"
    },
    {
      logoImage: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      brandName: "Shreeman Legend synergy",
      industry: "Gaming & Entertainment",
      deliverables: "Creator Logo • Typography Lockups • Merchandise Guide",
      color: "#00e5ff"
    },
    {
      logoImage: "/images/project-3.jpg",
      brandName: "Crick Analyzer",
      industry: "Sports Analytics Software",
      deliverables: "Software Logo • Vector Icon Set • Interface Styling Assets",
      color: "#6366f1"
    }
  ]

  return (
    <section 
      id="branding"
      ref={sectionRef}
      className={`relative px-6 py-28 bg-[#0a0a0a] text-white border-t border-white/5 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 text-left">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500 mb-4 block">
              — 05 / IDENTITY ARCHITECTURE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
              Brand Identity & Logo Design
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
            Minimal, premium identity guidelines developed to survive scalability. Focuses on robust vector layouts, Stark typographic rules, and modern grid structures.
          </p>
        </div>

        {/* Branding Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brandingItems.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-6 items-center hover:border-white/15 transition-all duration-500 text-left"
            >
              {/* Graphic Logo Thumbnail */}
              <div className="relative w-full md:w-32 aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shrink-0 shadow-xl">
                <img
                  src={item.logoImage}
                  alt={item.brandName}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Brand Metadata Block */}
              <div className="space-y-3 flex-grow">
                <div className="space-y-1">
                  <span 
                    className="text-[7px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded border inline-block"
                    style={{ color: item.color, borderColor: `${item.color}33`, backgroundColor: `${item.color}0D` }}
                  >
                    {item.industry}
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {item.brandName}
                  </h4>
                </div>

                <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                  {item.deliverables}
                </p>

                {/* Micro branding swatches indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="text-[6px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Identity Approved</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
