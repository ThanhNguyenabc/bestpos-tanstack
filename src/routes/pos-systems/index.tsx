import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchProductList } from '@/lib/api/products'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ArrowRight } from 'lucide-react'

export const posSystemsQueryOptions = () =>
  queryOptions({
    queryKey: ['pos-systems'],
    queryFn: async () => {
      try {
        const products = await fetchProductList()
        return products
      } catch (error) {
        console.error('Error fetching POS systems:', error)
        return []
      }
    },
  })

export const Route = createFileRoute('/pos-systems/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(posSystemsQueryOptions())
  },
  component: POSSystemsPage,
})

function POSSystemsPage() {
  const products = useSuspenseQuery(posSystemsQueryOptions())
  const { t } = useTranslation('pos_systems')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          {t('POS Systems')}
        </h1>
        <p className="text-xl text-neutral-600">
          {t('Compare the best POS systems for your business')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.data.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-3">
                {product.description}
              </CardDescription>
              <Button asChild className="w-full">
                <Link to={`/pos-systems/${product.slug}`}>
                  {t('View Details')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600">{t('No POS systems found')}</p>
        </div>
      )}
    </div>
  )
}
