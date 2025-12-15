import axios, { AxiosError, AxiosRequestConfig } from 'axios'

// Create axios instance with default config
export const AxiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
})

// Request interceptor
AxiosClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    console.log('config::', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
AxiosClient.interceptors.response.use(
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
    }

    return message
  }

  const message = 'An unexpected error occurred'
  return message
}

// Generic API request function
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await AxiosClient.request<T>(config)
  return response.data
}
