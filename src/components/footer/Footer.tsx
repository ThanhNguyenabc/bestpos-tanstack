import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { COMPANY_EMAIL, PHONE } from '@/utils/constants'
import { COMPANY_MENU } from '@/utils/navigation'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Container } from '@/components/ui/container'
import { LogoFooter } from '@/assets/Images'

const SOLUTIONS_MENU = [
  { title: 'Payment Processing', href: '/payment-processing' },
  { title: 'Gift Card Program', href: '/gift-card-program' },
  { title: 'Customer Loyalty', href: '/customer-loyalty-programs-and-rewards' },
  { title: 'Cash Discount Program', href: '/cash-discount-program' },
  { title: 'Check Services', href: '/check-services' },
  { title: 'Online Analytics', href: '/online-analytics' },
]

const BUSINESS_MENU = [
  { title: 'Full Service Restaurants', href: '/full-service-restaurants' },
  { title: 'Quick Service Restaurants', href: '/quick-service-restaurants' },
  { title: 'Bars & Night Clubs', href: '/bars-and-night-clubs' },
  { title: 'Retail', href: '/retail' },
  { title: 'Small Business', href: '/small-business' },
  { title: 'Pizzerias', href: '/pizzerias' },
]

const PRODUCTS_MENU = [
  { title: 'Clover App Market', href: '/clover-app-market' },
  { title: 'Gift Card Program', href: '/gift-card-program' },
  { title: 'Customer Loyalty', href: '/customer-loyalty-programs-and-rewards' },
  { title: 'Cash Discount', href: '/cash-discount-program' },
  { title: 'Check Services', href: '/check-services' },
]

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
    <div className="flex flex-col gap-2.5">
      {menus?.map((item, idx) => (
        <Link
          key={`${idx}`}
          to={item.href}
          className="text-[15px] leading-[22px] text-[#98A2B3] hover:text-white transition-colors"
        >
          {t(item.title)}
        </Link>
      ))}
    </div>
  )
}

export default function Footer() {
  const { t } = useTranslation()

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
          <img
            alt="logo footer"
            width={180}
            height={40}
            src={LogoFooter}
            className="h-10 w-auto"
          />

          <div className="flex-1">
            <div className="text-[17px] leading-[24px] font-bold text-[#FF5A22] mb-3">
              {t('Email')}
            </div>
            <a
              className="text-[15px] leading-[22px] text-[#98A2B3] hover:text-white transition-colors"
              href={`mailto:${COMPANY_EMAIL}`}
            >
              {COMPANY_EMAIL}
            </a>
          </div>

          <div className="flex-1">
            <div className="text-[17px] leading-[24px] font-bold text-[#FF5A22] mb-3">
              {t('Call Us')}
            </div>
            <a
              className="text-[15px] leading-[22px] text-[#98A2B3] hover:text-white transition-colors block mb-2"
              href={`tel:${PHONE}`}
            >
              {PHONE}
            </a>
            {WorkingDays?.map((item) => (
              <div
                key={item}
                className="text-[15px] leading-[22px] text-[#98A2B3]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Menu grid - Desktop */}
        <div className="hidden md:grid gap-8 lg:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-16">
          {FOOTER_MENU.map(({ title, items }) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="text-[17px] leading-[24px] text-white font-bold">
                {t(title)}
              </div>
              <MenuCategory menus={items} />
            </div>
          ))}
        </div>

        {/* Menu accordion - Mobile */}
        <div className="md:hidden mb-12">
          <Accordion type="multiple" className="w-full">
            {FOOTER_MENU.map(({ title, items }) => (
              <AccordionItem
                key={title}
                value={title}
                className="border-b border-[#344054]"
              >
                <AccordionTrigger className="text-[17px] leading-[24px] text-white font-bold hover:no-underline py-5">
                  {t(title)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pt-1">
                  <MenuCategory menus={items} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Policy text */}
        <div className="text-[15px] leading-[22px] text-[#98A2B3] mb-10">
          {t('footer.policy')}{' '}
          <Link
            to="/privacy-policy"
            className="text-[#98A2B3] underline hover:text-white transition-colors"
          >
            {t('Privacy Policy')}
          </Link>
          {` ${t('and')} `}
          <Link
            to="/terms-of-service"
            className="text-[#98A2B3] underline hover:text-white transition-colors"
          >
            {t('Terms of Service')}
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[#344054]">
          <span className="text-[15px] leading-[22px] text-[#98A2B3]">
            © {new Date().getFullYear()} BestPOS. All rights reserved.
          </span>
          <div className="flex gap-6">
            {ContactData.map(({ url, name, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98A2B3] hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
