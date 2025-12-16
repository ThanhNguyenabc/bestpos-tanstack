import React, { useMemo } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
}

const Image = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  className,
  ...props
}: ImageProps) => {
  const optimizedSrc = useMemo(() => {
    if (!src) return ''

    if (src.startsWith('/')) {
      return src
    }

    if (src.includes('res.cloudinary.com')) {
      const parts = src.split('/upload/')
      if (parts.length === 2) {
        const params = []
        if (width) params.push(`w_${width}`)
        if (height) params.push(`h_${height}`)
        params.push(`q_${quality}`)
        params.push('f_auto')
        params.push('c_limit')

        return `${parts[0]}/upload/${params.join(',')}/${parts[1]}`
      }
    }

    return src
  }, [src, width, height, quality])

  const srcSet = useMemo(() => {
    if (!src || src.startsWith('/') || !src.includes('res.cloudinary.com'))
      return undefined

    const parts = src.split('/upload/')
    if (parts.length !== 2) return undefined

    const sizes = [1, 2]
    return sizes
      .map((scale) => {
        const scaledWidth = width ? width * scale : undefined
        const scaledHeight = height ? height * scale : undefined
        const params = []
        if (scaledWidth) params.push(`w_${scaledWidth}`)
        if (scaledHeight) params.push(`h_${scaledHeight}`)
        params.push(`q_${quality}`)
        params.push('f_auto')
        params.push('c_limit')

        const url = `${parts[0]}/upload/${params.join(',')}/${parts[1]}`
        return `${url} ${scale}x`
      })
      .join(', ')
  }, [src, width, height, quality])
  return (
    <img
      {...props}
      src={optimizedSrc}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}

export default Image
