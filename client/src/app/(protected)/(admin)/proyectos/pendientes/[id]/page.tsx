"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import ProyectoPendienteCard from "../partials/ProyectoPendienteCard";
import ProyectoDetails from "./partials/proyecto-details";
import useProyecto from "@/hooks/Proyecto/useProyecto";

export default function ProyectosPendientes({
  params,
}: {
  params: { id: number };
}) {
  const { getProyectosPropuestosQuery, getProyectoByIdQuery } = useProyecto()
  const { id } = params;
  // const data = await getProyectosPropuestos();
  const { data, isLoading, isError } = getProyectosPropuestosQuery()
  const { data : proyecto} = getProyectoByIdQuery(id);

  if(isLoading){
    <section>
      <Breadcrumb pageName={"Proyectos por confirmar"} slug={"Pendientes"}>
        <Link href="/proyectos">Proyectos /</Link>
      </Breadcrumb>
      <div className="flex w-full items-center justify-center p-5">
        <p>Cargando...</p>
      </div>
    </section>
  }

  return (
    <section>
      <Breadcrumb pageName={"Proyectos por confirmar"} slug={proyecto?.titulo}>
        <Link href="/proyectos">Proyectos /</Link>
        <Link href="/proyectos"> Pendientes /</Link>
      </Breadcrumb>

      <article className="area">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="hidden md:block"
            minSize={30}
            defaultSize={40}
            maxSize={50}
          >
            <div className="md:max-h-[calc(100vh-240px)] md:overflow-y-scroll">
              <div className="grid grid-cols-1 gap-5 px-5">
                {data?.map((proyecto) => (
                  <ProyectoPendienteCard
                    key={proyecto.idProyecto}
                    proyecto={proyecto}
                    active={proyecto.idProyecto == id}
                  />
                ))}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle className="hidden md:block" />
          <ResizablePanel
            className="hidden md:block"
            minSize={50}
            defaultSize={60}
            maxSize={70}
          >
            {proyecto ? (
              <ProyectoDetails proyecto={proyecto} />
            ) : (
              <div className="flex w-full items-center justify-center p-5">
                <p>No se ha seleccionado ningún proyecto</p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </article>
    </section>
  );
}
