"use client"

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ModalProps {
    title: string
    description: string
    children?: React.ReactNode
    isOpen: boolean
    onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ title, description, children, isOpen, onClose }) => {
    const onChange = (open: boolean) => {
        if(!open) onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div> {children} </div>
            </DialogContent>
        </Dialog>
    )
}