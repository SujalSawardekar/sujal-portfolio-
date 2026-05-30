"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useIntersection } from "@/hooks/use-intersection"
import { CheckCircle2, Play, ExternalLink, Eye, Watch, X, ArrowUpRight } from "lucide-react"

interface GalleryItem {
  thumbnail: string
  title: string
  campaign: string
}

interface CaseStudy {
  id: string
  title: string
  category: string
  duration: string
  tools: string
  role: string
  cover: string
  overview: string
  deliverables: string[]
  socialPosters: GalleryItem[]
  reels: { title: string; link: string; thumb: string }[]
  brandFilm: { title: string; link: string; thumb: string }
  liveLink: string
  liveLinkText: string
  fullCampaignLink: string
}

export function FeaturedCaseStudies() {
  const { ref: sectionRef, isVisible } = useIntersection()
  const [activeTab, setActiveTab] = useState<string>("amppere")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const caseStudies: CaseStudy[] = [
    {
      id: "amppere",
      title: "Amppere Cable",
      category: "Industrial Branding & Social Media Design",
      duration: "2025 – Present",
      tools: "Photoshop • Illustrator • Premiere Pro • After Effects",
      role: "Brand Visual Designer",
      cover: "/figma-showcase/AC/AC (1).png",
      overview: "Designed high-impact industrial branding visuals and social media campaign creatives focused on reliability, electrical safety, and product trust for Amppere Cable.",
      deliverables: [
        "Social Media Creatives",
        "Promotional Reels",
        "Motion Graphics",
        "Product Campaign Visuals",
        "Festival Posts",
        "Branding Assets"
      ],
      socialPosters: [
        { thumbnail: "/figma-showcase/AC/AC (2).png", title: "Heavy Wire Product Feature", campaign: "Instagram Campaign" },
        { thumbnail: "/figma-showcase/AC/AC (1).png", title: "Electrical Safety First", campaign: "National Safety Week" },
        { thumbnail: "/images/project-1.jpg", title: "Industrial Resilience Banner", campaign: "B2B Launch Campaign" }
      ],
      reels: [
        { title: "Power Pipelines Motion Graphics", link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD", thumb: "/images/project-4.jpg" },
        { title: "Cable Stress Resistance Demo", link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD", thumb: "/images/project-2.jpg" }
      ],
      brandFilm: {
        title: "Amppere Industrial Branding Film",
        link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
        thumb: "/figma-showcase/AC/AC (2).png"
      },
      liveLink: "https://www.instagram.com/ampperecable/",
      liveLinkText: "Visit Instagram →",
      fullCampaignLink: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
    },
    {
      id: "shreeman",
      title: "Shreeman Legend",
      category: "Creator Branding & Entertainment Visuals",
      duration: "2024 – 2025",
      tools: "Photoshop • Lightroom • After Effects",
      role: "Lead Creator Synergy Artist",
      cover: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      overview: "Created bold entertainment-focused thumbnails and music promotional visuals optimized for audience engagement and creator identity.",
      deliverables: [
        "Thumbnail Designs",
        "Music Posters",
        "Stream Visuals",
        "YouTube Creatives",
        "Social Branding Systems",
        "Pacing Motion Reels"
      ],
      socialPosters: [
        { thumbnail: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png", title: "Gamer Synergy Music Poster", campaign: "Creator Release" },
        { thumbnail: "/images/project-3.jpg", title: "Stream Live Thumbnail", campaign: "Retention Optimization" },
        { thumbnail: "/images/project-2.jpg", title: "Creator Event Banner", campaign: "YouTube Live Launch" }
      ],
      reels: [
        { title: "Stream Opening Countdown Sync", link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD", thumb: "/images/project-1.jpg" },
        { title: "Creator Highlights Reel 2024", link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD", thumb: "/images/project-3.jpg" }
      ],
      brandFilm: {
        title: "Synergy Music Video Launch Promo",
        link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
        thumb: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png"
      },
      liveLink: "https://www.instagram.com/shreemanlegend/",
      liveLinkText: "Watch Live Stream →",
      fullCampaignLink: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
    },
    {
      id: "nexus",
      title: "Nexus Engineering",
      category: "Branding & Architecture Visual Identity",
      duration: "2024 – 2025",
      tools: "Illustrator • Photoshop • InDesign • Premiere Pro",
      role: "Branding Visual Lead",
      cover: "/figma-showcase/NE/NE (1).png",
      overview: "Designed a safety-first professional visual branding program, extending seamlessly into proposals, business cards, site safety banners, and site collateral.",
      deliverables: [
        "Corporate Logo System",
        "Social Media Branding",
        "Branding Mockups",
        "Construction Campaign Visuals",
        "Promotional Videos",
        "Client Proposals"
      ],
      socialPosters: [
        { thumbnail: "/figma-showcase/NE/NE (2).png", title: "Corporate Brochure Layout", campaign: "Client Acquisition Portfolio" },
        { thumbnail: "/figma-showcase/NE/NE (1).png", title: "Nexus Site Banner Design", campaign: "Site Infrastructure" },
        { thumbnail: "/images/project-4.jpg", title: "Structural Identity System", campaign: "Brand Guide Handbook" }
      ],
      reels: [
        { title: "Nexus Site Progress Showcase", link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD", thumb: "/images/project-2.jpg" },
        { title: "Safety Infrastructure Promos", link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD", thumb: "/images/project-1.jpg" }
      ],
      brandFilm: {
        title: "Nexus Infrastructure Corporate Profile",
        link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
        thumb: "/figma-showcase/NE/NE (1).png"
      },
      liveLink: "https://www.nexusengineering.in/",
      liveLinkText: "Visit Web Portal →",
      fullCampaignLink: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
    }
  ]

  const activeStudy = caseStudies.find((s) => s.id === activeTab) || caseStudies[0]

  return (
    <section 
      id="work"
      ref={sectionRef}
      className={`relative px-6 py-28 bg-[#0a0a0a] text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 text-left">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500 mb-4 block">
              — 02 / FEATURED CASES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
              Featured Case Studies
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
            Professional visual systems designed from cover to deployment. Explore our structured industrial branding portfolios, YouTube creator retention graphics, and corporate proposals.
          </p>
        </div>

        {/* Case Study Tab Selectors */}
        <div className="flex flex-wrap items-center gap-4 bg-zinc-950 border border-white/5 p-2 rounded-[2rem] mb-12 self-start inline-flex">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveTab(study.id)}
              className={`relative px-6 py-3.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === study.id 
                  ? "bg-amber-500 text-black shadow-lg" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {study.title}
            </button>
          ))}
        </div>

        {/* Dynamic Case Study Renderer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 text-left"
          >
            {/* A. Cover Section */}
            <div className="relative w-full aspect-[16/8] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 group shadow-2xl">
              <img
                src={activeStudy.cover}
                alt={`${activeStudy.title} Cover`}
                className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Play symbol on cover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-white/10 hover:bg-amber-500 hover:text-black border border-white/20 hover:scale-105 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-2xl">
                <Play className="w-5 h-5 translate-x-0.5" />
              </div>
            </div>

            {/* B. Project Info Wireframe */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-950 border border-white/5 p-8 rounded-[2rem]">
              <div>
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Role</span>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">{activeStudy.role}</span>
              </div>
              <div>
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Duration</span>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">{activeStudy.duration}</span>
              </div>
              <div>
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Category</span>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">{activeStudy.category}</span>
              </div>
              <div>
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Tools</span>
                <span className="text-[11px] font-bold text-zinc-400 tracking-wider leading-relaxed block">{activeStudy.tools}</span>
              </div>
            </div>

            {/* C & D. Project Overview & Deliverables */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">— PROJECT OVERVIEW</h3>
                <p className="text-xl md:text-2xl font-light text-zinc-200 leading-relaxed font-serif">
                  {activeStudy.overview}
                </p>
              </div>

              <div className="lg:col-span-5 bg-zinc-950/40 border border-white/5 p-8 rounded-[2rem] space-y-5">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">— WHAT WE CREATED</h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeStudy.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300">
                      <CheckCircle2 size={13} className="text-amber-500 shrink-0" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* E. Showcase Gallery */}
            <div className="space-y-12 border-t border-white/5 pt-16">
              
              {/* SOCIAL MEDIA CREATIVES */}
              <div className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500">— SOCIAL MEDIA CREATIVES</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {activeStudy.socialPosters.map((poster, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setLightboxImage(poster.thumbnail)}
                      className="group bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/15 transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden">
                        <img 
                          src={poster.thumbnail} 
                          alt={poster.title} 
                          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="p-6 text-left space-y-1">
                        <h5 className="text-[12px] font-bold text-white tracking-tight leading-none">{poster.title}</h5>
                        <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{poster.campaign}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MOTION GRAPHICS */}
              <div className="space-y-6 pt-6">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500">— MOTION GRAPHICS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeStudy.reels.map((reel, idx) => (
                    <div 
                      key={idx} 
                      className="group relative rounded-[2rem] overflow-hidden aspect-[16/9] border border-white/5 bg-zinc-900 text-left flex flex-col justify-end p-6"
                    >
                      <img 
                        src={reel.thumb} 
                        alt={reel.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-102 transition-all duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      <div className="relative z-10 space-y-4">
                        <h5 className="text-[13px] font-bold text-white tracking-tight max-w-sm">{reel.title}</h5>
                        <a 
                          href={reel.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors"
                        >
                          <span>Watch Reel</span>
                          <ArrowUpRight size={10} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BRANDING VIDEO */}
              <div className="space-y-6 pt-6">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500">— BRANDING FILM</h4>
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] border border-white/10 bg-zinc-900 p-8 flex flex-col justify-end text-left group shadow-2xl">
                  <img 
                    src={activeStudy.brandFilm.thumb} 
                    alt={activeStudy.brandFilm.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-101 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Cinematic Showcase</span>
                      <h5 className="text-[16px] font-bold text-white tracking-tight font-serif">{activeStudy.brandFilm.title}</h5>
                    </div>
                    <a
                      href={activeStudy.brandFilm.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[9px] font-bold uppercase tracking-widest text-black hover:bg-amber-500 transition-colors"
                    >
                      <span>View Branding Film</span>
                      <Play size={10} fill="black" />
                    </a>
                  </div>
                </div>
              </div>

              {/* LIVE BRAND LINK & FINAL CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-12">
                <a
                  href={activeStudy.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-zinc-950 border border-white/15 hover:border-white/30 px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all duration-300"
                >
                  <span>{activeStudy.liveLinkText}</span>
                  <ExternalLink size={11} />
                </a>

                <a
                  href={activeStudy.fullCampaignLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-black hover:scale-105 hover:bg-amber-400 transition-all duration-300 shadow-xl"
                >
                  <span>View Full Campaign</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

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
