import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NoiseOverlay } from '@/components/portfolio/noise-overlay'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Designing Interfaces That Think | UI/UX Portfolio',
  description: 'UI/UX Designer, Graphic Designer & 3D Web Enthusiast. Crafting intuitive, bold digital experiences with Figma, Adobe XD, Spline 3D and more.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <NoiseOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
