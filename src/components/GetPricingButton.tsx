import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const GetPricingButton = ({ className }: { className?: string }) => {
  const { t } = useTranslation()

  return (
    <Button
      variant={'solid'}
      className={cn('bg-neutral-900 lg:self-start', className)}
      aria-label="Get free pricing quote"
    >
      <Link to="/get-pricing">
        {t('get_pricing_today') || 'Get a Free Quote'}
      </Link>
    </Button>
  )
}

export default GetPricingButton
