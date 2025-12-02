import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Variant = 'default' | 'muted' | 'dark'

export default function Section({
  children,
  className = '',
  variant = 'default',
}: PropsWithChildren<{ className?: string; variant?: Variant }>) {
  const base = 'py-12 md:py-20'
  const map: Record<Variant, string> = {
    default: 'bg-white',
    muted: 'bg-gray-50',
    dark: 'bg-slate-900 text-white',
  }

  return (
    <section className={cn(base, map[variant], className)}>{children}</section>
  )
}
