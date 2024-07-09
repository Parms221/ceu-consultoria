import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { Hito } from "@/types/proyecto/Hito";

interface IHitos {
    hitos : Hito[]
}

export default function VistaLista(
    { hitos } : IHitos 
) {
    return (
        <div>
            <HitosTable
                columns={hitosColumns} 
                data={hitos}
            />
        </div>
    );
}