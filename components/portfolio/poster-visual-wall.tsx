"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, Eye, Flame, Compass } from "lucide-react"

interface PosterVisualWallProps {
  mode: "uiux" | "visual"
}

export function PosterVisualWall({ mode }: PosterVisualWallProps) {
  const [filter, setFilter] = useState<"all" | "posters" | "thumbnails" | "logos">("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const items = [
    {
      title: "Shreeman Legend Thumbnails",
      category: "thumbnails",
      desc: "High-contrast YouTube stream artwork designed for extreme click-through-rates, featuring custom cutout highlights.",
      image: "/figma-showcase/DS/Screenshot 2026-04-27 141048.png",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      title: "Music Launch Promotional Poster",
      category: "posters",
      desc: "Bold layout merging dark gradients, custom graphic structures, and impactful typography compositions.",
      image: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Amppere Cable Logo Application",
      category: "logos",
      desc: "Clean geometric logo typography built to represent high-tension industrial products and structured safety values.",
      image: "/figma-showcase/AC/AC (1).png",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Nexus Engineering Event Banner",
      category: "posters",
      desc: "High-visibility corporate event banner, blending clear information architecture and structured corporate design grids.",
      image: "/figma-showcase/NE/NE (1).png",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Flip Media & Trust Haven Logos",
      category: "logos",
      desc: "Minimal visual identities drafted for high scalability across printing collaterals and corporate letterheads.",
      image: "/figma-showcase/NE/NE (4).png",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      title: "Creator Event Branding Banner",
      category: "thumbnails",
      desc: "Rich banner assets merging high-intensity backdrops and vector graphic overlays to maximize online visitor engagement.",
      image: "/figma-showcase/DS/Screenshot 2026-04-27 141233.png",
      span: "md:col-span-1 md:row-span-1",
    }
  ]

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter)

  return (
    <section 
      id="visual-wall" 
      className="relative px-6 py-28 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-gradient from-zinc-900/40 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
              — 06 / GRAPHICS EXHIBITION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif">
              Poster & <span className="italic font-light text-zinc-400">Visual Wall.</span>
            </h2>
          </div>

          {/* Dynamic Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "posters", "thumbnails", "logos"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  filter === cat
                    ? "bg-cyan-400 text-black shadow-[0_10px_20px_rgba(0,229,255,0.15)]"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-[2rem] bg-zinc-950 overflow-hidden border border-white/5 group cursor-pointer hover:border-cyan-500/20 transition-all ${item.span}`}
                onClick={() => setSelectedImage(item.image)}
              >
                {/* Visual Backdrop */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103 object-top"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover Details Card */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/10 backdrop-blur-md">
                      {item.category}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif text-white tracking-tight leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Static Bottom Detail (visible when not hovered, for accessibility) */}
                <div className="absolute bottom-4 left-6 z-10 group-hover:opacity-0 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Immersive Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-5xl w-full h-[85vh] rounded-[2.5rem] overflow-hidden border border-white/10"
              >
                <Image
                  src={selectedImage}
                  alt="Expanded Graphic Asset"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
