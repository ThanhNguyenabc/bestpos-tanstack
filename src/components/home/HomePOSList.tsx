import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import Container from '../primitives/Container'
import { POSCard } from './POSCard'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  rating: number
  features?: string[]
  logo?: string
  pricing?: {
    setup?: string
    monthly?: string
  }
}

interface HomePOSListProps {
  products: Product[]
}

export function HomePOSList({ products }: HomePOSListProps) {
  const { t } = useTranslation('home')

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('pos_list.heading') || 'Top Rated POS Systems'}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('pos_list.description') ||
              'Discover the most trusted and highly-rated POS systems chosen by businesses like yours'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <POSCard
              key={product.id}
              name={product.name}
              slug={product.slug}
              logo={product.logo}
              rating={product.rating}
              features={
                product.features || [
                  product.description,
                  'Cloud-based system',
                  'Mobile POS support',
                  '24/7 customer support',
                ]
              }
              pricing={product.pricing}
              ctaText={t('pos_list.cta') || 'Request Pricing'}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="min-w-[200px]">
            <Link to="/pos-systems">
              {t('pos_list.view_all') || 'View All POS Systems'}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
