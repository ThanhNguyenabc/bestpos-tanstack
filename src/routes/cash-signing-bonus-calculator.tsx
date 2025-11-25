import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/cash-signing-bonus-calculator')({
  component: CashSigningBonusCalculator,
})

function CashSigningBonusCalculator() {
  const { t } = useTranslation('calculator')
  const [monthlyVolume, setMonthlyVolume] = useState('')
  const [bonus, setBonus] = useState(0)

  const calculate = () => {
    const volume = parseFloat(monthlyVolume) || 0
    const calculatedBonus = Math.min(volume * 0.01, 5000)
    setBonus(calculatedBonus)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('Cash Signing Bonus Calculator')}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>{t('Calculate Your Potential Bonus')}</CardTitle>
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

            <Button onClick={calculate} className="w-full">
              {t('Calculate Bonus')}
            </Button>

            {bonus > 0 && (
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <div className="text-sm text-neutral-600 mb-2">
                  {t('Estimated Bonus')}
                </div>
                <div className="text-4xl font-bold text-primary">
                  ${bonus.toLocaleString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
