"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/dataTable"
import ApiList from "@/components/ui/apiList"

interface ProductClientProps {
  products: ProductColumn[]
}

const ProductClient = ({products}: ProductClientProps) => {

    const router = useRouter()
    const params = useParams()
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <Heading title={`Productos (${products.length})`} description="Gestiona los productos de tu tienda"/>
          <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Agregar
          </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} searchKey="name"/>
      <Separator />
      
      <Heading title="API" description="Llamadas a la API" />
      <ApiList entityName="products" entityIdName="productId" />
    </div>
  )
}
export default ProductClient