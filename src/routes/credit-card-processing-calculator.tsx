import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/credit-card-processing-calculator')({
  component: CreditCardProcessingCalculator,
})

function CreditCardProcessingCalculator() {
  const { t } = useTranslation('calculator')
  const [monthlyVolume, setMonthlyVolume] = useState('')
  const [rate, setRate] = useState('2.9')
  const [fees, setFees] = useState(0)

  const calculate = () => {
    const volume = parseFloat(monthlyVolume) || 0
    const ratePercent = parseFloat(rate) || 0
    const calculatedFees = (volume * ratePercent) / 100
    setFees(calculatedFees)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('Credit Card Processing Calculator')}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>{t('Calculate Your Processing Fees')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="volume">
                {t('Monthly Processing Volume ($)')}
              </Label>
              <Input
                id="volume"
                type="number"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(e.target.value)}
                placeholder="50000"
              />
            </div>

            <div>
              <Label htmlFor="rate">{t('Processing Rate (%)')}</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="2.9"
              />
            </div>

            <Button onClick={calculate} className="w-full">
              {t('Calculate Fees')}
            </Button>

            {fees > 0 && (
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <div className="text-sm text-neutral-600 mb-2">
                  {t('Monthly Processing Fees')}
                </div>
                <div className="text-4xl font-bold text-primary">
                  $
                  {fees.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-sm text-neutral-600 mt-2">
                  {t('Annual')}: $
                  {(fees * 12).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
