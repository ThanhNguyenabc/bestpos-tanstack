/// <reference types="vite-plugin-svgr/client" />

export declare global {
  interface Window {
    dataLayer: {
      push: (obj: any) => void
    }
  }
}

declare module 'public/icons/*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module 'public/color-icons/*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}
