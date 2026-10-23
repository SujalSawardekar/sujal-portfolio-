"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "lenis/react"
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Eye, Compass, Film, LayoutGrid, Users, Send, Linkedin, Instagram, FolderOpen, FileText, X, Maximize2 } from "lucide-react"
import { useIntersection } from "@/hooks/use-intersection"
import { sendContactMessage } from "@/app/actions/contact"

import Link from "next/link"
import { useRouter } from "next/navigation"

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
  caseStudySlug?: string
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
  galleryImages,
  caseStudySlug
}: ProjectCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: containerRef, isVisible } = useIntersection({
    threshold: 0.05,
    rootMargin: "150px",
    triggerOnce: false,
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    if (isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isVisible])

  const lenis = useLenis()

  // Bulletproof body & Lenis scroll lock when modal is expanded
  useEffect(() => {
    if (!isModalOpen) return

    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalOverscroll = document.body.style.overscrollBehavior
    
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    document.body.style.overscrollBehavior = "none"

    // Stop Lenis instance immediately
    if (lenis?.stop) {
      lenis.stop()
    }
    const winLenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis
    if (winLenis?.stop) {
      winLenis.stop()
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalOverscroll
      if (lenis?.start) {
        lenis.start()
      }
      if (winLenis?.start) {
        winLenis.start()
      }
    }
  }, [isModalOpen, lenis])

  const handleCardClick = () => {
    if (caseStudySlug) {
      router.push(`/case-studies/${caseStudySlug}`)
    } else if (galleryImages?.length) {
      setIsModalOpen(true)
    } else if (link) {
      window.open(link, '_blank')
    }
  }

  return (
    <>
    <div 
      ref={containerRef}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col gap-6 text-left group cursor-pointer"
    >
      
      {/* Sleek Non-Curved Thumbnail */}
      <div className="w-full relative aspect-[16/10] bg-[#0a0502] rounded-none overflow-hidden shadow-2xl ring-1 ring-white/5 group-hover:ring-amber-500/30 transition-all duration-500">
        {thumbnail.endsWith('.mp4') ? (
          <video 
            ref={videoRef}
            src={thumbnail}
            loop
            muted
            playsInline
            preload="metadata"
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
        
        {/* Minimal play/view indicator */}
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

      {/* Clean Text Content (No Big Boxes) */}
      <div className="w-full flex flex-col gap-3 px-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-amber-600/80 uppercase tracking-widest">
            {category}
          </span>
          <span className="text-[9px] font-mono text-stone-600 uppercase tracking-wider">
            {client}
          </span>
        </div>

        <h3 className="text-2xl font-serif text-stone-100 tracking-tight font-medium group-hover:text-amber-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-xs font-light text-stone-400 leading-relaxed max-w-md line-clamp-2">
          {overview}
        </p>

        {/* Minimal Skills */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
          {skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-[9px] font-mono text-stone-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-700" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Uncluttered Modal Design - Non-curved edges */}
    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-3 sm:p-6 touch-none"
          onClick={() => setIsModalOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-lenis-prevent
            className="w-full max-w-5xl max-h-[85vh] flex flex-col relative bg-[#0a0502] rounded-none ring-1 ring-white/10 overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.05)] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Minimalist Header */}
            <div className="p-4 sm:p-5 md:px-7 flex items-center justify-between border-b border-white/5 shrink-0 bg-black/40">
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-white">{title}</h3>
                <p className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-widest">{category}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Gallery - Balanced Grid without awkward bottom whitespace */}
            <div 
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 custom-scrollbar bg-[#050201] overscroll-contain"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
                {galleryImages?.map((img, idx) => (
                  <div key={idx} className="w-full aspect-square bg-zinc-950/60 overflow-hidden ring-1 ring-white/10 group/item flex items-center justify-center">
                    {img.endsWith('.mp4') ? (
                      <video src={img} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" />
                    ) : (
                      <img src={img} alt={`${title} ${idx}`} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" loading="lazy" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Minimalist Footer */}
            <div className="p-4 sm:p-6 md:px-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/40 shrink-0">
              <p className="text-xs text-stone-500 font-mono tracking-widest uppercase">{galleryImages?.length} Designs</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-all"
              >
                View More Projects <ArrowUpRight size={13} />
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const zoomVideoRef = useRef<HTMLVideoElement>(null)
  const { ref: containerRef } = useIntersection({
    threshold: 0.05,
    rootMargin: "150px",
    triggerOnce: false,
  })

  // Play on hover, pause on leave (unless user toggled manual play)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted

    if (isHovered || isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isHovered, isPlaying, isMuted, videoUrl])

  // Continuous playback when zoomed/expanded
  useEffect(() => {
    if (isZoomOpen && zoomVideoRef.current) {
      zoomVideoRef.current.muted = isMuted
      zoomVideoRef.current.play().catch(() => {})
    }
  }, [isZoomOpen, isMuted])

  const lenis = useLenis()

  // Bulletproof body & Lenis scroll lock when zoom/expanded modal or gallery modal is open
  useEffect(() => {
    if (!isZoomOpen && !isModalOpen) return

    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalOverscroll = document.body.style.overscrollBehavior
    
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    document.body.style.overscrollBehavior = "none"

    if (lenis?.stop) {
      lenis.stop()
    }
    const winLenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis
    if (winLenis?.stop) {
      winLenis.stop()
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalOverscroll
      if (lenis?.start) {
        lenis.start()
      }
      if (winLenis?.start) {
        winLenis.start()
      }
    }
  }, [isZoomOpen, isModalOpen, lenis])

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying || isHovered) {
        videoRef.current.pause()
        setIsPlaying(false)
        setIsHovered(false)
      } else {
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
        setIsMuted(false)
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.muted = nextMuted
    }
    if (zoomVideoRef.current) {
      zoomVideoRef.current.muted = nextMuted
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <>
    <div 
      ref={containerRef}
      onClick={(e) => {
        if (galleryImages?.length) {
          setIsModalOpen(true)
        } else {
          togglePlay(e)
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#050814]/90 border border-[#1a1b38] rounded-[2.5rem] p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 group relative aspect-[9/16] overflow-hidden shadow-2xl cursor-pointer"
    >
      {/* Background Video - plays on mouse hover */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <video 
          ref={videoRef}
          src={videoUrl}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
        />
        {/* Subtle bottom gradient only to keep typography legible without dimming the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 pointer-events-none" />
      </div>

      {/* Floating Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[9px] font-mono bg-black/60 border border-stone-800/80 px-3 py-1 rounded-full text-stone-200 uppercase tracking-widest backdrop-blur-md">
          {category}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono text-stone-300 uppercase tracking-wider backdrop-blur-sm px-3 py-1 rounded-full bg-black/60 border border-white/10">
            {client}
          </span>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsZoomOpen(true)
            }}
            aria-label="Zoom video"
            title="Zoom / Full View"
            className="w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center backdrop-blur-md hover:bg-indigo-600 hover:border-indigo-500 transition-colors text-stone-200 cursor-pointer"
          >
            <Maximize2 size={11} />
          </button>
          <button 
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center backdrop-blur-md hover:bg-black hover:border-white/20 transition-colors text-stone-200 cursor-pointer"
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>
      </div>

      {/* Hover Center Indicator */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.button 
          type="button"
          onClick={togglePlay}
          aria-label={isHovered || isPlaying ? "Pause video" : "Play video"}
          animate={{ 
            scale: isHovered || isPlaying ? 1 : 0.8,
            opacity: isHovered || isPlaying ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-14 h-14 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/20 transition-all pointer-events-auto cursor-pointer"
        >
          {isHovered || isPlaying ? (
            <Pause size={18} fill="white" />
          ) : (
            <Play size={18} fill="white" className="ml-0.5" />
          )}
        </motion.button>
      </div>

      {/* Floating Footer Detail */}
      <div className="relative z-10 mt-auto pt-3 flex flex-col gap-2.5">
        <div className="space-y-1">
          <h3 className="text-lg md:text-xl font-serif text-stone-100 tracking-tight font-medium drop-shadow-md">
            {title}
          </h3>
          <p className="text-[11px] font-light text-stone-200/90 leading-snug line-clamp-2 max-w-sm drop-shadow">
            {overview}
          </p>
        </div>

        {/* Skills Tag Row */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-[8px] font-mono bg-black/70 border border-stone-800/80 px-2.5 py-1 rounded text-stone-300 backdrop-blur-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Zoom / Full Preview Video Modal - Straight/Uncurved rectangle video */}
    <AnimatePresence>
      {isZoomOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6 touch-none"
          onClick={() => setIsZoomOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            data-lenis-prevent
            className="bg-[#050814] border border-[#1a1b38] rounded-none w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden relative shadow-[0_0_80px_rgba(99,102,241,0.25)] my-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#1a1b38] shrink-0 bg-[#02040a]">
              <div>
                <h3 className="text-base sm:text-lg font-serif text-stone-100">{title}</h3>
                <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider">{category} • {client}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Enlarged Video Viewport - Non-curved rectangular video */}
            <div 
              data-lenis-prevent
              className="flex-1 bg-black/95 flex items-center justify-center p-2 sm:p-4 min-h-0 overflow-hidden"
            >
              <video 
                ref={zoomVideoRef}
                src={videoUrl}
                controls
                autoPlay
                playsInline
                loop
                muted={isMuted}
                className="max-h-[54vh] sm:max-h-[60vh] w-auto max-w-full rounded-none shadow-2xl object-contain border border-stone-800/40"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 sm:px-6 sm:py-3 border-t border-[#1a1b38] flex flex-row justify-between items-center gap-2 bg-[#02040a] shrink-0">
              <p className="text-[11px] text-stone-400 font-light truncate max-w-xs">{overview}</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-1.5 font-bold text-[10px] uppercase tracking-wider hover:bg-indigo-500 transition-colors shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                View More Projects <ArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6 touch-none"
          onClick={() => setIsModalOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-lenis-prevent
            className="bg-[#050814] border border-[#1a1b38] rounded-none w-full max-w-6xl max-h-[85vh] flex flex-col overflow-hidden relative shadow-[0_0_80px_rgba(99,102,241,0.2)] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8 flex items-center justify-between border-b border-[#1a1b38] shrink-0 bg-[#02040a]">
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-stone-100">{title}</h3>
                <p className="text-xs font-mono text-stone-400 mt-1 uppercase tracking-wider">{category}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-zinc-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div 
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-[#02040a]/60 overscroll-contain"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryImages?.map((img, idx) => (
                  img.endsWith('.mp4') ? (
                    <video key={idx} src={img} autoPlay loop muted playsInline className="w-full rounded-none border border-stone-800 mb-6 shadow-xl" />
                  ) : (
                    <img key={idx} src={img} alt={`${title} ${idx}`} className="w-full h-auto rounded-none border border-stone-800 mb-6 shadow-xl" loading="lazy" />
                  )
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 md:px-8 border-t border-[#1a1b38] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#02040a] shrink-0">
              <p className="text-xs text-stone-400 font-light">Showing {galleryImages?.length} videos/designs</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-5 py-2 font-bold text-[10px] uppercase tracking-wider hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                View More Projects <ArrowUpRight size={13} />
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

  const [showAllGraphic, setShowAllGraphic] = useState(false)
  const [showAllVideo, setShowAllVideo] = useState(false)
  const [showAllAI, setShowAllAI] = useState(false)
  const [selectedClient, setSelectedClient] = useState<{
    name: string
    type: string
    overview: string
    thumbnail: string
    skills: string[]
    deliverables: string[]
    link: string
    aspect: string
    width: string
    galleryImages?: string[]
  } | null>(null)

  const lenis = useLenis()

  // Scroll lock when client modal is expanded
  useEffect(() => {
    if (!selectedClient) return

    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalOverscroll = document.body.style.overscrollBehavior
    
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    document.body.style.overscrollBehavior = "none"

    if (lenis?.stop) lenis.stop()
    const winLenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis
    if (winLenis?.stop) winLenis.stop()

    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalOverscroll
      if (lenis?.start) lenis.start()
      if (winLenis?.start) winLenis.start()
    }
  }, [selectedClient, lenis])

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
    { name: "Photoshop", logo: "Ps", desc: "Image Compositing", color: "text-[#31A8FF]", border: "border-[#31A8FF]/30", bg: "bg-[#31A8FF]/10", hoverShadow: "hover:shadow-[0_0_20px_rgba(49,168,255,0.15)]" },
    { name: "Premiere Pro", logo: "Pr", desc: "Video Editing", color: "text-[#9999FF]", border: "border-[#9999FF]/30", bg: "bg-[#9999FF]/10", hoverShadow: "hover:shadow-[0_0_20px_rgba(153,153,255,0.15)]" },
    { name: "Illustrator", logo: "Ai", desc: "Vector & Branding", color: "text-[#FF9A00]", border: "border-[#FF9A00]/30", bg: "bg-[#FF9A00]/10", hoverShadow: "hover:shadow-[0_0_20px_rgba(255,154,0,0.15)]" },
    { name: "Canva", logo: "Cv", desc: "Social Templates", color: "text-[#00C4CC]", border: "border-[#00C4CC]/30", bg: "bg-[#00C4CC]/10", hoverShadow: "hover:shadow-[0_0_20px_rgba(0,196,204,0.15)]" }
  ]

  const clientProjects = [
    {
      name: "Amppere Cable Industrial Branding",
      slug: "amppere-cable-branding",
      type: "Heavy Industrial Brand Identity & Motion",
      overview: "Formulated a robust, high-contrast industrial identity, promotional product motion ads, social media campaigns, and engineering collateral for Amppere Cable.",
      thumbnail: "/figma-showcase/AC/AC (1).png",
      skills: ["Brand Identity", "Motion Graphics", "Industrial Catalog", "Photoshop", "Ad Compositing"],
      deliverables: ["Product Promo Video", "Brand Guidelines", "Catalog Assets", "Social Creatives"],
      link: "https://www.ampperecable.in/",
      aspect: "aspect-[16/10]",
      width: "md:w-[260px]",
      galleryImages: [
        "/Work/Video/Branding-Reel-4.mp4",
        "/Work/Ai Video/15 March  Post 07- Amppere Cable.mp4",
        "/Work/Ai Video/18 October -Dhanatryodashi Diwali 10).mp4",
        "/Work/Ai Video/26- Advertisment (9).mp4",
        "/Work/Ai Video/R1.mp4",
        "/Work/Ai Video/R2.mp4",
        "/Work/Ai Video/Ram Ram.mp4",
        "/Work/Social Media Creative/Social Media Creative/Motion-graphic-2.mp4",
        "/Work/Social Media Creative/Social Media Creative/Motion graphic 1.mp4",
        "/Work/Social Media Creative/Social Media Creative/Motion graphic 3.mp4",
        "/Work/Social Media Creative/Social Media Creative/Motion graphic 4.mp4",
        "/Work/Social Media Creative/Social Media Creative/Motion graphic 5.mp4",
        "/Work/Social Media Creative/Social Media Creative/Motion graphic 6.mp4",
        "/Work/Social Media Creative/Social Media Creative/Reel/1.mp4",
        "/Work/Social Media Creative/Social Media Creative/Reel/2.mp4",
        "/Work/Social Media Creative/Social Media Creative/01.jpg",
        "/Work/Social Media Creative/Social Media Creative/02.jpg",
        "/Work/Social Media Creative/Social Media Creative/03.jpg",
        "/Work/Social Media Creative/Social Media Creative/04.jpg",
        "/Work/Social Media Creative/Social Media Creative/05.jpg",
        "/Work/Social Media Creative/Social Media Creative/06.jpg",
        "/Work/Social Media Creative/Social Media Creative/07.jpg",
        "/Work/Social Media Creative/Social Media Creative/08.jpg",
        "/figma-showcase/AC/AC (1).png",
        "/figma-showcase/AC/AC (2).png",
        "/figma-showcase/AC/AC (3).png",
        "/figma-showcase/AC/AC (4).png",
        "/figma-showcase/AC/AC (5).png",
        "/figma-showcase/AC/AC (6).png"
      ]
    },
    {
      name: "Nexus Engineering Core Identity",
      slug: "nexus-engineering-identity",
      type: "Safety Systems & Corporate Visual Identity",
      overview: "Architected a dual-color safety branding program, proposal brochures, site safety banners, and professional corporate digital media for Nexus Engineering.",
      thumbnail: "/figma-showcase/NE/NE (1).png",
      skills: ["Corporate Branding", "Print Brochures", "Safety Graphics", "Grid Systems", "Illustrator"],
      deliverables: ["Corporate Brochure", "Stationery System", "Identity Guidelines", "Safety Collateral"],
      link: "https://www.nexusengineering.in/",
      aspect: "aspect-[16/10]",
      width: "md:w-[260px]",
      galleryImages: [
        "/Work/Ai Video/Post 1.mp4",
        "/figma-showcase/NE/NE (1).png",
        "/figma-showcase/NE/NE (2).png",
        "/figma-showcase/NE/NE (3).png",
        "/figma-showcase/NE/NE (4).png",
        "/figma-showcase/NE/NE (5).png",
        "/figma-showcase/NE/NE (6).png",
        "/figma-showcase/NE/NE A (1).png",
        "/figma-showcase/NE/NE A (2).png",
        "/figma-showcase/NE/NE G (1).png",
        "/figma-showcase/NE/NE S (1).png"
      ]
    },
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
                className={`bg-zinc-950/60 border border-stone-900 ${tool.hoverShadow} p-6 rounded-2xl flex flex-col justify-between h-36 text-left transition-all duration-500 group cursor-default`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-8 h-8 rounded-lg ${tool.bg} border ${tool.border} flex items-center justify-center font-mono font-bold text-xs ${tool.color}`}>
                    {tool.logo}
                  </span>
                  <span className="text-[7px] font-mono text-stone-600 uppercase tracking-widest">Active Tool</span>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-stone-200 uppercase tracking-wider">{tool.name}</h4>
                  <p className={`text-[8px] font-mono uppercase tracking-widest opacity-80 ${tool.color}`}>{tool.desc}</p>
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
            { label: "ACADEMICS", value: "8.39 CGPA", desc: "Design & Tech" }
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

        {/* Infinite Scrolling Services Marquee */}
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mt-16 overflow-hidden py-6 border-y border-stone-900/50 bg-[#060608] flex">
          <motion.div
            className="flex items-center w-max"
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {[
                  "CINEMATIC REELS", "BRAND IDENTITY", "3D MOTION GRAPHICS", "BROCHURES & PRINT", 
                  "PROMOTIONAL ADS", "SOCIAL MEDIA CREATIVES", "AI VIDEOS", "MUSIC POSTERS", 
                  "EVENT VIDEOS", "YOUTUBE THUMBNAILS", "MARKETING CAMPAIGNS", "VISITING CARDS"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center px-8 shrink-0">
                    <span className="text-sm font-mono font-bold text-stone-400 uppercase tracking-widest">
                      {service}
                    </span>
                    <span className="text-stone-700 text-lg ml-16">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title="Music Poster & Cover Art Collection"
            category="Music Posters"
            client="Shreeman Legend & Independent"
            caseStudySlug="music-posters-collection"
            overview="Designed bold, high-contrast, cinematic music promotional posters with digital compositing and entertainment-focused art direction."
            skills={["Photoshop", "Typography", "Poster Composition", "Creative Gradients"]}
            deliverables={["Poster Showcase", "Digital Release Covers", "Cover Art Assets"]}
            ctaText="View Case Study →"
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
            caseStudySlug="social-media-campaigns"
            overview="Designed promotional creatives, social campaign visuals, and motion creatives focused on product-centric communications and audience engagement."
            skills={["Photoshop", "Brand Communication", "Ad Compositing", "Grid Systems"]}
            deliverables={["Instagram Campaigns", "Motion Creatives Series", "Digital Ad Sets"]}
            ctaText="View Case Study →"
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
            caseStudySlug="youtube-thumbnails-strategy"
            overview="Designed eye-catching gaming composites, teaser covers, and meetup thumbnails engineered to maximize organic reach and click-through rates."
            skills={["Digital Compositing", "CTR Optimization", "Photoshop", "Color Contrast"]}
            deliverables={["Teaser Thumbnail", "Gaming Composite Banner", "Creator Cover Art"]}
            ctaText="View Case Study →"
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
            caseStudySlug="brochures-layout-design"
            overview="Formulated geometric grid layouts, corporate website brochures, and print assets aligned with cohesive brand systems."
            skills={["Layout Grid", "Print Composition", "Typography Pacing", "Vector Layout"]}
            deliverables={["Corporate Brochure", "Remake Travel Poster", "Brand Assets"]}
            ctaText="View Case Study →"
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
          <div className="flex flex-wrap items-center gap-3 pt-3 select-none">
            {/* Prominent interactive hint */}
            <div className="inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 rounded-full text-indigo-300 font-mono text-xs font-semibold shadow-[0_0_20px_rgba(99,102,241,0.2)] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Hover over any card to play video</span>
            </div>

            {["Cinematic Reels", "Branding Videos", "Promotional Films", "Motion Graphics", "Cinematic Editing"].map((pill, i) => (
              <span key={i} className="text-xs font-mono border border-[#1a1b38] bg-[#050814] px-4 py-2 rounded-full text-indigo-200/90 font-medium shadow-[0_0_15px_rgba(99,102,241,0.06)] hover:border-indigo-500/40 transition-colors">
                • {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VideoCard 
            title="GYM Product Advertising"
            category="Commercial Ad"
            client="Fitness Campaign"
            overview="High-energy commercial fitness ad with impact cuts, dynamic motion, and synced sound."
            skills={["Commercial Editing", "Sound Design", "Color Grading", "Motion Graphics"]}
            deliverables={["Promotional Film", "Social Ad Cut", "Sound Sync"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Sujal Projects/GYM product Advertising.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Lotus Industry"
            category="Corporate Film"
            client="Assignment Project"
            overview="Practice assignment showcase capturing precision machinery and corporate brand pacing."
            skills={["Corporate Storytelling", "Pacing & Flow", "Color Correction", "Cinematic Motion"]}
            deliverables={["Corporate Reel", "Showcase Feature", "Branded Cut"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Sujal Projects/Lotus Industry_1.mp4"
            link={videoPortfolioLink}
          />

          <VideoCard 
            title="Sales & Marketing Business"
            category="Promotional Film"
            client="Business Campaign"
            overview="Strategic promotional edit combining crisp typography with engaging motion visuals."
            skills={["Motion Graphics", "Typography Motion", "Commercial Editing", "Visual Hooks"]}
            deliverables={["B2B Video", "Marketing Asset", "Motion Kit"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Sujal Projects/Sales & Marketing Busniess.mp4"
            link={videoPortfolioLink}
          />

          <AnimatePresence>
            {showAllVideo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3"
              >
                <VideoCard 
                  title="Brand Commercial Reel"
                  category="Brand Campaign"
                  client="Commercial Project"
                  overview="High-fidelity commercial edit with precision typography and rhythmic pacing."
                  skills={["Motion Graphics", "Branding Design", "Video Editing", "Typography Motion"]}
                  deliverables={["Branded Edit", "Commercial Reel", "Motion Guidelines"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Video/Branding-Reel-1.mp4"
                  link={videoPortfolioLink}
                />

                <VideoCard 
                  title="Industrial Brand Showcase"
                  category="Brand Identity"
                  client="Industrial Partner"
                  overview="Dynamic product positioning blending rhythmic sound design with crisp visual cuts."
                  skills={["Video Editing", "Sound Curation", "Commercial Layouts", "Branding Dynamics"]}
                  deliverables={["Product Reel", "Social Format Edit", "Sound Design Template"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Video/Branding-Reel-3.mp4"
                  link={videoPortfolioLink}
                />

                <VideoCard 
                  title="Dynamic Motion Reel"
                  category="Motion Graphics"
                  client="Digital Campaign"
                  overview="High-impact visual storytelling engineered for digital advertising and social engagement."
                  skills={["Motion Graphics", "Branding Design", "Premiere Pro", "Visual Hooks"]}
                  deliverables={["Commercial Asset", "Social Format Edit"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Video/Branding-Reel-4.mp4"
                  link={videoPortfolioLink}
                />

                <VideoCard 
                  title="Atmospheric Cinematic Film"
                  category="Cinematic Edit"
                  client="Independent Film"
                  overview="Immersive cinematic sequence with rich color grading and evocative soundscapes."
                  skills={["Cinematic Editing", "Sound Design", "Color Grading", "Visual Narrative"]}
                  deliverables={["Cinematic Reel", "Atmospheric Edit", "Grading Blueprint"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Video/Cinematic-Reel-1.mp4"
                  link={videoPortfolioLink}
                />

                <VideoCard 
                  title="Visual Flow & Sound Symphony"
                  category="Cinematic Edit"
                  client="Creative Showcase"
                  overview="Cinematic pacing study combining smooth camera curves with curated audio design."
                  skills={["Video Editing", "Pacing & Flow", "Color Correcting", "Audio Curation"]}
                  deliverables={["Mood Timeline", "Audio Sequence", "Color Profile"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Video/Cinematic-Reel-2.mp4"
                  link={videoPortfolioLink}
                />

                <VideoCard 
                  title="Ranka Builder Showcase"
                  category="Commercial Reel"
                  client="Ranka Builder"
                  overview="Architectural commercial video highlighting structural elegance and space transitions."
                  skills={["Video Editing", "Color Grading", "Architectural Pacing", "Sound Design"]}
                  deliverables={["Commercial Asset", "Social Cut", "Promo Film"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Video/Ranka Builder.mp4"
                  link={videoPortfolioLink}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Global Section CTA - Redirects to drive */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-6 border-t border-stone-900/60 pt-8 justify-between">
          <button
            onClick={() => setShowAllVideo(!showAllVideo)}
            className="rounded-full bg-transparent border-2 border-indigo-600/30 text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 font-mono text-xs uppercase tracking-widest px-8 py-3 transition-all font-bold"
          >
            {showAllVideo ? "Show Less" : "See More Video Projects"}
          </button>

          <a 
            href={videoPortfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-stone-200 hover:text-white bg-[#0e1124] hover:bg-indigo-600/90 border border-[#232752] hover:border-indigo-500/80 px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] group"
          >
            <span>View All Video Projects</span>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight size={13} />
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
          <div className="flex flex-wrap items-center gap-3 pt-3 select-none">
            {/* Prominent interactive hint */}
            <div className="inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 rounded-full text-indigo-300 font-mono text-xs font-semibold shadow-[0_0_20px_rgba(99,102,241,0.2)] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Hover over any card to play video</span>
            </div>

            {["AI Generation", "Motion Graphics", "Prompt Engineering", "Digital Art"].map((pill, i) => (
              <span key={i} className="text-xs font-mono border border-[#1a1b38] bg-[#050814] px-4 py-2 rounded-full text-indigo-200/90 font-medium shadow-[0_0_15px_rgba(99,102,241,0.06)] hover:border-indigo-500/40 transition-colors">
                • {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VideoCard 
            title="Product Reel"
            category="AI Video Generation"
            client="Tenzor Product"
            overview="High-impact AI product reel highlighting dynamic product renders, motion curves, and precision lighting."
            skills={["AI Generation", "Product Motion", "Visual Hooks", "Sound Design"]}
            deliverables={["Product Reel", "Commercial Ad", "Promo Asset"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Video/Tenzor.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="Monkey Vlogger"
            category="AI Video Generation"
            client="Creative Campaign"
            overview="Immersive AI-generated motion sequence exploring futuristic visual character themes and rapid transitions."
            skills={["AI Generation", "Character Animation", "Prompt Editing", "Visual Hooks"]}
            deliverables={["Character Reel", "Social Video", "Promo Asset"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/Reel.mp4"
            link={videoPortfolioLink}
          />
          <VideoCard 
            title="Cybernetic Motion Reel"
            category="AI Video Generation"
            client="Digital Campaign"
            overview="Fast-paced dynamic reel focusing on hyper-realistic AI-generated elements and seamless edits."
            skills={["AI Generation", "Visual Hooks", "Dynamic Pacing", "Motion Flow"]}
            deliverables={["Motion Sequence", "Commercial Asset", "Visual Reel"]}
            ctaText="Watch Project →"
            videoUrl="/Work/Ai Video/R1.mp4"
            link={videoPortfolioLink}
          />
          <AnimatePresence>
            {showAllAI && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3"
              >
                <VideoCard 
                  title="AI Promotional Campaign"
                  category="AI Video Generation"
                  client="Digital Campaign"
                  overview="Engaging social media post crafted entirely using AI visual generation and advanced motion techniques."
                  skills={["AI Generation", "Motion Graphics", "Brand Identity"]}
                  deliverables={["Social Media Hook", "Digital Promo"]}
                  ctaText="Watch Project →"
                  videoUrl="/Work/Ai Video/Post 1.mp4"
                  link={videoPortfolioLink}
                />
                <VideoCard 
                  title="Generative Motion Flow"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center gap-6 border-t border-stone-900/60 pt-8 justify-between">
          <button
            onClick={() => setShowAllAI(!showAllAI)}
            className="rounded-full bg-transparent border-2 border-indigo-600/30 text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 font-mono text-xs uppercase tracking-widest px-8 py-3 transition-all font-bold"
          >
            {showAllAI ? "Show Less" : "See More AI Projects"}
          </button>

          <a 
            href={videoPortfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-stone-200 hover:text-white bg-[#0e1124] hover:bg-indigo-600/90 border border-[#232752] hover:border-indigo-500/80 px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] group"
          >
            <span>View All AI Projects</span>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight size={13} />
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
              onClick={() => {
                if (client.slug) {
                  router.push(`/case-studies/${client.slug}`)
                } else if (client.galleryImages?.length) {
                  setSelectedClient(client)
                } else if (client.link) {
                  window.open(client.link, '_blank')
                }
              }}
              className="bg-[#022c22]/40 border border-[#064e3b] rounded-none p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center text-left hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 group cursor-pointer"
            >
              {/* Product Preview Thumbnail - Custom Portrait / Landscape framing */}
              <div className={`w-full ${client.width} ${client.aspect} bg-zinc-900 rounded-none overflow-hidden shrink-0 border border-stone-900/60 shadow-xl relative`}>
                <img 
                  src={client.thumbnail} 
                  alt={client.name} 
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" 
                />
                {client.galleryImages && (
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    {client.galleryImages.length} Assets
                  </div>
                )}
              </div>

              {/* Client specifications and deliverables */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-serif text-stone-100 font-medium group-hover:text-emerald-300 transition-colors">
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
                    <span key={i} className="text-[8px] font-mono bg-zinc-950 border border-stone-900 px-2 py-0.5 rounded-none text-stone-500 font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-900 flex justify-between items-center">
                  <div className="flex flex-wrap gap-3">
                    {client.deliverables.slice(0, 2).map((del, i) => (
                      <span key={i} className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {del}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300">
                    View Case Study <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Gallery Modal */}
        <AnimatePresence>
          {selectedClient && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-lenis-prevent
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-3 sm:p-6 touch-none"
              onClick={() => setSelectedClient(null)}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                data-lenis-prevent
                className="w-full max-w-5xl max-h-[85vh] flex flex-col relative bg-[#04120c] rounded-none ring-1 ring-emerald-500/20 overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.1)] overscroll-contain"
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-4 sm:p-5 md:px-7 flex items-center justify-between border-b border-emerald-500/10 shrink-0 bg-black/40">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-white">{selectedClient.name}</h3>
                    <p className="text-[10px] font-mono text-emerald-400 mt-1 uppercase tracking-widest">{selectedClient.type}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedClient(null)}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Gallery Grid */}
                <div 
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 custom-scrollbar bg-[#020a06] overscroll-contain"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
                    {selectedClient.galleryImages?.map((media, idx) => (
                      <div key={idx} className="w-full aspect-[4/3] bg-zinc-950/60 overflow-hidden ring-1 ring-white/10 group/item flex items-center justify-center relative">
                        {media.endsWith('.mp4') ? (
                          <video 
                            src={media} 
                            controls
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <img 
                            src={media} 
                            alt={`${selectedClient.name} ${idx}`} 
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" 
                            loading="lazy" 
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-6 md:px-8 border-t border-emerald-500/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/40 shrink-0">
                  <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">{selectedClient.galleryImages?.length} Media Assets</p>
                  <a 
                    href={selectedClient.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-all"
                  >
                    Visit Official Site <ArrowUpRight size={13} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/sujalsawardekar27/" },
                { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/graphics.by_ss/" },
                { label: "Behance", icon: FolderOpen, href: "https://www.behance.net/sujalsawardekar" },
                { label: "Dribbble", icon: LayoutGrid, href: "https://dribbble.com/graphicsbyss" },
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
