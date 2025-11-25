import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle, Calendar, DollarSign, Handshake } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function HelpingPOSSection() {
  const { t } = useTranslation('home')

  const steps = [
    {
      icon: CheckCircle,
      title: t('helpingsection.business_review'),
      description: t('helpingsection.business_review_desc'),
    },
    {
      icon: Calendar,
      title: t('helpingsection.schedule_a_demo'),
      description: t('helpingsection.schedule_a_demo_desc'),
    },
    {
      icon: DollarSign,
      title: t('helpingsection.obtain_pricing'),
      description: t('helpingsection.obtain_pricing_desc'),
    },
    {
      icon: Handshake,
      title: t('helpingsection.final_decision'),
      description: t('helpingsection.final_decision_desc'),
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            dangerouslySetInnerHTML={{
              __html: t('helpingsection.helping_section_title'),
            }}
          />
          <p
            className="text-lg text-neutral-600"
            dangerouslySetInnerHTML={{
              __html: t('helpingsection.helping_section_desc'),
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
