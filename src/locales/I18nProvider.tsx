import { Component, Suspense, type ReactNode } from 'react'
import i18n from './index'
import { I18nextProvider } from 'react-i18next'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface I18nErrorBoundaryProps {
  children: ReactNode
}

interface I18nErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error boundary specifically for i18n translation loading failures
 * Handles errors gracefully and provides fallback UI
 */
class I18nErrorBoundary extends Component<
  I18nErrorBoundaryProps,
  I18nErrorBoundaryState
> {
  constructor(props: I18nErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): I18nErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('i18n translation loading error:', error, errorInfo)

    // In development, provide more detailed error information
    if (import.meta.env.DEV) {
      console.warn(
        'Translation loading failed. Falling back to default language.',
        error.message,
      )
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center px-4 max-w-md">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Translation Loading Error
            </h2>
            <p className="text-neutral-600 mb-4">
              We encountered an issue loading translations. The application will
              continue in English.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-left">
                <p className="text-xs font-mono text-red-800 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Fallback UI displayed during async translation loading
 * Provides visual feedback during language switches
 */
function I18nLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-neutral-600 font-medium">Loading translations...</p>
      </div>
    </div>
  )
}

/**
 * Enhanced I18nProvider with error handling and loading states
 * Wraps the application with i18next context and handles async loading
 */
export default function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nErrorBoundary>
      <Suspense fallback={<I18nLoadingFallback />}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Suspense>
    </I18nErrorBoundary>
  )
}
