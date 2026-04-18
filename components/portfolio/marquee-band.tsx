"use client"

const skills = [
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Premiere Pro",
  "Spline 3D",
  "WordPress",
  "Webflow",
  "Canva",
  "UI/UX Design",
  "Branding",
  "Prototyping",
  "Responsive Design",
]

export function MarqueeBand() {
  return (
    <div className="relative overflow-hidden border-y border-border/20 bg-secondary/10 py-3">
      <div className="animate-marquee flex gap-6 whitespace-nowrap">
        {[...skills, ...skills].map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60 uppercase"
          >
            <span>{skill}</span>
            <span className="text-primary/20">{"//"}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
