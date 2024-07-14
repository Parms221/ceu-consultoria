import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import { Button } from "@/components/ui/button";
import NuevoHitoForm from "../../forms/modal/nuevo-hito";


export default function VistaLista() {

    const { proyecto } = useProjectDetail()
    const hitos = proyecto.hitos ?? []
    

    return (
        <article>
            <div className="flex items-center justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Lista de tareas</h2>
                <NuevoHitoForm proyecto={proyecto} />
            </div>
            <HitosTable
                columns={hitosColumns} 
                data={hitos}
                subRowsField="tareasDelHito"
            />
        </article>
    );
}