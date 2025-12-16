import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Container from '../primitives/Container'
import Image from '../ui/image'
import {
  CreditCardTerminalImg,
  MobileCardReaderImg,
  OnlineProcessingImg,
  SupportServiceImg,
} from '@/assets/images/products'

export function SolutionListSection() {
  const { t } = useTranslation('common')

  const solutions = [
    {
      title: t('solutions.credit-card.title'),
      description: t('solutions.credit-card.desc'),
      image: CreditCardTerminalImg,
      href: '/solutions/credit-card',
    },
    {
      title: t('solutions.mobile-card.title'),
      description: t('solutions.mobile-card.desc'),
      image: MobileCardReaderImg,
      href: '/solutions/mobile-card',
    },
    {
      title: t('solutions.online-processing.title'),
      description: t('solutions.online-processing.desc'),
      image: OnlineProcessingImg,
      href: '/solutions/online-processing',
    },
    {
      title: t('solutions.support.title'),
      description: t('solutions.support.desc'),
      image: SupportServiceImg,
      href: '/solutions/support-services',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            {t('find_right_solution')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <Link key={index} to={solution.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {solution.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    {t('learn_more')}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
