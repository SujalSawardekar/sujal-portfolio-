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

            let iteration = 0
            const stepTime = 30
            const maxLength = Math.max(displayText.length, targetText.length)

            interval = setInterval(() => {
                setDisplayText(() => {
                    // Create an array of the target text length, padded with random chars if the old text was longer
                    const currentLength = Math.max(targetText.length, maxLength - iteration)
                    const tempArr = Array.from({ length: Math.floor(currentLength) })

                    return tempArr
                        .map((_, index) => {
                            if (index < iteration && index < targetText.length) {
                                return targetText[index] // Settled character
                            }
                            // Random scramble character
                            if (targetText[index] === " ") return " "
                            return CHARS[Math.floor(Math.random() * CHARS.length)]
                        })
                        .join("")
                })

                iteration += targetText.length / (duration / stepTime)

                if (iteration >= targetText.length) {
                    clearInterval(interval)
                    setDisplayText(targetText)
                    setCurrentIndex(nextIndex)
                }
            }, stepTime)
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
