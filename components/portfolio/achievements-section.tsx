"use client"

import { Trophy, Star, Award, Medal, Video } from "lucide-react"
import { useIntersection } from "@/hooks/use-intersection"

const achievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon 2023",
    detail: "Grand Finale",
    rank: "TOP 2",
    context: "OUT OF 285 TEAMS",
    colorTheme: "amber",
    className: "md:col-span-1",
  },
  {
    icon: Trophy,
    title: "Smart India Hackathon 2024",
    detail: "Grand Finale",
    rank: "TOP 5",
    context: "OUT OF 118 TEAMS",
    colorTheme: "blue",
    className: "md:col-span-1",
  },
  {
    icon: Star,
    title: "Best Outgoing Student",
    detail: "Academic Excellence",
    rank: "TOP 2",
    context: "OF BATCH",
    colorTheme: "indigo",
    className: "md:col-span-1",
  },
  {
    icon: Award,
    title: "Graphic Design Competition",
    detail: "Creative Excellence",
    rank: "1ST RANK",
    context: "",
    colorTheme: "emerald",
    className: "md:col-span-1",
  },
  {
    icon: Medal,
    title: "Video Competition",
    detail: "Creative Media",
    rank: "2ND RANK",
    context: "",
    colorTheme: "rose",
    className: "md:col-span-1",
  },
]

const colorClasses: Record<string, string> = {
  amber: "text-amber-500/80 border-amber-500/30 bg-amber-500/10",
  blue: "text-blue-500/80 border-blue-500/30 bg-blue-500/10",
  indigo: "text-indigo-400/80 border-indigo-500/30 bg-indigo-500/10",
  emerald: "text-emerald-500/80 border-emerald-500/30 bg-emerald-500/10",
  rose: "text-rose-500/80 border-rose-500/30 bg-rose-500/10",
}

const iconColorClasses: Record<string, string> = {
  amber: "text-amber-500",
  blue: "text-blue-500",
  indigo: "text-indigo-400",
  emerald: "text-emerald-500",
  rose: "text-rose-500",
}

const iconContainerClasses: Record<string, string> = {
  amber: "border-amber-500/20 bg-amber-500/5",
  blue: "border-blue-500/20 bg-blue-500/5",
  indigo: "border-indigo-500/20 bg-indigo-500/5",
  emerald: "border-emerald-500/20 bg-emerald-500/5",
  rose: "border-rose-500/20 bg-rose-500/5",
}

export function AchievementsSection() {
  const { ref: sectionRef, isVisible } = useIntersection()

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className={`mx-2 md:mx-6 my-6 md:my-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#09090b] py-12 md:py-24 px-4 md:px-8 border border-white/5 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-6 block">
            04 — RECOGNITION
          </span>
          <h2 className="text-5xl font-serif text-white tracking-tight mb-4">
             Milestones of <span className="italic font-light text-zinc-500">Excellence.</span>
          </h2>
          <p className="mx-auto max-w-xl text-zinc-500 font-light text-lg leading-relaxed">
            Recognition which reflects dedication and technical precision.
          </p>
        </div>

        {/* Custom Bento Grid Layout matching screenshot */}
        <div className="flex flex-col gap-4">
          {/* Top Row: 2 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.slice(0, 2).map((item, i) => (
              <div 
                key={i} 
                className="bg-[#0f0f11] rounded-2xl border border-white/5 p-8 flex flex-col"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 border ${iconContainerClasses[item.colorTheme]}`}>
                  <item.icon className={`w-5 h-5 ${iconColorClasses[item.colorTheme]}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <span className="text-sm font-medium text-zinc-500 mb-6">{item.detail}</span>
                <span className={`self-start text-[10px] font-bold px-3 py-1.5 rounded-full border ${colorClasses[item.colorTheme]}`}>
                  <span className="text-white mr-1">{item.rank}</span>
                  {item.context && <span>{item.context}</span>}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Row: 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {achievements.slice(2, 5).map((item, i) => (
              <div 
                key={i} 
                className="bg-[#0f0f11] rounded-2xl border border-white/5 p-8 flex flex-col"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 border ${iconContainerClasses[item.colorTheme]}`}>
                  <item.icon className={`w-5 h-5 ${iconColorClasses[item.colorTheme]}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <span className="text-sm font-medium text-zinc-500 mb-6">{item.detail}</span>
                <span className={`self-start text-[10px] font-bold px-3 py-1.5 rounded-full border ${colorClasses[item.colorTheme]}`}>
                  <span className="text-white mr-1">{item.rank}</span>
                  {item.context && <span>{item.context}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
