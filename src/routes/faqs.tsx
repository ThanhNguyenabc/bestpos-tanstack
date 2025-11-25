import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const Route = createFileRoute('/faqs')({
  component: FAQsPage,
})

const faqs = [
  {
    question: 'What is a POS system?',
    answer:
      'A Point of Sale (POS) system is a combination of hardware and software that allows businesses to process transactions, manage inventory, track sales, and more.',
  },
  {
    question: 'How much does a POS system cost?',
    answer:
      'POS system costs vary widely depending on features, hardware, and business size. Prices typically range from $50-$300 per month for software, plus hardware costs.',
  },
  {
    question: 'What features should I look for?',
    answer:
      'Key features include payment processing, inventory management, reporting and analytics, employee management, and integration capabilities.',
  },
  {
    question: 'Can I use my own hardware?',
    answer:
      'Many modern POS systems are cloud-based and can work with existing tablets, smartphones, or computers, though some may require specific hardware.',
  },
]

function FAQsPage() {
  const { t } = useTranslation('faq')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6 text-center">
          {t('Frequently Asked Questions')}
        </h1>
        <p className="text-xl text-neutral-600 mb-12 text-center">
          {t('Find answers to common questions about POS systems')}
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {t(faq.question)}
              </AccordionTrigger>
              <AccordionContent>{t(faq.answer)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}