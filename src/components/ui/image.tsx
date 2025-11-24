import React from 'react'

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} loading="lazy" />
}

export default Image
