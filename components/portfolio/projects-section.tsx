"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Play } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { projects } from "@/lib/data"

function StickyProjectCard({
  project,
  i,
  progress,
  range,
  targetScale,
}: {
  project: any
  i: number
  progress: any
  range: [number, number]
  targetScale: number
}) {
  const container = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x: x * 3, y: y * -3 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const isReversed = i % 2 !== 0

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-[100vh] w-full items-start pt-[20vh] justify-center px-6"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          scale,
          top: `calc(${i * 30}px)`,
          transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          isolation: "isolate",
        }}
        className={`group relative flex w-full max-w-5xl origin-top flex-col gap-8 overflow-hidden rounded-[2.5rem] bg-white p-6 border-t-[1px] border-zinc-200/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] lg:min-h-[500px] lg:max-h-[700px] lg:flex-row lg:gap-12 lg:p-10 ${isReversed ? "lg:flex-row-reverse" : ""}`}
      >
        <div 
          className="group relative w-full overflow-hidden rounded-2xl lg:w-[55%] aspect-[16/10] bg-zinc-50 shrink-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white/10 transition-opacity duration-500 group-hover:opacity-0" />
          
          <a 
            href={project.videoUrl || `/case-studies/${project.slug}`} 
            target={project.videoUrl ? "_blank" : "_self"}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"
            rel="noreferrer"
          >
            <div className="flex items-center gap-3 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white uppercase tracking-widest shadow-xl">
              {project.videoUrl ? <><Play size={16} fill="white" /> Watch Video</> : <>Explore Case <ArrowUpRight size={16} /></>}
            </div>
          </a>
        </div>

        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <span className="mb-4 block text-[10px] font-bold tracking-[0.3em] text-indigo-500 uppercase">
            {project.category} — 0{i + 1}
          </span>
          <h3 className="mb-6 text-4xl font-serif text-zinc-900 tracking-tight leading-tight">
            {project.title}
          </h3>

          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Challenge</h4>
            <p className="text-sm leading-relaxed text-zinc-500 font-light">
               {project.problem}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.tools.slice(0, 3).map((tool: string) => (
                <span key={tool} className="rounded-full border border-zinc-100 bg-zinc-50 px-4 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest transition-colors hover:bg-indigo-50 hover:text-indigo-600">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StickyProjectsList({ projects }: { projects: any[] }) {
  const container = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={container} className="relative flex w-full flex-col items-center justify-center pb-[5vh] pt-0">
      {projects.map((project, i) => {
        const targetScale = Math.max(0.85, 1 - (projects.length - i - 1) * 0.05)
        
        return (
          <StickyProjectCard
            key={project.slug}
            i={i}
            project={project}
            progress={scrollYProgress}
            range={[i * (1 / projects.length), 1]}
            targetScale={targetScale}
          />
        )
      })}
    </div>
  )
}

export function ProjectsSection() {
  const filteredProjects = projects.filter(p => p.type === 'uiux')

  return (
    <section 
      id="work" 
      className="relative mx-auto mx-2 md:mx-6 my-12 rounded-[2.5rem] bg-[#F4F4F5] pt-32 pb-24 border border-zinc-200"
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center px-6 mb-8">
        <span className="mb-4 block text-[10px] font-bold tracking-[0.3em] text-indigo-500 uppercase">
           WORK — SELECTED
        </span>
        <h2 className="text-5xl md:text-6xl font-serif text-zinc-900 tracking-tight mb-6">
           Featured <span className="italic font-light text-zinc-500">Case Studies.</span>
        </h2>
        <p className="mx-auto max-w-xl text-zinc-500 font-light text-xl leading-relaxed">
          Deep dives into complex digital challenges and user-centric solutions.
        </p>
      </div>

      <StickyProjectsList projects={filteredProjects} />
    </section>
  )
}
