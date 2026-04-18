import { projects } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"

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
                    <header className="mb-16">
                        <span className="mb-4 block text-sm font-medium tracking-widest text-primary uppercase animate-fade-up">
                            {project.category}
                        </span>
                        <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight sm:text-7xl animate-fade-up delay-100">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-200">
                            {project.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="rounded-full border border-border/50 bg-secondary/30 px-4 py-2 text-sm font-medium text-muted-foreground"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Hero Image */}
                    <div className="relative mb-20 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-secondary animate-fade-up delay-300">
                        <Image
                            src={project.image}
                            alt={`${project.title} featured image`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="mx-auto max-w-3xl space-y-16">
                        <section className="animate-fade-up">
                            <h2 className="mb-6 text-2xl font-semibold tracking-tight">The Challenge</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {project.problem}
                            </p>
                        </section>

                        <section className="animate-fade-up">
                            <h2 className="mb-6 text-2xl font-semibold tracking-tight">The Solution</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {project.solution}
                            </p>
                        </section>

                        <section className="animate-fade-up">
                            <h2 className="mb-6 text-2xl font-semibold tracking-tight">The Outcome</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {project.outcome}
                            </p>
                        </section>

                        <section className="pt-8 border-t border-border/50 animate-fade-up">
                            <a
                                href={project.link}
                                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
                            >
                                Launch Project
                                <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </a>
                        </section>
                    </div>

                </article>
            </main>
            <Footer />
        </SmoothScroll>
    )
}
