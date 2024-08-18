"use client"
import { Hito } from "@/types/proyecto/Hito";
import { Tarea } from "@/types/proyecto/Tarea";
import DeleteDialog from "@/components/ui/dialogs/delete-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import useHito from "@/hooks/Hito/useHito";
import useTarea from "@/hooks/Tarea/useTarea";

export default function DeleteTask(
    { tarea, className } : { tarea : Hito | Tarea, className?: string }
) {

    const { deleteHito } = useHito()
    const { deleteTarea } = useTarea()

    const { projectId, queryClient } = useProjectDetail()

    function isHito(tarea: Hito | Tarea): tarea is Hito {
        return (tarea as Hito).idHito !== undefined;
    }

    async function deleteTask (tarea: Hito | Tarea){
        if(isHito(tarea)){
            await deleteHito(tarea.idHito)
        } else {
            const id = tarea.idTarea
            if(!id) return
            await deleteTarea(id)
        }
        console.log("invalidando query")
        queryClient.invalidateQueries({queryKey: [projectId, "hitos"]})
    }

    return (
       <DeleteDialog 
            className={className}
            title="Eliminar tarea"
            description={<>
                `Está seguro que quiere eliminar la tarea {<span className="font-bold">{tarea.titulo}</span>}`
            </>}
            onDelete={() => deleteTask(tarea)}
       />
    );
}