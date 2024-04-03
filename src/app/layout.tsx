import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { McLaren as Font } from 'next/font/google'

import { cn } from '@/lib/utils'
// const fredoka = Fredoka({
//   weight: '400',
//   subsets: ['latin'],
//   style: 'normal',
// })

const McLaren = Font({
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
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <body className={cn(McLaren.className, 'antialiased')}>
              {children}
            </body>
          </div>
        </div>
      </html>
    </ClerkProvider>
  )
}
