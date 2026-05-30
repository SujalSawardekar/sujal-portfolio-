"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { ArrowUpRight, Figma, Cpu, Compass, Layout } from "lucide-react"

interface UIUXProject {
  title: string
  category: string
  tools: string
  prototypeLink: string
  mockup: string
  overview: string
  problem: string
  solution: string
  features: string[]
}

export function UIUXProjects() {
  const { ref: sectionRef, isVisible } = useIntersection()

  const projects: UIUXProject[] = [
    {
      title: "Crick Analyzer",
      category: "Sports Analytics App",
      tools: "Figma • Photoshop",
      prototypeLink: "https://www.figma.com/proto/6xh5r0lm3zrf",
      mockup: "/images/project-3.jpg",
      overview: "Designed a cricket analytics application focused on match prediction, score insights, and user-friendly sports data visualization.",
      problem: "Visualizing intricate historical sports stats without cluttering the screen or confusing sports fans.",
      solution: "A structured dashboard tab interface displaying predicted win percentages, ball-by-ball analytics, and elegant custom graphs.",
      features: ["Predictive Win Models", "Player Compare Stats", "Interactive Team Data Grid"]
    },
    {
      title: "Amppere Cable Web Portal",
      category: "B2B E-Commerce System",
      tools: "Figma • Design Tokens",
      prototypeLink: "https://www.figma.com/proto/6xh5r0lm3zrf",
      mockup: "/figma-showcase/AC/AC (1).png",
      overview: "Designed a secure web portal for wholesale industrial purchases and pipeline material estimation.",
      problem: "Traditional B2B cable sales are managed through chaotic PDFs, slowing pipeline estimations.",
      solution: "A sleek estimate tool allowing engineers to select wire gauges, lengths, and instantly request quotes.",
      features: ["Cable Pipeline Estimator", "Automated Invoice Generation", "Instant Engineer Handoff"]
    },
    {
      title: "NAAC Accreditation System",
      category: "Compliance Portal",
      tools: "Figma • Workflow Charts",
      prototypeLink: "https://www.figma.com/proto/6xh5r0lm3zrf",
      mockup: "/images/project-1.jpg",
      overview: "Designed a secure administrative portal that streamlines college accreditation, document uploads, and automatic metric audits.",
      problem: "College criteria approvals involve hundreds of physical files and unstructured data checks.",
      solution: "Designed a multi-tier role dashboard separating criteria coordinators, criteria heads, and administrators.",
      features: ["Role-Based Document Upload", "Real-Time Verification Logs", "Criterion Status Progress Rings"]
    }
  ]

  return (
    <section 
      id="uiux-projects"
      ref={sectionRef}
      className={`relative px-6 py-28 bg-[#0a0a0a] text-white border-t border-white/5 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 text-left">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
              — 06 / PRODUCT CASE STUDIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
              UI/UX Projects
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
            Clean, minimal, product-oriented interfaces focused on clarity, user flow optimization, and design system alignment.
          </p>
        </div>

        {/* Project Layout Stack */}
        <div className="space-y-24">
          {projects.map((proj, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/5 pb-20 last:border-b-0 last:pb-0"
            >
              
              {/* Left Column: Case details */}
              <div className="lg:col-span-6 text-left space-y-6">
                <div>
                  <span className="text-[7px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 inline-block mb-3">
                    {proj.category}
                  </span>
                  <h3 className="text-3xl font-serif text-white tracking-tight leading-none mb-1">
                    {proj.title}
                  </h3>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Tools: {proj.tools}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {proj.overview}
                </p>

                {/* Problem vs Solution bento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950 border border-white/5 p-6 rounded-2xl">
                  <div>
                    <h5 className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">— THE PROBLEM</h5>
                    <p className="text-[9px] text-zinc-400 leading-relaxed font-light">{proj.problem}</p>
                  </div>
                  <div>
                    <h5 className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mb-1.5">— THE SOLUTION</h5>
                    <p className="text-[9px] text-zinc-300 leading-relaxed font-light">{proj.solution}</p>
                  </div>
                </div>

                {/* Key Features list */}
                <div className="space-y-2">
                  <h5 className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-3 block">— KEY INTERFACES</h5>
                  <div className="flex flex-wrap gap-2">
                    {proj.features.map((feature, fIdx) => (
                      <span 
                        key={fIdx}
                        className="text-[8px] font-mono uppercase tracking-widest bg-zinc-950 border border-white/5 px-3 py-1.5 rounded-full text-zinc-300 flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={proj.prototypeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[9px] font-bold uppercase tracking-widest text-black hover:bg-cyan-400 transition-colors self-start"
                >
                  <span>View Prototype</span>
                  <Figma size={11} fill="black" />
                </a>

              </div>

              {/* Right Column: Hero Mockup Frame */}
              <div className="lg:col-span-6 relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 group shadow-2xl">
                <img
                  src={proj.mockup}
                  alt={proj.title}
                  className="w-full h-full object-cover object-top opacity-80 group-hover:scale-101 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
