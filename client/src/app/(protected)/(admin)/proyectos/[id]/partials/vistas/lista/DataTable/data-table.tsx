"use client"
import React, { useEffect, useState } from 'react'
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

import { Hito } from '@/types/proyecto/Hito'


interface DataTableProps<TData, TSubRowsField extends keyof TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  subRowsField?: TSubRowsField; // Field in TData that contains the sub rows
  newTask?: React.ReactNode;
}

export function HitosTable<
  TData, 
  TSubRowsField extends keyof TData, 
  TValue>({
  columns,
  data,
  subRowsField,
  newTask
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
    getSubRows: (row) => subRowsField && row[subRowsField] as TData[],
    // getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      expanded
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        {newTask}
      </div>
      <Table>
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : (
                          <div className='space-y-1.5'>
                            {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null} */}
                        </div>
                      )
                    }
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
                No hay tareas para mostrar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    
  )
}
