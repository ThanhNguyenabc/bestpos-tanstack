import {
  CashDiscountProgramImg,
  CheckServicesImg,
  CloverAppMarketImg,
  GiftCardProgramImg,
  InvoicingImg,
  LoyaltyRewardsImg,
  MobileOrderPayImg,
  OnlineReportingImg,
  QuickBooksPluginImg,
} from '@/assets/Images'
import { RouteConfig } from './routes'

export const PRODUCTS_MENU = [
  {
    title: 'product_types.market.title',
    src: CloverAppMarketImg,
    href: RouteConfig.CloverAppMarket,
  },

  {
    title: 'product_types.gift.title',
    src: GiftCardProgramImg,
    href: RouteConfig.GiftCardProgram,
  },
  {
    title: 'product_types.loyalty.title',
    src: LoyaltyRewardsImg,
    href: RouteConfig.CustomerLoyaltyProgramsAndRewards,
  },
  {
    title: 'product_types.cash_discount.title',
    src: CashDiscountProgramImg,
    href: RouteConfig.CashDiscountProgram,
  },
  {
    title: 'product_types.check_service.title',
    src: CheckServicesImg,
    href: RouteConfig.CheckServices,
  },
  {
    title: 'product_types.online_analytics.title',
    src: OnlineReportingImg,
    href: RouteConfig.OnlineAnalytics,
  },
  {
    title: 'product_types.quick_book.title',
    src: QuickBooksPluginImg,
    href: RouteConfig.QuickbooksPlugin,
  },
  {
    title: 'product_types.cash_advance.title',
    src: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718773308/extrabread/common/so6uh0almm4o7jwmlijw.png',
    href: RouteConfig.CashAdvance,
  },
  {
    title: 'product_types.invoicing.title',
    src: InvoicingImg,
    href: RouteConfig.Invoicing,
  },
  {
    title: 'product_types.mobile_order.title',
    src: MobileOrderPayImg,
    href: RouteConfig.MobilePay,
  },
  {
    title: 'funding_form.heading',
    src: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1748848793/bestpos/Frame_560_qp8ec7.webp',
    href: RouteConfig.SameDayFunding,
  },
  {
    title: 'product_types.cloud_beds.title',
    src: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1761020208/bestpos/banner/cloudbeds_x6adg6.webp',
    href: RouteConfig.CloudBeds,
  },
]
