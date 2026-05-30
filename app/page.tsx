"use client"

import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { MarqueeBand } from "@/components/portfolio/marquee-band"
import { AboutSection } from "@/components/portfolio/about-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { FigmaShowcaseSection } from "@/components/portfolio/figma-showcase"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ResearchSection } from "@/components/portfolio/research-section"
import { AchievementsSection } from "@/components/portfolio/achievements-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ArchiveSection } from "@/components/portfolio/archive-section"
import { SocialSection } from "@/components/portfolio/social-section"
import { VisualDesignerLayout } from "@/components/portfolio/visual-designer-layout"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Preloader } from "@/components/portfolio/preloader"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"
import { ParallaxBackground } from "@/components/portfolio/parallax-background"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

export default function PortfolioPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [portfolioMode, setPortfolioMode] = useState<"uiux" | "visual">("uiux")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Preloader />
      <SmoothScroll>
        <ParallaxBackground />
        <CustomCursor />
        <Navbar mode={portfolioMode} />
        <main className="bg-black">
          
          {/* Futuristic Center Master Toggle (located in the hero section) */}
          <HeroSection mode={portfolioMode} setMode={setPortfolioMode} />

          {/* Conditional Layout Routing */}
          <AnimatePresence mode="wait">
            {portfolioMode === "uiux" ? (
              // === ORIGINAL UI/UX PORTFOLIO SEQUENCE (PRESERVED EXACTLY) ===
              <div key="uiux-layout">
                <MarqueeBand />
                <AboutSection mode={portfolioMode} />
                <ProjectsSection />
                <FigmaShowcaseSection />
                <ExperienceSection />
                <ResearchSection />
                <AchievementsSection />
                <SkillsSection />
                <ArchiveSection />
                <SocialSection />
                <ContactSection mode={portfolioMode} />
              </div>
            ) : (
              // === NEW HIGH-CONVERTING DEEPANSHU & SHAN VISUAL DESIGNER FLOW ===
              <div key="visual-layout">
                <VisualDesignerLayout />
              </div>
            )}
          </AnimatePresence>

        </main>
      </SmoothScroll>
    </>
  )
}






