"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { motion } from "framer-motion"

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

export function ExperienceSection() {
  const { ref: sectionRef, isVisible } = useIntersection()

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="mx-2 md:mx-6 my-6 md:my-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#18181B] py-12 md:py-24 px-4 md:px-8 border border-white/5 relative overflow-hidden"
    >
      {/* Grid Lineart Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        {/* Left side - Numbered Steps */}
        <div className="lg:w-1/2">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-6 block">
              03 — PRODUCTIVITY
            </span>
            <h2 className="text-5xl font-serif text-white tracking-tight leading-none mb-6">
               The Professional <br />
               <span className="italic font-light opacity-80 text-zinc-400">Execution Block.</span>
            </h2>
            <p className="text-zinc-500 font-light text-lg leading-relaxed max-w-md">
              A systematic approach to solving complex interface challenges through rigorous research and design.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div 
                key={exp.company}
                className="rounded-2xl bg-zinc-900 border border-white/5 p-8 flex gap-6 hover:bg-zinc-800 transition-colors"
              >
                <span className="text-3xl font-serif text-indigo-500/30">0{i+1}</span>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                   <p className="text-sm text-zinc-400 mb-4">{exp.company} — {exp.period}</p>
                   <ul className="mb-4 space-y-2">
                     {exp.description.map((desc, idx) => (
                       <li key={idx} className="text-sm text-zinc-400 font-light flex items-start gap-2">
                         <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                         <span>{desc}</span>
                       </li>
                     ))}
                   </ul>
                   <div className="flex flex-wrap gap-2">
                     {exp.tags.map(tag => (
                       <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">{tag}</span>
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - 3D Transformed Mock-up */}
        <div className="lg:w-1/2 flex justify-center">
          <motion.div 
            initial={{ rotate: 0, scale: 0.9, opacity: 0, y: 30 }}
            whileInView={{ rotate: -2, scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Window Header */}
            <div className="h-12 border-b border-white/5 bg-[#121214] flex items-center px-5 justify-between shrink-0">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-800" />
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Workspace / Design System
              </div>
              <div className="w-4 h-4 rounded bg-white/5" />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col gap-6 w-full h-[320px] relative">
               {/* Animated Grid Background inside mockup */}
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
               }} />

               {/* Top Hero block */}
               <div className="relative z-10 w-full h-12 bg-zinc-900 border border-white/5 rounded-xl flex items-center px-4 justify-between">
                 <div className="w-1/3 h-2 bg-indigo-500/20 rounded-full" />
                 <div className="flex gap-2">
                   <div className="w-6 h-6 rounded-full bg-white/5" />
                   <div className="w-6 h-6 rounded-full bg-indigo-500/20" />
                 </div>
               </div>

               {/* Grid elements */}
               <div className="relative z-10 grid grid-cols-2 gap-4">
                  {/* Card 1: Progress */}
                  <div className="h-28 bg-zinc-900 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                         <div className="w-4 h-4 rounded-md bg-indigo-500/40" />
                      </div>
                      <div className="w-8 h-3 rounded-full bg-white/5" />
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
                       <motion.div 
                         initial={{ width: "0%" }}
                         whileInView={{ width: "75%" }}
                         transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                         className="h-full bg-indigo-500" 
                       />
                    </div>
                  </div>
                  
                  {/* Card 2: Metrics */}
                  <div className="h-28 bg-zinc-900 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                         <div className="w-4 h-4 rounded-md bg-emerald-500/40" />
                      </div>
                      <div className="w-8 h-3 rounded-full bg-white/5" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="w-full h-1.5 bg-white/10 rounded-full" />
                      <div className="w-2/3 h-1.5 bg-white/5 rounded-full" />
                    </div>
                  </div>
               </div>

               {/* Floating elements */}
               <motion.div 
                 animate={{ y: [-4, 4, -4] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-[#18181b]/80 border border-indigo-500/20 px-5 py-4 rounded-2xl backdrop-blur-md shadow-2xl"
               >
                 <div className="flex items-center gap-3">
                   <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                   </span>
                   <span className="text-[10px] uppercase font-bold text-white tracking-widest">Active Workspace</span>
                 </div>
                 <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                   Updating...
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
