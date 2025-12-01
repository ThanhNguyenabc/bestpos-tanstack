import { lazy, useState } from 'react'
import { Menu, Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { LanguageSelector } from '../LanguageSelector'
import BestPosLogo from '../BestPosLogo'
import { PHONE } from '@/utils/constants'
import { useTranslation } from 'react-i18next'
import { Container } from '../ui/container'
import DeskTopNavigation from './DesktopNavBar'
import Image from '../ui/image'
const MobileNavBar = lazy(() => import('./MobileNavBar'))

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="bg-white border-b border-[#E5E7EB]">
      <Container className="flex items-center justify-between h-[60px] px-4">
        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="min-w-fit p-0">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <MobileNavBar onClose={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center">
          <BestPosLogo />
        </div>

        {/* Desktop Navigation */}
        <DeskTopNavigation />
        {/* <DeskTopNavigation className="hidden lg:flex flex-1 ml-12" /> */}

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Phone with icon */}
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:flex items-center gap-2 px-4 py-2 border border-[#FF5A22] rounded-md hover:bg-[#FFF5F0] transition-colors"
          >
            <Image
              src="/color-icons/phone.svg"
              alt="phone-icon"
              width={24}
              height={24}
            />
            <span className="text-[14px] font-semibold text-[#1F2937]">
              {PHONE}
            </span>
          </a>

          {/* Language selector */}
          <LanguageSelector />
        </div>
      </Container>
    </header>
  )
}
