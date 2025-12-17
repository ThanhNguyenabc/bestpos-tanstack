import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import {
  HomeBanner,
  HomePOSList,
  HelpingPOSSection,
  MerchantFeeSection,
} from '@/components/home'
import { createHead, createSEOQuery } from '@/lib/seo'
import { getCurrentLanguage } from '@/utils/language-routing'
import { useTranslation } from 'react-i18next'

// Lazy load below-the-fold sections
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

    // Fetch SEO tags for the home page in detected language
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
      {/* Above-the-fold content - load immediately */}
      <HomeBanner />
      <HomePOSList />
      <HelpingPOSSection />
      <MerchantFeeSection />

      {/* Below-the-fold content - lazy load */}
      <Suspense
        fallback={
          <div className="min-h-[400px] flex items-center justify-center bg-neutral-50">
            <div className="animate-pulse text-neutral-400">Loading...</div>
          </div>
        }
      >
        <CompetitiveAdvantageSection />
        <UniqueValueSection />
        <WorkWithTheBestSection />
        <AllBusinessesSection heading={t('point_of_sale.heading')} />
        <SolutionListSection />
        <TestimonialsSection />
        <CTAInnerFooterSection />
      </Suspense>
    </div>
  )
}
