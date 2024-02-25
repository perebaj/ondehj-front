import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { cn } from '@/lib/utils'

const roboto = Roboto({
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
    <ClerkProvider afterSignInUrl="/events" afterSignUpUrl="/events">
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            roboto.className,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
