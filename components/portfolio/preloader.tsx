"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 35)

    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2800)
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090B]"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Big Logo */}
          <motion.div
            className="relative h-40 w-40 mb-16"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }}
          >
            <Image
              src="/Sujal Logo 2.png"
              alt="Sujal Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Progress bar + counter */}
          <motion.div
            className="flex flex-col items-center gap-4 w-56"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            <div className="relative h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>

            <span className="font-sans font-bold text-sm tabular-nums text-white/40 tracking-widest">
              {String(Math.min(progress, 100)).padStart(2, "0")} %
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
