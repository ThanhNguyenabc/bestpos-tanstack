import { Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Menu, Phone, X, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { LanguageSelector } from '../LanguageSelector'
import BestPosLogo from '../BestPosLogo'
import { NAVIGATION_MENU, COMPANY_MENU } from '@/utils/navigation'
import { PHONE } from '@/utils/constants'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Container } from '../ui/container'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { t } = useTranslation()

  return (
    <header>
      <Container className="flex p-4 gap-4 items-center">
        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="min-w-fit pl-0">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <MobileNav onClose={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-1 lg:flex-initial">
          <BestPosLogo />
        </div>

        {/* Desktop Navigation */}
        <DeskTopNavigation className="hidden lg:flex flex-1" />

        {/* Phone link */}
        <a
          href={`tel:${PHONE}`}
          className="flex items-center p-2 gap-2 md:p-3 md:gap-3 border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
        >
          <img
            width={24}
            height={24}
            src="/color-icons/phone.svg"
            alt="phone-icon"
          />
          <span className="text-sm font-semibold text-center">{PHONE}</span>
        </a>

        {/* Language selector */}
        <LanguageSelector />
      </Container>
    </header>
  )
}

function DeskTopNavigation({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [dropdownTop, setDropdownTop] = useState(0)
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect()
      setDropdownTop(rect.height)
    }
  }, [])

  const hideMenu = () => {
    if (activeMenu) setActiveMenu(null)
  }

  const showMenu = (key: string) => {
    setActiveMenu(key)
  }

  const selectedMenu = NAVIGATION_MENU.find((item) => item.key === activeMenu)

  return (
    <div
      className={cn('relative', className)}
      ref={parentRef}
      onMouseLeave={hideMenu}
    >
      <div className="flex items-center gap-6 z-20">
        {NAVIGATION_MENU.map((item) => (
          <Link
            key={item.key}
            to={item.children ? '' : item.href}
            className={cn(
              'inline-flex h-full pb-1 border-b-3 items-center transition-all border-white',
              activeMenu === item.key && 'border-b-primary',
            )}
            onMouseEnter={() => showMenu(item.key)}
          >
            <span
              className={cn(
                'transition-all font-semibold',
                activeMenu === item.key && 'text-primary',
              )}
            >
              {t(item.label)}
            </span>
            {item.children && (
              <ChevronDown
                className={cn(
                  'transition-all w-6 h-6',
                  activeMenu === item.key && 'rotate-180 text-primary',
                )}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Dropdown Menu */}
      {selectedMenu?.children && (
        <div
          className="w-full absolute left-0 flex flex-row z-10 bg-white gap-8 p-8 rounded-b-lg shadow-lg"
          style={{ top: `${dropdownTop}px` }}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={hideMenu}
        >
          <div className="grid grid-cols-3 gap-4 w-[80%] max-w-[1146px] self-center mx-auto">
            {selectedMenu.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="inline-flex w-full bg-neutral-100 rounded-2xl overflow-hidden gap-2 items-center border-2 border-neutral-100 hover:border-primary p-4"
                onClick={hideMenu}
              >
                {child.icon && (
                  <img
                    src={child.icon}
                    alt={child.title}
                    className="w-12 h-12 shrink-0"
                  />
                )}
                <div className="flex-1 gap-1">
                  <div className="text-base font-semibold">
                    {t(child.title)}
                  </div>
                  {'description' in child && child.description && (
                    <div className="text-sm text-neutral-600">
                      {t(child.description)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const { t } = useTranslation()

  const toggleMenu = (key: string) => {
    setExpandedMenu(expandedMenu === key ? null : key)
  }

  const onMenuClick = (item: any) => {
    if (item.children) {
      setSelectedItem(item)
    }
  }

  const hideSubMenu = () => setSelectedItem(null)

  const MOBILE_MENU = [
    {
      key: '/',
      label: 'Home',
      href: '/',
    },
    ...NAVIGATION_MENU,
    {
      key: 'company',
      label: 'Company',
      children: COMPANY_MENU,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <BestPosLogo />
        <button className="p-4" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="py-6 flex justify-around border-b border-neutral-300">
        <LanguageSelector />
      </div>

      <nav className="relative gap-6 mt-8 flex-1 overflow-hidden">
        {!selectedItem ? (
          <div className="space-y-6">
            {MOBILE_MENU.map((item) => (
              <div key={item.key}>
                {item.children ? (
                  <button
                    onClick={() => onMenuClick(item)}
                    className="flex justify-between w-full items-center"
                  >
                    <span className="font-semibold text-lg">
                      {t(item.label)}
                    </span>
                    <ChevronDown className="w-6 h-6 -rotate-90" />
                  </button>
                ) : (
                  <Link
                    to={item.href || item.key}
                    onClick={onClose}
                    className="block font-semibold text-lg"
                  >
                    {t(item.label)}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute w-full bg-white h-full overflow-y-auto">
            <div className="flex items-center mb-6">
              <button className="pr-8 pl-2" onClick={hideSubMenu}>
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <h4 className="text-xl font-semibold">{t(selectedItem.label)}</h4>
            </div>
            <div className="grid gap-4 grid-cols-1">
              {selectedItem.children.map((child: any) => (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={onClose}
                  className="text-lg font-semibold"
                >
                  {t(child.title)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="pt-4 border-t">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span className="font-semibold">{PHONE}</span>
        </a>
      </div>
    </div>
  )
}
