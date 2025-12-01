import { lazy, useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { LanguageSelector } from '../LanguageSelector'
import BestPosLogo from '../BestPosLogo'
import { PHONE } from '@/utils/constants'
import { useTranslation } from 'react-i18next'
import { Container } from '../ui/container'
import DeskTopNavigation from './DesktopNavBar'
import Image from '../ui/image'
import { Link } from '@tanstack/react-router'
import Flex from '../ui/flex'
const MobileNavBar = lazy(() => import('./MobileNavBar'))

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="bg-white border-b border-[#E5E7EB] px-4 w-full">
      <Container className="flex items-center w-full">
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

        <BestPosLogo />

        <DeskTopNavigation />

        <Flex className="items-center gap-4 h-12">
          <Link
            to={`tel:${PHONE}`}
            className="hidden lg:inline-flex p-3 border-2  h-full border-primary rounded-md"
          >
            <Image
              src="/color-icons/phone.svg"
              alt="phone-icon"
              width={24}
              height={24}
            />
            <span className="text-[14px]  font-semibold text-[#1F2937]">
              {PHONE}
            </span>
          </Link>

          {/* Language selector */}
          <LanguageSelector />
        </Flex>
      </Container>
    </header>
  )
}
