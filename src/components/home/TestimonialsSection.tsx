import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { Container } from '@/components/ui/container'

interface Testimonial {
  id: string
  rating: number
  title: string
  img: string
  quote: string
  author: {
    name: string
    title: string
  }
}

export function TestimonialsSection() {
  const { t } = useTranslation('testimonials')

  const testimonials = t('comments', { returnObjects: true }) as Testimonial[]

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('What Our Clients Say')}
          </h2>
          <p className="text-lg text-neutral-600">
            {t(
              'Hear from business owners who have transformed their operations with our help',
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="mb-6 flex-1 italic">
                  {testimonial.quote}
                </CardDescription>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.img}
                      alt={testimonial.author.name}
                    />
                    <AvatarFallback>
                      {testimonial.author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {testimonial.author.name && (
                      <p className="font-semibold text-sm">
                        {testimonial.author.name}
                      </p>
                    )}
                    <p className="text-xs text-neutral-600">
                      {testimonial.author.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
