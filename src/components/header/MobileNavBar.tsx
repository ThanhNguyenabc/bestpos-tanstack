import { PHONE } from '@/utils/constants'
import { COMPANY_MENU, NAVIGATION_MENU } from '@/utils/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../LanguageSelector'
import { Link } from '@tanstack/react-router'
import Image from '../ui/image'
import { LogoSmallIcon } from '@/assets/Images'
import { ChevronDown, Phone, X } from 'lucide-react'

const MobileNavBar = ({ onClose }) => {
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
        <Image src={LogoSmallIcon} alt="pos-logo" width={40} height={40} />
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
export default MobileNavBar
