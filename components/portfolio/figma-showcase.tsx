"use client";

import { ExplorationMarquee } from "@/components/ui/exploration-marquee";
import { useIntersection } from "@/hooks/use-intersection";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FigmaShowcaseSection() {
    const { ref: sectionRef, isVisible } = useIntersection();

    const images = [
        "/figma-showcase/AC/AC (1).png",
        "/figma-showcase/KS/Profile.png",
        "/figma-showcase/DS/Screenshot 2026-04-27 141048.png",
        "/figma-showcase/NE/NE (1).png",
        "/figma-showcase/CA/Match Center.png",
        "/figma-showcase/KS/Diagnosis.png",
        "/figma-showcase/DS/Screenshot 2026-04-27 141233.png",
        "/figma-showcase/AC/AC (2).png",
        "/figma-showcase/NE/NE (2).png",
        "/figma-showcase/CA/Stats ( All Batter).png",
        "/figma-showcase/KS/Profile-1.png",
        "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
        "/figma-showcase/NE/NE (3).png",
        "/figma-showcase/KS/Profile-1plant.png",
        "/figma-showcase/CA/Start.png",
        "/figma-showcase/DS/Screenshot 2026-04-27 141701.png",
    ];

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
        {
            name: "Krushi Sakhi",
            url: "https://www.figma.com/proto/sgpDp7IXX22ITz2bAdMH4d/Krushi-Sakhi?node-id=153-309&p=f&viewport=5671%2C60%2C0.78&t=A6jR1DQGvNd5b4C9-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&page-id=0%3A1",
        },
        {
            name: "Design Sphere",
            url: "https://designsphere123.webflow.io/",
        },
    ];

    return (
        <section 
            id="figma-showcase" 
            ref={sectionRef}
            className={`mx-auto mx-2 md:mx-6 my-6 md:my-12 rounded-2xl bg-black py-12 md:py-24 px-4 md:px-8 border border-white/5 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-20 flex flex-col items-center text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block">
                         02 — WORKSPACE
                    </span>
                    <h2 className="text-5xl font-serif text-white tracking-tight leading-tight mb-8">
                       Figma <span className="italic font-light opacity-80">Workspace.</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-zinc-500 font-light text-lg leading-relaxed">
                        A glimpse into my active design systems and interactive prototypes.
                    </p>
                </div>
            </div>

            {/* Showcase area with glass wrapper */}
            <div className="relative mx-auto mb-20 w-full max-w-[100vw]">
                <div className="absolute inset-0 bg-radial from-primary/5 to-transparent blur-3xl pointer-events-none" />
                <ExplorationMarquee row1={row1} row2={row2} />
            </div>

            {/* Action Area */}
            <div className="flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        suppressHydrationWarning
                        className="group inline-flex items-center gap-4 rounded-full bg-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-zinc-200 outline-none"
                    >
                        <span>Live Prototypes</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                        align="center" 
                        className="min-w-[240px] rounded-[1.5rem] glass-20 p-2 border-white/10"
                    >
                        {figmaLinks.map((link) => (
                            <DropdownMenuItem key={link.name} asChild>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-3 text-[10px] font-bold text-zinc-300 uppercase tracking-widest hover:bg-white/5 hover:text-white outline-none"
                                >
                                    {link.name}
                                    <ExternalLink size={12} className="opacity-40" />
                                </a>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    );
}
