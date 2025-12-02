import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export const BaseHeadingStyles = {
  responsive: 'text-3xl md:text-4xl lg:text-5xl',
  xl: 'text-3xl md:text-4xl font-extrabold',
  lg: 'text-2xl md:text-3xl font-bold',
  md: 'text-xl md:text-2xl font-semibold',
  sm: 'text-lg font-semibold',
} as const

type Props = PropsWithChildren<{
  type?: 'h1' | 'h2' | 'h3' | 'h4'
  title?: string
  variant?: keyof typeof BaseHeadingStyles
  className?: string
}>

const Heading = ({ type, title, className, children, variant }: Props) => {
  const CMP = type || 'h2'
  return (
    <CMP
      className={cn(
        'font-extrabold text-center',
        variant && BaseHeadingStyles[variant],
        className,
      )}
    >
      {title || children}
    </CMP>
  )
}

export default Heading
