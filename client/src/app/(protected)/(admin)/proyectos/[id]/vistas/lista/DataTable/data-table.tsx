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
import { Hito } from '@/types/proyecto/Hito'


interface DataTableProps<TData, TSubRowsField extends keyof TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  subRowsField: TSubRowsField; // Field in TData that contains the sub rows
}

export function HitosTable<
  TData, 
  TSubRowsField extends keyof TData, 
  TValue>({
  columns,
  data,
  subRowsField,
}: DataTableProps<TData, TSubRowsField, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [expanded, setExpanded] = useState<ExpandedState>(true)  

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
    getSubRows: (row) => row[subRowsField] as TData[],
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
