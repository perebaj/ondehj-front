import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'

import { cn } from '@/lib/utils'
const fredoka = Fredoka({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'Onde Hoje?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(fredoka.className, 'antialiased')}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
