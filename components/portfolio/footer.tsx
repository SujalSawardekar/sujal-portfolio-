"use client"

export function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full pt-8 pb-4 mt-6 border-t border-zinc-200 text-zinc-500">
      <div className="mx-auto max-w-7xl px-6">

        {/* Mobile: stacked layout — Desktop: single row */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
          
          {/* Copyright */}
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-900 whitespace-nowrap">
            Sujal Sawardekar <span className="text-zinc-400 font-normal ml-1">© {new Date().getFullYear()}</span>
          </div>

          {/* Links - wrap on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href="https://www.linkedin.com/in/sujalsawardekar27/" target="_blank" rel="noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors whitespace-nowrap">
              LinkedIn
            </a>
            <a href="https://github.com/SujalSawardekar" target="_blank" rel="noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors whitespace-nowrap">
              GitHub
            </a>
            <a href="https://www.behance.net/sujalsawardekar" target="_blank" rel="noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors whitespace-nowrap">
              Behance
            </a>
            <a href="https://dribbble.com/graphicsbyss" target="_blank" rel="noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors whitespace-nowrap">
              Dribbble
            </a>
            <a href="https://medium.com/@sujalsawardekar27" target="_blank" rel="noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors whitespace-nowrap">
              Medium
            </a>
            <a href="https://www.instagram.com/graphics.by_ss/" target="_blank" rel="noreferrer"
              className="text-xs font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors whitespace-nowrap">
              Instagram
            </a>
          </div>

          {/* Back to top */}
          <button
            suppressHydrationWarning
            onClick={scrollToTop}
            className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-indigo-600 transition-colors whitespace-nowrap"
          >
            Back to Top ↑
          </button>
        </div>

      </div>
    </footer>
  )
}
