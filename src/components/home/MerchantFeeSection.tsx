import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function MerchantFeeSection() {
  const { t } = useTranslation('home')

  const options = t('merchant_option', { returnObjects: true }) as Array<{
    id: string
    heading: string
    pos_number: string
    price: string
    items: string[]
  }>

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('merchant_heading')}
          </h2>
          <p
            className="text-lg text-neutral-600"
            dangerouslySetInnerHTML={{ __html: t('merchant_desc') }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {options.map((option) => (
            <Card
              key={option.id}
              className="relative hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <Badge className="w-fit mb-2">{option.heading}</Badge>
                <CardTitle className="text-2xl">{option.pos_number}</CardTitle>
                <CardDescription className="text-base">
                  {option.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {option.items.map((item, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
