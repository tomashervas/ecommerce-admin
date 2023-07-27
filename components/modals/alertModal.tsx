"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "../ui/button"

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean

}
const AlertModal: React.FC<AlertModalProps> = ({isOpen, onClose, onConfirm, loading}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted) return null

  return (
    <Modal title="¿Estás seguro?" description="Esta acción no se puede deshacer" isOpen={isOpen} onClose={onClose}  >
        <div className="flex justify-end space-x-2 w-full pt-6">
            <Button disabled={loading} variant={"outline"} onClick={onClose}>Cancelar</Button>
            <Button variant={"destructive"} onClick={onConfirm}>Confirmar</Button>
        </div>
    </Modal>
  )
}
export default AlertModal