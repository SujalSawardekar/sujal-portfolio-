"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      let currentSection = ""
      const sections = navLinks.map((link) => link.href.slice(1))
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250) {
            currentSection = section
            break
          }
        }
      }
      setActiveSection(currentSection)
    }

    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-6 left-0 right-0 z-[999] px-6 pointer-events-none">
      <nav className={`mx-auto flex max-w-fit items-center gap-8 rounded-full p-1.5 transition-all duration-500 pointer-events-auto ${
        isScrolled 
        ? "bg-white/70 backdrop-blur-lg border border-zinc-200/50 scale-95 shadow-xl shadow-zinc-200/20" 
        : "glass-20 border border-white/10 scale-100"
      }`}>
        {/* Logo */}
        <a href="#" className="flex items-center pl-3">
          <div className="relative h-8 w-8">
            <Image
              src="/Sujal Logo 2.png"
              alt="Graphics by SS"
              fill
              className={`object-contain transition-all duration-500 ${isScrolled ? "invert opacity-80" : ""}`}
              priority
            />
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeSection === link.href.slice(1) 
                ? isScrolled ? "text-indigo-600" : "text-white" 
                : isScrolled 
                  ? "text-zinc-500/50 hover:text-zinc-900" 
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pr-1.5">
          <a
            href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              isScrolled 
              ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20" 
              : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex md:hidden items-center justify-center p-2 transition-transform hover:scale-110 ${isScrolled ? "text-zinc-900" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 min-h-screen w-full bg-black/90 flex flex-col items-center justify-center z-[105]"
          >
             <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-10 p-4 text-white hover:rotate-90 transition-transform"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
