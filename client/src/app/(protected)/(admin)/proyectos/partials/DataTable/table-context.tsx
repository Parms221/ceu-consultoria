"use client";

import React from "react";
import { GetPageQueries, PageParams } from "@/types/pagination";
import { fetcherLocal } from "@/server/fetch/client-side";
import { DataTableProvider } from "@/components/context/table-query";
import { columns } from "@/app/(protected)/(admin)/proyectos/partials/DataTable/columns";

export default function ProyectoContext({
                                          children
                                        }: {
  children: React.ReactNode
}) {
  async function Query(params: PageParams) {
    const response = await fetcherLocal(`/proyectos${GetPageQueries(params)}`);
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  }

  return (
    <DataTableProvider columns={columns} fetchFn={Query} queryKey={["proyectos"]}>
      {children}
    </DataTableProvider>
  );
}