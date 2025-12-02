import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export default function Container({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8`, className)}
    >
      {children}
    </div>
  )
}
