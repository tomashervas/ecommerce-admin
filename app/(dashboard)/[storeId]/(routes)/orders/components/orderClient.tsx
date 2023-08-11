"use client"

import Heading from "@/components/ui/heading"
import { OrderColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/dataTable"

interface OrderClientProps {
  orders: OrderColumn[]
}

const OrderClient = ({orders}: OrderClientProps) => {

  return (
    <>
      <Heading title={`Pedidos (${orders.length})`} description="Gestiona los pedidos de tu tienda"/>
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="products"/>
    </>
  )
}
export default OrderClient