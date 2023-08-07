"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/dataTable"
import ApiList from "@/components/ui/apiList"

interface SizeClientProps {
  sizes: SizeColumn[]
}

const SizeClient = ({sizes}: SizeClientProps) => {

    const router = useRouter()
    const params = useParams()
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <Heading title={`Tallas (${sizes.length})`} description="Gestiona las tallas de tu tienda"/>
          <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Agregar
          </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={sizes} searchKey="name"/>
      <Separator />
      
      <Heading title="API" description="Llamadas a la API" />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  )
}
export default SizeClient