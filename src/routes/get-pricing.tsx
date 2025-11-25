import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/get-pricing')({
  component: GetPricingPage,
})

const businessTypes = [
  'Full Service Restaurant',
  'Quick Service Restaurant',
  'Bar & Night Club',
  'Retail Store',
  'Small Business',
  'Pizzeria',
]

function GetPricingPage() {
  const { t } = useTranslation('calculator')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    email: '',
    phone: '',
  })

  const progress = (step / 3) * 100

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // TODO: Implement form submission
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {t('Get Your Free Quote')}
          </h1>
          <p className="text-xl text-neutral-600">
            {t('Answer a few questions to get personalized recommendations')}
          </p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && t('Step 1: Business Type')}
              {step === 2 && t('Step 2: Business Information')}
              {step === 3 && t('Step 3: Contact Details')}
            </CardTitle>
            <CardDescription>
              {t('Step')} {step} {t('of')} 3
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <Label>{t('What type of business do you have?')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setFormData({ ...formData, businessType: type })
                      }
                      className={`p-4 border-2 rounded-lg text-left hover:border-primary transition-colors ${
                        formData.businessType === type
                          ? 'border-primary bg-primary/5'
                          : ''
                      }`}
                    >
                      {t(type)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">{t('Business Name')}</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder={t('Enter your business name')}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">{t('Email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t('your@email.com')}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('Phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={t('(555) 123-4567')}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('Back')}
                </Button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!formData.businessType && step === 1}
                >
                  {t('Next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>{t('Get My Quote')}</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
