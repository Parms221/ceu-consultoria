"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import ProyectoPendienteCard from "./partials/ProyectoPendienteCard";
import useProyecto from "@/hooks/Proyecto/useProyecto";

export default function ProyectosPendientes() {
  const { getProyectosPropuestosQuery } = useProyecto()
  const { data } = getProyectosPropuestosQuery()

  return (
    <section>
      <Breadcrumb pageName={"Proyectos por confirmar"} slug={"Pendientes"}>
        <Link href="/proyectos">Proyectos /</Link>
      </Breadcrumb>

      {data?.length === 0 && ( // If there are no projects to show
        <div className="flex w-full items-center justify-center p-5">
          <p>No hay proyectos por confirmar</p>
        </div>
      )}
      {data?.length !== 0 && (
        <article className="area">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel minSize={30} defaultSize={40} maxSize={50}>
              <div className="md:max-h-[calc(100vh-240px)] md:overflow-y-scroll">
                <div className="grid grid-cols-1 gap-5 px-5">
                  {data?.map((proyecto) => (
                    <ProyectoPendienteCard
                      key={proyecto.idProyecto}
                      proyecto={proyecto}
                    />
                  ))}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle className="hidden md:block" />
            <ResizablePanel className="hidden md:block" minSize={50} defaultSize={60} maxSize={70}>
              <div className="flex h-full flex-col items-center justify-center p-5">
                <h1 className="text-gray-800 text-3xl font-bold">
                  ¡Bienvenido!
                </h1>
                <p className="text-gray-600">
                  Selecciona un proyecto para ver más detalles.
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </article>
      )}
    </section>
  );
}
