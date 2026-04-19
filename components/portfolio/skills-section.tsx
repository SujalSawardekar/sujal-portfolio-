"use client"

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

import { skillData, type PortfolioMode } from "@/lib/data"

export function SkillsSection() {
  const [localMode, setLocalMode] = useState<PortfolioMode>('uiux');
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const currentSkills = skillData[localMode]

  useEffect(() => {
    const init = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      // Section label + heading
      const headEls = sectionRef.current.querySelectorAll<HTMLElement>(".sk-head");
      gsap.fromTo(headEls, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headEls[0], start: "top 88%", toggleActions: "play none none none" },
      });
    };

    init();
  }, []);

  const categories: { id: PortfolioMode; label: string; color: string }[] = [
    { id: 'uiux', label: 'UI / UX', color: '#00f2ff' },
    { id: 'graphic', label: 'Graphic', color: '#ff8c00' },
    { id: 'video', label: 'Video Editing', color: '#00ffba' },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-20 md:py-28"
    >
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 40%, rgba(61,111,255,0.06) 0%, transparent 55%)`,
      }} />

      <div className="relative z-10 mx-auto max-w-5xl mb-12 flex flex-col items-center text-center">
        <span className="sk-head mb-1 block text-xs font-bold tracking-widest text-primary uppercase" style={{ opacity: 0 }}>
          My Toolkit
        </span>
        <h2 className="sk-head text-4xl font-bold text-foreground sm:text-5xl mb-6 tracking-tight" style={{ opacity: 0 }}>
          SKILLS & TOOLS
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={localMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Orbit */}
          <div ref={orbitRef} className="relative mx-auto mb-20" style={{ width: "min(400px, 80vw)", height: "min(400px, 80vw)" }}>
            {/* Sun */}
            <div className="orbit-sun absolute left-1/2 top-1/2" style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: `radial-gradient(circle, ${categories.find(c => c.id === localMode)?.color || 'var(--color-primary)'}, var(--color-accent))`,
              boxShadow: `0 0 30px ${categories.find(c => c.id === localMode)?.color || 'var(--color-primary)'}40`,
              animation: "pulse-sun 3s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }} />

            {/* Rings */}
            {[100, 130, 160, 190].map((r) => (
              <div key={r} className="orbit-ring absolute left-1/2 top-1/2 rounded-full" style={{
                width: `${r * 2 * 0.75}px`, height: `${r * 2 * 0.75}px`,
                border: `1px solid rgba(255,255,255,0.03)`,
                transform: "translate(-50%, -50%)",
              }} />
            ))}

            {/* Orbs */}
            {currentSkills.orbs.map((orb, i) => {
              const scaledRadius = orb.radius * 0.75;
              return (
                <motion.div 
                  key={orb.name} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: "backOut" }}
                  className="skill-orb absolute left-1/2 top-1/2 group" 
                  style={{
                    width: "40px", height: "40px", marginLeft: "-20px", marginTop: "-20px",
                    animation: `orbit ${orb.speed}s linear infinite`,
                    "--orbit-radius": `${scaledRadius}px`,
                  } as React.CSSProperties}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-[1.8]" style={{
                    background: "var(--color-card)", border: `1px solid ${orb.color}30`,
                    boxShadow: `0 0 10px ${orb.color}15`,
                  }}>
                    <span className="font-mono font-bold" style={{ fontSize: "0.7rem", color: orb.color, letterSpacing: "0.05em" }}>
                      {orb.abbr}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap px-4 py-2 rounded-xl" style={{
                      background: "var(--color-card)", border: "1px solid var(--color-border)", backdropFilter: "blur(16px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                    }}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-sans font-bold text-foreground" style={{ fontSize: "0.8rem" }}>{orb.name}</span>
                        <div className="h-[1px] w-full bg-border/50 my-0.5" />
                        <span className="font-mono text-primary font-bold" style={{ fontSize: "0.65rem" }}>{orb.exp} Exp</span>
                      </div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{
                        background: "var(--color-card)", borderRight: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)"
                      }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 mx-auto max-w-5xl mb-12 flex flex-col items-center text-center">
            {/* Compact Tab Switcher Moved Below Circle */}
            <div className="flex items-center justify-center p-1 rounded-full border border-border/40 bg-card/10 backdrop-blur-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setLocalMode(cat.id)}
                  suppressHydrationWarning
                  className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${
                    localMode === cat.id 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground/50 hover:text-foreground"
                  }`}
                >
                  {localMode === cat.id && (
                    <motion.div
                      layoutId="localSkillActive"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: cat.color }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
            {currentSkills.columns.map((col) => {
              const categoryColor = categories.find(c => c.id === localMode)?.color || 'var(--color-primary)';
              return (
                <div key={col.title} className="rounded-2xl border border-border/40 bg-card/10 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/20">
                  <h3 className="font-sans font-bold text-foreground mb-4 pb-2 border-b border-border/50 text-[11px] uppercase tracking-widest" style={{ color: categoryColor }}>
                    {col.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {col.items.map((item) => (
                      <li key={item} className="font-sans text-xs text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: categoryColor + '66' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
