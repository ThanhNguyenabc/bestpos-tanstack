import { Link } from '@tanstack/react-router'
import Image from './ui/image'
import { LogoFullIcon, LogoSmallIcon } from '@/assets/Images'

const BestPosLogo = () => {
  return (
    <Link to="/" className=" min-w-[34px]">
      <picture>
        <source media="(max-width: 768px)" srcSet={LogoSmallIcon} />
        <Image
          src={LogoFullIcon}
          alt="BestPOS Logo"
          width={180}
          height={40}
          className="w-10 md:w-[180px] h-10"
        />
      </picture>
    </Link>
  )
}

export default BestPosLogo
