import { create } from 'zustand'

export type ModalType = 'createServer'

interface ModalStore {
  type: ModalType | null
  isOpen: boolean
  open: (type: ModalType) => void
  close: () => void
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  open: type => set({ type, isOpen: true }),
  close: () => set({ isOpen: false }),
}))
