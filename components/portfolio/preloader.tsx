"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    // Minimum loading time + ensure window is loaded
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2500)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
           className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Split Background Panels */}
          <motion.div 
            initial={{ x: 0 }}
            exit={{ 
              x: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
            }}
            className="absolute inset-y-0 left-0 w-1/2 bg-(--background)"
          />
          <motion.div 
            initial={{ x: 0 }}
            exit={{ 
              x: "100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
            }}
            className="absolute inset-y-0 right-0 w-1/2 bg-(--background)"
          />

          <motion.div 
            className="relative z-10 flex flex-col items-center"
            exit={{ 
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.5, ease: "circIn" }
            }}
          >
            {/* Logo Image Animation */}
            <div className="relative mb-8 h-32 w-32">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { duration: 1, ease: "easeOut" }
                }}
                className="relative h-full w-full"
              >
                <Image
                  src="/Sujal Logo 2.png"
                  alt="Sujal Logo"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Shimmer Effect overlay */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 1
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </motion.div>
              
              {/* Outer Glow */}
              <motion.div 
                className="absolute inset-0 -z-10 bg-white/10 blur-2xl rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Percentage Counter */}
            <div className="flex flex-col items-center">
              <motion.span 
                className="text-white font-mono text-2xl tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress}%
              </motion.span>
              
              {/* Sleek Progress Line */}
              <div className="mt-4 h-[1px] w-48 bg-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
