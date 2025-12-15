import { PHONE } from '@/utils/constants'
import { COMPANY_MENU, NAVIGATION_MENU } from '@/utils/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../LanguageSelector'
import { Link } from '@tanstack/react-router'
import Image from '../ui/image'
import { LogoSmallIcon } from '@/assets/Images'
import { ChevronDown, Phone, X } from 'lucide-react'
import Flex from '../ui/flex'
import Text from '../primitives/Text'

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
interface MobileNavBarProps {
  onClose: () => void
}

const MobileNavBar = ({ onClose }: MobileNavBarProps) => {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const { t } = useTranslation()

  const onMenuClick = (item: any) => {
    if (item.children) {
      setSelectedItem(item)
    }
  }

  const hideSubMenu = () => setSelectedItem(null)

  return (
    <Flex className="flex-col h-full">
      <Flex className="items-center justify-between pb-4 border-b border-neutral-300">
        <Image src={LogoSmallIcon} alt="pos-logo" width={40} height={40} />
        <button className="p-4" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </Flex>

      <Flex className="py-6 justify-around border-b border-neutral-300">
        <LanguageSelector />
      </Flex>

      <nav className="relative gap-6 mt-8 flex-1 overflow-hidden">
        {!selectedItem ? (
          <Flex className="flex-col space-y-6">
            {MOBILE_MENU.map((item) => (
              <Flex key={item.key}>
                {item.children ? (
                  <button
                    onClick={() => onMenuClick(item)}
                    className="flex justify-between w-full items-center"
                  >
                    <Text className="font-semibold text-lg">
                      {t(item.label)}
                    </Text>
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
              </Flex>
            ))}
          </Flex>
        ) : (
          <Flex className="absolute w-full bg-white h-full overflow-y-auto flex-col">
            <Flex className="items-center mb-6">
              <button className="pr-8 pl-2" onClick={hideSubMenu}>
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <h4 className="text-xl font-semibold">{t(selectedItem.label)}</h4>
            </Flex>
            <Flex className="flex-col gap-4">
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
            </Flex>
          </Flex>
        )}
      </nav>

      <Flex className="pt-4 border-t">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          <Phone className="h-4 w-4" />
          <Text className="font-semibold">{PHONE}</Text>
        </a>
      </Flex>
    </Flex>
  )
}
export default MobileNavBar
