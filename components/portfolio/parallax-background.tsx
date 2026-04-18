"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
    const { scrollY } = useScroll()

    // Slower movement for distant objects
    const y1 = useTransform(scrollY, [0, 2000], [0, 400])
    const y2 = useTransform(scrollY, [0, 2000], [0, -300])
    const y3 = useTransform(scrollY, [0, 2000], [0, 600])

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
            {/* Minimal Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Subtle Floating Parallax Orbs - Increased blur for cleaner feel */}
            <motion.div style={{ y: y1, willChange: "transform" }} className="absolute top-[5%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[100px] opacity-40" />
            <motion.div style={{ y: y2, willChange: "transform" }} className="absolute top-[35%] right-[2%] w-[25vw] h-[25vw] rounded-full bg-chart-4/5 blur-[90px] opacity-30" />
            <motion.div style={{ y: y3, willChange: "transform" }} className="absolute top-[65%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-chart-2/5 blur-[120px] opacity-25" />

            {/* Light clean overlay */}
            <div className="absolute inset-0 bg-background/95" />
        </div>
    )
}
