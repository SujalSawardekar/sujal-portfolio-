"use client"

import { useState, type FormEvent } from "react"
import { useIntersection } from "@/hooks/use-intersection"
import { Mail, MapPin, Phone, ArrowUpRight, Linkedin, Instagram, FolderOpen, FileText } from "lucide-react"
import { Footer } from "./footer"
import { sendContactMessage } from "@/app/actions/contact"

interface ContactSectionProps {
  mode: "uiux" | "visual"
}

export function ContactSection({ mode }: ContactSectionProps) {
  const { ref: sectionRef, isVisible } = useIntersection()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError(null)

    try {
      const result = await sendContactMessage(formState)

      if (!result.success) {
        throw new Error(result.error)
      }

      setIsSent(true)
      setFormState({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSent(false), 3000)
    } catch (err: any) {
      console.error("Submission Error:", err)
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  // === VISUAL MODE SOCIALS ===
  const visualSocialLinks = [
    { label: "Resume", icon: FileText, value: "Download CV", href: "/resume.pdf" },
    { label: "Behance", icon: FolderOpen, value: "View Portfolio", href: "https://www.behance.net/sujalsawardekar" },
    { label: "LinkedIn", icon: Linkedin, value: "Connect on LI", href: "https://www.linkedin.com/in/sujalsawardekar27/" },
    { label: "Instagram", icon: Instagram, value: "Follow Graphics", href: "https://www.instagram.com/graphics.by_ss/" },
    { label: "Email", icon: Mail, value: "Write an Email", href: "mailto:sujalsawardekar27@gmail.com" }
  ]

  if (mode === "uiux") {
    /* ========================================================================= */
    /* 1. ORIGINAL UI/UX CONTACT SECTION (100% PRESERVED)                         */
    /* ========================================================================= */
    return (
      <section
        id="contact"
        ref={sectionRef}
        className={`mx-auto mx-2 md:mx-6 my-4 rounded-[2rem] md:rounded-[2.5rem] bg-[#F4F4F5] py-8 md:py-12 px-4 md:px-10 border border-zinc-200 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="mx-auto max-w-7xl text-left">
          {/* Section heading */}
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4 block">
              07 — CONNECT
            </span>
            <h2 className="text-4xl font-serif text-zinc-900 tracking-tight mb-3">
              Let&apos;s Build <span className="italic font-light text-zinc-500">Something Better.</span>
            </h2>
            <p className="mx-auto max-w-xl text-zinc-500 font-light text-sm leading-relaxed">
              Have a project in mind or want to collaborate? I&apos;m ready to transform your vision.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5 mb-0">
            {/* Left side - Info Info cards in Light Bento style */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              {[
                { icon: Phone, label: "Phone", value: "+91 72492 32712", href: "tel:+917249232712" },
                { icon: Mail, label: "Email", value: "sujalsawardekar27@gmail.com", href: "mailto:sujalsawardekar27@gmail.com" },
                { icon: MapPin, label: "Location", value: "Ratnagiri, Maharashtra", href: null },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="bg-white rounded-[2rem] p-6 flex items-center gap-5 group hover:bg-zinc-50 transition-colors border border-zinc-100 shadow-sm"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
                    <item.icon className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-zinc-900 hover:text-indigo-600 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-zinc-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Form - White Bento Card focus */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[2rem] p-10 border border-zinc-100 shadow-sm h-full flex flex-col gap-4"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Name</label>
                    <input
                      type="text"
                      required
                      suppressHydrationWarning
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-lg px-6 py-4 text-zinc-900 text-sm focus:border-indigo-600 transition-colors outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Email</label>
                    <input
                      type="email"
                      required
                      suppressHydrationWarning
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder="Email address"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-lg px-6 py-4 text-zinc-900 text-sm focus:border-indigo-600 transition-colors outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-lg px-6 py-4 text-zinc-900 text-sm focus:border-indigo-600 transition-colors outline-none resize-none"
                  />
                </div>

                {/* Interactive Action Button Style */}
                <button
                  type="submit"
                  suppressHydrationWarning
                  disabled={isSending}
                  className="group relative flex w-full items-center justify-between gap-6 rounded-full bg-zinc-900 pl-8 pr-1.5 py-1.5 hover:bg-zinc-800 transition-all duration-300 disabled:opacity-50 mt-auto cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                    {isSending ? "In Transit..." : isSent ? "Succeed" : "Send Inquiry"}
                  </span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-95 group-active:scale-90">
                    <ArrowUpRight size={16} className="text-black" />
                  </div>
                </button>

                {error && <p className="mt-4 text-center text-xs text-red-500 font-medium">{error}</p>}
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </section>
    )
  }

  /* ========================================================================= */
  /* 2. NEW PREMIUM CINEMATIC CONTACT SECTION FOR VISUAL DESIGNER               */
  /* ========================================================================= */
  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`mx-auto mx-2 md:mx-6 my-4 rounded-[2rem] md:rounded-[2.5rem] py-12 md:py-16 px-4 md:px-10 border bg-black border-white/5 text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-6xl text-left">
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 block text-amber-500">
            — 08 / CONNECT
          </span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-white">
            Let&apos;s Build <span className="italic font-light text-zinc-500">Something Better.</span>
          </h2>
          <p className="mx-auto max-w-xl font-light text-xs text-zinc-400 leading-relaxed">
            Have an open vacancy, visual project proposal, or want to collaborate? Write an inquiry or connect directly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 mb-8">
          
          {/* Left Side: Bento Directory Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visualSocialLinks.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-2xl p-5 border border-white/5 bg-zinc-950/60 hover:bg-zinc-900/40 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group h-32 text-left ${
                  item.label === "Email" ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">{item.label}</span>
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">{item.value}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Right Side: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] p-8 md:p-10 border border-white/5 bg-zinc-950 flex flex-col gap-5 h-full text-left"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Sujal Sawardekar"
                    className="w-full rounded-xl px-5 py-4 text-xs bg-black/40 border border-white/5 text-white placeholder:text-zinc-700 outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="inquiry@agency.com"
                    className="w-full rounded-xl px-5 py-4 text-xs bg-black/40 border border-white/5 text-white placeholder:text-zinc-700 outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  placeholder="Details about your industrial project or visual design requirements..."
                  className="w-full rounded-xl px-5 py-4 text-xs bg-black/40 border border-white/5 text-white placeholder:text-zinc-700 outline-none resize-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSending}
                className="group relative flex w-full items-center justify-between gap-6 rounded-full pl-8 pr-1.5 py-1.5 bg-white text-black hover:bg-amber-500 hover:scale-101 transition-all duration-300 disabled:opacity-50 mt-auto cursor-pointer"
              >
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                  {isSending ? "ESTIMATING TRANSIT..." : isSent ? "TRANSMITTED SUCCESSFULLY" : "SEND INQUIRY"}
                </span>
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:scale-95 shrink-0">
                  <ArrowUpRight size={14} />
                </div>
              </button>

              {error && <p className="mt-2 text-center text-xs text-red-500 font-medium">{error}</p>}
            </form>
          </div>

        </div>

        <Footer />
      </div>
    </section>
  )
}
