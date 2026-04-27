"use client"

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { skillData, type PortfolioMode } from "@/lib/data"

export function SkillsSection() {
  const [localMode, setLocalMode] = useState<PortfolioMode>('uiux');
  const sectionRef = useRef<HTMLElement>(null);

  const currentSkills = skillData[localMode]

  useEffect(() => {
    const init = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const headEls = sectionRef.current.querySelectorAll<HTMLElement>(".sk-head");
      gsap.fromTo(headEls, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headEls[0], start: "top 88%", toggleActions: "play none none none" },
      });
    };

    init();
  }, []);

  const categories: { id: PortfolioMode; label: string; color: string }[] = [
    { id: 'uiux', label: 'UI / UX', color: '#10b981' },
    { id: 'graphic', label: 'Graphic', color: '#10b981' },
    { id: 'video', label: 'Video Editing', color: '#10b981' },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="mx-auto mx-2 md:mx-6 my-6 md:my-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#F4F4F5] py-12 md:py-24 px-4 md:px-8 border border-zinc-200 relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-5xl mb-20 flex flex-col items-center text-center">
        <span className="sk-head text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
           05 — TOOLKIT
        </span>
        <h2 className="sk-head text-5xl font-serif text-zinc-900 tracking-tight leading-tight mb-8">
           Skills & Expert <span className="italic font-light text-zinc-500">Execution.</span>
        </h2>
        
        {/* Tab Switcher */}
        <div className="flex items-center justify-center p-1.5 rounded-full bg-white border border-zinc-200 shadow-sm relative z-20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              suppressHydrationWarning
              onClick={() => setLocalMode(cat.id)}
              className="relative px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full"
            >
              {localMode === cat.id && (
                <motion.div
                  layoutId="activeSkillTabLight"
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  style={{ zIndex: 1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative flex items-center justify-center`} style={{ zIndex: 10, color: localMode === cat.id ? "white" : "#71717a" }}>
                 {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={localMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* Grid Layout of Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            {currentSkills.columns.map((col, idx) => (
              <div 
                key={col.title} 
                className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-xl text-zinc-900 tracking-tight">
                    {col.title}
                  </h3>
                  <span className="text-[10px] font-bold text-zinc-200">0{idx + 1}</span>
                </div>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-100 group-hover:bg-indigo-500 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
