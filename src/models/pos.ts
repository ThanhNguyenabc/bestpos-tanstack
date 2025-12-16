/**
 * POS Product types
 * Shared types for POS system data across the application
 */

export interface POSProduct {
  id: string
  name: string
  slug: string
  logo?: string
  monthly_price?: number
  one_time_purchase?: number
  overview?: {
    en: string
    es: string
  }
  pros?: {
    en: string[]
    es: string[]
  }
  expert_opinion?: {
    overall?: number
  }
  os_system?: string[]
}

export type POSPriority = 'first' | 'second' | 'third'

export interface ProcessedPOSProduct {
  id: string
  name: string
  slug: string
  logo?: string
  rating: number
  features: string[]
  overview: string
  priority?: POSPriority
  os_system?: string[]
}
