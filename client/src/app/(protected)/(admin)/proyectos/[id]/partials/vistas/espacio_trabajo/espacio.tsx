'use client'

import useRecurso from "@/hooks/Recurso/useRecurso";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import NewRecursoModal from "./partials/forms/recurso";
import { File, Link } from "lucide-react";
import { DataTable } from "./DataTable/data-table";
import { columns } from "./DataTable/columns";

export default function VistaEspacio() {
    const { projectId } = useProjectDetail();
    const { getRecursosEspacio } = useRecurso();
    const { data: recursos, isLoading, isError, refetch: refetchRecursos } = getRecursosEspacio(projectId);

    if(isLoading){
        return (
            <div>
                Cargando administración de espacios de trabajo
            </div>
        );
    }

    return (
        <article className="flex flex-col">
            <div className="flex justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Espacio de trabajo
                </h2>
                <div className="space-x-2 flex items-center [&>div>button]:mb-4">
                    <NewRecursoModal refetch={refetchRecursos}/>
                </div>
            </div>
            <section className="flex flex-col gap-8">
                <article className="rounded-md border-stroke bg-white px-2 pb-4 dark:border-strokedark dark:bg-boxdark">
                    <DataTable columns={columns} data={recursos ?? []} />
                </article>
            </section>
        </article>
    );
    
}