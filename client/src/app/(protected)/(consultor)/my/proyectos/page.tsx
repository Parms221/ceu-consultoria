"use client";
import { Fragment, useMemo } from "react";
import Projects from "./partials/projects";
import { useQuery } from "@tanstack/react-query";
import { fetcherLocal } from "@/server/fetch/client-side";
import Loader from "@/components/common/Loader";
import { Proyecto } from "@/types/proyecto";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/app/(protected)/app.context";
import { Estado } from "@/types/estado";

export default function HomeConsultor() {
  const { estados } = useAppContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["proyectos"],
    queryFn: async () => {
      const response = await fetcherLocal(`/proyectos`);
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    },
  });

  function groupProyectosByStatus(proyectos: Proyecto[]) {
    return proyectos.reduce((acc: { [key: string]: Proyecto[] }, proyecto) => {
      if (!acc[proyecto.estado.idEstado]) {
        acc[proyecto.estado.idEstado] = [];
      }
      acc[proyecto.estado.idEstado].push(proyecto);
      return acc;
    }, {});
  }

  const groupedProyectos = useMemo(
    () => (data && data.content ? groupProyectosByStatus(data.content) : {}),
    [data],
  );

  return (
    <Fragment>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Vista general de proyectos
        </h2>
      </header>

      <section className="flex flex-col">
        <Tabs defaultValue={"all"}>
          <article className="area flex flex-col">
            <div className="mb-8 flex w-full flex-col gap-2 rounded-md border p-2">
              <Link
                href={"/my/proyectos/nuevo"}
                className={cn(
                  "flex w-fit gap-1.5",
                  buttonVariants({ size: "sm", variant: "outline" }),
                )}
              >
                <PlusCircle />
                Crear nuevo proyecto
              </Link>

              <TabsList className="w-full flex flex-wrap h-fit">
                <ProyectTypeTab estado={undefined} numberOfProyects={data ? data.content.length : 0} />
                {estados
                  .filter((estado) => estado.tipo === 1)
                  .map((estado) => (
                    <ProyectTypeTab 
                        estado={estado} 
                        numberOfProyects={
                            Object.keys(groupedProyectos).filter(
                                estadoId => estadoId === estado.idEstado.toString()
                            ).length
                        } 
                    />
                  ))}
              </TabsList>
            </div>
            {isLoading && <Loader />}
            {isError || (!data && <div>Error al cargar los proyectos</div>)}

            {data && (
              <Fragment>
                <TabsContent value={"all"}>
                  <Projects proyectos={data ? data.content : []} />
                </TabsContent>
                {estados.map((estado) => (
                    <TabsContent key={estado.idEstado} value={estado.idEstado.toString()}>
                        <Projects proyectos={groupedProyectos[estado.idEstado.toString()] || []} />
                    </TabsContent>
                ))}
              </Fragment>
            )}
          </article>
        </Tabs>
      </section>
    </Fragment>
  );
}
interface IProyectTypeTab {
  estado?: Estado,
  numberOfProyects: number,
}

export function ProyectTypeTab(
    { numberOfProyects, estado } : IProyectTypeTab
) {
  return (
    <TabsTrigger value={estado ? estado.idEstado.toString() : "all" } className="flex grow gap-1.5">
      <span>{estado ? estado.descripcion : "Todos"}</span>
      <span className="grid h-5 w-5 place-content-center rounded-full bg-ceu-celeste/50 text-white">
        {numberOfProyects}
      </span>
    </TabsTrigger>
  );
}