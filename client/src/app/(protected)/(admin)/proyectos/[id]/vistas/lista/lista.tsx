import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { Proyecto } from "@/types/proyecto";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";



export default function VistaLista() {

    const { proyecto } = useProjectDetail()
    const hitos = proyecto.hitos ?? []

    return (
        <div>
            <HitosTable
                columns={hitosColumns} 
                data={hitos}
            />
        </div>
    );
}