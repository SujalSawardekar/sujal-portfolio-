"use client"

import { useScroll, useTransform, motion } from "framer-motion"

export function ParallaxBackground() {
    const { scrollY } = useScroll()

    const y1 = useTransform(scrollY, [0, 2000], [0, 200])
    const y2 = useTransform(scrollY, [0, 2000], [0, -150])

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-black">
            {/* Minimal Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "120px 120px",
                }}
            />

            {/* Subtle Indigo Orbs */}
            <motion.div 
                style={{ y: y1 }} 
                className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]" 
            />
            <motion.div 
                style={{ y: y2 }} 
                className="absolute top-[60%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-primary/3 blur-[100px]" 
            />
        </div>
    )
}
