"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/80 shadow-lg shadow-background/20 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#"
          className="group flex items-center gap-2.5 text-foreground"
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

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className={`relative px-3.5 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${activeSection === link.href.slice(1)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </div>

        <a
          href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="hidden rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground lg:block"
        >
          {"Resume"}
        </a>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-foreground lg:hidden"
          aria-label="Toggle menu"
          suppressHydrationWarning
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium tracking-wide uppercase text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              {"Resume"}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
