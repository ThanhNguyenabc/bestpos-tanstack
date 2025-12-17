import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '@/components/contact/ContactPage'
import { createHead, createSEOQuery } from '@/lib/seo'
import { getCurrentLanguage } from '@/utils/language-routing'

export const Route = createFileRoute('/contact-us')({
  loader: async ({ context, location }) => {
    const lang = getCurrentLanguage(location.pathname)
    const seoData = await context.queryClient.fetchQuery(
      createSEOQuery('contacts', lang),
    )
    return { seo: seoData, language: lang }
  },
  head: ({ loaderData }) => createHead({ seo: loaderData?.seo }),
  component: ContactPage,
})
