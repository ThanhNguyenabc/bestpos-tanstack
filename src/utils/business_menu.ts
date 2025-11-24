import {
  BarNightImg,
  FullServiceRestaurantsImg,
  PizzeriasImg,
  QuickServiceRestaurantsImg,
  RetailBusinessesImg,
  SmallBusinessImg,
} from '@/assets/Images'
import { CategoryType } from '@/models/category_type'
import { RouteConfig } from './routes'

export const BUSINESS_MENU = [
  {
    title: 'business_categories.full_service',
    src: FullServiceRestaurantsImg,
    href: RouteConfig.FullServiceRestaurants,
    icon: dynamic(() => import('@/icons/ic_restaurant.svg')),
    type: CategoryType.full_service,
  },
  {
    title: 'business_categories.retail',
    src: RetailBusinessesImg,
    href: RouteConfig.Retail,
    icon: dynamic(() => import('@/icons/ic_retail.svg')),
    type: CategoryType.retail,
  },
  {
    title: 'business_categories.quick_service',
    src: QuickServiceRestaurantsImg,
    href: RouteConfig.QuickServiceRestaurants,
    icon: dynamic(() => import('@/icons/ic_service1.svg')),
    type: CategoryType.quick_service,
  },
  {
    title: 'business_categories.small_business',
    src: SmallBusinessImg,
    href: RouteConfig.SmallBusiness,
    icon: dynamic(() => import('@/icons/ic_small_business.svg')),
    type: CategoryType.small_business,
  },
  {
    title: 'business_categories.bar_clubs',
    src: BarNightImg,
    href: RouteConfig.BarsAndNightClubs,
    icon: dynamic(() => import('@/icons/ic_barclub.svg')),
    type: CategoryType.club,
  },
  {
    title: 'business_categories.pizzerias',
    src: PizzeriasImg,
    href: RouteConfig.Pizzerias,
    icon: dynamic(() => import('@/icons/ic_pizza.svg')),
    type: CategoryType.pizza,
  },
]
