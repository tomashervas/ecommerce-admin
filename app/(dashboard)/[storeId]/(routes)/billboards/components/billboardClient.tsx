"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Billboard } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface billboardClientProps {
  billboards: Billboard[]
}

const BillboardClient = ({billboards}: billboardClientProps) => {

    const router = useRouter()
    const params = useParams()
  return (
    <div className="flex items-center justify-between">
        <Heading title={`Carteles de anuncios (${billboards.length})`} description="Gestiona los paneles de anuncios para tu tienda"/>
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Agregar
        </Button>
    </div>
  )
}
export default BillboardClient