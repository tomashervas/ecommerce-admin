"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellActions from "./cellActions"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  color: string
  category: string
  isArchived: Boolean
  isFeatured: Boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "isArchived",
    header: "Archivado",
  },
  {
    accessorKey: "isFeatured",
    header: "Destacado",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "size",
    header: "Talla",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.color}} />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    id: "actions",
    cell: ({row}) => <CellActions data={row.original} />
  }
]
