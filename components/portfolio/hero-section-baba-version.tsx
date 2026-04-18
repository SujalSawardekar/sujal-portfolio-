"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown, Linkedin, Mail } from "lucide-react"
import { ScrambleText } from "./scramble-text"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

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
  const [isHovered, setIsHovered] = useState(false)
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
            className="pointer-events-none absolute top-0 left-0 h-[calc(100%+48px)] w-full"
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

        {/* Antigravity Character Illustration - Primary Focus */}
        <motion.div 
          className="animate-fade-up delay-100 relative mx-auto mb-10 flex h-[350px] w-full max-w-[450px] items-center justify-center opacity-0 sm:h-[450px]"
          whileHover="hover"
          initial="initial"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 1, -1, 0],
            }}
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative h-full w-full"
          >
            {/* Code-based Floating Particles for Magical Effect */}
            <div className="absolute inset-0 -z-5 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, (i % 2 === 0 ? 20 : -20), 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute h-1 w-1 rounded-full bg-primary/40 blur-[1px]"
                  style={{
                    top: `${20 + (i * 7) % 60}%`,
                    left: `${15 + (i * 13) % 70}%`,
                  }}
                />
              ))}
            </div>

            {/* Layered Images for Smooth Cross-fade */}
            <div className="relative h-full w-full">
              <motion.div
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/baba-floating.png"
                  alt="Antigravity Character Floating"
                  fill
                  className="object-contain"
                  style={{ mixBlendMode: "screen" }}
                  priority
                />
              </motion.div>
              
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/baba-grabbed.png"
                  alt="Antigravity Character Grabbed"
                  fill
                  className="object-contain"
                  style={{ mixBlendMode: "screen" }}
                  priority
                />
              </motion.div>
            </div>
            
            {/* Soft glowing aura */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              variants={{
                initial: { opacity: 0.4 },
                hover: { opacity: 0.8, scale: 1.2, backgroundColor: "var(--color-primary)" }
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-[60px]"
            />

            {/* Dialogue Bubble on Hover */}
            <motion.div
              variants={{
                initial: { opacity: 0, scale: 0.8 },
                hover: { opacity: 1, scale: 1 }
              }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
              <div className="bg-background/90 backdrop-blur-md border border-primary/30 px-5 py-2.5 rounded-2xl shadow-xl shadow-primary/10">
                <p className="text-sm font-bold text-primary whitespace-nowrap">{"Thinking about the next big UI..."}</p>
                {/* Bubble tail */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-background/90 border-r border-b border-primary/30 rotate-45" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Roles & CTAs */}
        <p className="animate-fade-up delay-200 mx-auto mb-6 max-w-2xl text-xl font-bold text-foreground opacity-0 sm:text-3xl h-10">
          <ScrambleText texts={["UI/UX Designer", "Graphic Designer", "3D Web Enthusiast"]} />
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 mb-10 flex flex-col items-center justify-center gap-2 opacity-0 sm:flex-row sm:gap-4">
          <CustomHeroButton text="View Projects" href="#work" />
          <CustomHeroButton text="Get in Touch" href="#contact" />
        </div>

        {/* Social links - Smaller & Cleaner */}
        <div className="animate-fade-up delay-500 flex items-center justify-center gap-3 opacity-0">
          {([
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sujalsawardekar27/", icon: <Linkedin size={18} /> },
            {
              label: "Behance", href: "https://www.behance.net/sujalsawardekar", icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.83 1.99 2.101 1.99.986 0 1.613-.484 1.86-1.11l3.027.17zM15.973 14h4.823c-.109-1.37-.78-2.06-2.365-2.06-1.548 0-2.284.72-2.458 2.06zm-5.422 1.065c.348.499.513 1.105.513 1.843 0 1.959-1.58 3.092-3.953 3.092H3V7h3.88c2.302 0 3.823 1.013 3.823 2.977 0 .812-.317 1.517-.978 1.988l-.001.002c.607.287 1.123.744 1.471 1.328l.356.77zM6.5 9.5H5v2h1.5c.825 0 1.25-.337 1.25-1s-.425-1-1.25-1zm.25 4.5H5v2h1.75c.825 0 1.25-.4 1.25-1s-.425-1-1.25-1z" />
                </svg>
              )
            },
            {
              label: "Dribbble", href: "https://dribbble.com/graphicsbyss", icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                  <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.322-1.575 3.996-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.404 1.73 1.35 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.84 1.756 11.84c-.037 0-.07 0-.106-.002.002.282.023.56.058.834.29 2.392 1.48 4.51 3.27 5.903zm-3.44-7.25c.46.014 4.733.025 9.184-1.22-.824-1.467-1.71-2.87-2.63-4.152-2.544 1.2-4.49 3.354-5.553 5.37zm3.88-6.952c.934 1.297 1.83 2.71 2.65 4.19 2.514-.944 4.787-2.405 6.49-4.627-1.472-1.32-3.43-2.12-5.58-2.12-.56 0-1.11.056-1.64.16zm7.93-2.217c-1.76 2.34-4.095 3.916-6.676 4.888 1.044-1.835 2.06-3.594 2.995-5.163 1.29.05 2.52.35 3.68.875z" />
                </svg>
              )
            },
            { label: "Mail", href: "mailto:sujalsawardekar27@gmail.com", icon: <Mail size={18} /> },
          ] as { label: string; href: string; icon: React.ReactNode }[]).map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={label === "Mail" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label={label}
              className="group rounded-full border border-border/40 p-2.5 text-muted-foreground/60 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <span className="transition-transform duration-300 group-hover:scale-110 block">
                {icon}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in delay-800 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0">
        <a
          href="#work"
          className="flex flex-col items-center gap-1.5 text-muted-foreground/40 transition-colors hover:text-primary"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">
            Work
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
