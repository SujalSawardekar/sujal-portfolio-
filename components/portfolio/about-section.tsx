"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { Monitor, Palette, Box, Smartphone } from "lucide-react"

const stats = [
  { value: "8.07", label: "CGPA" },
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects" },
  { value: "2x", label: "SIH Finalist" },
]

const capabilities = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive, user-centered interfaces with a focus on accessibility and interactive prototyping.",
  },
  {
    icon: Monitor,
    title: "Web Design",
    description: "Building responsive, modern websites with strong visual hierarchy and clean layouts.",
  },
  {
    icon: Box,
    title: "3D & Interactive",
    description: "Immersive digital experiences with Spline 3D and interactive technologies.",
  },
  {
    icon: Smartphone,
    title: "Branding",
    description: "Developing brand identities, logos, and marketing creatives with design-first thinking.",
  },
]

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useIntersection()

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`mx-auto mx-2 md:mx-6 my-6 md:my-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#F4F4F5] py-12 md:py-24 px-4 md:px-8 border border-zinc-200 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 pointer-events-none">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
              01 — EXPERTISE
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-zinc-900 tracking-tight leading-none">
              Turning systems into <br />
              <span className="italic font-light text-zinc-500">living experiences.</span>
            </h2>
          </div>
          <p className="text-zinc-500 font-light text-lg max-w-sm leading-relaxed">
            I design interfaces that think, solve, and make every interaction count. 
            Form follows purpose, always.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          {/* Bio Card */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 lg:p-10 flex flex-col justify-center border border-zinc-100 shadow-sm space-y-5">
            <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-3xl">
              I’m <span className="text-zinc-900 font-medium">Sujal Sawardekar</span>, a UI/UX Designer crafting user-centric web interfaces, backed by a strong foundation in graphic design and video editing.
            </p>
            <p className="text-sm md:text-base font-light text-zinc-500 leading-relaxed max-w-3xl">
              Proficient in Figma and Adobe XD, I design responsive experiences, interactive prototypes, and brand systems that go beyond visuals—focused on clarity, usability, and real impact. I’ve worked across freelance projects and real-world client deliverables, turning complex ideas into functional designs under pressure.
            </p>
            <p className="text-sm md:text-base font-medium text-indigo-600 mt-2">
              I don’t design to decorate—I design to solve, simplify, and make every interaction count.
            </p>
          </div>

          {/* Stats Bento */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div 
                key={stat.label} 
                className="bg-white rounded-[2rem] p-6 flex flex-col justify-between hover:bg-zinc-50 border border-zinc-100 shadow-sm transition-colors group cursor-default"
              >
                <span className="text-indigo-600 font-bold text-4xl md:text-5xl tracking-tighter group-hover:scale-110 transition-transform block">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <div 
              key={cap.title}
              className="bg-white rounded-[2rem] p-8 hover:border-indigo-600/50 border border-zinc-100 shadow-sm transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <cap.icon className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-zinc-900 mb-3">{cap.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed overflow-hidden">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
