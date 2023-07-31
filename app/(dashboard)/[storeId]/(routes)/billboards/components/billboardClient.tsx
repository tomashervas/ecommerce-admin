"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Billboard } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/dataTable"

interface billboardClientProps {
  billboards: BillboardColumn[]
}

const BillboardClient = ({billboards}: billboardClientProps) => {

    const router = useRouter()
    const params = useParams()
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <Heading title={`Carteles de anuncios (${billboards.length})`} description="Gestiona los paneles de anuncios para tu tienda"/>
          <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Agregar
          </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={billboards} searchKey="label"/>
    </div>
  )
}
export default BillboardClient