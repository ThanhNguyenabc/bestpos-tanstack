import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Handshake, Award, Target } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function CompetitiveAdvantageSection() {
  const { t } = useTranslation('home')

  const advantages = t('competitive_advantage.items', {
    returnObjects: true,
  }) as Array<{
    title: string
    desc: string
  }>

  const icons = [Handshake, Award, Target]

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('competitive_advantage.heading')}
          </h2>
          <p className="text-lg text-neutral-600">
            {t('competitive_advantage.sub_heading')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => {
            const Icon = icons[index]
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
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
