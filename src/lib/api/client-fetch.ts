import { toast } from 'sonner'

interface FetchConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
  timeout?: number
}

interface ApiResponse<T> {
  data: T
}

class ApiClient {
  private baseURL: string
  private defaultTimeout: number

  constructor(baseURL: string, timeout = 30000) {
    this.baseURL = baseURL
    this.defaultTimeout = timeout
  }

  private async request<T>(
    endpoint: string,
    config: FetchConfig = {},
  ): Promise<ApiResponse<T>> {
    const { params, timeout = this.defaultTimeout, ...fetchConfig } = config

    // Build URL with query params
    const url = new URL(endpoint, this.baseURL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url.toString(), {
        ...fetchConfig,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchConfig.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new ApiError(
          error.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          error,
        )
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      clearTimeout(timeoutId)
      this.handleError(error)
      throw error
    }
  }

  private handleError(error: unknown) {
    if (error instanceof ApiError) {
      // Don't show toast for 404s on optional requests
      if (error.status !== 404) {
        toast.error(error.message)
      }
    } else if (error instanceof Error) {
      if (error.name === 'AbortError') {
        toast.error('Request timeout')
      } else {
        toast.error(error.message)
      }
    } else {
      toast.error('An unexpected error occurred')
    }
  }

  async get<T>(
    endpoint: string,
    config?: FetchConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: FetchConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: FetchConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(
    endpoint: string,
    config?: FetchConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: FetchConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || '/api',
)

export { ApiError }
export type { FetchConfig, ApiResponse }

// Helper function to check if error is an ApiError
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

// Error handler for use in components
export function handleApiError(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
