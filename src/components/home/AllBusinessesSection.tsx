import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Container from '../primitives/Container'
import Image from '../ui/image'
import {
  BarNightImg,
  FullServiceRestaurantsImg,
  PizzeriasImg,
  QuickServiceRestaurantsImg,
  RetailBusinessesImg,
  SmallBusinessImg,
} from '@/assets/images/business-types'

interface AllBusinessesSectionProps {
  heading?: string
}

export function AllBusinessesSection({ heading }: AllBusinessesSectionProps) {
  const { t } = useTranslation('common')

  const businesses = [
    {
      title: t('business_categories.full_service'),
      image: FullServiceRestaurantsImg,
      href: '/full-service-restaurants',
    },
    {
      title: t('business_categories.retail'),
      image: RetailBusinessesImg,
      href: '/retail',
    },
    {
      title: t('business_categories.quick_service'),
      image: QuickServiceRestaurantsImg,
      href: '/quick-service-restaurants',
    },
    {
      title: t('business_categories.small_business'),
      image: SmallBusinessImg,
      href: '/small-business',
    },
    {
      title: t('business_categories.bar_clubs'),
      image: BarNightImg,
      href: '/bars-and-night-clubs',
    },
    {
      title: t('business_categories.pizzerias'),
      image: PizzeriasImg,
      href: '/pizzerias',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-neutral-900"
            dangerouslySetInnerHTML={{
              __html: heading || t('point_of_sale.heading'),
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {businesses.map((business, index) => (
            <Link key={index} to={business.href}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={business.image}
                    alt={business.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{business.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
