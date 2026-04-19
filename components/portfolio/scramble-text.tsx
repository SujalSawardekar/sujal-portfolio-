"use client"

import { useEffect, useState } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function ScrambleText({
    texts,
    duration = 800,
    delay = 3000,
    className = ""
}: {
    texts: string[]
    duration?: number
    delay?: number
    className?: string
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayText, setDisplayText] = useState(texts[0])

    useEffect(() => {
        let timeout: NodeJS.Timeout
        let interval: NodeJS.Timeout

        const scrambleToNext = () => {
            const nextIndex = (currentIndex + 1) % texts.length
            const targetText = texts[nextIndex]
            const startText = displayText

            let frame = 0
            const totalFrames = Math.floor(duration / 30) // steps of 30ms

            interval = setInterval(() => {
                frame++
                const progress = frame / totalFrames
                
                setDisplayText(() => {
                    const length = Math.max(startText.length, targetText.length)
                    const iteration = Math.floor(progress * length)

                    return Array.from({ length: Math.max(targetText.length, startText.length - iteration) })
                        .map((_, index) => {
                            if (index < iteration && index < targetText.length) {
                                return targetText[index]
                            }
                            if (targetText[index] === " ") return " "
                            return CHARS[Math.floor(Math.random() * CHARS.length)]
                        })
                        .join("")
                })

                if (frame >= totalFrames) {
                    clearInterval(interval)
                    setDisplayText(targetText)
                    setCurrentIndex(nextIndex)
                }
            }, 30)
        }

        timeout = setTimeout(scrambleToNext, delay)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [currentIndex, texts, duration, delay])

    return (
        <span className={`inline-block min-w-[200px] ${className}`}>
            {displayText}
        </span>
    )
}
