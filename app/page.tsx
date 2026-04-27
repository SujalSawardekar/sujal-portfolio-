"use client"

import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { MarqueeBand } from "@/components/portfolio/marquee-band"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { FigmaShowcaseSection } from "@/components/portfolio/figma-showcase"
import { AboutSection } from "@/components/portfolio/about-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ResearchSection } from "@/components/portfolio/research-section"
import { AchievementsSection } from "@/components/portfolio/achievements-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { SocialSection } from "@/components/portfolio/social-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Preloader } from "@/components/portfolio/preloader"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"
import { ParallaxBackground } from "@/components/portfolio/parallax-background"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PortfolioPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Preloader />
      <SmoothScroll>
        <ParallaxBackground />
        <CustomCursor />
        <Navbar />
        <main>
          <HeroSection />
          <MarqueeBand />
          <AboutSection />
          <ProjectsSection />
          <FigmaShowcaseSection />
          <ExperienceSection />
          <ResearchSection />
          <AchievementsSection />
          <SkillsSection />
          <SocialSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  )
}
