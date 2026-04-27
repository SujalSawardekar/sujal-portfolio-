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

    return (
        <section className="my-24 space-y-12">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Design Exploration</h2>
                <p className="text-muted-foreground font-light text-lg">A detailed look into wireframes, components, and layout systems.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <motion.div 
                        key={index}
                        layoutId={`img-${index}`}
                        onClick={() => setSelectedImage(img)}
                        className="group relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-border/50 bg-secondary/10 cursor-zoom-in transition-all hover:border-primary/30"
                    >
                        <Image 
                            src={img} 
                            alt={`Design view ${index + 1}`} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100" size={24} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-6xl max-h-full aspect-auto flex items-center justify-center"
                        >
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                            
                            <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
                                <Image 
                                    src={selectedImage} 
                                    alt="Large design view" 
                                    fill 
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
