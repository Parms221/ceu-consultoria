import { Metadata } from "next";
import {
  ConsultoresAsignados,
  ProyectosPorConfirmar,
  ProyectosTerminados
} from "@/app/(protected)/(admin)/proyectos/partials/mini-cards";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import ProyectoContext from "@/app/(protected)/(admin)/proyectos/partials/DataTable/table-context";
import DataTable from "@/components/ui/DataTable/DataTable";
import Filters from "@/app/(protected)/(admin)/proyectos/partials/DataTable/filters";

export const metadata: Metadata = {
  title: "Proyectos"
};

export default async function Page() {
  return (
    <main className="space-y-3">
      <PageTitle>Administración de proyectos</PageTitle>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ProyectosTerminados />
        <ConsultoresAsignados />
        <ProyectosPorConfirmar />
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between space-y-0">
          <div>
            <CardTitle>Lista de proyectos</CardTitle>
          </div>
          <div>
            <Link
              href={"/proyectos/nuevo"}
              className={cn(buttonVariants({ size: "sm" }))}
            >
              <PlusIcon className="h-4 w-4" />
              Nuevo proyecto
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <ProyectoContext>
            <Filters />
            <DataTable />
          </ProyectoContext>
          {/*    TODO: add filters and table*/}
          {/*<DataTable columns={columns} data={proyectos ?? []} />*/}
        </CardContent>
      </Card>
    </main>
  );
}
