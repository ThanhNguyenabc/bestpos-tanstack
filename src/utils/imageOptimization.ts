export const CLOUDINARY_CONFIG = {
  baseUrl: 'https://res.cloudinary.com/dgrym3yz3',
  defaultQuality: 85,
  defaultFormat: 'auto',

  // Critical images that should load immediately
  criticalImages: ['mobile_logo_xmuhhk.svg', 'full_pos_logo_yx6yrx.png'],

  // Defer these images until after initial page load
  deferredImages: ['footer_cgdmie.png'],
}

export const isCriticalImage = (src: string): boolean => {
  return CLOUDINARY_CONFIG.criticalImages.some((img) => src.includes(img))
}

export const isDeferredImage = (src: string): boolean => {
  return CLOUDINARY_CONFIG.deferredImages.some((img) => src.includes(img))
}

export const getImagePriority = (src: string): 'high' | 'low' | 'auto' => {
  if (isCriticalImage(src)) return 'high'
  if (isDeferredImage(src)) return 'low'
  return 'auto'
}
