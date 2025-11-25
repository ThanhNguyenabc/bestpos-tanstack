import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchBlogBySlug } from '@/lib/api/blogs'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowLeft } from 'lucide-react'

export const blogDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['blog', slug],
    queryFn: async () => {
      return await fetchBlogBySlug(slug)
    },
  })

export const Route = createFileRoute('/blogs/$blogId')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      blogDetailQueryOptions(params.blogId),
    )
  },
  component: BlogDetailPage,
})

function BlogDetailPage() {
  const { blogId } = Route.useParams()
  const blog = useSuspenseQuery(blogDetailQueryOptions(blogId))
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('Back to Blog')}
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {blog.data.title}
            </h1>
            <div className="flex items-center gap-6 text-neutral-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.data.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(blog.data.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.data.content }} />
          </div>

          {blog.data.tags && blog.data.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {blog.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
