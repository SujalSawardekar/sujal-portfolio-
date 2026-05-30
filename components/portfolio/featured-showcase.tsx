"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Play, Layout, Compass, ShieldAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FeaturedShowcaseProps {
  mode: "uiux" | "visual"
}

export function FeaturedShowcase({ mode }: FeaturedShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const uiuxFeatured = [
    {
      title: "Amppere Cable UI",
      category: "Web Application Redesign",
      desc: "Transformed an outdated industrial web interface into a streamlined, high-hierarchy digital gateway building client trust.",
      tools: ["Figma", "Information Architecture", "UI System", "Prototyping"],
      image: "/images/Hero Photo/project-1.jpg",
      link: "https://www.figma.com/proto/BYPEQJ9oNtsHE41mDWRqpo/AMPPERE-CABLE?page-id=141%3A666&node-id=354-828",
      accent: "from-blue-600/20 to-cyan-500/20",
    },
    {
      title: "Crick Analyzer",
      category: "Mobile Statistics & UX",
      desc: "Simplified dense local cricket datasets and player records into an intuitive, high-readability sports mobile dashboard.",
      tools: ["Figma", "Data Vis", "Mobile Architecture", "Prototyping"],
      image: "/images/Hero Photo/crickanalyzer-app.jpg",
      link: "https://www.figma.com/proto/aoWQpCDBlfYX1oh47DAOSx/Crick-analyzer--Og?page-id=0%3A1&node-id=362-12110",
      accent: "from-indigo-600/20 to-blue-500/20",
    },
    {
      title: "NAAC Accreditation System",
      category: "Administrative Compliance Portal",
      desc: "Designed a multi-tier administration dashboard simplifying extensive documentation compliance and college quality metrics.",
      tools: ["Figma", "Data Dashboard", "User Roles", "Progress Auditing"],
      image: "/images/Hero Photo/project-nexus-2.png",
      link: "https://www.figma.com/proto/G3uplAC5c2bNY9LSYYkw0Y/NEXUS-ENGINEERING--Copy-?node-id=176-7767",
      accent: "from-cyan-600/20 to-blue-600/20",
    }
  ]

  const visualFeatured = [
    {
      title: "Amppere Cable Industrial Branding",
      category: "Identity & Social Strategy",
      desc: "Created a commanding, high-impact black & red visual system matching heavy industrial power, deployed across digital campaigns.",
      tag: "Industrial Branding",
      image: "/figma-showcase/AC/AC (1).png",
      link: "https://www.instagram.com/ampperecable/",
      accent: "from-red-600/20 to-stone-900/20",
    },
    {
      title: "Nexus Engineering Core Identity",
      category: "Corporate Branding & Collateral",
      desc: "Designed a safety-first professional visual branding program, extending seamlessly into brochures, business cards, and print media.",
      tag: "Corporate Safety",
      image: "/figma-showcase/NE/NE (1).png",
      link: "https://www.nexusengineering.in/",
      accent: "from-orange-600/20 to-zinc-950/20",
    },
    {
      title: "Shreeman Legend Creator Synergy",
      category: "Music & Streaming Cover Art",
      desc: "Crafted bold cinematic thumbnails, event posters, and music promotions optimized for high-intensity entertainment audiences.",
      tag: "Creator Collaboration",
      image: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      link: "https://www.instagram.com/shreemanlegend/",
      accent: "from-amber-600/20 to-neutral-900/20",
    }
  ]

  const activeProjects = mode === "uiux" ? uiuxFeatured : visualFeatured

  return (
    <section 
      id="work" 
      className="relative px-6 py-28 overflow-hidden transition-colors duration-1000 bg-black"
    >
      {/* Decorative Grid Overlay for UI/UX */}
      {mode === "uiux" ? (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-radial-gradient from-zinc-900/40 via-transparent to-transparent pointer-events-none" />
      )}

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
              — CASE STUDIES & EXPLORATIONS
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-serif">
              {mode === "uiux" ? (
                <>Selected <span className="italic font-light text-zinc-400">Digital Works.</span></>
              ) : (
                <>Premium <span className="italic font-light text-zinc-400">Visual Campaigns.</span></>
              )}
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 font-light text-base leading-relaxed">
            {mode === "uiux" 
              ? "Designing intuitive web systems, data-driven applications, and user flows built on clarity and structure."
              : "Forging iconic visual stories, creator visual collaterals, and high-impact layouts combining graphics and movement."
            }
          </p>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {activeProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col justify-between rounded-[2rem] bg-zinc-950/80 border border-white/5 p-6 h-[480px] overflow-hidden hover:border-cyan-500/20 hover:shadow-[0_20px_50px_rgba(0,229,255,0.03)] transition-all duration-500"
              >
                {/* Glow Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl`} />

                {/* Top Details */}
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/10">
                      {project.category}
                    </span>
                    <span className="text-zinc-600 font-mono text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 line-clamp-3">
                    {project.desc}
                  </p>
                </div>

                {/* Floating Image Container */}
                <div className="relative w-full h-[180px] overflow-hidden rounded-2xl border border-white/5 shrink-0 bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60" />
                </div>

                {/* Footer with Action */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                  {mode === "uiux" && 'tools' in project ? (
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.tools.slice(0, 2).map((t) => (
                        <span key={t} className="text-[8px] font-mono tracking-wider text-zinc-500 uppercase">
                          • {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[8px] font-mono tracking-wider text-zinc-500 uppercase">
                      BRANDING VISUAL
                    </span>
                  )}

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300 group/btn"
                  >
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
