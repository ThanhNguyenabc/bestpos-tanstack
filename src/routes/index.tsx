import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import {
  HomeBanner,
  HomePOSList,
  HelpingPOSSection,
  MerchantFeeSection,
} from '@/components/home'
import { createHead, createSEOQuery } from '@/lib/seo'
import { getCurrentLanguage } from '@/utils/language-routing'
import { useTranslation } from 'react-i18next'
import { LazySection } from '@/components/primitives/LazySection'

// Lazy load below-the-fold sections - only when scrolled into view
const CompetitiveAdvantageSection = lazy(() =>
  import('@/components/home').then((m) => ({
    default: m.CompetitiveAdvantageSection,
  })),
)
const UniqueValueSection = lazy(() =>
  import('@/components/home').then((m) => ({ default: m.UniqueValueSection })),
)
const WorkWithTheBestSection = lazy(() =>
  import('@/components/home').then((m) => ({
    default: m.WorkWithTheBestSection,
  })),
)
const AllBusinessesSection = lazy(() =>
  import('@/components/home').then((m) => ({
    default: m.AllBusinessesSection,
  })),
)
const SolutionListSection = lazy(() =>
  import('@/components/home').then((m) => ({
    default: m.SolutionListSection,
  })),
)
const TestimonialsSection = lazy(() =>
  import('@/components/home').then((m) => ({
    default: m.TestimonialsSection,
  })),
)
const CTAInnerFooterSection = lazy(() =>
  import('@/components/home').then((m) => ({
    default: m.CTAInnerFooterSection,
  })),
)

// Route definition
export const Route = createFileRoute('/')({
  loader: async ({ context, location }) => {
    // Get language from URL (defaults to 'en' if no prefix)
    const lang = getCurrentLanguage(location.pathname)

    // Fetch SEO data (required for head)
    const seoData = await context.queryClient.fetchQuery(
      createSEOQuery('home', lang),
    )

    return { seo: seoData, language: lang }
  },
  head: ({ loaderData }) => createHead({ seo: loaderData?.seo }),
  component: HomePage,
})

function HomePage() {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col">
      {/* Critical above-the-fold content - load immediately for fast LCP */}
      <HomeBanner />
      <HomePOSList />

      {/* Below-the-fold content - lazy load on scroll to reduce initial render time */}
      <LazySection minHeight="300px">
        <HelpingPOSSection />
      </LazySection>

      <LazySection minHeight="400px">
        <MerchantFeeSection />
      </LazySection>

      <LazySection minHeight="300px">
        <CompetitiveAdvantageSection />
      </LazySection>

      <LazySection minHeight="300px">
        <UniqueValueSection />
      </LazySection>

      <LazySection minHeight="300px">
        <WorkWithTheBestSection />
      </LazySection>

      <LazySection minHeight="400px">
        <AllBusinessesSection heading={t('point_of_sale.heading')} />
      </LazySection>

      <LazySection minHeight="400px">
        <SolutionListSection />
      </LazySection>

      <LazySection minHeight="400px">
        <TestimonialsSection />
      </LazySection>

      <LazySection minHeight="200px">
        <CTAInnerFooterSection />
      </LazySection>
    </div>
  )
}
