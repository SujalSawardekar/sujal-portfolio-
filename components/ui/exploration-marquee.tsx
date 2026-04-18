"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeRowProps {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}

function MarqueeRow({ images, direction = "left", duration = 40 }: MarqueeRowProps) {
  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex shrink-0 gap-4 px-2"
      >
        {/* Triple the set for smoother infinite loops at higher speeds */}
        {[...images, ...images, ...images].map((src, i) => (
          <div
            key={`${direction}-${i}`}
            className="relative h-40 w-64 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm sm:h-52 sm:w-80"
          >
            <img
              src={src}
              alt="Exploration Item"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ExplorationMarquee({
  row1,
  row2,
  className,
}: {
  row1: string[];
  row2: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative flex w-full flex-col gap-4 overflow-hidden py-4", className)}>
      <MarqueeRow images={row1} direction="left" duration={50} />
      <MarqueeRow images={row2} direction="right" duration={60} />
      
      {/* Side Fades for smoother transitions on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}
