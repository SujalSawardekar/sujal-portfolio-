"use client"

import { useState, type FormEvent } from "react"
import { useIntersection } from "@/hooks/use-intersection"
import { Send, Mail, MapPin, Phone, ArrowUpRight, ArrowUp, Linkedin } from "lucide-react"
import { Footer } from "./footer"
import { supabase } from "@/lib/supabase"

export function ContactSection() {
  const { ref: titleRef, isVisible: titleVisible } = useIntersection()
  const { ref: formRef, isVisible: formVisible } = useIntersection()
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

    // Check for placeholder credentials
    const isPlaceholder = 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "your_supabase_anon_key_here" ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isPlaceholder) {
      console.error("Supabase Error: Invalid or missing API Key in .env.local")
      setError("Contact form is not configured. Please add your Supabase API Key to .env.local")
      setIsSending(false)
      return
    }
    
    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formState.name, 
            email: formState.email, 
            subject: formState.subject || "No Subject",
            message: formState.message 
          }
        ])

      if (dbError) {
        console.error("Supabase DB Error:", {
          message: dbError.message,
          code: dbError.code,
          details: dbError.details,
          hint: dbError.hint
        });
        throw dbError;
      }

      setIsSent(true)
      setFormState({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSent(false), 3000)
    } catch (err: any) {
      console.error("Full Error Details:", err)
      const message = err.message || "Failed to send message. Please try again."
      setError(message.includes("relation") ? "Error: Database table 'contact_messages' not found." : message)
    } finally {
      setIsSending(false)
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 pt-20 md:pt-28 pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading - Standardized gap */}
        <div
          ref={titleRef}
          className={`mb-10 flex flex-col items-center text-center ${titleVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="mb-2 block text-sm font-medium tracking-widest text-primary uppercase">
            Get in Touch
          </span>
          <h2 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
            {"Let's Build Something Better."}
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Have a project in mind or want to collaborate?
          </p>
        </div>

        <div
          ref={formRef}
          className={`grid gap-8 lg:grid-cols-5 ${formVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {/* Left side - Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {[
              { icon: Phone, label: "Phone", value: "+91 7249232712", href: "tel:+917249232712" },
              { icon: Mail, label: "Email", value: "sujalsawardekar27@gmail.com", href: "mailto:sujalsawardekar27@gmail.com" },
              { icon: MapPin, label: "Location", value: "Chiplun, Maharashtra", href: null },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-card/20 border border-border/20 backdrop-blur-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Form - More compact */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border/40 bg-card/30 p-6 sm:p-7 backdrop-blur-md shadow-xl shadow-primary/5"
              suppressHydrationWarning
            >
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border/30 bg-background/40 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border/30 bg-background/40 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                  placeholder="What is this about?"
                  className="w-full rounded-lg border border-border/30 bg-background/40 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                  suppressHydrationWarning
                />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-border/30 bg-background/40 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                  suppressHydrationWarning
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                data-cursor-hover
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-xs font-bold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                suppressHydrationWarning
              >
                  {isSending ? "Sending..." : isSent ? "Sent!" : (
                  <>
                    Send Message
                    <Send size={14} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              {error && (
                <p className="mt-3 text-center text-xs font-medium text-destructive animate-fade-in">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  )
}
