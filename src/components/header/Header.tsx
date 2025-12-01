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
            <MobileNav onClose={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center">
          <BestPosLogo />
        </div>

        {/* Desktop Navigation */}
        <DeskTopNavigation className="hidden lg:flex flex-1 ml-12" />

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Phone with icon */}
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:flex items-center gap-2 px-4 py-2 border border-[#FF5A22] rounded-md hover:bg-[#FFF5F0] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#FF5A22]" />
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

function DeskTopNavigation({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const hideMenu = () => {
    if (activeMenu) setActiveMenu(null)
  }

  const showMenu = (key: string) => {
    setActiveMenu(key)
  }

  const selectedMenu = NAVIGATION_MENU.find((item) => item.key === activeMenu)

  return (
    <div
      className={cn('relative h-full', className)}
      ref={parentRef}
      onMouseLeave={hideMenu}
    >
      <nav className="flex items-center h-full gap-6">
        {NAVIGATION_MENU.map((item) => (
          <Link
            key={item.key}
            to={item.children ? '' : item.href}
            className={cn(
              'inline-flex items-center gap-1 h-full text-[14px] font-medium text-[#374151] hover:text-[#FF5A22] transition-colors relative',
              activeMenu === item.key && 'text-[#FF5A22]',
            )}
            onMouseEnter={() => showMenu(item.key)}
          >
            <span>{t(item.label)}</span>
            {item.children && (
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform',
                  activeMenu === item.key && 'rotate-180',
                )}
              />
            )}
            {activeMenu === item.key && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF5A22]" />
            )}
          </Link>
        ))}
      </nav>

      {/* Dropdown Menu */}
      {selectedMenu?.children && (
        <div
          className="fixed left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-lg z-50"
          style={{ top: '60px' }}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={hideMenu}
        >
          <Container className="py-8">
            <div className="grid grid-cols-3 gap-4 max-w-[1146px] mx-auto">
              {selectedMenu.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] border border-transparent hover:border-[#FF5A22] transition-all"
                  onClick={hideMenu}
                >
                  {child.icon && (
                    <img
                      src={child.icon}
                      alt={child.title}
                      className="w-12 h-12 shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[#1F2937]">
                      {t(child.title)}
                    </div>
                    {'description' in child && child.description && (
                      <div className="text-[13px] text-[#6B7280] mt-1">
                        {t(child.description)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Container>
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
