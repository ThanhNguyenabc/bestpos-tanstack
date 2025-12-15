import { createFileRoute } from '@tanstack/react-router'
import { HomeBanner } from '@/components/home'
import { createHead, createSEOQuery } from '@/lib/seo'
import { getCurrentLanguage } from '@/utils/language-routing'

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
  return (
    <div className="flex flex-col">
      <HomeBanner />
    </div>
  )
}
