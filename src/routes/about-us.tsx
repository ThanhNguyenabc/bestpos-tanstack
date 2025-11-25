import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Headphones, DollarSign, Store } from 'lucide-react'

export const Route = createFileRoute('/about-us')({
  component: AboutUsPage,
})

function AboutUsPage() {
  const { t } = useTranslation('about_us')

  const stats = [
    {
      icon: <DollarSign className="w-8 h-8 text-orange-500" />,
      text: t('earn_with'),
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-orange-500" />,
      text: t('experience'),
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-orange-500" />,
      text: t('happy_clients'),
    },
    {
      icon: <Store className="w-8 h-8 text-orange-500" />,
      text: t('pos_systems'),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: t('heading') }}
            />
            <p className="text-xl md:text-2xl text-neutral-600 mb-8">
              {t('desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="shrink-0">{stat.icon}</div>
                <p className="text-sm font-medium text-neutral-700">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Bit About Us Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {t('a_bit_about_us.title')}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
                {t('a_bit_about_us.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Point of Sale Solutions Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <Store className="w-10 h-10 text-orange-500 shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  {t('sale_systems.title')}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {t('sale_systems.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Processing Solutions Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <DollarSign className="w-10 h-10 text-orange-500 shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  {t('payment_solutions.title')}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {t('payment_solutions.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <Headphones className="w-10 h-10 text-orange-500 shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  {t('24/7_support.title')}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {t('24/7_support.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cash Signing Bonus Section */}
      <section className="py-16 md:py-20 bg-linear-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('signing_bonus.title')}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-95">
              {t('signing_bonus.desc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
