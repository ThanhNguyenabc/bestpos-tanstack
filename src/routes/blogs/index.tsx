import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchBlogList } from '@/lib/api/blogs'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'

export const blogsQueryOptions = () =>
  queryOptions({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        return await fetchBlogList()
      } catch (error) {
        console.error('Error fetching blogs:', error)
        return []
      }
    },
  })

export const Route = createFileRoute('/blogs/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(blogsQueryOptions())
  },
  component: BlogsPage,
})

function BlogsPage() {
  const blogs = useSuspenseQuery(blogsQueryOptions())
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          {t('Blog')}
        </h1>
        <p className="text-xl text-neutral-600">
          {t('Latest insights and tips for choosing the right POS system')}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {blogs.data.map((blog) => (
          <Card key={blog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{blog.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-3">
                {blog.excerpt}
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/blogs/${blog.slug}`}>
                  {t('Read More')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600">{t('No blog posts found')}</p>
        </div>
      )}
    </div>
  )
}
