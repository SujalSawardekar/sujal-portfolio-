"use client";

import { ExplorationMarquee } from "@/components/ui/exploration-marquee";
import { useIntersection } from "@/hooks/use-intersection";
import { Figma, ArrowRight, ExternalLink } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type PortfolioMode } from "@/lib/data";

export function FigmaShowcaseSection() {
    const { ref: titleRef, isVisible: titleVisible } = useIntersection();

    // Images from public/figma-showcase
    const images = [
        "/figma-showcase/AC/AC (1).png",
        "/figma-showcase/AC/AC (2).png",
        "/figma-showcase/AC/AC (3).png",
        "/figma-showcase/NE/NE (1).png",
        "/figma-showcase/NE/NE (2).png",
        "/figma-showcase/NE/NE (3).png",
        "/figma-showcase/CA/Match Center.png",
        "/figma-showcase/CA/Start.png",
        "/figma-showcase/CA/Stats ( All Batter).png",
        "/figma-showcase/AC/AC (4).png",
        "/figma-showcase/NE/NE (4).png",
        "/figma-showcase/AC/AC (6).png",
        "/figma-showcase/NE/NE (5).png",
        "/figma-showcase/CA/Stats ( All bowler -spin).png",
        "/figma-showcase/NE/NE (6).png",
    ];

    // Split images into 2 rows for the exploration marquee
    const row1 = images.slice(0, 8);
    const row2 = images.slice(8);

    const figmaLinks = [
        {
            name: "Nexus Engineering",
            url: "https://www.figma.com/proto/G3uplAC5c2bNY9LSYYkw0Y/NEXUS-ENGINEERING--Copy-?node-id=176-7767&p=f&viewport=-895%2C65%2C0.11&t=HnwdvXL9qCSDUbJG-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=176%3A7767&show-proto-sidebar=1&page-id=0%3A1",
        },
        {
            name: "Amppere Cable",
            url: "https://www.figma.com/proto/BYPEQJ9oNtsHE41mDWRqpo/AMPPERE-CABLE?page-id=141%3A666&node-id=354-828&viewport=-480%2C343%2C0.17&t=Do4N3Q7DZjiECsBv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=354%3A828&show-proto-sidebar=1",
        },
        {
            name: "Crick Analyzer",
            url: "https://www.figma.com/proto/aoWQpCDBlfYX1oh47DAOSx/Crick-analyzer--Og?page-id=0%3A1&node-id=362-12110&p=f&viewport=822%2C844%2C0.25&t=ywgxmLZid040VfP5-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=362%3A11796",
        },
    ];

    return (
        <section id="figma-showcase" className="relative overflow-hidden px-6 py-20 md:py-28">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div
                    ref={titleRef}
                    className={`mb-10 flex flex-col items-center text-center ${titleVisible ? "animate-fade-up" : "opacity-0"}`}
                >
                    <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
                        Figma Workspace
                    </span>
                    <h2 className="mb-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        UI / UX Explorations
                    </h2>
                    <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground/70">
                        A sneak peek into my active design files and creative playground.
                    </p>
                </div>
            </div>

            {/* Flat Multi-Row Marquee Showcase */}
            <div
                className={`mx-auto mb-10 w-full max-w-[100vw] overflow-visible ${titleVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                style={{ animationDelay: "200ms" }}
            >
                <ExplorationMarquee row1={row1} row2={row2} />
            </div>

            {/* Action Area */}
            <div
                className={`mx-auto flex max-w-7xl justify-center ${titleVisible ? "animate-fade-up" : "opacity-0"
                    }`}
                style={{ animationDelay: "400ms" }}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger
                        suppressHydrationWarning
                        className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-primary/40 focus:outline-none"
                    >
                        Explore Figma Files
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="min-w-[200px] rounded-2xl border-border/50 bg-card/80 p-2 backdrop-blur-xl">
                        {figmaLinks.map((link) => (
                            <DropdownMenuItem key={link.name} asChild>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground outline-none"
                                >
                                    {link.name}
                                    <ExternalLink className="h-4 w-4 opacity-50" />
                                </a>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    );
}
