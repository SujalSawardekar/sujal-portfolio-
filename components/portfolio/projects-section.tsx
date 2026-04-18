"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Play, Eye } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { projects, type PortfolioMode } from "@/lib/data"


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
      className="sticky top-0 flex h-screen w-full items-center justify-center px-6"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          scale,
          top: `calc(5vh + ${i * 30}px)`,
          transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          isolation: "isolate",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
        className={`group relative flex w-full max-w-5xl origin-top flex-col gap-8 overflow-hidden rounded-[2.5rem] border border-border/50 bg-card p-6 shadow-2xl lg:max-h-[700px] lg:min-h-[500px] lg:flex-row lg:gap-12 lg:p-10 ${isReversed ? "lg:flex-row-reverse" : ""
          }`}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(800px circle at ${tilt.x * 50 + 50
              }% ${tilt.y * -50 + 50}%, var(--color-primary), transparent 40%)`,
            opacity: isHovered ? 0.15 : 0,
          }}
        />
        <div 
          className="group relative w-full overflow-hidden rounded-2xl lg:w-[55%] aspect-[16/10] bg-secondary shrink-0"
          style={{ 
            transform: "translateZ(0)",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/20 transition-opacity duration-500 group-hover:opacity-0" />
          {project.videoUrl ? (
            <a 
              href={project.videoUrl} 
              target="_blank" 
              className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
            >
              <div className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                <Play size={16} fill="currentColor" /> Watch Video
              </div>
            </a>
          ) : (
            <a 
              href={`/case-studies/${project.slug}`} 
              className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
            >
              <div className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                View Case Study <ArrowUpRight size={16} />
              </div>
            </a>
          )}
        </div>

        <div className="w-full lg:w-[45%] flex flex-col justify-center overflow-y-auto pr-2 custom-scrollbar">
          <span className="mb-3 block text-sm font-medium tracking-widest text-primary uppercase">
            {project.category}
          </span>
          <h3 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl">
            {project.title}
          </h3>

          <div className="mb-4">
            <h4 className="mb-1.5 text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">Problem</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
          </div>

          <div className="mb-4">
            <h4 className="mb-1.5 text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">Solution</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
          </div>

          <div className="mb-5">
            <h4 className="mb-1.5 text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">Outcome</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.outcome}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-auto pt-6">
            {!project.videoUrl && (
              <a 
                href={`/case-studies/${project.slug}`} 
                className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:underline"
              >
                Full Case Study <ArrowUpRight size={14} />
              </a>
            )}
            <div className="flex flex-wrap gap-2 ml-auto">
              {project.tools.map((tool: string) => (
                <span key={tool} className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
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
    <main ref={container} className="relative flex w-full flex-col items-center justify-center pb-[5vh] pt-[15vh]">
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
    </main>
  )
}

export function ProjectsSection() {
  const filteredProjects = projects.filter(p => p.type === 'uiux')

  const header = { label: "Case Studies", title: "Featured Projects", sub: "Deep dives into UX challenges." }

  return (
    <section id="work" className="relative w-full text-foreground py-20 md:py-28">
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center px-6 animate-fade-up">
        <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
          {header.label}
        </span>
        <h2 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
          {header.title}
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground/70">
          {header.sub}
        </p>
      </div>

      <StickyProjectsList projects={filteredProjects} />
    </section>
  )
}
