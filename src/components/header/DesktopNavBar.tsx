import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { memo, useState, useCallback, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import ChevronDown from '@/icons/chevron-down.svg?react'
import Text from '../primitives/Text'
import { MENU } from './NavigationnMenus'

// Lazy load the dropdown content
const DropdownContent = lazy(() => import('./DropdownContent'))

const DeskTopNavigation = memo(() => {
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleMouseLeave = useCallback(() => {
    console.log('[DesktopNavBar] handleMouseLeave called')
    setActiveMenu(null)
  }, [])

  const handleMouseEnter = useCallback((key: string) => {
    console.log('[DesktopNavBar] handleMouseEnter called with key:', key)
    setActiveMenu(key)
  }, [])

  const selectedMenu = MENU.find((item) => item.key === activeMenu)

  return (
    <div onMouseLeave={handleMouseLeave} className="hidden md:flex flex-1">
      <nav className="flex h-20 px-10 gap-6">
        {MENU.map((item) => (
          <Link
            key={item.key}
            to={(item.child ? '/' : item.key) as any}
            className={cn(
              'inline-flex items-center gap-1 h-full text-sm font-medium text-neutral-700 hover:text-primary transition-colors relative',
              activeMenu === item.key && 'text-primary',
            )}
            onMouseEnter={() => handleMouseEnter(item.key)}
          >
            <Text className="font-semibold text-base">{t(item.label)}</Text>
            {item.child && (
              <ChevronDown
                className={cn(
                  'w-6 h-6 transition-transform',
                  activeMenu === item.key && 'rotate-180',
                )}
              />
            )}
            {activeMenu === item.key && (
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
            )}
          </Link>
        ))}
      </nav>
      {selectedMenu?.child && (
        <Suspense fallback={null}>
          <DropdownContent
            onMouseEnter={() => handleMouseEnter(activeMenu!)}
            onMouseLeave={handleMouseLeave}
          >
            {selectedMenu.child}
          </DropdownContent>
        </Suspense>
      )}
    </div>
  )
})

DeskTopNavigation.displayName = 'DeskTopNavigation'

export default DeskTopNavigation
