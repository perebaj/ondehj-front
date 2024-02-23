import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Onde Hoje? ¯\_(ツ)_/¯</title>
      </head>
      <ClerkProvider afterSignInUrl="/events" afterSignUpUrl="/events">
        <body>{children}</body>
      </ClerkProvider>
    </html>
  )
}
