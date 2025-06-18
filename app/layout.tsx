import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/auth/SessionProvider'
import HydrationFix from '@/components/HydrationFix'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexora | Digital Agency',
  description: 'Nexora - A modern digital agency specializing in web development, digital marketing, and design solutions.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  themeColor: '#6d28d9', // Purple-700
  openGraph: {
    type: 'website',
    url: 'https://nexora.com',
    title: 'Nexora | Digital Agency',
    description: 'Transform your ideas into impactful digital experiences.',
    siteName: 'Nexora',
    images: [{
      url: '/og-image.png',
    }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <HydrationFix />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
} 