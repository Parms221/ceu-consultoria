import { getProyectosPropuestos } from "@/actions/Proyecto";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import "@github/relative-time-element";
import ProyectoPendienteCard from "./partials/ProyectoPendienteCard";

export default async function ProyectosPendientes() {
  const data = await getProyectosPropuestos();

  return (
    <section>
      <Breadcrumb pageName={"Proyectos por confirmar"} slug={"Pendientes"}>
        <Link href="/proyectos">Proyectos /</Link>
      </Breadcrumb>

      <article className="area">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={30} defaultSize={40} maxSize={50}>
            <div className="grid grid-cols-1 gap-5 px-5">
              {data?.map((proyecto) => (
                <ProyectoPendienteCard
                  key={proyecto.idProyecto}
                  proyecto={proyecto}
                />
              ))}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="flex h-full flex-col items-center justify-center p-5">
              <h1 className="text-gray-800 text-3xl font-bold">¡Bienvenido!</h1>
              <p className="text-gray-600">
                Selecciona un proyecto para ver más detalles.
              </p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </article>
    </section>
  );
}
