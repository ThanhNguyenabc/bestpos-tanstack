import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import Section from '../primitives/Section'
import Container from '../primitives/Container'
import Heading from '../primitives/heading'
import Image from '../ui/image'

export function HomeBanner() {
  const { t: common } = useTranslation()
  const { t } = useTranslation('home')

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Heading type="h1" variant="responsive">
            {t('pageTitle')}
          </Heading>

          <div className="mt-6 flex gap-3">
            <Button
              variant={'solid'}
              className="w-full justify-center bg-neutral-900 md:w-fit"
            >
              {common('get_pricing_today')}
            </Button>
          </div>
        </div>
        <div className=" hidden md:flex">
          <Image
            src="https://res.cloudinary.com/dgrym3yz3/image/upload/f_auto,q_auto,w_612/bestpos/banner/qwllcfsf9qhtobo6qwij.png"
            width={612}
            height={612}
            className="object-contain"
            alt="BestPOS Banner"
          />
        </div>
      </div>
    </Container>
  )
  return (
    <section className="relative bg-linear-to-br from-primary/10 via-white to-primary/5 py-20 md:py-32">
      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
            {t(
              'Compare top-rated POS systems, get expert recommendations, and find the best solution for your needs',
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/get-pricing">
                {t('Get Free Quote')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              <Link to="/pos-systems">{t('Browse POS Systems')}</Link>
            </Button>
          </div>

          {/* Feature badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-neutral-700">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-medium">{t('saving_money')}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-medium">{t('siging_bonus')}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-medium">{t('processing_fee')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
