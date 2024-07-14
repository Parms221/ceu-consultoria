import { getProyectoById, getProyectosPropuestos } from "@/actions/Proyecto";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import "@github/relative-time-element";
import ProyectoPendienteCard from "../partials/ProyectoPendienteCard";
import ProyectoDetails from "./partials/proyecto-details";

export default async function ProyectosPendientes({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const data = await getProyectosPropuestos();
  const proyecto = await getProyectoById(id);

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
            <div className="grid grid-cols-1 gap-5 px-5">
              {data?.map((proyecto) => (
                <ProyectoPendienteCard
                  active={proyecto.idProyecto == id}
                  key={proyecto.idProyecto}
                  proyecto={proyecto}
                />
              ))}
            </div>
          </ResizablePanel>
          <ResizableHandle className="hidden md:block" />
          <ResizablePanel>
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
