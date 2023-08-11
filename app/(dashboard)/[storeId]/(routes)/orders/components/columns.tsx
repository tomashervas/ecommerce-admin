"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  products: string
  phone: string
  address: string
  totalPrice: string
  isPaid: boolean
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Productos",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "address",
    header: "Direccion",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Pagado",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  }
]
