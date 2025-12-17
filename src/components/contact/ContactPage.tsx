import { useTranslation } from 'react-i18next'
import Container from '../primitives/Container'
import { ContactInfo } from './ContactInfo'
import { ContactForm } from './ContactForm'

const PHONE = '1-888-410-2188'
const EMAIL = 'info@bestpos.com'

export function ContactPage() {
  const { t } = useTranslation('common')

  const contactList = [
    {
      icon: '/color-icons/phone.svg',
      title: t('contact.call_us'),
      detail: t('contact.got_questions'),
      phone: PHONE,
    },
    {
      icon: '/color-icons/email.svg',
      title: t('contact.email_us'),
      detail: t('contact.email_any_questions'),
      email: EMAIL,
    },
    {
      icon: '/color-icons/question.svg',
      title: t('contact.FAQs'),
      detail: t('contact.find_answer'),
      href: '/faqs',
    },
  ]

  return (
    <main className="py-8 md:py-16 lg:py-20 bg-white">
      <Container>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-8 md:mb-12 text-neutral-900">
          {t('support')} 24/7
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {contactList.map((item, idx) => (
            <ContactInfo key={idx} {...item} />
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-8 md:pt-12">
          <ContactForm />
        </div>
      </Container>
    </main>
  )
}
