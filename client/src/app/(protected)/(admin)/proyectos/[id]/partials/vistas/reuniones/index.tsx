"use client"
import ReunionItem from "./partials/reunion-item/reunion-iten";
import useReunion from "@/hooks/Reuniones/useReunion";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import AddReunionDialog from "./nuevo/nueva-reunion";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { Reunion } from "@/types/proyecto/Reunion";
import { es } from "date-fns/locale/es";
import { useMemo } from "react";



export default function Reuniones() {
  const { projectId } = useProjectDetail()
  const { getReunionesByProyectIdQuery  } = useReunion()
  const { data: reuniones, isLoading, isError } = getReunionesByProyectIdQuery(projectId)

  function groupReunionesByWeek(reuniones: Reunion[]) {
    const weekRangeFormat = "dd 'de' MMMM 'del' yyyy"; // 21 de marzo de 2023
    return reuniones.reduce((acc: { [key: string]: Reunion[] }, reunion) => {
      const fechaInicio = new Date(reunion.fechaInicio);
      const startWeek = startOfWeek(fechaInicio, { weekStartsOn: 1 });
      const endWeek = endOfWeek(fechaInicio, { weekStartsOn: 1 });
      const weekRange = `${format(startWeek, weekRangeFormat, {locale: es})} - ${format(endWeek, weekRangeFormat, {locale: es})}`;
      if (!acc[weekRange]){
        acc[weekRange] = [];
      }
      acc[weekRange].push(reunion);
      return acc;
    }, {})
  }

  const groupedReuniones = useMemo(() => reuniones ? groupReunionesByWeek(reuniones) : {}, [reuniones]);;

  return (
    <article>
      <header className="flex justify-between items-center">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Reuniones programadas
        </h2>
        <AddReunionDialog />
      </header>
       {
        Object.keys(groupedReuniones).map(weekRange => (
          <section key={weekRange} className="mt-8">
            <h3 className="text-title-sm font-semibold text-black dark:text-white">
              {weekRange}
            </h3>
            <div className="mt-0">
              <ul className="flex flex-col gap-1.5 divide-y">
                {groupedReuniones[weekRange].map(reunion => (
                  <li key={reunion.idReunion}>
                    <ReunionItem
                      reunion={reunion}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))
       }
    </article>
  );
}
