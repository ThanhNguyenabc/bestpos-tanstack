import { useMemo } from 'react'
import { RouteConfig } from '@/utils/routes'
import { SOLUTIONS_MENU } from '@/utils/solutions_menu'
import { BusinessCard, ProductCard, SolutionCard } from './NavigationCards'
import { BUSINESS_MENU } from '@/utils/business_menu'
import { PRODUCTS_MENU } from '@/utils/product_menu'

// Pre-compute menu items outside of render cycle
const createSolutionCards = () =>
  SOLUTIONS_MENU?.map((item) => <SolutionCard key={item.href} {...item} />)

const createBusinessCards = () =>
  BUSINESS_MENU?.map((item) => <BusinessCard key={item.href} {...item} />)

const createProductCards = () =>
  PRODUCTS_MENU?.map((item) => <ProductCard key={item.href} {...item} />)

// Static menu configuration
const MENU_CONFIG = [
  {
    key: RouteConfig.Solution,
    label: 'solution',
    createChild: createSolutionCards,
  },
  {
    key: RouteConfig.BusinessTypes,
    label: 'business_type',
    createChild: createBusinessCards,
  },
  {
    key: RouteConfig.Products,
    label: 'products',
    createChild: createProductCards,
  },
  {
    key: RouteConfig.POSSystems,
    label: 'pos_systems',
    createChild: undefined,
  },
] as const

// Hook to get memoized menu with rendered children
export const useMenu = () => {
  return useMemo(
    () =>
      MENU_CONFIG.map((item) => ({
        key: item.key,
        label: item.label,
        child: item.createChild?.(),
      })),
    [],
  )
}

// Export static menu for backward compatibility
export const MENU = MENU_CONFIG.map((item) => ({
  key: item.key,
  label: item.label,
  child: item.createChild?.(),
}))
