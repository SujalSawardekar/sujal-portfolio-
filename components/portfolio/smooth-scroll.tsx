"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { ReactNode, useEffect } from "react"

interface SmoothScrollProps {
    children: ReactNode
}

function LenisGlobalAttacher() {
    const lenis = useLenis()
    useEffect(() => {
        if (lenis && typeof window !== "undefined") {
            ;(window as unknown as { lenis?: typeof lenis }).lenis = lenis
        }
        return () => {
            if (typeof window !== "undefined") {
                ;(window as unknown as { lenis?: typeof lenis }).lenis = undefined
            }
        }
    }, [lenis])
    return null
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis root options={{ 
            lerp: 0.06, 
            duration: 1.5, 
            smoothWheel: true,
            prevent: (node) => {
                return (
                    node.hasAttribute?.("data-lenis-prevent") ||
                    Boolean(node.closest?.("[data-lenis-prevent]"))
                )
            }
        }}>
            <LenisGlobalAttacher />
            {children}
        </ReactLenis>
    )
}
