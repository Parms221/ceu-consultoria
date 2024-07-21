"use client"
import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import NewHitoModal from "../../forms/Hitos";
import { useQuery } from "@tanstack/react-query";
import { Hito } from "@/types/proyecto/Hito";
// import { getHitos } from "../../contexto/hito.data";
import { fetcherLocal } from "@/server/fetch/client-side";
import HandleServerResponse from "@/lib/handle-response";
import useHito from "@/hooks/Hito/useHito";


export default function VistaLista() {

    const { projectId } = useProjectDetail()
    const { getHitosQuery } = useHito()
    
    const { data : hitos, isLoading, isError } = getHitosQuery(projectId)    
    
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