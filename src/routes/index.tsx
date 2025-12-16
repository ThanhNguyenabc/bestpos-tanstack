import { createFileRoute } from '@tanstack/react-router'
import {
  HomeBanner,
  HomePOSList,
  HelpingPOSSection,
  MerchantFeeSection,
  CompetitiveAdvantageSection,
  UniqueValueSection,
  WorkWithTheBestSection,
  AllBusinessesSection,
  SolutionListSection,
  TestimonialsSection,
  CTAInnerFooterSection,
} from '@/components/home'
import { createHead, createSEOQuery } from '@/lib/seo'
import { getCurrentLanguage } from '@/utils/language-routing'
import { useTranslation } from 'react-i18next'

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
      <HomeBanner />
      <HomePOSList />
      <HelpingPOSSection />
      <MerchantFeeSection />
      <CompetitiveAdvantageSection />
      <UniqueValueSection />
      <WorkWithTheBestSection />
      <AllBusinessesSection heading={t('point_of_sale.heading')} />
      <SolutionListSection />
      <TestimonialsSection />
      <CTAInnerFooterSection />
    </div>
  )
}
