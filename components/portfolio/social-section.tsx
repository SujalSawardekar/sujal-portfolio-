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
        title: "Shreeman Legend Album Song Poster",
        href: "https://www.instagram.com/p/Cw-iuMWMbjx/?hl=en",
    },
]

export function SocialSection() {
    const { ref: headRef, isVisible: headVisible } = useIntersection()
    const { ref: gridRef, isVisible: gridVisible } = useIntersection()

    return (
        <section id="social" className="px-6 py-20 md:py-28">
            <div className="mx-auto max-w-7xl">
                {/* Section header */}
                <div
                    ref={headRef}
                    className={`mb-10 flex flex-col items-center text-center ${headVisible ? "animate-fade-up" : "opacity-0"}`}
                >
                    <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
                        Social Feed
                    </span>
                    <h2 className="mb-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        LATEST POSTS
                    </h2>
                    <p className="mx-auto text-sm text-muted-foreground/70 max-w-xl">
                        Check out some of my recent design explorations and creative work over on Instagram.
                    </p>
                </div>

                {/* Posts grid */}
                <div
                    ref={gridRef}
                    className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${gridVisible ? "animate-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: "200ms" }}
                >
                    {posts.map((post) => (
                        <div key={post.shortcode} className="flex flex-col gap-2">
                            {/* Instagram embedded iframe */}
                            <div className="overflow-hidden rounded-xl border border-border/40 bg-card/20">
                                <iframe
                                    src={`https://www.instagram.com/p/${post.shortcode}/embed/`}
                                    className="w-full"
                                    height="330"
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
                                data-cursor-hover
                                className="group flex items-center gap-1.5 text-xs font-bold text-foreground transition-colors hover:text-primary uppercase tracking-wider"
                            >
                                {post.title}
                                <ExternalLink
                                    size={10}
                                    className="text-muted-foreground/50 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className={`mt-10 flex justify-center ${gridVisible ? "animate-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: "400ms" }}
                >
                    <a
                        href="https://www.instagram.com/graphics.by_ss/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        View all on Instagram
                        <ExternalLink size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </section>
    )
}
