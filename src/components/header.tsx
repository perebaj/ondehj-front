import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-center px-8 py-4">
        <div className="flex lg:flex-1">
          <Link href="/" className="hidden shrink-0 items-center lg:flex">
            <span className="text-2xl font-extrabold text-slate-900 ">
              Onde Hoje?
            </span>
          </Link>
          <div className="flex flex-1 justify-end">
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button size={'lg'} className="text-lg text-white">
                  Login
                </Button>
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
