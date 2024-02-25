import { UserButton } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import Billing from './billing'
import { Button } from './ui/button'
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
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <Button className="hidden gap-2 bg-primary">
            <CreditCard strokeWidth={2} size={18} />
            <Dialog>
              <DialogTrigger>Assinatura</DialogTrigger>
              <Billing />
            </Dialog>
          </Button>
        </div>
      </div>
    </header>
  )
}
