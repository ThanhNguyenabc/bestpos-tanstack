import { cn } from '@/lib/utils'
import { NAVIGATION_MENU } from '@/utils/navigation'
import { Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { ChevronDown } from 'lucide-react'
import ChevronDown from '@/icons/chevron-down.svg?react'
import Text from '../primitives/text'
import Container from '../primitives/Container'
const DeskTopNavigation = () => {
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
      ref={parentRef}
      onMouseLeave={hideMenu}
      className="hidden md:flex flex-1"
    >
      <nav className="flex md:h-[80px] px-10 gap-6">
        {NAVIGATION_MENU.map((item) => (
          <Link
            key={item.key}
            to={item.children ? '' : item.href}
            className={cn(
              'inline-flex items-center gap-1 h-full text-[14px] font-medium text-neutral-700 hover:text-primary transition-colors relative',
              activeMenu === item.key && 'text-primary',
            )}
            onMouseEnter={() => showMenu(item.key)}
          >
            <Text className="font-semibold text-base">{t(item.label)}</Text>
            {item.children && (
              <ChevronDown
                className={cn(
                  'w-6 h-6 transition-transform',
                  activeMenu === item.key && 'rotate-180',
                )}
              />
            )}
            {activeMenu === item.key && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
            )}
          </Link>
        ))}
      </nav>
      {selectedMenu?.children && (
        <div
          className="fixed left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-lg z-50"
          style={{ top: 80 }}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={hideMenu}
        >
          <Container className="py-8">
            <div className="grid grid-cols-3 gap-4 max-w-[1146px] mx-auto">
              {selectedMenu.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="flex items-center gap-3 p-4 bg-neutral-100 rounded-xl hover:bg-[#F3F4F6] border border-transparent hover:border-primary transition-all"
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
                    <div className="text-[14px] font-semibold text-[#000000]">
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

export default DeskTopNavigation
