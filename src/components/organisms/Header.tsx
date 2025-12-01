import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { LogoFooter } from '@/assets/Images'
import Image from '@/components/ui/image'

const NAV = [
  { title: 'Solutions', href: '/solutions' },
  { title: 'Products', href: '/product' },
  { title: 'Business', href: '/business' },
  { title: 'Pricing', href: '/get-pricing' },
  { title: 'Blogs', href: '/blogs' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <div className="flex items-center">
                <Image
                  src={LogoFooter}
                  alt="BestPOS"
                  width={160}
                  height={36}
                  className="h-8 md:h-10 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-8 lg:gap-10">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm md:text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                to="/get-pricing"
                className="inline-flex items-center gap-2 bg-[#FF5A22] hover:bg-[#ff4a0d] text-white text-sm md:text-base font-semibold px-4 py-2 rounded-md shadow-sm transition-colors"
              >
                Get Pricing
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-neutral-900"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3 py-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded"
                >
                  {item.title}
                </Link>
              ))}

              <Link
                to="/get-pricing"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center w-full bg-[#FF5A22] hover:bg-[#ff4a0d] text-white text-base font-semibold px-4 py-2 rounded-md"
              >
                Get Pricing
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
