"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CopyIcon, EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ProductColumn } from "./columns"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import AlertModal from "@/components/modals/alertModal"

interface CellActionsProps {
    data: ProductColumn
}

const CellActions: React.FC<CellActionsProps> = ({data}) => {

  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDelete = async () => {
    try {
        setLoading(true)
        await axios.delete(`/api/${params.storeId}/products/${data.id}`)
        toast.success('Producto eliminado')
        router.refresh()
    } catch (error) { 
        toast.error("Ha habido un problema")
    } finally {
        setLoading(false)
        setIsOpen(false)
    }
}

  return (
    <>
    <AlertModal isOpen={isOpen} loading={loading} onClose={()=>setIsOpen(false)} onConfirm={onDelete}/>
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(data.id)
                toast.success("Id copiado al portapapeles")
              }}
            >
              <CopyIcon className="h-4 w-4 mr-2" />
              Copiar Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
              <EditIcon className="h-4 w-4 mr-2" />
              Actualizar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <Trash2Icon className="h-4 w-4 mr-2"/>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}
export default CellActions