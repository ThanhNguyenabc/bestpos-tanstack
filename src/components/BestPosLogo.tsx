import { useDevice } from '@/hooks/useDevice'
import { Link } from '@tanstack/react-router'
import Image from './ui/image'
import { LogoFullIcon, LogoSmallIcon } from '@/assets/Images'

const BestPosLogo = () => {
  const { isMobile } = useDevice()

  return (
    <Link to="/" className=" min-w-[34px]">
      {isMobile ? (
        <Image
          alt="BestPOS Logo Small"
          width={34}
          height={30}
          src={LogoSmallIcon}
          className="h-full"
        />
      ) : (
        <Image
          width={180}
          height={40}
          src={LogoFullIcon}
          alt="desktop-pos-logo"
        />
      )}
    </Link>
  )
  return <div>BestPosLogo</div>
}

export default BestPosLogo
