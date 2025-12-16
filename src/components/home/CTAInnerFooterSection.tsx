import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Phone } from 'lucide-react'
import Container from '../primitives/Container'

const PHONE_NUMBER = '1-888-410-2188'
const EMAIL = 'info@bestpos.com'

export function CTAInnerFooterSection() {
  const { t } = useTranslation('common')

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-orange-600">
      <Container>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('footer.heading')}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-95">
            {t('footer.subTitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-neutral-100 font-semibold min-w-[200px]"
            >
              <Link to="/get-pricing">{t('get_pricing_today')}</Link>
            </Button>

            <div className="flex items-center gap-2 text-white">
              <span className="text-sm md:text-base">{t('or')}</span>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 text-white hover:text-neutral-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-semibold text-lg">{PHONE_NUMBER}</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-90">
              {t('contact.email_any_questions')
                .replace('<br />', ' ')
                .replace('<br/>', ' ')}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-white hover:text-neutral-100 font-semibold underline mt-2 inline-block"
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
