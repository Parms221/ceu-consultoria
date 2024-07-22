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
import { CheckCircleIcon } from "lucide-react";
import { Proyecto } from "@/types/proyecto";
import { useState } from "react";
import ProyectoDetails from "./partials/proyecto-details";

export default function ProyectosPendientes() {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);

  const { getProyectosPropuestosQuery } = useProyecto()
  const { data } = getProyectosPropuestosQuery()

  return (
    <section>
      <Breadcrumb pageName={"Proyectos por confirmar"} slug={"Pendientes"}>
        <Link href="/proyectos">Proyectos /</Link>
      </Breadcrumb>

      {data?.length === 0 && ( // If there are no projects to show
        <div className="grid place-content-center h-[calc(100vh-150px)] area">
          <div className="flex flex-col items-center">
            <CheckCircleIcon size={42} className="text-ceu-celeste" />
            <p>No hay proyectos por confirmar</p>
          </div>
        </div>
      )}
      {data && data.length !== 0 && (
        <article className="area">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel minSize={30} defaultSize={40} maxSize={50}>
              <div className="md:max-h-[calc(100vh-240px)] md:overflow-y-scroll">
                <div className="grid grid-cols-1 gap-5 px-5">
                  {data?.map((proyecto) => (
                    <ProyectoPendienteCard
                      key={proyecto.idProyecto}
                      proyecto={proyecto}
                      onClick={() => setSelectedProject(proyecto)}
                      active = {selectedProject?.idProyecto === proyecto.idProyecto}
                    />
                  ))}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle className="hidden md:block" />
            <ResizablePanel className="hidden md:block" minSize={50} defaultSize={60} maxSize={70}>
              {
                !selectedProject ? (
                  <div className="flex h-full flex-col items-center justify-center p-5">
                    <h1 className="text-gray-800 text-3xl font-bold">
                      ¡Bienvenido!
                    </h1>
                    <p className="text-gray-600">
                      Selecciona un proyecto para ver más detalles.
                    </p>
                  </div>
                ) : (
                  <ProyectoDetails proyecto={selectedProject} />
                )
              }
            </ResizablePanel>
          </ResizablePanelGroup>
        </article>
      )}
    </section>
  );
}
