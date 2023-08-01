"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellActions from "./cellActions"

export type CategoryColumn = {
  id: string
  name: string,
  billboardLabel: string,
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "billboard",
    header: "Cartel",
    cell: ({row})=>row.original.billboardLabel
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
