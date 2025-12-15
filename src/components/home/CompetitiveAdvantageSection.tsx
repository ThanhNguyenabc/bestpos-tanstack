import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Handshake, Award, Target } from 'lucide-react'
import Container from '../primitives/Container'

export function CompetitiveAdvantageSection() {
  const { t } = useTranslation('home')

  const advantages = [
    {
      title: t('competitive_advantage.partnerships.title') || 'Partnerships',
      desc:
        t('competitive_advantage.partnerships.desc') ||
        "We've built strong relationships with leading POS providers, giving us insider access to exclusive deals and priority support for our clients.",
      icon: Handshake,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: t('competitive_advantage.expertise.title') || 'Expertise',
      desc:
        t('competitive_advantage.expertise.desc') ||
        'Our team has years of experience in the POS industry. We understand the technology, pricing models, and what works best for different business types.',
      icon: Award,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: t('competitive_advantage.approach.title') || 'Our Approach',
      desc:
        t('competitive_advantage.approach.desc') ||
        'We take a consultative approach, understanding your unique needs and matching you with the perfect POS solution - not just the one that pays us the most.',
      icon: Target,
      color: 'bg-green-50 text-green-600',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            {t('competitive_advantage.heading') || 'Our Competitive Advantage'}
          </h2>
          <p className="text-lg text-neutral-600">
            {t('competitive_advantage.sub_heading') ||
              "At BestPOS, we specialize in connecting businesses with the perfect POS solution by leveraging our partnerships, expertise, and client-first approach. Here's why choosing us makes all the difference:"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card
                key={index}
                className="text-center border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`mx-auto mb-4 w-16 h-16 rounded-xl ${advantage.color} flex items-center justify-center`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-neutral-900">
                    {advantage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-neutral-600 leading-relaxed">
                    {advantage.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
