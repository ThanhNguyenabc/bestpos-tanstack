import React from 'react'

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} loading="lazy" decoding="async" />
}

export default Image
