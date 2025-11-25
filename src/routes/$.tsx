import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/$')({
  component: NotFound,
})

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved or deleted.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/pos-systems">Browse POS Systems</Link>
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-neutral-500 mb-4">Popular Pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/get-pricing"
              className="text-sm text-primary hover:underline"
            >
              Get Pricing
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/blogs" className="text-sm text-primary hover:underline">
              Blog
            </Link>
            <span className="text-neutral-300">•</span>
            <Link
              to="/contact-us"
              className="text-sm text-primary hover:underline"
            >
              Contact Us
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/faqs" className="text-sm text-primary hover:underline">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
