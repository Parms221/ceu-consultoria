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
  getExpandedRowModel,
  ExpandedState,
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

// TODO: Hacer esto más genérico para que pueda ser usado en cualquier parte
export type WithSubRows<T> = T & { tareasDelHito?: WithSubRows<T>[] } & Hito;

export function HitosTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<
  WithSubRows<TData>
, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    enableExpanding: true,
    getSubRows: row => row.tareasDelHito,
    // getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      expanded
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
              const hito = row.original as unknown as Hito
              return (
                  <React.Fragment 
                    key={row.id}
                  >
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                    >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                    </TableRow>
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
