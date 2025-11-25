import { create } from 'zustand'
import { Product } from '@/lib/api/products'

export type ProductStoreType = {
  products: Product[] | null
  setProducts: (products: Product[]) => void
  clear: () => void
}

const initialData = {
  products: [],
}

export const useProductStore = create<ProductStoreType>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  clear: () => set(initialData),
}))
