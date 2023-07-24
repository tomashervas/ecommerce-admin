"use client"

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "../ui/modal"

const StoreModal = () => {

    const storeModal = useStoreModal()

  return (
    <Modal isOpen={storeModal.isOpen} description="description"  title="Create Store" onClose={storeModal.onClose}>
        Create Store Modal
    </Modal>
  )
}
export default StoreModal