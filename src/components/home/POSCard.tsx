import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Check, Clock, DollarSign } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import Image from '../ui/image'

interface POSCardProps {
  name: string
  slug: string
  logo?: string
  rating: number
  reviewCount?: number
  features: string[]
  pricing?: {
    setup?: string
    monthly?: string
  }
  badges?: string[]
  ctaText?: string
}

export function POSCard({
  name,
  slug,
  logo,
  rating,
  reviewCount,
  features,
  pricing,
  badges,
  ctaText = 'Request Pricing',
}: POSCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <CardContent className="p-6 space-y-4">
        {/* Header with Logo and Rating */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {logo && (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={120}
                height={40}
                className="h-10 w-auto object-contain mb-3"
              />
            )}
            <h3 className="text-xl font-bold text-neutral-900">{name}</h3>
          </div>

          {/* Rating Badge */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">{rating.toFixed(1)}</span>
            </div>
            {reviewCount && (
              <span className="text-xs text-neutral-500">
                {reviewCount} reviews
              </span>
            )}
          </div>
        </div>

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Pricing */}
        {pricing && (
          <div className="flex items-center gap-4 py-3 px-4 bg-neutral-50 rounded-lg">
            {pricing.setup && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-neutral-600" />
                <div>
                  <p className="text-xs text-neutral-600">Setup</p>
                  <p className="font-semibold text-sm">{pricing.setup}</p>
                </div>
              </div>
            )}
            {pricing.monthly && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-neutral-600" />
                <div>
                  <p className="text-xs text-neutral-600">Monthly</p>
                  <p className="font-semibold text-sm">{pricing.monthly}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features List */}
        <ul className="space-y-2">
          {features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span className="text-neutral-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-success hover:bg-success/90 font-semibold"
          size="lg"
        >
          <Link to={`/pos-systems/${slug}`}>{ctaText}</Link>
        </Button>

        {/* Footer Links */}
        <div className="flex items-center justify-between text-xs text-neutral-600 pt-2 border-t">
          <Link
            to={`/pos-systems/${slug}`}
            className="hover:text-primary transition-colors"
          >
            📄 View Details
          </Link>
          <Link
            to={`/pos-systems/${slug}#reviews`}
            className="hover:text-primary transition-colors"
          >
            ⭐ Read Reviews
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
