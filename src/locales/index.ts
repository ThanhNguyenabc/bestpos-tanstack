import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

i18n
  .use(HttpApi)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // hook into React
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    debug: false, // set true for dev
    ns: ['common', 'home'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json', // lazy load path
    // },
    react: {
      useSuspense: true, // enable lazy loading with Suspense
    },
  })

export default i18n
