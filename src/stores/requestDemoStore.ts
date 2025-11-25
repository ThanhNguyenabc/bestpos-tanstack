import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface RequestDemoState {
  otherPOS: string
  selectedPOS: string
  businessType?: string
  isSubmittedForm: boolean
  setSelectedPOS: (pos: string) => void
  setOtherPOS: (pos: string) => void
  setBusinessType: (type: string) => void
  setIsSubmittedForm: (submitted: boolean) => void
  clearStore: () => void
}

const initialData = {
  otherPOS: '',
  selectedPOS: '',
  businessType: '',
  isSubmittedForm: false,
}

const useRequestDemoStore = create<RequestDemoState>()(
  persist(
    (set) => ({
      ...initialData,
      setSelectedPOS: (pos: string) => set({ selectedPOS: pos }),
      setOtherPOS: (pos: string) => set({ otherPOS: pos }),
      setBusinessType: (type: string) => set({ businessType: type }),
      setIsSubmittedForm: (submitted: boolean) =>
        set({ isSubmittedForm: submitted }),
      clearStore: () => set(initialData),
    }),
    {
      name: 'request-demo-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useRequestDemoStore
