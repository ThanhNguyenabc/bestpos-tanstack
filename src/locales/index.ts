import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend) // load translations from /public/locales
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // hook into React
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    debug: false, // set true for dev
    ns: [
      'common',
      'home',
      'pos_systems',
      'testimonials',
      'how_it_work',
      'pos-detail',
      'calculator',
      'request-demo-pos',
      'about_us',
      'faq',
      'bar_clubs',
      'full_service',
      'quick_service',
      'retail',
      'small_business',
      'pizzerias',
    ],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // lazy load path
    },
    react: {
      useSuspense: true, // enable lazy loading with Suspense
    },
  })

export default i18n
