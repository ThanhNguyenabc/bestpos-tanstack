import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

const Flex = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...other }, ref) => {
    return (
      <div ref={ref} className={cn('flex', className)} {...other}>
        {children}
      </div>
    )
  },
)
Flex.displayName = 'Flex'
export default Flex
