import { apiClient } from './client'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  features: string[]
  rating: number
  pricing?: {
    monthly?: number
    annual?: number
    setup?: number
  }
  logo?: string
  website?: string
}

export interface ProductListParams {
  limit?: number
  type?: string
  category?: string
}

export async function fetchProductList(
  params?: ProductListParams,
): Promise<Product[]> {
  const response = await apiClient.get<Product[]>('/products', { params })
  return response.data
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${slug}`)
  return response.data
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`)
  return response.data
}
