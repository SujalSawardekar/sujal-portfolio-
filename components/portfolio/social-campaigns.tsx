"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useIntersection } from "@/hooks/use-intersection"
import { X, Eye, Grid } from "lucide-react"

interface CampaignItem {
  id: string
  thumbnail: string
  campaignName: string
  brandName: string
  type: string
  category: "industrial" | "entertainment" | "promotional" | "festival" | "product"
}

export function SocialCampaigns() {
  const { ref: sectionRef, isVisible } = useIntersection()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const campaigns: CampaignItem[] = [
    {
      id: "amp-1",
      thumbnail: "/figma-showcase/AC/AC (2).png",
      campaignName: "Industrial Product Campaign",
      brandName: "Amppere Cable",
      type: "Instagram Creative",
      category: "industrial"
    },
    {
      id: "shr-1",
      thumbnail: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      campaignName: "Gaming Synergy Release",
      brandName: "Shreeman Legend",
      type: "Music Promo Poster",
      category: "entertainment"
    },
    {
      id: "nex-1",
      thumbnail: "/figma-showcase/NE/NE (1).png",
      campaignName: "Infrastructure Brand Launch",
      brandName: "Nexus Engineering",
      type: "Promotional Banner",
      category: "promotional"
    },
    {
      id: "amp-2",
      thumbnail: "/images/project-1.jpg",
      campaignName: "National Safety Week",
      brandName: "Amppere Cable",
      type: "Festival Banner",
      category: "festival"
    },
    {
      id: "amp-3",
      thumbnail: "/images/project-2.jpg",
      campaignName: "Heavy Copper Core Features",
      brandName: "Amppere Cable",
      type: "Product Showcase Infographic",
      category: "product"
    },
    {
      id: "shr-2",
      thumbnail: "/images/project-3.jpg",
      campaignName: "Creator Stream Retainer Poster",
      brandName: "Shreeman Legend",
      type: "YouTube Live Graphic",
      category: "entertainment"
    },
    {
      id: "nex-2",
      thumbnail: "/figma-showcase/NE/NE (2).png",
      campaignName: "Architectural Proposal Layouts",
      brandName: "Nexus Engineering",
      type: "Promotional Brochure",
      category: "promotional"
    },
    {
      id: "amp-4",
      thumbnail: "/images/project-4.jpg",
      campaignName: "Agro Power Supply Focus",
      brandName: "Amppere Cable",
      type: "Social Impact Banner",
      category: "industrial"
    }
  ]

  const categories = [
    { label: "All Campaigns", id: "all" },
    { label: "Industrial", id: "industrial" },
    { label: "Entertainment", id: "entertainment" },
    { label: "Promotional", id: "promotional" },
    { label: "Festival", id: "festival" },
    { label: "Product", id: "product" }
  ]

  const filteredCampaigns = activeTab === "all" 
    ? campaigns 
    : campaigns.filter((c) => c.category === activeTab)

  return (
    <section 
      id="campaigns"
      ref={sectionRef}
      className={`relative px-6 py-28 bg-black text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500 mb-4 block">
            — 03 / SOCIAL MARKETING
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-serif mb-4">
            Social Media Campaigns
          </h2>
          <p className="mx-auto max-w-xl text-xs text-zinc-400 font-light leading-relaxed">
            High-impact promotional creatives designed for engagement, branding, and digital campaigns.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-zinc-950 border border-white/5 p-2 rounded-[2rem] mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-5 py-3 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat.id 
                  ? "bg-amber-500 text-black shadow-lg" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filtered Campaign Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImage(item.thumbnail)}
                className="group bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/15 transition-all duration-300 flex flex-col cursor-pointer shadow-xl"
              >
                <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.campaignName}
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="p-6 text-left space-y-2 flex-grow flex flex-col justify-end">
                  <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">
                    {item.brandName}
                  </span>
                  <h4 className="text-[12px] font-bold text-white tracking-tight leading-snug">
                    {item.campaignName}
                  </h4>
                  <span className="text-[8px] font-mono text-amber-500 uppercase tracking-wider block">
                    {item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img 
                src={lightboxImage} 
                alt="Enlarged Poster Graphic" 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
