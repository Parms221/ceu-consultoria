"use client"
import { Hito } from "@/types/proyecto/Hito";
import { Tarea } from "@/types/proyecto/Tarea";
import DeleteDialog from "@/components/ui/dialogs/delete-dialog";
import { deleteHito } from "../../../contexto/hito.data";
import { useQueryClient } from "@tanstack/react-query";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";

export default function DeleteTask(
    { task } : { task : Hito | Tarea }
) {
    const { proyecto } = useProjectDetail()
    const queryClient = useQueryClient()
    async function deleteTask (task: Hito | Tarea){
        // check if task is a Hito type or Tarea
        const parseTask = task as Hito
        if(parseTask.idHito){
            deleteHito(parseTask.idHito)
        } else {
            console.log("remove tarea")
        }
        console.log("invalidando query")
        queryClient.invalidateQueries({queryKey: ["proyecto", proyecto.idProyecto]})
    }

    return (
       <DeleteDialog 
            title="Eliminar tarea"
            description={<>
                `Está seguro que quiere eliminar la tarea {<span className="font-bold">{task.titulo}</span>}`
            </>}
            onDelete={() => deleteTask(task)}
       />
    );
}