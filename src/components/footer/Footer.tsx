import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { COMPANY_EMAIL, PHONE } from '@/utils/constants'
import Facebook from '@/icons/facebook.svg?react'
import Instagram from '@/icons/instagram.svg?react'
import Linkedin from '@/icons/linkedin.svg?react'

import { COMPANY_MENU } from '@/utils/navigation'
import { useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LogoFooter } from '@/assets/images/logos'
import Image from '../ui/image'
import Container from '../primitives/Container'
import Text from '../primitives/Text'
import Flex from '../ui/flex'
import { BUSINESS_MENU } from '@/utils/business_menu'
import { PRODUCTS_MENU } from '@/utils/product_menu'
import { SOLUTIONS_MENU } from '@/utils/solutions_menu'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const ContactData = [
  {
    url: 'https://www.facebook.com/bestposconsulting',
    name: 'facebook',
    icon: Facebook,
  },
  {
    url: 'https://www.instagram.com/bestposconsulting',
    name: 'instagram',
    icon: Instagram,
  },
  {
    url: 'https://www.linkedin.com/company/best-pos-consulting',
    name: 'linkedin',
    icon: Linkedin,
  },
]

const MenuCategory = ({
  menus,
}: {
  menus: { title: string; href: string }[]
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3">
      {menus?.map((item, idx) => (
        <Link key={`${idx}`} to={item.href}>
          <Text className="text-sm text-neutral-400"> {t(item.title)}</Text>
        </Link>
      ))}
    </div>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const WorkingDays = useMemo(() => {
    return ['Monday - Friday: 8am - 8pm EST', 'Saturday: 9am - 5pm EST']
  }, [])

  const POS_PRODUCTS = [
    { title: 'POS Systems', href: '/pos-systems' },
    { title: 'Point of Sale Systems', href: '/point-of-sale-systems' },
  ]

  const FOOTER_MENU = useMemo(
    () => [
      {
        title: 'Solutions',
        items: SOLUTIONS_MENU,
      },
      {
        title: 'POS Equipments',
        items: POS_PRODUCTS,
      },
      {
        title: 'Products',
        items: PRODUCTS_MENU,
      },
      {
        title: 'Business Types',
        items: BUSINESS_MENU,
      },
      {
        title: 'Company',
        items: COMPANY_MENU,
      },
    ],
    [],
  )

  return (
    <footer className="bg-[#142226]">
      <Container className="py-16 md:py-20">
        {/* Header section with logo and contact */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 md:mb-16">
          <Flex className="md:flex-1">
            <Image
              alt="logo footer"
              width={180}
              height={40}
              src={LogoFooter}
              className="h-10"
            />
          </Flex>

          <Flex className="flex-col">
            <Text className=" text-lg font-bold text-primary mb-1">
              {t('email')}
            </Text>
            <a href={`mailto:${COMPANY_EMAIL}`}>
              <Text className="text-lg font-bold text-white">
                {COMPANY_EMAIL}
              </Text>
            </a>
          </Flex>

          <Flex className="flex-col">
            <Text className="text-lg font-bold text-primary mb-1">
              {t('Call Us')}
            </Text>
            <a href={`tel:${PHONE}`}>
              <Text className="text-lg font-bold text-white">{PHONE}</Text>
            </a>
            {WorkingDays?.map((item) => (
              <div
                key={item}
                className="text-[15px] leading-[22px] text-neutral-300"
              >
                {item}
              </div>
            ))}
          </Flex>
        </div>

        {/* Conditionally render menu based on screen size */}
        {isMobile ? (
          <div className="mb-12">
            <Accordion type="multiple" className="w-full">
              {FOOTER_MENU.map(({ title, items }) => (
                <AccordionItem
                  key={title}
                  value={title}
                  className=" border-b-0"
                >
                  <AccordionTrigger className="text-base text-white font-bold hover:no-underline py-5">
                    {t(title)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-1">
                    <MenuCategory menus={items} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="grid gap-8 lg:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-16">
            {FOOTER_MENU.map(({ title, items }) => (
              <div key={title} className="flex flex-col gap-4">
                <div className=" text-lg text-white font-bold">{t(title)}</div>
                <MenuCategory menus={items} />
              </div>
            ))}
          </div>
        )}

        {/* Policy text */}
        <div className="text-sm leading-[24px] text-[#98A2B3] mb-10">
          {t('footer.policy')}{' '}
          <Link to="/privacy-policy">
            <Text className="text-inherit underline">
              {t('Privacy Policy')}
            </Text>
          </Link>
          {` ${t('and')} `}
          <Link to="/terms-of-service">
            <Text className="text-inherit underline">
              {t('Terms of Service')}
            </Text>
          </Link>
          . {t('Any questions? Contact us at ')}{' '}
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="text-[#98A2B3] underline hover:text-white transition-colors"
          >
            {COMPANY_EMAIL}
          </a>
        </div>

        {/* Copyright and social */}
        <div className="flex flex-col md:flex-row justify-between  gap-6 pt-8 border-t border-neutral-700">
          <span className="text-sm text-neutral-400">
            © {new Date().getFullYear()} BestPOS. All rights reserved.
          </span>
          <div className="flex gap-6">
            {ContactData.map(({ url, name, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-6 h-6 text-white" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
