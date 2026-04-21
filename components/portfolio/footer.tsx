"use client"

export function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full pt-10 pb-4 mt-8 border-t border-zinc-200 text-zinc-500">
      <div className="h-full mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 px-8 lg:px-6 py-0">
        
        {/* Copyright */}
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900">
          Sujal Sawardekar <span className="text-zinc-400 font-normal ml-2">© {new Date().getFullYear()}</span>
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-10">
          <a href="https://www.linkedin.com/in/sujalsawardekar27/" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/SujalSawardekar" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors">
            GitHub
          </a>
          <a href="https://www.behance.net/sujalsawardekar" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors">
            Behance
          </a>
          <a href="https://dribbble.com/graphicsbyss" target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-[0.15em] hover:text-indigo-600 transition-colors">
            Dribbble
          </a>
        </div>

        {/* Back to top */}
        <button
          suppressHydrationWarning
          onClick={scrollToTop}
          className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-indigo-600 transition-colors"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  )
}
