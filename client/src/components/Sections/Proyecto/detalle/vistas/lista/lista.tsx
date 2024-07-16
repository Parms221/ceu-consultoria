"use client"
import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import NewHitoModal from "../../forms/modal/Hitos/hito";
import { useQuery } from "@tanstack/react-query";
import { Hito } from "@/types/proyecto/Hito";
import { getHitos } from "../../contexto/hito.data";
import { fetcherLocal } from "@/server/fetch/client-side";
import HandleServerResponse from "@/lib/handle-response";


export default function VistaLista() {

    const { projectId } = useProjectDetail()
    const {
        data: hitos,
        isLoading,
        isError,
      } = useQuery<Hito[]>({
        queryKey: [projectId, "hitos"],
        queryFn: async () => {
            const response = await fetcherLocal(`/proyectos/${projectId}/hitos`)
            const ok = await HandleServerResponse(response)
            if(!ok){
                throw new Error("Error al obtener hitos")
            }
            const hitos : Hito[] = await response.json()   
            return hitos
        },
      });
    
      if (isLoading) {
        return <div>Cargando ... </div>;
      }
    
      if (isError || !hitos) {
        return <div>Error al cargar la lista de hitos</div>;
      }
    
    return (
        <article>
            <div className="flex items-center justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Lista de tareas</h2>
                <NewHitoModal />
            </div>
            <HitosTable
                columns={hitosColumns} 
                data={hitos}
                subRowsField="tareasDelHito"
            />
        </article>
    );
}