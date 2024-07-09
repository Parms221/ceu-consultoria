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
          <ResizablePanel></ResizablePanel>
        </ResizablePanelGroup>
      </article>
    </section>
  );
}
