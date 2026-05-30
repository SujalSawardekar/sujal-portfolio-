"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, PenTool, ExternalLink, HelpCircle } from "lucide-react"

interface BrandingCampaignProps {
  mode: "uiux" | "visual"
}

export function BrandingCampaign({ mode }: BrandingCampaignProps) {
  const [activeTab, setActiveTab] = useState<"amppere" | "nexus">("amppere")

  const campaigns = {
    amppere: {
      title: "Amppere Cable Industrial Branding",
      subtitle: "Stark Heavy-Duty Visual Identity Program",
      description: "Amppere Cable deals in high-strength industrial cables. The branding required an identity that commands power, safety, and modern engineering precision. I created a robust, stark black-and-red typography layout backed by high-contrast product catalog designs, social media promotional banners, and heavy industrial motifs.",
      colorPalette: [
        { name: "Signal Red", hex: "#EF4444" },
        { name: "Matte Charcoal", hex: "#1C1917" },
        { name: "Pure Titanium", hex: "#F4F4F5" }
      ],
      typography: "Syne & Space Grotesk",
      images: [
        "/figma-showcase/AC/AC (1).png",
        "/figma-showcase/AC/AC (2).png",
        "/figma-showcase/AC/AC (3).png",
      ],
      link: "https://www.instagram.com/ampperecable/",
      role: "Lead Brand Identity & Visual Design",
    },
    nexus: {
      title: "Nexus Engineering Core Identity",
      subtitle: "Corporate Safety & Connectivity Program",
      description: "Nexus Engineering focuses on advanced fire safety systems, CCTV architectures, and annual maintenance networks. The brand design emphasizes structural authority, trust, and absolute connectivity. Developed a dual-color safety system across client proposal brochures, double-sided business cards, site safety banners, and professional corporate materials.",
      colorPalette: [
        { name: "Safety Orange", hex: "#F97316" },
        { name: "Navy Blue", hex: "#1E3A8A" },
        { name: "Clean White", hex: "#FFFFFF" }
      ],
      typography: "Inter & Playfair Display",
      images: [
        "/figma-showcase/NE/NE (1).png",
        "/figma-showcase/NE/NE (2).png",
        "/figma-showcase/NE/NE (3).png",
      ],
      link: "https://www.nexusengineering.in/",
      role: "Corporate Branding & Graphic Design",
    }
  }

  const activeData = campaigns[activeTab]

  return (
    <section 
      id="branding" 
      className="relative px-6 py-28 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-gradient from-zinc-900/40 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
            — 04 / CORPORATE DESIGN
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif mb-6">
            Branding & <span className="italic font-light text-zinc-400">Campaigns.</span>
          </h2>
          <p className="max-w-lg text-zinc-500 font-light text-base leading-relaxed">
            Translating complex business solutions and heavy industrial values into unforgettable digital and print brand assets.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("amppere")}
            className={`px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === "amppere"
                ? "bg-red-600 text-white shadow-[0_10px_25px_rgba(239,68,68,0.2)]"
                : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Amppere Industrial
          </button>
          <button
            onClick={() => setActiveTab("nexus")}
            className={`px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === "nexus"
                ? "bg-orange-600 text-white shadow-[0_10px_25px_rgba(249,115,22,0.2)]"
                : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Nexus Corporate
          </button>
        </div>

        {/* Immersive Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 rounded-[2.5rem] bg-zinc-950/80 border border-white/5 p-8 md:p-12 items-center"
          >
            {/* Info Column */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3 block">
                  {activeData.role}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                  {activeData.title}
                </h3>
                <h4 className="text-sm font-medium text-zinc-500 mb-6 uppercase tracking-wider">
                  {activeData.subtitle}
                </h4>
                
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light mb-8">
                  {activeData.description}
                </p>
              </div>

              {/* Specifications Block */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-3">Color Swatches</span>
                  <div className="flex gap-2">
                    {activeData.colorPalette.map((color) => (
                      <div 
                        key={color.hex} 
                        className="group relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center cursor-pointer shadow-md"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name}: ${color.hex}`}
                      >
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white transition-all whitespace-nowrap z-20">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-2">Font Families</span>
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {activeData.typography}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <a
                  href={activeData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-[9px] font-bold uppercase tracking-widest text-black hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
                >
                  <span>Explore Brand Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Visual Column - Slanted Stack */}
            <div className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none" />

              {/* Stacked Images Showcase */}
              <div className="relative w-[85%] h-[85%] flex items-center justify-center">
                <div className="absolute w-[80%] h-[80%] -rotate-6 translate-x-[-15px] translate-y-[-10px] rounded-xl overflow-hidden border border-white/10 opacity-40 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:translate-x-0">
                  <Image
                    src={activeData.images[2]}
                    alt="Brand Showcase Asset"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute w-[85%] h-[85%] rotate-3 translate-x-[15px] translate-y-[10px] rounded-xl overflow-hidden border border-white/10 opacity-70 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:translate-x-0">
                  <Image
                    src={activeData.images[1]}
                    alt="Brand Showcase Asset"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute w-[90%] h-[90%] -rotate-1 rounded-xl overflow-hidden border border-white/15 shadow-2xl z-10 transition-transform duration-500 hover:scale-[1.03]">
                  <Image
                    src={activeData.images[0]}
                    alt="Primary Branding Asset"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
