import { cn } from '@/lib/utils'
import { forwardRef, HtmlHTMLAttributes } from 'react'

const Row = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...other }, ref) => (
    <div ref={ref} className={cn('flex flex-row', className)} {...other}>
      {children}
    </div>
  ),
)
Row.displayName = 'Row'
export default Row
