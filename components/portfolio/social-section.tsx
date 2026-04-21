"use client"

import { useIntersection } from "@/hooks/use-intersection"
import { ExternalLink } from "lucide-react"

const posts = [
    {
        shortcode: "DS-EXRICFuT",
        title: "Amppere Cable Reel",
        href: "https://www.instagram.com/ampperecable/reel/DS-EXRICFuT/",
    },
    {
        shortcode: "DVC_6CgD7w8",
        title: "Design Exploration",
        href: "https://www.instagram.com/p/DVC_6CgD7w8/",
    },
    {
        shortcode: "DSU0KipgYRS",
        title: "Amppere Cable Branding",
        href: "https://www.instagram.com/ampperecable/reel/DSU0KipgYRS/",
    },
    {
        shortcode: "Cw-iuMWMbjx",
        title: "Shreeman Legend Poster",
        href: "https://www.instagram.com/p/Cw-iuMWMbjx/?hl=en",
    },
]

export function SocialSection() {
    const { ref: sectionRef, isVisible } = useIntersection()

    return (
        <section 
            id="social" 
            ref={sectionRef}
            className={`mx-6 my-12 rounded-[2.5rem] bg-[#F4F4F5] py-24 px-8 border border-zinc-200 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
            <div className="mx-auto max-w-7xl">
                {/* Section header */}
                <div className="mb-20 flex flex-col items-center text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 mb-6 block">
                        06 — SOCIAL FEED
                    </span>
                    <h2 className="text-5xl font-serif text-zinc-900 tracking-tight leading-tight mb-8">
                       Latest Design <span className="italic font-light text-zinc-500">Explorations.</span>
                    </h2>
                    <p className="mx-auto text-zinc-500 font-light text-lg max-w-xl">
                        A glimpse into my creative laboratory and recent visual experiments.
                    </p>
                </div>

                {/* Posts grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {posts.map((post, i) => (
                        <div 
                            key={post.shortcode} 
                            className="flex flex-col gap-4"
                        >
                            {/* Instagram Container - White Bento Card style */}
                            <div className="group overflow-hidden rounded-[2rem] bg-white p-2 border border-zinc-100 shadow-sm aspect-[1/1.2] flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <iframe
                                    src={`https://www.instagram.com/p/${post.shortcode}/embed/`}
                                    className="w-full h-full rounded-[1.8rem] grayscale transition-all duration-700 group-hover:grayscale-0"
                                    frameBorder={0}
                                    scrolling="no"
                                    title={post.title}
                                />
                            </div>

                            {/* Title + link */}
                            <a
                                href={post.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between px-2"
                            >
                                <span className="text-[10px] font-bold text-zinc-400 group-hover:text-indigo-600 transition-colors uppercase tracking-[0.2em]">
                                    {post.title}
                                </span>
                                <ExternalLink size={12} className="text-zinc-300 group-hover:text-indigo-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* CTA - Interactive Action Button Style */}
                <div className="mt-20 flex justify-center">
                    <a
                        href="https://www.instagram.com/graphics.by_ss/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-6 rounded-full bg-white pl-8 pr-2 py-2 border border-zinc-100 shadow-sm hover:scale-105 transition-all duration-300"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900">Follow Journey</span>
                        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center transition-colors group-hover:bg-zinc-700">
                           <ExternalLink size={14} className="text-white" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
