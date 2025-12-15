import { memo } from 'react'
import Container from '../primitives/Container'

interface DropdownContentProps {
  children: React.ReactNode
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const DropdownContent = memo(
  ({ children, onMouseEnter, onMouseLeave }: DropdownContentProps) => {
    return (
      <div
        className="fixed inset-x-0 bg-white border-t border-neutral-200 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        style={{ top: 76 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Container className="grid grid-cols-3 gap-4 py-8">
          {children}
        </Container>
      </div>
    )
  },
)

DropdownContent.displayName = 'DropdownContent'

export default DropdownContent
