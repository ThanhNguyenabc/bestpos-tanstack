import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomeBanner } from '@/components/home'
import { createHead, createSEOQuery } from '@/lib/seo'
import { SUPPORTED_LANGUAGES } from '@/utils/language-routing'

// This handles /es, /en, etc.
export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    // Validate language parameter
    if (!SUPPORTED_LANGUAGES.includes(params.lang as any)) {
      throw redirect({ to: '/' })
    }
  },
  loader: async ({ context, params }) => {
    const lang = params.lang as 'en' | 'es'
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
