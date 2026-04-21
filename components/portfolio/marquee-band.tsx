"use client"

const skills = [
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Spline 3D",
  "UI/UX Design",
  "Webflow",
  "System Architecture",
  "Interactions",
]

export function MarqueeBand() {
  return (
    <div className="relative overflow-hidden glass-20 py-4 border-y border-white/5">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex items-center gap-12 text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase"
          >
            <span>{skill}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
          </span>
        ))}
      </div>
    </div>
  )
}
