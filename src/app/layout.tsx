import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
// import { Backpack } from 'lucide-react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '../lib/utils'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Onde hoje?',
  description: 'Encontre eventos e lugares para ir hoje',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn('min-h-screen bg-background front-sans antialised')}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
