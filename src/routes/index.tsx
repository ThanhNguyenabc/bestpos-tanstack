import { createFileRoute } from '@tanstack/react-router'
import { HomeBanner } from '@/components/home'
import { createHead, createSEOQuery } from '@/lib/seo'
import i18n from '@/locales'

// Query options for home page SEO data
export const homeQueryOptions = () => {
  const currentLang = i18n.language || 'en'
  return createSEOQuery('home', currentLang)
}

// Route definition
export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    // Fetch SEO tags for the home page in current language
    const seoData = await context.queryClient.fetchQuery(homeQueryOptions())
    return { seo: seoData }
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
