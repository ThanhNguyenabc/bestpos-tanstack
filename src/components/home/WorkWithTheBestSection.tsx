import { useTranslation } from 'react-i18next'
import Container from '../primitives/Container'
import Image from '../ui/image'

export function WorkWithTheBestSection() {
  const { t } = useTranslation('common')

  const partners = [
    {
      name: 'Clover',
      logo: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718770896/extrabread/partners/iqxqvvqxqxqxqxqxqxqx.png',
    },
    {
      name: 'Toast',
      logo: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718770896/extrabread/partners/toast_logo.png',
    },
    {
      name: 'Square',
      logo: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718770896/extrabread/partners/square_logo.png',
    },
    {
      name: 'Lightspeed',
      logo: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718770896/extrabread/partners/lightspeed_logo.png',
    },
    {
      name: 'TouchBistro',
      logo: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718770896/extrabread/partners/touchbistro_logo.png',
    },
    {
      name: 'Revel',
      logo: 'https://res.cloudinary.com/dgrym3yz3/image/upload/v1718770896/extrabread/partners/revel_logo.png',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {t('work_with_thebest')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={120}
                height={60}
                className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
