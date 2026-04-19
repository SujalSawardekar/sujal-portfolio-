"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { ScrambleText } from "./scramble-text"

function CustomHeroButton({ text, href }: { text: string; href: string }) {
  return (
    <div className="btn-wrapper group relative flex items-center justify-center p-[0.9rem_1.1rem]">
      <div className="line horizontal top absolute top-[-0.5px] h-[1px] w-full origin-top-left rotate-[5deg] scale-x-0 transition-all duration-300 group-hover:rotate-0 group-hover:scale-x-100 group-hover:duration-[0.35s] group-hover:delay-[0.28s]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 2px, var(--color-primary) 2px 4px)" }}></div>
      <div className="line vertical right absolute right-[-0.5px] h-full w-[1px] origin-top-right rotate-[5deg] scale-y-0 transition-all duration-300 group-hover:rotate-0 group-hover:scale-y-100 group-hover:duration-[0.35s] group-hover:delay-[0.49s]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, var(--color-primary) 2px 4px)" }}></div>
      <div className="line horizontal bottom absolute bottom-[-0.5px] h-[1px] w-full origin-bottom-right rotate-[5deg] scale-x-0 transition-all duration-300 group-hover:rotate-0 group-hover:scale-x-100 group-hover:duration-[0.35s] group-hover:delay-[0.70s]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 2px, var(--color-primary) 2px 4px)" }}></div>
      <div className="line vertical left absolute left-[-0.5px] h-full w-[1px] origin-bottom-left rotate-[5deg] scale-y-0 transition-all duration-300 group-hover:rotate-0 group-hover:scale-y-100 group-hover:duration-[0.35s] group-hover:delay-[0.84s]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, var(--color-primary) 2px 4px)" }}></div>

      {/* Dots */}
      <div className="dot top left absolute top-1/2 left-[20%] aspect-square w-[6px] rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:top-[-3px] group-hover:left-[-3px] group-hover:opacity-100 group-hover:duration-[0.35s]"></div>
      <div className="dot top right absolute top-1/2 right-[20%] aspect-square w-[6px] rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:top-[-3px] group-hover:right-[-3px] group-hover:opacity-100 group-hover:duration-[0.35s] group-hover:delay-[0.21s]"></div>
      <div className="dot bottom right absolute right-[20%] bottom-1/2 aspect-square w-[6px] rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:right-[-3px] group-hover:bottom-[-3px] group-hover:opacity-100 group-hover:duration-[0.35s] group-hover:delay-[0.42s]"></div>
      <div className="dot bottom left absolute bottom-1/2 left-[20%] aspect-square w-[6px] rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:bottom-[-3px] group-hover:left-[-3px] group-hover:opacity-100 group-hover:duration-[0.35s] group-hover:delay-[0.63s]"></div>

      <a
        href={href}
        className="btn relative flex cursor-pointer items-center justify-center rounded-[30%/200%] border-none bg-primary px-8 py-3.5 font-sans text-[15px] font-semibold tracking-wide text-primary-foreground uppercase shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_1px_1px_rgba(3,7,18,0.02),0_5px_4px_rgba(3,7,18,0.04),0_12px_9px_rgba(3,7,18,0.06),0_20px_15px_rgba(3,7,18,0.08),0_32px_24px_rgba(3,7,18,0.1)] transition-all duration-200 ease-in-out hover:scale-105 hover:rounded-[10%/200%] hover:bg-white active:scale-95 active:rounded-[20%/200%] active:bg-primary"
        style={{ backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.1))" }}
      >
        <span className="btn-text">{text}</span>
      </a>

      {/* Hover background glow */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-primary/20 group-hover:duration-[1.4s]"></div>
    </div>
  )
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Spline background constrained to the Hero section */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <div className="relative h-full w-full">
          <iframe
            src="https://my.spline.design/motiontrails-HNAoSu4e1lIjBPtCbd2OC3fz/"
            frameBorder="0"
            width="100%"
            height="100%"
            title="Spline Hero Background"
            className="pointer-events-none absolute top-0 left-0 h-[calc(100%+48px)] w-full transition-all duration-1000"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Status badge */}
        <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 opacity-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Open to opportunities
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up delay-100 mb-8 text-5xl font-bold leading-[1.1] tracking-tighter text-foreground opacity-0 sm:text-7xl lg:text-8xl">
          A User Interface is <br />
          <span className="text-primary">Not a joke</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up delay-300 mx-auto mb-10 max-w-lg text-sm leading-relaxed text-muted-foreground/60 opacity-0">
          If you have to explain it, it&apos;s not that good.
        </p>

        {/* Dynamic Role */}
        <p className="animate-fade-up delay-200 mx-auto mb-8 max-w-2xl text-lg font-semibold text-primary opacity-0 sm:text-2xl h-8">
          <ScrambleText texts={["UI/UX Designer", "Product Designer"]} />
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-400 mb-6 flex flex-col items-center justify-center gap-2 opacity-0 sm:flex-row sm:gap-4">
          <CustomHeroButton text="View Projects" href="#work" />
          <CustomHeroButton text="Get in Touch" href="#contact" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in delay-800 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0">
        <a
          href="#work"
          className="flex flex-col items-center gap-1.5 text-muted-foreground/40 transition-colors hover:text-primary"
        >
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
