import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    handleApiError(error)
    return Promise.reject(error)
  },
)

// Error handler
export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'

    // Don't show toast for 404s on optional requests
    if (error.response?.status !== 404) {
      toast.error(message)
    }

    return message
  }

  const message = 'An unexpected error occurred'
  toast.error(message)
  return message
}

// Generic API request function
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<T>(config)
  return response.data
}
