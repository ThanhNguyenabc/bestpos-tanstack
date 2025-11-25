import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { Container } from '@/components/ui/container'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  rating: number
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
    <section className="py-16 bg-neutral-50">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t('Top Rated POS Systems')}
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          {t(
            'Discover the most trusted and highly-rated POS systems chosen by businesses like yours',
          )}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6 line-clamp-3">
                  {product.description}
                </CardDescription>
                <Button asChild className="w-full">
                  <Link to={`/pos-systems/${product.slug}`}>
                    {t('Learn More')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/pos-systems">{t('View All POS Systems')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
