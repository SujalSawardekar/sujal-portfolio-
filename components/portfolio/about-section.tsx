"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { Monitor, Palette, Box, Smartphone, Award, Compass, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"

interface AboutSectionProps {
  mode: "uiux" | "visual"
}

// === ORIGINAL UI/UX CONSTANTS ===
const originalStats = [
  { value: "8.07", label: "CGPA" },
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects" },
  { value: "2x", label: "SIH Finalist" },
]

const originalCapabilities = [
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

export function AboutSection({ mode }: AboutSectionProps) {
  const { ref: sectionRef, isVisible } = useIntersection()

  // === VISUAL MODE CONSTANTS ===
  const visualCards = [
    {
      icon: GraduationCap,
      label: "CGPA",
      value: "8.07",
      desc: "Academic Excellence"
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: "3+ Years",
      desc: "Freelance & Agency"
    },
    {
      icon: Compass,
      label: "Projects",
      value: "30+",
      desc: "Delivered Assets"
    },
    {
      icon: Award,
      label: "Hackathons",
      value: "2x",
      desc: "National Finalist"
    }
  ]

  const visualSkills = [
    "Photoshop",
    "Premiere Pro",
    "After Effects",
    "Illustrator",
    "Figma",
    "Framer",
    "Motion Graphics",
    "Branding",
    "UI/UX"
  ]

  if (mode === "uiux") {
    /* ========================================================================= */
    /* 1. ORIGINAL UI/UX ABOUT SECTION (100% PRESERVED)                           */
    /* ========================================================================= */
    return (
      <section 
        id="about" 
        ref={sectionRef}
        className={`mx-auto mx-2 md:mx-6 my-6 md:my-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#F4F4F5] py-12 md:py-24 px-4 md:px-8 border border-zinc-200 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="mx-auto max-w-7xl text-left">
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
              {originalStats.map((stat, i) => (
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
            {originalCapabilities.map((cap, i) => (
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

  /* ========================================================================= */
  /* 2. NEW PREMIUM CINEMATIC ABOUT SECTION FOR VISUAL MODE                     */
  /* ========================================================================= */
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`relative px-6 py-28 overflow-hidden bg-black text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          
          <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950 group">
            <Image
              src="/images/sujal-portrait.png"
              alt="Sujal Sawardekar Portrait Creative"
              fill
              className="object-cover object-center grayscale opacity-80 group-hover:scale-103 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent mix-blend-multiply opacity-80" />
            <div className="absolute inset-0 border-[2px] rounded-[2.5rem] pointer-events-none opacity-40 border-amber-500 transition-colors" />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 block text-amber-500">
              — 01 / PROFILE
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif text-white">
              About Me
            </h2>

            <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 mb-10">
              Designer blending visual storytelling, motion design, and digital experiences to craft memorable creative work.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {visualCards.map((card, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-zinc-950 border border-white/5 p-5 flex flex-col justify-between hover:border-white/15 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                      {card.label}
                    </span>
                    <card.icon className="w-4 h-4 transition-transform group-hover:scale-110 duration-300 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white tracking-tight mb-1">
                      {card.value}
                    </h4>
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        <div className="relative w-full border-t border-b border-white/5 py-8 overflow-hidden whitespace-nowrap bg-zinc-950/40">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="inline-flex gap-8 animate-marquee whitespace-nowrap">
            {[...visualSkills, ...visualSkills, ...visualSkills].map((skill, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <span>{skill}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
