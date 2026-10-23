"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectGalleryProps {
    images: string[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    if (!images || images.length === 0) return null

    return (
        <section className="my-24 space-y-12">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Design & Media Exploration</h2>
                <p className="text-muted-foreground font-light text-lg">A detailed look into collateral, campaign visuals, and creative media assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {images.map((item, index) => {
                    const isVideo = item.endsWith(".mp4")
                    return (
                        <motion.div 
                            key={index}
                            layoutId={`img-${index}`}
                            onClick={() => setSelectedImage(item)}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-secondary/10 cursor-zoom-in transition-all hover:border-primary/40 hover:shadow-2xl"
                        >
                            {isVideo ? (
                                <video 
                                    src={item}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <Image 
                                    src={item} 
                                    alt={`Design view ${index + 1}`} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 drop-shadow-lg" size={24} />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center z-10"
                        >
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
                            >
                                <X size={22} />
                            </button>
                            
                            <div className="relative w-full max-h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-zinc-950/80">
                                {selectedImage.endsWith(".mp4") ? (
                                    <video 
                                        src={selectedImage}
                                        controls
                                        autoPlay
                                        loop
                                        playsInline
                                        className="max-h-[80vh] w-auto max-w-full object-contain"
                                    />
                                ) : (
                                    <img 
                                        src={selectedImage} 
                                        alt="Large design view" 
                                        className="max-h-[80vh] w-auto max-w-full object-contain"
                                    />
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
