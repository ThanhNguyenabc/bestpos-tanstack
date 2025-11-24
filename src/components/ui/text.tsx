import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes, PropsWithChildren } from 'react'

const Text = ({
  as = 'span',
  children,
  className,
  ...props
}: PropsWithChildren<
  HtmlHTMLAttributes<HTMLSpanElement> & {
    as?: 'div' | 'span' | 'p'
  }
>) => {
  const style = (className = cn('text-neutral-900', className))
  const CMP = as
  return (
    <CMP className={style} {...props}>
      {children}
    </CMP>
  )
}

export default Text
