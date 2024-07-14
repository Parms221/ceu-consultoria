import { HitosTable, WithSubRows } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import { Tarea } from "@/types/proyecto/Tarea";



export default function VistaLista() {

    const { proyecto } = useProjectDetail()
    const hitos = proyecto.hitos ?? []
    

    return (
        <div>
            <HitosTable
                columns={hitosColumns} 
                data={hitos as WithSubRows<Tarea>[]}
            />
        </div>
    );
}