"use client"

import { Trophy, Award, Star, Medal, type LucideIcon } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useIntersection } from "@/hooks/use-intersection"
import { type PortfolioMode } from "@/lib/data"

const TILT_MAX = 9
const TILT_SPRING = { stiffness: 300, damping: 28 } as const
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const

const achievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon 2023",
    detail: "Grand Finale",
    highlight: "Top 2 out of 285 Teams",
    featured: true,
    color: "#f59e0b", // Amber
  },
  {
    icon: Trophy,
    title: "Smart India Hackathon 2024",
    detail: "Grand Finale",
    highlight: "Top 5 out of 118 Teams",
    featured: true,
    color: "#60a5fa", // Blue
  },
  {
    icon: Star,
    title: "Best Outgoing Student",
    detail: "Academic Excellence",
    highlight: "Top 2 of Batch",
    featured: false,
    color: "#a78bfa", // Purple
  },
  {
    icon: Award,
    title: "Graphic Design Competition",
    detail: "Creative Excellence",
    highlight: "1st Rank",
    featured: false,
    color: "#34d399", // Green
  },
  {
    icon: Medal,
    title: "Video Competition",
    detail: "Creative Media",
    highlight: "2nd Rank",
    featured: false,
    color: "#f472b6", // Pink
  },
]

interface CardProps {
  item: typeof achievements[0]
  dimmed: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  index: number
}

function Card({ item, dimmed, onHoverStart, onHoverEnd, index }: CardProps) {
  const Icon = item.icon
  const cardRef = useRef<HTMLDivElement>(null)

  const { ref: observeRef, isVisible } = useIntersection({ threshold: 0.1 })

  const normX = useMotionValue(0.5)
  const normY = useMotionValue(0.5)

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX])
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX])

  const rotateX = useSpring(rawRotateX, TILT_SPRING)
  const rotateY = useSpring(rawRotateY, TILT_SPRING)
  const glowOpacity = useSpring(0, GLOW_SPRING)

  // Only show the colored border when the glow opacity is greater than 0
  const borderColor = useTransform(glowOpacity, [0, 1], ["rgba(255, 255, 255, 0.1)", `${item.color}80`])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    normX.set((e.clientX - rect.left) / rect.width)
    normY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseEnter = () => {
    glowOpacity.set(1)
    onHoverStart()
  }

  const handleMouseLeave = () => {
    normX.set(0.5)
    normY.set(0.5)
    glowOpacity.set(0)
    onHoverEnd()
  }

  return (
    <div ref={observeRef} className={`${isVisible ? "animate-fade-up" : "opacity-0"} h-full`} style={{ animationDelay: `${index * 100}ms` }}>
      <motion.div
        animate={{
          scale: dimmed ? 0.98 : 1,
          opacity: dimmed ? 0.6 : 1,
        }}
        className={cn(
          "group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border p-5",
          "border-border/40 bg-card/20 shadow-sm",
          "transition-[border-color] duration-300"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          borderColor,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {/* Static accent tint — always visible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(ellipse at 20% 20%, ${item.color}08, transparent 70%)`,
          }}
        />

        {/* Hover glow layer */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(ellipse at 20% 20%, ${item.color}1a, transparent 70%)`,
          }}
        />

        {/* Icon badge */}
        <div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `${item.color}12`,
            boxShadow: `inset 0 0 0 1px ${item.color}20`,
          }}
        >
          <Icon size={18} strokeWidth={2} style={{ color: item.color }} />
        </div>

        {/* Text */}
        <div className="relative z-10 flex flex-col gap-2 flex-grow">
          <h3 className="font-bold text-lg text-foreground tracking-tight leading-tight">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground/70 leading-relaxed font-medium">
            {item.detail}
          </p>
          <div className="mt-auto pt-1">
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-300 tracking-wider uppercase",
                (item.highlight.toLowerCase().includes("rank") || item.highlight.toLowerCase().includes("top")) && "animate-pulse border-emerald-400/50"
              )}
              style={{
                backgroundColor: (item.highlight.toLowerCase().includes("rank") || item.highlight.toLowerCase().includes("top")) ? `${item.color}20` : `${item.color}10`,
                color: (item.highlight.toLowerCase().includes("rank") || item.highlight.toLowerCase().includes("top")) ? "#fff" : item.color,
                border: (item.highlight.toLowerCase().includes("rank") || item.highlight.toLowerCase().includes("top")) ? `1px solid ${item.color}80` : `1px solid ${item.color}20`,
                textShadow: (item.highlight.toLowerCase().includes("rank") || item.highlight.toLowerCase().includes("top")) ? `0 0 10px ${item.color}` : "none",
              }}
            >
              {item.highlight}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function AchievementsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersection()
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null)

  return (
    <section id="achievements" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl relative w-full overflow-hidden rounded-2xl">

        {/* Section header */}
        <div
          ref={titleRef}
          className={`relative mb-10 flex flex-col items-center text-center ${titleVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
            Recognition
          </span>
          <h2 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
            Achievements
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground/70">
            Milestones and recognition reflecting my dedication to design excellence.
          </p>
        </div>

        {/* Featured Achievements Row */}
        <div className="relative z-10 grid gap-4 sm:grid-cols-2 mb-4">
          {achievements.filter(a => a.featured).map((item, index) => (
            <div key={item.title} className="w-full h-full">
              <Card
                index={index}
                dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
                item={item}
                onHoverEnd={() => setHoveredTitle(null)}
                onHoverStart={() => setHoveredTitle(item.title)}
              />
            </div>
          ))}
        </div>

        {/* Other Achievements */}
        <div className="relative z-10 grid gap-4 sm:grid-cols-3">
          {achievements.filter(a => !a.featured).map((item, index) => (
            <div key={item.title} className="w-full h-full">
              <Card
                index={index + 2}
                dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
                item={item}
                onHoverEnd={() => setHoveredTitle(null)}
                onHoverStart={() => setHoveredTitle(item.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
