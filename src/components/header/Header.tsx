import { useState, lazy, Suspense } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { LanguageSelector } from '../LanguageSelector'
import BestPosLogo from '../BestPosLogo'
import { PHONE } from '@/utils/constants'
import Image from '../ui/image'
import Container from '../primitives/Container'
import Flex from '../ui/flex'
import Text from '../primitives/Text'

const MobileNavBar = lazy(() => import('./MobileNavBar'))
const DesktopNavBar = lazy(() => import('./DesktopNavBar'))

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-neutral-200 px-4 w-full">
      <Container className="flex items-center w-full max-w-[1440px]">
        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="p-0">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 sm:w-96">
            <Suspense fallback={null}>
              <MobileNavBar onClose={() => setMobileMenuOpen(false)} />
            </Suspense>
          </SheetContent>
        </Sheet>

        <BestPosLogo />

        {/* Desktop navigation - lazy loaded, hidden on mobile with CSS */}
        <Suspense fallback={<Flex className="hidden md:flex flex-1" />}>
          <DesktopNavBar />
        </Suspense>

        <Flex className="items-center gap-4 h-12">
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:flex items-center gap-2 p-3 h-full border-2 border-primary rounded-md"
          >
            <Image
              src="/color-icons/phone.svg"
              alt="phone"
              width={24}
              height={24}
            />
            <Text className="text-sm font-semibold text-neutral-900">
              {PHONE}
            </Text>
          </a>
          <LanguageSelector />
        </Flex>
      </Container>
    </header>
  )
}
