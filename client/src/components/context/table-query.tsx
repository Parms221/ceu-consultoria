"use client";

import { ColumnDef, getCoreRowModel, PaginationState, Table, TableOptions, useReactTable } from "@tanstack/react-table";
import { DefinedInitialDataOptions, keepPreviousData, QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { PageParams, Paginate } from "@/types/pagination";
import React, { createContext, useMemo, useState } from "react";


interface DataType {
  table: Table<any>
  columns: ColumnDef<any, any>[];
  dataQuery: UseQueryResult<Paginate<any>, unknown> | null
  fetchDataOptions: PageParams;
  setMeta?: React.Dispatch<React.SetStateAction<string>>;
  meta?: any,
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>,
  pagination: PaginationState
}


export const DataTableContext = createContext<DataType>({} as DataType);

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  fetchFn: (params: PageParams) => Promise<Paginate<any>>;
  queryKey: QueryKey,
  children: React.ReactNode,
  initPageSize?: number
  initMeta?: any
  dataQueryOptions?: DefinedInitialDataOptions<Paginate<any>, Error, Paginate<any>, QueryKey>
  reactTableOptions?: TableOptions<any>
}

export function DataTableProvider<TData, TValue>(
  {
    columns,
    fetchFn,
    queryKey,
    children,
    initPageSize = 10,
    dataQueryOptions,
    reactTableOptions,
    initMeta = {}
  }: DataTableProps<TData, TValue>
) {

  const [meta, setMeta] = useState<any>(initMeta);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initPageSize
  });

  const fetchDataOptions: PageParams = {
    page: pageIndex,
    size: pageSize,
    meta: meta
  };

  const dataQuery = useQuery({
    queryFn: async () => await fetchFn(fetchDataOptions),
    queryKey: [...queryKey, fetchDataOptions],
    placeholderData: keepPreviousData,
    ...dataQueryOptions
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: dataQuery.data?.content || [],
    columns: columns,
    pageCount: dataQuery.data?.page?.totalPages || 0,
    state: {
      pagination
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    ...reactTableOptions
  });

  return (
    <DataTableContext.Provider value={{
      table, dataQuery, fetchDataOptions, setMeta, meta, setPagination, columns,
      pagination: pagination
    }}>
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTable() {
  const context = React.useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}