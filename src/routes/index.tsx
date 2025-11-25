import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchProductList } from '@/lib/api/products'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import {
  HomeBanner,
  HomePOSList,
  HelpingPOSSection,
  MerchantFeeSection,
  CompetitiveAdvantageSection,
  TestimonialsSection,
} from '@/components/home'

// Query options for home page data
export const homeQueryOptions = () =>
  queryOptions({
    queryKey: ['home', 'products'],
    queryFn: async () => {
      try {
        const products = await fetchProductList({ limit: 3, type: 'featured' })
        return { products }
      } catch (error) {
        console.error('Error fetching home data:', error)
        return { products: [] }
      }
    },
  })

// Route definition
export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(homeQueryOptions())
  },
  component: HomePage,
})

function HomePage() {
  const { data } = useSuspenseQuery(homeQueryOptions())
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <HomeBanner />

      {/* Helping POS Section */}
      {/* <HelpingPOSSection /> */}

      {/* Featured POS Systems */}
      {/* <HomePOSList products={data.products} /> */}

      {/* Merchant Fee Section */}
      {/* <MerchantFeeSection /> */}

      {/* Competitive Advantage */}
      {/* <CompetitiveAdvantageSection /> */}

      {/* Testimonials */}
      {/* <TestimonialsSection /> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('Ready to Find Your Perfect POS?')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('Get a free quote and expert recommendations in minutes')}
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/get-pricing">
              {t('Get Started Free')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
