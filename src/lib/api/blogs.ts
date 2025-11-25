import { apiClient } from './client'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  tags?: string[]
  coverImage?: string
}

export interface BlogListParams {
  limit?: number
  offset?: number
  tag?: string
}

export async function fetchBlogList(
  params?: BlogListParams,
): Promise<BlogPost[]> {
  const response = await apiClient.get<BlogPost[]>('/blogs', { params })
  return response.data
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost> {
  const response = await apiClient.get<BlogPost>(`/blogs/${slug}`)
  return response.data
}

export async function fetchBlogById(id: string): Promise<BlogPost> {
  const response = await apiClient.get<BlogPost>(`/blogs/${id}`)
  return response.data
}
