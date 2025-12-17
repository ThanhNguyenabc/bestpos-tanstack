import Image from '../ui/image'
import { Link } from '@tanstack/react-router'

interface ContactInfoProps {
  icon: string
  title: string
  detail: string
  phone?: string
  email?: string
  href?: string
}

export function ContactInfo({
  icon,
  title,
  detail,
  phone,
  email,
  href,
}: ContactInfoProps) {
  return (
    <div className="flex md:flex-col md:items-center gap-4 md:gap-4 p-4 md:p-0">
      <Image
        src={icon}
        alt={title}
        width={48}
        height={48}
        className="w-10 h-10 md:w-12 md:h-12"
        priority
      />
      <div className="flex flex-col gap-2 items-start md:items-center">
        <h3 className="text-base md:text-lg font-semibold text-neutral-900">
          {title}
        </h3>
        <p
          className="text-start text-sm text-neutral-600 flex-1 md:text-center"
          dangerouslySetInnerHTML={{ __html: detail }}
        />
        {phone && (
          <a
            href={`tel:${phone}`}
            className="text-sm md:text-base text-primary! font-semibold hover:underline"
          >
            {phone}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-sm md:text-base text-primary! font-semibold hover:underline break-all"
          >
            {email}
          </a>
        )}
        {href && (
          <Link
            to={href}
            className="text-sm md:text-base  font-semibold hover:underline flex items-center gap-2 [&>*]:text-primary"
          >
            <span className="text-primary">View FAQs</span>
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
