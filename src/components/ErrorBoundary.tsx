import { Link, useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'

export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-neutral-900 mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
            Something went wrong
          </h2>
          <p className="text-neutral-600 mb-6">
            We're sorry, but something unexpected happened. Please try again or
            contact support if the problem persists.
          </p>
        </div>

        {/* {error instanceof Error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              {error.message}
            </p>
          </div>
        )} */}

        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  )
}
