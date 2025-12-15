import { useTranslation } from 'react-i18next'
import Container from '../primitives/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import Image from '../ui/image'

interface PricingTier {
  name: string
  size: string
  revenue: string
  image?: string
  features: string[]
  highlighted?: boolean
}

export function CompetitiveRatesSection() {
  const { t } = useTranslation('home')

  const pricingTiers: PricingTier[] = [
    {
      name: t('competitive_rates.small.name') || 'Small Restaurant',
      size: t('competitive_rates.small.size') || '$0 - $50k in sales per month',
      revenue: '$0 - $50k',
      features: [
        t('competitive_rates.small.feature1') || 'Up to 3 free POS',
        t('competitive_rates.small.feature2') ||
          'Excellent hardware with 3-5 tablets included',
        t('competitive_rates.small.feature3') ||
          'Competitive rates and cash discount',
        t('competitive_rates.small.feature4') ||
          'Up to $2,000 cash signing bonus',
      ],
    },
    {
      name: t('competitive_rates.mid.name') || 'Mid-restaurant',
      size:
        t('competitive_rates.mid.size') || '$50k - $150k in sales per month',
      revenue: '$50k - $150k',
      highlighted: true,
      features: [
        t('competitive_rates.mid.feature1') || 'Up to 5 free POS',
        t('competitive_rates.mid.feature2') ||
          'Excellent hardware with 5-8 tablets included',
        t('competitive_rates.mid.feature3') ||
          'Competitive rates and cash discount',
        t('competitive_rates.mid.feature4') ||
          'Up to $5,000 cash signing bonus',
      ],
    },
    {
      name: t('competitive_rates.large.name') || 'Large Restaurant',
      size: t('competitive_rates.large.size') || '$150k+ in sales per month',
      revenue: '$150k+',
      features: [
        t('competitive_rates.large.feature1') || 'Unlimited free POS',
        t('competitive_rates.large.feature2') ||
          'Premium hardware with 8+ tablets included',
        t('competitive_rates.large.feature3') || 'Best rates and cash discount',
        t('competitive_rates.large.feature4') ||
          'Up to $10,000+ cash signing bonus',
      ],
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('competitive_rates.heading') || 'Competitive Rates'}
          </h2>
          <p className="text-lg text-neutral-600">
            {t('competitive_rates.description') ||
              "Our online calculator will help you find the best POS system for your business. Simply enter your monthly sales volume and we'll show you the most cost-effective options with exclusive deals."}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${
                tier.highlighted
                  ? 'border-2 border-primary shadow-xl scale-105'
                  : 'border-2 hover:border-primary/30'
              } transition-all duration-300`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold mb-2">
                  {tier.name}
                </CardTitle>
                <p className="text-sm text-neutral-600 font-medium">
                  {tier.size}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Illustration */}
                <div className="flex justify-center py-4">
                  <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center">
                    <Image
                      src={tier.image || '/icons/ic_restaurant.svg'}
                      alt={tier.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`w-full font-semibold ${
                    tier.highlighted
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-neutral-900 hover:bg-neutral-800'
                  }`}
                  size="lg"
                >
                  <Link to="/get-pricing">
                    {t('competitive_rates.cta') || 'Get Started'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-neutral-600 mb-4">
            {t('competitive_rates.bottom_text') ||
              'Not sure which tier is right for you?'}
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/calculator">
              {t('competitive_rates.calculator_cta') || 'Use Our Calculator'}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
