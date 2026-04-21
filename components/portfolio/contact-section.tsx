"use client"

import { useState, type FormEvent } from "react"
import { useIntersection } from "@/hooks/use-intersection"
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"
import { Footer } from "./footer"
import { sendContactMessage } from "@/app/actions/contact"

export function ContactSection() {
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`mx-2 md:mx-6 my-4 rounded-[2rem] md:rounded-[2.5rem] bg-[#F4F4F5] py-8 md:py-12 px-4 md:px-10 border border-zinc-200 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="mx-auto max-w-7xl">
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
                className="group relative flex w-full items-center justify-between gap-6 rounded-full bg-zinc-900 pl-8 pr-1.5 py-1.5 hover:bg-zinc-800 transition-all duration-300 disabled:opacity-50 mt-auto"
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
