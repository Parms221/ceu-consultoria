import { Metadata } from "next";
import {
  ConsultoresAsignados,
  DefaultMiniCart,
  ProyectorPorConfirmar,
  ProyectosTerminados,
} from "@/app/(protected)/(admin)/proyectos/partials/mini-cards";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/server/fetch/server-side";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";

export const metadata: Metadata = {
  title: "Proyectos - CEU",
};

export default async function Page() {
  return (
    <main className="space-y-3">
      <PageTitle>Administración de proyectos</PageTitle>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ProyectosTerminados />
        <ConsultoresAsignados />
        <ProyectorPorConfirmar />
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
          {/*    TODO: add filters and table*/}
          <div className="flex justify-between">
            <div></div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
