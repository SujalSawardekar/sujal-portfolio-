"use client"

import { useState, useRef, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Eye, Compass, Film, LayoutGrid, Users, Send, Linkedin, Instagram, FolderOpen, FileText, X } from "lucide-react"
import { useIntersection } from "@/hooks/use-intersection"
import { sendContactMessage } from "@/app/actions/contact"

interface ProjectCardProps {
  title: string
  category: string
  client: string
  overview: string
  skills: string[]
  deliverables: string[]
  ctaText: string
  thumbnail: string
  link: string
  galleryImages?: string[]
}

function ProjectCard({
  title,
  category,
  client,
  overview,
  skills,
  deliverables,
  ctaText,
  thumbnail,
  link,
  galleryImages
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    <div 
      onClick={() => galleryImages?.length ? setIsModalOpen(true) : window.open(link, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#120a05]/80 border border-[#3a200a] rounded-[2.5rem] p-6 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center text-left hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-all duration-500 group cursor-pointer"
    >
      
      {/* Thumbnail Block with smooth motion zoom and cinematic autoplay video support */}
      <div className="w-full lg:col-span-6 relative aspect-[16/10] bg-zinc-900 rounded-[2rem] overflow-hidden border border-stone-900/60 shadow-2xl">
        {thumbnail.endsWith('.mp4') ? (
          <video 
            src={thumbnail}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
          />
        ) : (
          <motion.img 
            src={thumbnail} 
            alt={title} 
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        
        {/* Cinematic play/view indicator reveal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ 
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-12 h-12 bg-amber-500 text-black rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          >
            {thumbnail.endsWith('.mp4') ? (
              <Play size={16} fill="black" className="ml-0.5" />
            ) : (
              <Eye size={16} className="text-black" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Info Content Block in Luxury Editorial Style */}
      <div className="w-full lg:col-span-6 flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono bg-stone-100/5 border border-stone-800 px-3 py-1 rounded-full text-stone-300 uppercase tracking-widest">
              {category}
            </span>
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">
              {client}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-stone-100 tracking-tight font-medium">
            {title}
          </h3>

          <p className="text-xs font-light text-stone-400 leading-relaxed max-w-lg">
            {overview}
          </p>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill, idx) => (
              <span key={idx} className="text-[8px] font-mono bg-zinc-900/50 border border-stone-900 px-2.5 py-1 rounded-md text-stone-400">
                {skill}
              </span>
            ))}
          </div>

          {/* Deliverables Block */}
          <div className="pt-3 border-t border-stone-900/80">
            <span className="text-[7px] font-mono text-stone-500 uppercase tracking-widest block mb-2">DELIVERABLES</span>
            <div className="flex flex-wrap gap-2">
              {deliverables.map((del, idx) => (
                <span key={idx} className="text-[9px] font-mono text-stone-200 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-stone-400" />
                  {del}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Luxury CTA Button */}
        <button 
          onClick={(e) => {
            if (galleryImages?.length) {
              e.preventDefault()
              e.stopPropagation()
              setIsModalOpen(true)
            } else {
              e.stopPropagation()
              window.open(link, '_blank')
            }
          }}
          className="inline-flex w-fit items-center justify-between gap-6 rounded-full bg-zinc-900 border border-stone-880 pl-6 pr-1.5 py-1.5 hover:bg-amber-500 hover:text-black hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 group/btn cursor-pointer"
        >
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{galleryImages?.length ? "View Gallery" : ctaText}</span>
          <div className="w-8 h-8 rounded-full bg-stone-850 group-hover:bg-black/10 flex items-center justify-center shrink-0 transition-colors">
            <ArrowUpRight size={12} className="text-stone-300 group-hover:text-black transition-colors" />
          </div>
        </button>

      </div>

    </div>

    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#120a05] border border-[#3a200a] rounded-[2rem] w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-[#3a200a] shrink-0">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-100">{title}</h3>
                <p className="text-xs font-mono text-stone-400 mt-2 uppercase tracking-wider">{category}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryImages?.map((img, idx) => (
                  img.endsWith('.mp4') ? (
                    <video key={idx} src={img} autoPlay loop muted playsInline className="w-full rounded-xl border border-stone-800 mb-6 shadow-xl" />
                  ) : (
                    <img key={idx} src={img} alt={`${title} ${idx}`} className="w-full h-auto rounded-xl border border-stone-800 mb-6 shadow-xl" loading="lazy" />
                  )
                ))}
              </div>
            </div>

            <div className="p-6 md:px-8 border-t border-[#3a200a] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0a0502] shrink-0">
              <p className="text-xs text-stone-400 font-light">Showing {galleryImages?.length} curated designs</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 rounded-full bg-amber-500 text-black px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                View Full Folder <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

interface VideoCardProps {
  title: string
  category: string
  client: string
  overview: string
  skills: string[]
  deliverables: string[]
  ctaText: string
  videoUrl: string
  link: string
  galleryImages?: string[]
}

function VideoCard({
  title,
  category,
  client,
  overview,
  skills,
  deliverables,
  ctaText,
  videoUrl,
  link,
  galleryImages
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        setIsMuted(false)
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <>
    <div 
      onClick={() => galleryImages?.length ? setIsModalOpen(true) : window.open(link, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#050814]/90 border border-[#1a1b38] rounded-[2.5rem] p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 group relative aspect-[9/16] overflow-hidden shadow-2xl cursor-pointer"
    >
      {/* Background Video playing on loop */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <video 
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 pointer-events-none" />
      </div>

      {/* Floating Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[9px] font-mono bg-stone-100/10 border border-stone-800/80 px-3 py-1 rounded-full text-stone-200 uppercase tracking-widest backdrop-blur-md">
          {category}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider backdrop-blur-sm px-2.5 py-0.5 rounded bg-black/40">
            {client}
          </span>
          <button 
            onClick={toggleMute}
            className="w-6 h-6 rounded-full bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors text-stone-200 cursor-pointer"
          >
            {isMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
          </button>
        </div>
      </div>

      {/* Hover Center Indicator */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.button 
          onClick={togglePlay}
          animate={{ 
            scale: isHovered || !isPlaying ? 1 : 0.8,
            opacity: isHovered || !isPlaying ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:bg-indigo-400 transition-colors pointer-events-auto cursor-pointer"
        >
          {isPlaying ? (
            <Pause size={16} fill="white" />
          ) : (
            <Play size={16} fill="white" className="ml-0.5" />
          )}
        </motion.button>
      </div>

      {/* Floating Footer Detail */}
      <div className="relative z-10 mt-auto pt-6 flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-serif text-stone-100 tracking-tight font-medium drop-shadow-md">
            {title}
          </h3>
          <p className="text-xs font-light text-stone-300 leading-relaxed line-clamp-3 max-w-sm drop-shadow">
            {overview}
          </p>
        </div>

        {/* Skills Tag Row */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-[8px] font-mono bg-black/60 border border-stone-900/60 px-2.5 py-1 rounded text-stone-300 backdrop-blur-sm">
              {skill}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={(e) => {
            if (galleryImages?.length) {
              e.preventDefault()
              e.stopPropagation()
              setIsModalOpen(true)
            } else {
              e.stopPropagation()
              window.open(link, '_blank')
            }
          }}
          className="inline-flex w-full items-center justify-between gap-6 rounded-full bg-zinc-950/90 border border-stone-850 pl-5 pr-1.5 py-1.5 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 group/btn cursor-pointer backdrop-blur-md"
        >
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-left">{galleryImages?.length ? "View Gallery" : ctaText}</span>
          <div className="w-8 h-8 rounded-full bg-stone-850 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
            <ArrowUpRight size={12} className="text-stone-300 group-hover:text-white transition-colors" />
          </div>
        </button>
      </div>
    </div>

    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#050814] border border-[#1a1b38] rounded-[2rem] w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-[#1a1b38] shrink-0">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-100">{title}</h3>
                <p className="text-xs font-mono text-stone-400 mt-2 uppercase tracking-wider">{category}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryImages?.map((img, idx) => (
                  img.endsWith('.mp4') ? (
                    <video key={idx} src={img} autoPlay loop muted playsInline className="w-full rounded-xl border border-stone-800 mb-6 shadow-xl" />
                  ) : (
                    <img key={idx} src={img} alt={`${title} ${idx}`} className="w-full h-auto rounded-xl border border-stone-800 mb-6 shadow-xl" loading="lazy" />
                  )
                ))}
              </div>
            </div>

            <div className="p-6 md:px-8 border-t border-[#1a1b38] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#02040a] shrink-0">
              <p className="text-xs text-stone-400 font-light">Showing {galleryImages?.length} videos/designs</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 rounded-full bg-indigo-500 text-white px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:bg-indigo-400 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              >
                View Full Folder <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

export function VisualDesignerLayout() {
  const { ref: aboutRef, isVisible: aboutVisible } = useIntersection()
  const { ref: videoRef, isVisible: videoVisible } = useIntersection()
  const { ref: graphicRef, isVisible: graphicVisible } = useIntersection()
  const { ref: aiRef, isVisible: aiVisible } = useIntersection()
  const { ref: clientRef, isVisible: clientVisible } = useIntersection()
  const { ref: contactRef, isVisible: contactVisible } = useIntersection()

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Minimalist Visual Design Proposal",
    message: ""
  })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError(null)
    try {
      const result = await sendContactMessage(formState)
      if (!result.success) throw new Error(result.error)
      setIsSent(true)
      setFormState({ name: "", email: "", subject: "Minimalist Visual Design Proposal", message: "" })
      setTimeout(() => setIsSent(false), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to submit.")
    } finally {
      setIsSending(false)
    }
  }

  const tools = [
    { name: "Photoshop", logo: "Ps", desc: "Image Compositing" },
    { name: "Premiere Pro", logo: "Pr", desc: "Video Editing" },
    { name: "Illustrator", logo: "Ai", desc: "Vector & Branding" },
    { name: "Canva", logo: "Cv", desc: "Social Templates" }
  ]

  const clientProjects = [
    {
      name: "Shreeman Legend Suite",
      type: "Creator Entertainment Branding",
      overview: "Designed visually engaging song cover art, music mashup posters, and stream launch graphics optimizing audience click-rates.",
      thumbnail: "/Work/Music poster/Music poster/Shreeman zara zara copy.jpg",
      skills: ["Photoshop", "Digital Compositing", "High-Intensity Layouts"],
      deliverables: ["Song Posters", "Mashup Art", "Stream Graphics"],
      link: "https://drive.google.com/drive/folders/1TzdMf2CGGZcVOnUueLoWJlrPbyqHUycw?usp=sharing",
      aspect: "aspect-square",
      width: "md:w-[220px]"
    },
    {
      name: "Brochures & Layout Design",
      type: "Brand Print & Typography Assets",
      overview: "Engineered sleek travel poster remakes and corporate website brochures maintaining a clean typographic grid system.",
      thumbnail: "/Work/Brochure-/Brochure/ATG WEBSITE BROCHURE 1.jpg",
      skills: ["Layout Grid", "Typographic Pacing", "Print Composition"],
      deliverables: ["Corporate Brochure", "Remake Travel Poster", "Brand Assets"],
      link: "https://drive.google.com/drive/folders/1TzdMf2CGGZcVOnUueLoWJlrPbyqHUycw?usp=sharing",
      aspect: "aspect-square",
      width: "md:w-[220px]"
    },
    {
      name: "Kaivalya & Ritvik",
      type: "Digital Marketing Assets",
      overview: "Created high-contrast teaser thumbnails, meetup covers, and gaming composite banners engineered to maximize click-through rate (CTR).",
      thumbnail: "/Work/Youtube thumbnails/Youtube thumbnails/Ritvik Thumbnail.jpg",
      skills: ["Digital Art", "Color Contrast Curation", "Thumbnails Strategy"],
      deliverables: ["Teaser Thumbnail", "Gaming Composite Banner", "Creator Cover Art"],
      link: "https://drive.google.com/drive/folders/1TzdMf2CGGZcVOnUueLoWJlrPbyqHUycw?usp=sharing",
      aspect: "aspect-square",
      width: "md:w-[220px]"
    }
  ]

  // Portfolios Google Drive Redirect Links
  const videoPortfolioLink = "https://drive.google.com/drive/folders/1Z-lEX48o2UZxFA7GrYbwKuXNaTQBGfPt?usp=drive_link"
  const graphicPortfolioLink = "https://drive.google.com/drive/folders/1TzdMf2CGGZcVOnUueLoWJlrPbyqHUycw?usp=sharing"

  return (
    <div className="bg-[#09090b] text-[#fafaf9] selection:bg-stone-100 selection:text-black font-sans relative overflow-hidden">
      
      {/* Subtle Grain Texture Overlay for Editorial Luxury Feel */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 1. About Me Bento Mini-Section */}
      <section 
        id="about-visual" 
        ref={aboutRef}
        className={`px-6 py-28 max-w-6xl mx-auto border-t border-stone-900 transition-all duration-1000 ${
          aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left paragraph: Refined introduction paragraphs */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block">— 01 / PROFILE</span>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-stone-100 font-serif">
              I&apos;m Sujal Sawardekar, a Visual Designer, Graphic Designer, and Video Editor passionate about transforming ideas into meaningful visual experiences.
            </p>
            <p className="text-xs font-light leading-relaxed text-stone-400">
              Over the past three years, I have worked on branding, social media campaigns, marketing creatives, website designs, and cinematic video content for businesses, startups, and creators. My approach combines creativity, storytelling, and strategic thinking to create designs that not only look visually appealing but also communicate effectively and leave a lasting impact.
            </p>
            <p className="text-xs font-light leading-relaxed text-stone-400">
              From crafting brand identities and digital experiences to editing engaging visual stories, I enjoy exploring different forms of design that connect with audiences and bring ideas to life. Whether it&apos;s a social media campaign, a website interface, a marketing asset, or a cinematic edit, I focus on delivering work that is purposeful, creative, and memorable.
            </p>
          </div>

          {/* Right bento grid of tools - Upgraded with High Interactivity */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
                className="bg-zinc-950/60 border border-stone-900 hover:border-stone-300 hover:shadow-[0_0_20px_rgba(245,245,244,0.05)] p-6 rounded-2xl flex flex-col justify-between h-36 text-left transition-all duration-500 group cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-stone-850 flex items-center justify-center font-mono font-bold text-xs text-stone-400 group-hover:text-stone-100 transition-colors">
                    {tool.logo}
                  </span>
                  <span className="text-[7px] font-mono text-stone-600 uppercase tracking-widest">Active Tool</span>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-stone-200 uppercase tracking-wider">{tool.name}</h4>
                  <p className="text-[8px] font-mono text-stone-500 uppercase tracking-widest">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highly Interactive Experience Metrics Bento Row - High Contrast Upgraded */}
        <div className="grid grid-cols-3 gap-4 mt-12 w-full pt-10 border-t border-stone-900/80">
          {[
            { label: "EXPERIENCE", value: "3+ Years", desc: "Freelance & Agency" },
            { label: "DELIVERED", value: "40+ Assets", desc: "Premium Campaigns" },
            { label: "ACADEMICS", value: "8.07 CGPA", desc: "Design & Tech" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className="bg-[#0b0b0d] border border-stone-850 hover:border-stone-300 p-5 rounded-2xl text-left flex flex-col justify-between hover:shadow-[0_0_20px_rgba(250,250,249,0.08)] transition-all duration-500 cursor-default group"
            >
              <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-widest">{stat.label}</span>
              <div className="mt-4">
                <h4 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">{stat.value}</h4>
                <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mt-1.5">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Band: Upgraded with satisfies springy hovers, rotation pivots and glows */}
        <div className="mt-12 pt-10 border-t border-stone-900/80 text-left space-y-4">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block">EXPERTISE & SKILLS</span>
          <div className="flex flex-wrap gap-2.5 max-w-4xl pt-2">
            {[
              "Visual Design", "Graphic Design", "Branding", "Social Media Design", 
              "Video Editing", "UI/UX Design", "Web Design", "Figma", 
              "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Adobe XD", 
              "Design Systems", "Marketing Creatives", "Content Creation", "Storytelling"
            ].map((skill, idx) => (
              <motion.span 
                key={idx} 
                whileHover={{ y: -4, scale: 1.05, rotate: 1.5 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="text-[9px] font-mono bg-zinc-950 border border-stone-900 px-4 py-2 rounded-full text-stone-300 font-bold uppercase tracking-widest hover:border-stone-100 hover:text-white hover:bg-stone-900/40 hover:shadow-[0_0_15px_rgba(250,250,249,0.08)] transition-all duration-300 cursor-default"
              >
                • {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: GRAPHIC DESIGN                                                 */}
      {/* ========================================================================= */}
      <section 
        id="graphic-design" 
        ref={graphicRef}
        className={`px-6 py-28 max-w-6xl mx-auto border-t border-stone-900 transition-all duration-1000 ${
          graphicVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-left mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <LayoutGrid size={12} className="text-stone-400" />
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block">SECTION 01 / CREATIVE GRAPHICS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-stone-100">Graphic Design</h2>
          <p className="text-stone-400 font-light text-sm max-w-2xl leading-relaxed">
            Strategic and visually engaging creative assets designed for branding, marketing communication, and digital audience engagement.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 select-none">
            {["Social Media Creatives", "Music Posters", "YouTube Thumbnails", "Brochures", "Marketing Visuals"].map((pill, i) => (
              <span key={i} className="text-[8px] font-mono border border-[#3a200a] bg-[#120a05] px-3.5 py-1.5 rounded-full text-amber-500/80 font-medium shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                • {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <ProjectCard 
            title="Music Poster & Cover Art Collection"
            category="Music Posters"
            client="Shreeman Legend & Independent"
            overview="Designed bold, high-contrast, cinematic music promotional posters with digital compositing and entertainment-focused art direction."
            skills={["Photoshop", "Typography", "Poster Composition", "Creative Gradients"]}
            deliverables={["Poster Showcase", "Digital Release Covers", "Cover Art Assets"]}
            ctaText="View Collection →"
            thumbnail="/Work/Music poster/Music poster/SHREEMAN LEGEND 4.jpg"
            link="https://drive.google.com/drive/folders/1X37uwj5eE6t7bpSzWUbHWHI9qN3HL_dV?usp=drive_link"
            galleryImages={[
              "/Work/Music poster/Music poster/SHREEMAN LEGEND 4.jpg",
              "/Work/Music poster/Music poster/Shreeman zara zara copy.jpg",
              "/Work/Music poster/Music poster/KANCHO Project (3) (1).jpg",
              "/Work/Music poster/Music poster/21st century copy.jpg",
              "/Work/Music poster/Music poster/Music Poster (1).png",
              "/Work/Music poster/Music poster/Music Poster (2).png",
              "/Work/Music poster/Music poster/Music Poster (6).png",
              "/Work/Music poster/Music poster/IMG_20230727_011925_0310.jpg"
            ]}
          />

          <ProjectCard 
            title="Social Media Campaigns Collection"
            category="Social Media Creatives"
            client="Startups & Creators"
            overview="Designed promotional creatives, social campaign visuals, and motion creatives focused on product-centric communications and audience engagement."
            skills={["Photoshop", "Brand Communication", "Ad Compositing", "Grid Systems"]}
            deliverables={["Instagram Campaigns", "Motion Creatives Series", "Digital Ad Sets"]}
            ctaText="View Collection →"
            thumbnail="/Work/Social Media Creative/Social Media Creative/Motion-graphic-2.mp4"
            link="https://drive.google.com/drive/folders/1x16mObp1-CgdI1S1yTziiC97aMAJl_rm?usp=drive_link"
            galleryImages={[
              "/Work/Social Media Creative/Social Media Creative/Motion-graphic-2.mp4",
              "/Work/Social Media Creative/Social Media Creative/01.jpg",
              "/Work/Social Media Creative/Social Media Creative/02.jpg",
              "/Work/Social Media Creative/Social Media Creative/03.jpg",
              "/Work/Social Media Creative/Social Media Creative/04.jpg",
              "/Work/Social Media Creative/Social Media Creative/05.jpg",
              "/Work/Social Media Creative/Social Media Creative/06.jpg",
              "/Work/Social Media Creative/Social Media Creative/08.jpg",
              "/Work/Social Media Creative/Social Media Creative/Motion graphic 6.mp4"
            ]}
          />

          <ProjectCard 
            title="High-Convert YouTube Thumbnails"
            category="YouTube Thumbnails"
            client="Ritvik, Kaivalya, & Creators"
            overview="Designed eye-catching gaming composites, teaser covers, and meetup thumbnails engineered to maximize organic reach and click-through rates."
            skills={["Digital Compositing", "CTR Optimization", "Photoshop", "Color Contrast"]}
            deliverables={["Teaser Thumbnail", "Gaming Composite Banner", "Creator Cover Art"]}
            ctaText="View Collection →"
            thumbnail="/Work/Youtube thumbnails/Youtube thumbnails/Ritvik Thumbnail.jpg"
            link="https://drive.google.com/drive/folders/1mWOfKMrknar9OeIAWtskxuF3P7h5TuTu?usp=drive_link"
            galleryImages={[
              "/Work/Youtube thumbnails/Youtube thumbnails/Ritvik Thumbnail.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/meetup thumbnail copy 2.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/sahil copy 1.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/Thumbnail Manali kaivalya Teaser.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/YT thumbnail SS Story.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/Thumbnail ritvik 2.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/All fonts] copy.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/mashup 2.jpg",
              "/Work/Youtube thumbnails/Youtube thumbnails/meetup copy.jpg"
            ]}
          />

          <ProjectCard 
            title="Brochures & Layout Design"
            category="Brochures & Layouts"
            client="Independent Layouts"
            overview="Formulated geometric grid layouts, corporate website brochures, and print assets aligned with cohesive brand systems."
            skills={["Layout Grid", "Print Composition", "Typography Pacing", "Vector Layout"]}
            deliverables={["Corporate Brochure", "Remake Travel Poster", "Brand Assets"]}
            ctaText="View Collection →"
            thumbnail="/Work/Brochure-/Brochure/ATG WEBSITE BROCHURE 1.jpg"
            link="https://drive.google.com/drive/folders/11jY9M7vTnSf88f1wvD6fUM4i_UIpYaO4?usp=drive_link"
            galleryImages={[
              "/Work/Brochure-/Brochure/ATG WEBSITE BROCHURE 1.png",
              "/Work/Brochure-/Brochure/ATG WEBSITE BROCHURE 1.jpg",
              "/Work/Brochure-/Brochure/ATG TRAVEL POSTER REMAKE .jpg",
              "/Work/Brochure-/Brochure/20221118_224050_0000.png"
            ]}
          />
        </div>

        {/* Global Section CTA - Redirects to drive */}
        <div className="mt-16 text-left">
          <a 
            href={graphicPortfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-stone-300 hover:text-white group"
          >
            <span>Explore Design Works</span>
            <span className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-black transition-all">
              →
            </span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: VIDEO WORK                                                     */}
      {/* ========================================================================= */}
      <section 
        id="video-work" 
        ref={videoRef}
        className={`px-6 py-28 max-w-6xl mx-auto border-t border-stone-900 transition-all duration-1000 ${
          videoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-left mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <Film size={12} className="text-stone-400" />
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block">SECTION 02 / VIDEO SHOWCASE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-stone-100">Video Work</h2>
          <p className="text-stone-400 font-light text-sm max-w-2xl leading-relaxed">
            Motion-focused visual storytelling crafted through cinematic edits, promotional films, and branded digital experiences.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 select-none">
            {["Cinematic Reels", "Branding Videos", "Promotional Films", "Motion Graphics", "Cinematic Editing"].map((pill, i) => (
              <span key={i} className="text-[8px] font-mono border border-[#1a1b38] bg-[#050814] px-3.5 py-1.5 rounded-full text-indigo-300/80 font-medium shadow-[0_0_15px_rgba(99,102,241,0.05)]">
                • {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VideoCard 
            title="Branding Reel (Volume I)"
            category="Branding Video"
            client="Brand Campaign"
            overview="Crafted high-fidelity commercial brand motion videos emphasizing brand identity, clean typography transitions, and product focus."
            skills={["Motion Graphics", "Branding Design", "Video Editing", "Typography Motion"]}
            deliverables={["Branded Edit", "Commercial Reel", "Motion Guidelines"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Branding-Reel-1.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Branding Reel (Volume II)"
            category="Branding Video"
            client="Brand Campaign"
            overview="Promotional commercial reel engineered for digital advertising, focusing on high engagement hooks and clean cuts."
            skills={["Motion Design", "Visual Hooks", "Premiere Pro", "Commercial Editing"]}
            deliverables={["Ad Campaign Edit", "Commercial Asset", "Typography Kit"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Branding-Reel-2.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Branding Reel (Volume III)"
            category="Branding Video"
            client="Brand Campaign"
            overview="Industrial promotional reel blending product attributes, rhythmic editing cues, and strategic brand positioning."
            skills={["Video Editing", "Sound Curation", "Commercial Layouts", "Branding Dynamics"]}
            deliverables={["Product Reel", "Social Format Edit", "Sound Design Template"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Branding-Reel-3.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Branding Reel (Volume IV)"
            category="Branding Video"
            client="Brand Campaign"
            overview="Dynamic branding edit focusing on high-impact visual storytelling and seamless motion transitions."
            skills={["Motion Graphics", "Branding Design", "Premiere Pro", "Visual Hooks"]}
            deliverables={["Commercial Asset", "Social Format Edit"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Branding-Reel-4.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Cinematic Reel (Volume I)"
            category="Cinematic Reel"
            client="Independent Project"
            overview="Edited an immersive cinematic sequence focused on atmospheric storytelling, dynamic sound landscapes, and premium color tones."
            skills={["Cinematic Editing", "Sound Design", "Color Grading", "Visual Narrative"]}
            deliverables={["Cinematic Reel", "Atmospheric Edit", "Grading Blueprint"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Cinematic-Reel-1-v2.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Cinematic Reel (Volume II)"
            category="Cinematic Reel"
            client="Independent Project"
            overview="A cinematic exploration blending smooth motion curves, sound identity curation, and visual flow pacing."
            skills={["Video Editing", "Pacing & Flow", "Color Correcting", "Audio Curation"]}
            deliverables={["Mood Timeline", "Audio Sequence", "Color Profile"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Cinematic-Reel-2.mp4"
            link={videoPortfolioLink}
          />

        </div>

        {/* Global Section CTA - Redirects to drive */}
        <div className="mt-16 text-left">
          <a 
            href={videoPortfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-stone-300 hover:text-white group"
          >
            <span>View Video Projects</span>
            <span className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-black transition-all">
              →
            </span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: AI GENERATED CONTENT                                             */}
      {/* ========================================================================= */}
      <section 
        id="ai-video-work" 
        ref={aiRef}
        className={`px-6 py-28 max-w-6xl mx-auto border-t border-stone-900 transition-all duration-1000 ${
          aiVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-left mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <Film size={12} className="text-stone-400" />
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block">SECTION 03 / AI GENERATED CONTENT</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-stone-100">AI Promotional Reels</h2>
          <p className="text-stone-400 font-light text-sm max-w-2xl leading-relaxed">
            Cutting-edge AI-generated video campaigns incorporating stable diffusion, dynamic prompt generation, and hyper-realistic motion layouts.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 select-none">
            {["AI Generation", "Motion Graphics", "Prompt Engineering", "Digital Art"].map((pill, i) => (
              <span key={i} className="text-[8px] font-mono border border-[#1a1b38] bg-[#050814] px-3.5 py-1.5 rounded-full text-indigo-300/80 font-medium shadow-[0_0_15px_rgba(99,102,241,0.05)]">
                • {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VideoCard 
            title="AI Dynamic Reel"
            category="AI Video Generation"
            client="Digital Campaign"
            overview="Immersive AI-generated motion sequence exploring futuristic visual themes and rapid visual transitions."
            skills={["AI Generation", "Stable Diffusion", "Prompt Editing"]}
            deliverables={["Promotional Reel"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/Reel.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Promotional Post"
            category="AI Video Generation"
            client="Digital Campaign"
            overview="Engaging social media post crafted entirely using AI visual generation and advanced motion techniques."
            skills={["AI Generation", "Motion Graphics"]}
            deliverables={["Social Media Hook"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/Post 1.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Motion Reel 1"
            category="AI Video Generation"
            client="Digital Campaign"
            overview="Fast-paced dynamic reel focusing on hyper-realistic AI-generated elements and seamless edits."
            skills={["AI Generation", "Visual Hooks"]}
            deliverables={["Motion Sequence"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/R1.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Motion Reel 2"
            category="AI Video Generation"
            client="Digital Campaign"
            overview="Continuation of the high-energy motion series featuring generative AI aesthetics and tight pacing."
            skills={["AI Generation", "Digital Art"]}
            deliverables={["Motion Sequence"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/R2.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Cultural Motion Edit"
            category="AI Video Generation"
            client="Digital Campaign"
            overview="Culturally thematic AI video focusing on traditional elements seamlessly blended with modern motion design."
            skills={["AI Generation", "Thematic Art"]}
            deliverables={["Thematic Reel"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/Ram Ram.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Campaign: Amppere Cable"
            category="AI Video Generation"
            client="Brand Campaign"
            overview="Commercial AI-generated promotional asset focusing on product dynamics and brand identity."
            skills={["AI Generation", "Commercial Layouts"]}
            deliverables={["Promotional Video"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/15 March  Post 07- Amppere Cable.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Campaign: Diwali Special"
            category="AI Video Generation"
            client="Brand Campaign"
            overview="Festive AI-generated promotional campaign tailored for audience engagement during Diwali."
            skills={["AI Generation", "Festive Branding"]}
            deliverables={["Campaign Asset"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/18 October -Dhanatryodashi Diwali 10).mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="AI Commercial Advertisement"
            category="AI Video Generation"
            client="Brand Campaign"
            overview="Full-scale digital commercial advertisement created entirely with generative AI tools and cinematic soundscapes."
            skills={["AI Generation", "Commercial Layouts"]}
            deliverables={["Commercial Asset"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/26- Advertisment (9).mp4"
            link={videoPortfolioLink}
          />
        </div>

        <div className="mt-16 text-left">
          <a 
            href={videoPortfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-stone-300 hover:text-white group"
          >
            <span>View AI Projects</span>
            <span className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-black transition-all">
              →
            </span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CLIENT PROJECTS                                                */}
      {/* ========================================================================= */}
      <section 
        id="client-projects" 
        ref={clientRef}
        className={`px-6 py-28 max-w-6xl mx-auto border-t border-stone-900 transition-all duration-1000 ${
          clientVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-left mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <Users size={12} className="text-stone-400" />
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block">SECTION 04 / BRAND COLLABORATIONS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-stone-100">Client Projects</h2>
          <p className="text-stone-400 font-light text-sm max-w-2xl leading-relaxed">
            Creative collaborations and branding-focused visual solutions developed for brands, businesses, and creator campaigns.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 select-none">
            {["Amppere Cable", "Nexus Engineering", "Shreeman Legend", "Freelance Collaborations"].map((pill, i) => (
              <span key={i} className="text-[8px] font-mono border border-[#064e3b] bg-[#022c22] px-3.5 py-1.5 rounded-full text-emerald-400/80 font-medium shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                • {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Cinematic list of client cards */}
        <div className="space-y-8">
          {clientProjects.map((client, idx) => (
            <div 
              key={idx}
              className="bg-[#022c22]/40 border border-[#064e3b] rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center text-left hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 group"
            >
              {/* Product Preview Thumbnail - Custom Portrait / Landscape framing */}
              <div className={`w-full ${client.width} ${client.aspect} bg-zinc-900 rounded-2xl overflow-hidden shrink-0 border border-stone-900/60 shadow-xl`}>
                <img 
                  src={client.thumbnail} 
                  alt={client.name} 
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" 
                />
              </div>

              {/* Client specifications and deliverables */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-serif text-stone-100 font-medium group-hover:text-stone-300 transition-colors">
                      {client.name}
                    </h3>
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">{client.type}</span>
                  </div>
                  <p className="text-xs font-light text-stone-400 leading-relaxed">
                    {client.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {client.skills.map((s, i) => (
                    <span key={i} className="text-[8px] font-mono bg-zinc-950 border border-stone-900 px-2 py-0.5 rounded text-stone-500 font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-900 flex justify-between items-center">
                  <div className="flex flex-wrap gap-3">
                    {client.deliverables.slice(0, 2).map((del, i) => (
                      <span key={i} className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                        {del}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={client.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full border border-stone-850 bg-zinc-900 flex items-center justify-center text-stone-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer"
                  >
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Section CTA - Redirects to drive */}
        <div className="mt-16 text-left">
          <a 
            href={graphicPortfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-stone-300 hover:text-white group"
          >
            <span>View Client Projects</span>
            <span className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-black transition-all">
              →
            </span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONTACT & FOOTER                                                          */}
      {/* ========================================================================= */}
      <section 
        id="contact-visual"
        ref={contactRef}
        className={`px-6 py-28 max-w-6xl mx-auto border-t border-stone-900 transition-all duration-1000 ${
          contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Headline + Email details */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.3em] block mb-2">— 05 / PROPOSALS</span>
              <h2 className="text-5xl md:text-6xl font-serif text-stone-100 tracking-tighter leading-none">
                Let&apos;s Build <br />
                <span className="italic font-light text-stone-500">Together.</span>
              </h2>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-xs font-light">
              Ready to construct a high-fidelity visual identity system for your brand? Complete the form or email directly.
            </p>

            <div className="space-y-1">
              <span className="text-[7px] font-mono text-stone-500 uppercase tracking-widest block">Direct Inquiry</span>
              <a 
                href="mailto:sujalsawardekar27@gmail.com"
                className="text-base font-bold text-stone-100 hover:text-stone-300 transition-colors uppercase tracking-wider block"
              >
                sujalsawardekar27@gmail.com →
              </a>
            </div>

            {/* Social Links Grid */}
            <div className="pt-6 grid grid-cols-2 gap-4">
              {[
                { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/sujal-sawardekar-557342270/" },
                { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/sujal_sawardekar_/" },
                { label: "Behance", icon: FolderOpen, href: "https://www.behance.net/" },
                { label: "Resume", icon: FileText, href: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full border border-stone-850 bg-zinc-900 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-black transition-all">
                    <social.icon size={14} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Simple Contact Form */}
          <div className="lg:col-span-7 w-full">
            <form 
              onSubmit={handleContactSubmit}
              className="bg-[#0b0b0d] border border-stone-900 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    placeholder="Enter name" 
                    className="w-full bg-black border border-stone-900 rounded-full px-6 py-4 text-xs text-stone-100 outline-none focus:border-stone-700 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                    placeholder="Inquiry email" 
                    className="w-full bg-black border border-stone-900 rounded-full px-6 py-4 text-xs text-stone-100 outline-none focus:border-stone-700 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  placeholder="Outline your branding or visual design requirements..." 
                  className="w-full bg-black border border-stone-900 rounded-[2rem] px-6 py-5 text-xs text-stone-100 outline-none resize-none focus:border-stone-700 transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="group relative flex w-full items-center justify-between gap-6 rounded-full pl-8 pr-1.5 py-1.5 bg-stone-100 text-black hover:bg-stone-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                  {isSending ? "In Transit..." : isSent ? "Submitted Successfully" : "Send Message"}
                </span>
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <ArrowUpRight size={14} />
                </div>
              </button>

              {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
            </form>
          </div>

        </div>

        {/* Structured Footer Navigation */}
        <div className="border-t border-stone-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <a href="#about-visual" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors">01 / ABOUT</a>
            <a href="#video-work" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors">02 / VIDEO</a>
            <a href="#graphic-design" className="text-[10px] font-mono text-[#fafaf9] hover:text-white transition-colors">03 / GRAPHIC</a>
            <a href="#client-projects" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors">04 / CLIENTS</a>
          </div>
          <span className="text-[9px] font-mono text-stone-600">© 2026 SUJAL SAWARDEKAR. ALL RIGHTS RESERVED.</span>
        </div>

      </section>

    </div>
  )
}
