import { RouteConfig } from "./routes";

export const PHONE = "1-888-410-2188";
export const EMAIL = "info@bestpos.com";
export const SM_SCREEN = 640;
export const MD_SCREEN = 768;
export const LG_SCREEN = 1024;
export const US_MASK = "(###) ###-####";

export const COMPANY_MENU = [
  { title: "about_us", href: RouteConfig.AboutUs },
  { title: "contact_us", href: RouteConfig.Contacts },
  { title: "faq", href: RouteConfig.Faqs },
  { title: "Blog", href: RouteConfig.Blogs },
  { title: "credit_calculator", href: RouteConfig.Calculator },
  { title: "cash_bonus_calculator", href: RouteConfig.CashBonusCalculator },
  { title: "request_demo_title", href: RouteConfig.RequestDemo },
  { title: "term_condition", href: RouteConfig.TermsOfService },
  { title: "privacy_policy", href: RouteConfig.PrivacyPolicy },
  { title: "how_we_rate", href: RouteConfig.HowWeRatePolicy },
  {
    title: "advertiser",
    href: RouteConfig.AvertiserPolicy,
  },
];

export enum NavigationLabel {
  Solutions = "solution",
  Equipments = "pos_equipments",
  BusinessTypes = "business_type",
  Products = "products",
  Home = "home",
  Company = "company",
  Pos_systems = "pos_systems",
}
