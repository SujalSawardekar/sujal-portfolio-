"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { Monitor, Palette, Box, Smartphone } from "lucide-react"
import { type PortfolioMode } from "@/lib/data"

const stats = [
  { value: "8.07", label: "CGPA" },
  { value: "5+", label: "Years Design Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "2x", label: "SIH Grand Finalist" },
]

const capabilities = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive, user-centered interfaces using Figma and Adobe XD with a focus on accessibility, wireframing, and interactive prototyping.",
  },
  {
    icon: Monitor,
    title: "Web Design",
    description:
      "Building responsive, modern websites with clean layouts and strong visual hierarchy using WordPress, Webflow, and no-code tools.",
  },
  {
    icon: Box,
    title: "3D & Interactive Web",
    description:
      "Exploring immersive digital experiences with Spline 3D and interactive web technologies to push the boundaries of web design.",
  },
  {
    icon: Smartphone,
    title: "Branding & Graphics",
    description:
      "Developing brand identities, logos, marketing creatives, posters, and brochures with Photoshop, Canva, and design-first thinking.",
  },
]

export function AboutSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersection()
  const { ref: statsRef, isVisible: statsVisible } = useIntersection()
  const { ref: capRef, isVisible: capVisible } = useIntersection()

  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Centered Header */}
        <div
          ref={titleRef}
          className={`mb-10 flex flex-col items-center text-center transition-all duration-700 ${titleVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <span className="mb-4 block text-sm font-medium tracking-widest text-primary uppercase">
            About Me
          </span>
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl leading-tight">
            Designing Purposeful Systems
          </h2>
        </div>

        {/* Bio and Stats Side-by-Side Row */}
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-center mb-10">
          {/* Left: Bio Text */}
          <div
            className={`lg:col-span-3 space-y-6 text-lg leading-relaxed text-muted-foreground text-left transition-all duration-700 delay-200 ${titleVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <p>
              I&apos;m a BE Computer Engineering student (8.07 CGPA) with a deep focus on UI/UX design. I use Figma and Adobe XD to design interfaces that are not just beautiful, but genuinely useful. My work spans responsive web design, prototyping, and brand identity.
            </p>
          </div>

          {/* Right: Stats Grid - BOXES RESTORED */}
          <div
            ref={statsRef}
            className={`lg:col-span-2 grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${statsVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-card/60"
              >
                <div className="relative z-10">
                  <div className="mb-0.5 text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                    {stat.label}
                  </div>
                </div>
                {/* Subtle background accent */}
                <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-primary/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid - BOXES RESTORED, PRUNED */}
        <div
          ref={capRef}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${capVisible ? "animate-fade-up" : "opacity-0"
            }`}
        >
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="group rounded-2xl border border-border/50 bg-card/30 p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card/60"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <cap.icon size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {cap.description.split('.')[0]}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
