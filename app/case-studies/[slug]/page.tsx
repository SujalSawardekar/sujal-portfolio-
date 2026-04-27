import { projects } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"
import { ProjectGallery } from "@/components/portfolio/project-gallery"

interface CaseStudyProps {
    params: Promise<{
        slug: string
    }>
}

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
    const resolvedParams = await params
    const project = projects.find((p) => p.slug === resolvedParams.slug)

    if (!project) {
        notFound()
    }

    // Mapping for figma showcase images
    const showcaseMapping: Record<string, string[]> = {
        "amppere-cable": ["AC (1).png", "AC (2).png", "AC (3).png", "AC (4).png", "AC (5).png", "AC (6).png"].map(img => `/figma-showcase/AC/${img}`),
        "nexus-engineering": ["NE (1).png", "NE (2).png", "NE (3).png", "NE (4).png", "NE (5).png", "NE (6).png"].map(img => `/figma-showcase/NE/${img}`),
        "crickanalyzer": ["Match Center.png", "Start.png", "Stats ( All Batter).png", "Stats ( All bowler -spin).png", "Player Analytics.png", "Ball by Ball.jpg"].map(img => `/figma-showcase/CA/${img}`),
        "design-sphere": ["Screenshot 2026-04-27 132832.png", "Screenshot 2026-04-27 141048.png", "Screenshot 2026-04-27 141151.png", "Screenshot 2026-04-27 141233.png", "Screenshot 2026-04-27 141653.png", "Screenshot 2026-04-27 141701.png"].map(img => `/figma-showcase/DS/${img}`),
        "krushi-sakhi": ["Diagnosis.png", "Profile-1.png", "Profile-1plant.png", "Profile.png"].map(img => `/figma-showcase/KS/${img}`),
    }

    const showcaseImages = showcaseMapping[project.slug] || []

    return (
        <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
                <article className="mx-auto max-w-5xl px-6">

                    {/* Back button */}
                    <Link
                        href="/#work"
                        className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Projects
                    </Link>

                    {/* Header */}
                    <header className="mb-20">
                        <div className="max-w-4xl">
                            <span className="mb-4 block text-sm font-bold tracking-[0.3em] text-primary uppercase">
                                {project.category}
                            </span>
                            <h1 className="mb-12 text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
                                {project.title}
                            </h1>
                        </div>

                        {/* Project Info Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-border/50">
                            <div>
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Role</span>
                                <span className="text-sm font-medium">UI/UX Designer</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Duration</span>
                                <span className="text-sm font-medium">2 Months</span>
                            </div>
                            <div className="col-span-2">
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Tools</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool) => (
                                        <span key={tool} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Hero Image */}
                    <div className="relative mb-32 aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] bg-secondary shadow-2xl">
                        <Image
                            src={project.image}
                            alt={`${project.title} featured image`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="mx-auto max-w-3xl space-y-32">
                        <section className="relative">
                            <div className="absolute -left-12 top-0 text-[100px] font-bold text-primary/5 select-none leading-none">01</div>
                            <h2 className="mb-8 text-4xl font-bold tracking-tight">The Challenge</h2>
                            <p className="text-xl leading-relaxed text-muted-foreground font-light">
                                {project.problem}
                            </p>
                        </section>

                        <section className="relative">
                            <div className="absolute -left-12 top-0 text-[100px] font-bold text-primary/5 select-none leading-none">02</div>
                            <h2 className="mb-8 text-4xl font-bold tracking-tight">The Solution</h2>
                            <p className="text-xl leading-relaxed text-muted-foreground font-light">
                                {project.solution}
                            </p>
                        </section>

                        {/* Interactive Gallery */}
                        <ProjectGallery images={showcaseImages} />

                        <section className="relative">
                            <div className="absolute -left-12 top-0 text-[100px] font-bold text-primary/5 select-none leading-none">03</div>
                            <h2 className="mb-8 text-4xl font-bold tracking-tight">The Outcome</h2>
                            <p className="text-xl leading-relaxed text-muted-foreground font-light">
                                {project.outcome}
                            </p>
                        </section>

                        {project.link !== "#" && (
                            <section className="pt-20 border-t border-border/50 text-center">
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] mb-8">Ready to see more?</span>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-4 rounded-full bg-primary px-12 py-6 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 shadow-2xl shadow-primary/20"
                                >
                                    View Live Project
                                    <ArrowUpRight size={22} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>
                            </section>
                        )}
                    </div>

                </article>
            </main>
            <Footer />
        </SmoothScroll>
    )
}

