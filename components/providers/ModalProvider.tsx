'use client'

import useHydrate from '@/hooks/useHydrate'
import CreateServerModal from '../modals/createServerModal'

export default function ModalProvider() {
  if (useHydrate())
    return (
      <>
        <CreateServerModal />
      </>
    )
}
