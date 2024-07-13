"use client"
import React, { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Filters from './filters'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Hito } from '@/types/proyecto/Hito'
import { TasksTable } from './tareas/table-tareas'
import { tareasColumns } from './tareas/columns-tareas'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function HitosTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <Filters table={table} />
      <Table>
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='relative'>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const hito = row.original as Hito
              return (
                  <React.Fragment 
                    key={row.id}
                  >
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                    >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className='font-bold'>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                    </TableRow>
                    <tr>
                      <td colSpan={columns.length}>
                        <TasksTable

                          columns={tareasColumns}
                          data={hito.tareasDelHito}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <DataTablePagination table={table} /> */}
    </div>
    
  )
}
