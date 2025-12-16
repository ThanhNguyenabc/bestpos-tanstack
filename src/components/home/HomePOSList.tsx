import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import Container from '../primitives/Container'
import { POSCard } from '../POSCard'
import { POSCardSkeleton } from '../primitives/POSCardSkeleton'
import { useQuery } from '@tanstack/react-query'
import type { POSProduct } from '@/models/pos'
import IcChervonRight from '@/icons/chevron-right.svg?react'

const fetchTopPOSSystems = async (): Promise<POSProduct[]> => {
  const response = await fetch('/pos.json')
  if (!response.ok) {
    throw new Error('Failed to fetch POS systems')
  }
  const data = await response.json()
  return data.slice(0, 3)
}

const PRIORITY_MAP = ['first', 'second', 'third'] as const

function HomePOSListComponent() {
  const { t, i18n } = useTranslation('home')
  const { t: common } = useTranslation()
  const currentLang = i18n.language as 'en' | 'es'

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<POSProduct[]>({
    queryKey: ['pos-systems', 'top-3'],
    queryFn: fetchTopPOSSystems,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  // Memoize processed products to avoid recalculation on every render
  const processedProducts = useMemo(() => {
    return products.map((product, index) => {
      const pros = product.pros?.[currentLang] || product.pros?.en || []
      const overview =
        product.overview?.[currentLang] || product.overview?.en || ''
      const priority = PRIORITY_MAP[index]

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        logo: product.logo,
        rating: product.expert_opinion?.overall || 0,
        features: pros.slice(0, 4),
        overview,
        priority,
        os_system: product.os_system,
      }
    })
  }, [products, currentLang])

  const viewAllText = useMemo(
    () => common('explore_all') || 'View All POS Systems',
    [common],
  )

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            <POSCardSkeleton count={3} />
          </div>
        </Container>
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section className="py-16 md:py-20 bg-neutral-50">
        <Container>
          <div className="text-center py-12">
            <p className="text-neutral-600">
              Unable to load POS systems. Please try again later.
            </p>
          </div>
        </Container>
      </section>
    )
  }
  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {processedProducts.map((product) => (
            <POSCard
              key={product.id}
              name={product.name}
              slug={product.slug}
              logo={product.logo}
              rating={product.rating}
              features={product.features}
              overview={product.overview}
              priority={product.priority}
              os_system={product.os_system}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className=" min-w-52 lg:h-14">
            <Link to="/pos-systems">
              {viewAllText}
              <IcChervonRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

export const HomePOSList = memo(HomePOSListComponent)
