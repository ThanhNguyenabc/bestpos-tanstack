import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchProductBySlug } from '@/lib/api/products'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, CheckCircle, ArrowRight } from 'lucide-react'

export const posSystemDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['pos-system', slug],
    queryFn: async () => {
      return await fetchProductBySlug(slug)
    },
  })

export const Route = createFileRoute('/pos-systems/$slug')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      posSystemDetailQueryOptions(params.slug),
    )
  },
  component: POSSystemDetailPage,
})

function POSSystemDetailPage() {
  const { slug } = Route.useParams()
  const product = useSuspenseQuery(posSystemDetailQueryOptions(slug))
  const { t } = useTranslation('pos-detail')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-neutral-900">
              {product.data.name}
            </h1>
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-semibold">
                {product.data.rating}
              </span>
            </div>
          </div>
          <p className="text-xl text-neutral-600">{product.data.description}</p>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t('Get a Free Quote')}
              </h3>
              <p className="text-neutral-600">
                {t('Compare pricing and features')}
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/get-pricing">
                {t('Request Quote')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        {product.data.features && product.data.features.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('Key Features')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {product.data.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pricing */}
        {product.data.pricing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('Pricing')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {product.data.pricing.monthly && (
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-neutral-600 mb-2">
                      {t('Monthly')}
                    </div>
                    <div className="text-3xl font-bold">
                      ${product.data.pricing.monthly}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {t('per month')}
                    </div>
                  </div>
                )}
                {product.data.pricing.annual && (
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-neutral-600 mb-2">
                      {t('Annual')}
                    </div>
                    <div className="text-3xl font-bold">
                      ${product.data.pricing.annual}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {t('per year')}
                    </div>
                  </div>
                )}
                {product.data.pricing.setup && (
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-neutral-600 mb-2">
                      {t('Setup Fee')}
                    </div>
                    <div className="text-3xl font-bold">
                      ${product.data.pricing.setup}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {t('one-time')}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back to list */}
        <div className="text-center">
          <Button asChild variant="outline">
            <Link to="/pos-systems">{t('Back to POS Systems')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
