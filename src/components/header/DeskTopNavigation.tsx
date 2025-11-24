import { cn } from '@/lib/utils'
import { IcChevronDown } from ''
import { motion } from 'motion/react'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useRef, useState } from 'react'

type DeskTopNavigationProps = {
  className?: string
}

const DeskTopNavigation = ({ className }: DeskTopNavigationProps) => {
  const { t } = useTranslation()
  const [childMenu, setShowChildMenu] = useState('')
  const [top, setTop] = useState(0)
  const selectedMenu = MENU.find((item) => item.key === childMenu)
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect()
      setTop(rect.height)
    }
  }, [])

  const hideMenu = useCallback(() => {
    if (childMenu) setShowChildMenu('')
  }, [childMenu])

  const showMenu = useCallback((key: string) => {
    setShowChildMenu(key)
  }, [])

  return (
    <Flex className={className} ref={parentRef} onMouseLeave={hideMenu}>
      <Flex className="items-center gap-6 z-20">
        {MENU.map((item) => (
          <Link
            prefetch={false}
            key={item.key}
            href={item.child ? '' : item.key}
            className={cn(
              'inline-flex h-full pb-1 border-b-3 items-center transition-all border-white',
              childMenu == item.key && 'border-b-primary',
            )}
            onMouseEnter={() => showMenu(item.key)}
          >
            <Text
              className={cn(
                'transition-all font-semibold',
                childMenu == item.key && 'text-primary',
              )}
            >
              {t(item.label)}
            </Text>
            {item.child && (
              <IcChevronDown
                className={cn(
                  'transition-all w-6 h-6 ',
                  childMenu == item.key && 'rotate-180 text-primary',
                )}
              />
            )}
          </Link>
        ))}
      </Flex>

      {selectedMenu?.child && (
        <motion.div
          className={cn(
            'w-full absolute  left-0 flex flex-row z-10 bg-white gap-8 p-8 rounded-b-lg',
          )}
          initial={{ opacity: 0, y: top }}
          animate={{ opacity: 1, y: top }}
          transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
          layout
        >
          <Flex className=" grid grid-cols-3 gap-4 w-[80%] max-w-[1146px] self-center mx-auto">
            {selectedMenu.child}
          </Flex>
        </motion.div>
      )}
    </Flex>
  )
}

export default DeskTopNavigation
