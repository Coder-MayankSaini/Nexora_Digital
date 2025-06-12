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
  title: 'Nexora',
  description: 'Nexora Website',
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