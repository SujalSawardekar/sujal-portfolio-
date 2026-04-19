"use client"

import { ArrowUp, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full px-6">
      <div className="mx-auto max-w-7xl">
        {/* Integrated Footer Area - Enhanced & Attractive */}
        <div className="mt-10 pt-10 border-t border-border/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8">
            {/* Branding - More Premium */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 transition-transform duration-500 hover:scale-110">
                  <Image
                    src="/Sujal Logo 2.png"
                    alt="Sujal Sawardekar"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">Sujal Sawardekar</h3>
                  <p className="text-[10px] font-semibold text-primary/80 uppercase tracking-[0.2em]">UI/UX Designer</p>
                </div>
              </div>
            </div>

            {/* Social Links - Icon Badges */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex items-center gap-3">
                {[
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/sujalsawardekar27/", icon: <Linkedin size={16} /> },
                  {
                    name: "Behance", href: "https://www.behance.net/sujalsawardekar", icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.83 1.99 2.101 1.99.986 0 1.613-.484 1.86-1.11l3.027.17zM15.973 14h4.823c-.109-1.37-.78-2.06-2.365-2.06-1.548 0-2.284.72-2.458 2.06zm-5.422 1.065c.348.499.513 1.105.513 1.843 0 1.959-1.58 3.092-3.953 3.092H3V7h3.88c2.302 0 3.823 1.013 3.823 2.977 0 .812-.317 1.517-.978 1.988l-.001.002c.607.287 1.123.744 1.471 1.328l.356.77zM6.5 9.5H5v2h1.5c.825 0 1.25-.337 1.25-1s-.425-1-1.25-1zm.25 4.5H5v2h1.75c.825 0 1.25-.4 1.25-1s-.425-1-1.25-1z" />
                      </svg>
                    )
                  },
                  {
                    name: "Dribbble", href: "https://dribbble.com/graphicsbyss", icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.322-1.575 3.996-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.404 1.73 1.35 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.84 1.756 11.84c-.037 0-.07 0-.106-.002.002.282.023.56.058.834.29 2.392 1.48 4.51 3.27 5.903zm-3.44-7.25c.46.014 4.733.025 9.184-1.22-.824-1.467-1.71-2.87-2.63-4.152-2.544 1.2-4.49 3.354-5.553 5.37zm3.88-6.952c.934 1.297 1.83 2.71 2.65 4.19 2.514-.944 4.787-2.405 6.49-4.627-1.472-1.32-3.43-2.12-5.58-2.12-.56 0-1.11.056-1.64.16zm7.93-2.217c-1.76 2.34-4.095 3.916-6.676 4.888 1.044-1.835 2.06-3.594 2.995-5.163 1.29.05 2.52.35 3.68.875z" />
                      </svg>
                    )
                  },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-card/20 text-muted-foreground/60 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">{link.icon}</span>
                  </a>
                ))}
              </div>

              <a
                href="#top"
                onClick={scrollToTop}
                data-cursor-hover
                className="group flex items-center gap-3 rounded-full border border-border/50 bg-secondary/10 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                Back to top
                <ArrowUp size={14} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
