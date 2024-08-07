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
            {/* <div className="w-full p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {recursos?.map((recurso, index) => (
                        <div key={`rs-${index}`} className="flex flex-col border-2 rounded-2xl p-2 items-center gap-1 justify-center">
                            <div></div>
                            {recurso.esArchivo ? <File size={48}/> : <Link size={48} />}
                            <p className="text-center text-sm">{recurso.titulo}</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </article>
    );
    
}