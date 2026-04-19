import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
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

      const sections = navLinks.map((link) => link.href.slice(1))
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
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
    <header
      className={`fixed top-0 right-0 left-0 z-[100] transition-all duration-500 ${isScrolled || isMenuOpen
        ? "bg-background/80 shadow-lg shadow-background/20 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#"
          className="group flex items-center gap-2.5 text-foreground z-[110]"
          data-cursor-hover
        >
          <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/Sujal Logo 2.png"
              alt="Graphics by SS"
              fill
              className="object-contain"
              priority
            />
          </div>
        </a>

        <div className="flex items-center gap-6 z-[110]">
          <a
            href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="hidden sm:block rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            {"Resume"}
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-2 text-foreground transition-transform hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
            data-cursor-hover
          >
            <div className="relative h-6 w-8">
              <span className={`absolute left-0 h-0.5 w-8 bg-current transition-all duration-300 ${isMenuOpen ? "top-3 rotate-45" : "top-1"}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-8 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-8 bg-current transition-all duration-300 ${isMenuOpen ? "top-3 -rotate-45" : "top-5"}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 min-h-screen w-full bg-background/98 flex flex-col items-center justify-center backdrop-blur-3xl z-[105]"
          >
            <div className="flex flex-col items-center gap-6 sm:gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative overflow-hidden px-4 py-2"
                >
                  <span className={`text-4xl sm:text-7xl font-bold tracking-tighter uppercase transition-colors duration-300 ${activeSection === link.href.slice(1) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {link.label}
                  </span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-1 w-full bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-col items-center gap-6"
              >
                <a
                  href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="sm:hidden rounded-full bg-primary px-10 py-4 text-xl font-bold text-primary-foreground uppercase tracking-widest"
                >
                  Resume
                </a>
                
                <div className="flex gap-8 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  <a href="https://www.linkedin.com/in/sujalsawardekar27/" target="_blank" className="hover:text-primary transition-colors">LinkedIn</a>
                  <a href="https://github.com/SujalSawardekar" target="_blank" className="hover:text-primary transition-colors">GitHub</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

