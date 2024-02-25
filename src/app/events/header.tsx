'use client'
import { UserButton } from '@clerk/nextjs'

// import { CreditCard } from 'lucide-react'
// import Billing from '@/app/billing'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'
export default function EventsHeader() {
  return (
    <header className="border-b bg-slate-50">
      <div className="mx-auto flex items-center justify-center gap-4 py-3 max-lg:px-4 lg:max-w-7xl lg:justify-between">
        <UserButton afterSignOutUrl="/" />
        <a
          href="/"
          className="lg:flex lg:items-center lg:justify-center lg:gap-2"
        >
          <h1 className="text-3xl font-bold">¯\_(ツ)_/¯?</h1>
        </a>
        {/* TODO: Add billing component */}
        {/* <div className=" lg:flex lg:items-center lg:justify-center">
          <Billing name="Assinatura" />
        </div> */}
      </div>
    </header>
  )
}