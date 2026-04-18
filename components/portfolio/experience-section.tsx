"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { type PortfolioMode } from "@/lib/data"

const experiences = [
  {
    period: "Jul 2025 – Sep 2025",
    role: "UI/UX Design Intern",
    company: "JAPFA Pvt. Ltd., Pune",
    description: [
      "Contributed to user interface improvements across digital platforms",
      "Designed digital creatives and brand communication materials",
      "Assisted in improving online visual identity and marketing content",
      "Collaborated with marketing and product teams on design deliverables",
    ],
    tags: ["Figma", "Photoshop", "Canva", "Branding"],
  },
  {
    period: "Sep 2024 - May 2025",
    role: "UI/UX Designer & Content Designer (Intern)",
    company: "Haloxion",
    description: [
      "Designing intuitive web interfaces for client-facing products",
      "Creating branding and marketing creatives for digital campaigns",
      "UI/UX prototyping and iterative design improvements",
      "Video editing and digital experience enhancement",
    ],
    tags: ["Figma", "Adobe XD", "Photoshop", "Premiere Pro", "Canva"],
  },
  {
    period: "2019 - Present",
    role: "Freelance Graphic Designer",
    company: "Independent",
    description: [
      "Logo design and full brand identity systems",
      "Branding materials including business cards and letterheads",
      "Posters, brochures, and invitation designs",
      "Client-based custom creative solutions across industries",
    ],
    tags: ["Photoshop", "Canva", "Branding", "Print Design"],
  },
]

function ExperienceItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  const { ref, isVisible } = useIntersection({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`group relative flex gap-6 ${
        isVisible ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Timeline */}
      <div className="hidden flex-col items-center sm:flex">
        <div className="h-4 w-4 rounded-full border-2 border-primary bg-background transition-colors duration-300 group-hover:bg-primary" />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 bg-border/50" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="rounded-xl border border-border/40 bg-card/20 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-card/40 sm:p-6">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {experience.role}
              </h3>
              <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider">{experience.company}</p>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground/50 font-mono uppercase tracking-widest">
              {experience.period}
            </span>
          </div>
          <ul className="mb-4 flex flex-col gap-1.5">
            {experience.description.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground/80"
              >
                <span className="mt-1.5 block h-1 w-1 flex-shrink-0 rounded-full bg-primary/40" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/5 border border-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary/70 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export function ExperienceSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersection()

  return (
    <section id="experience" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`mb-10 flex flex-col items-center text-center ${titleVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
            Experience
          </span>
          <h2 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
            Professional Journey
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground/70">
            My journey in design, branding, and digital experience creation.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={experience.company}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
