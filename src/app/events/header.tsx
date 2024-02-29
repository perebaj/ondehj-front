'use client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
export default function EventsHeader() {
  return (
    <header className="border-b bg-slate-50">
      <div className="mx-auto flex items-center justify-center gap-4 py-3 max-lg:px-4 lg:max-w-7xl lg:justify-center">
        <UserButton afterSignOutUrl="/" />
        <Link
          href="/"
          className="lg:flex lg:items-center lg:justify-center lg:gap-2"
        >
          <h1 className="text-3xl font-bold">¯\_(ツ)_/¯?</h1>
        </Link>
        {/* TODO: Add billing component */}
        {/* <div className=" lg:flex lg:items-center lg:justify-center">
          <Billing name="Assinatura" />
        </div> */}
      </div>
    </header>
  )
}
