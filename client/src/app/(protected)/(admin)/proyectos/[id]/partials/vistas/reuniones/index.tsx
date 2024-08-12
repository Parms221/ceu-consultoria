"use client"
import ReunionItem from "./partials/reunion-iten";
import useReunion from "@/hooks/Reuniones/useReunion";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import AddReunionDialog from "./nuevo/nueva-reunion";


export default function Reuniones() {
  const { projectId } = useProjectDetail()
  const { getReunionesByProyectIdQuery  } = useReunion()
  const { data: reuniones, isLoading, isError } = getReunionesByProyectIdQuery(projectId)

  return (
    <article>
      <header className="flex justify-between items-center">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Próximas reuniones
        </h2>
        <AddReunionDialog />
      </header>
      <div className="flex flex-col gap-4 mt-4">
        <ul>
          {reuniones?.map(reunion => (
            <li key={reunion.idReunion}>
              <ReunionItem
                title={reunion.titulo}
                creator={"Johann"}
                start={reunion.fechaInicio}
                meetingUrl={reunion.enlace}
                end={reunion.fechaFin}
              />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
