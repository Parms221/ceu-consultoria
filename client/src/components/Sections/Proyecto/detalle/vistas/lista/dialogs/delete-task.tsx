import { Hito } from "@/types/proyecto/Hito";
import { Tarea } from "@/types/proyecto/Tarea";
import DeleteDialog from "@/components/ui/dialogs/delete-dialog";
import { deleteHito } from "../../../contexto/hito.data";

export default function DeleteTask(
    { task } : { task : Hito | Tarea }
) {
    async function deleteTask (task: Hito | Tarea){
        // check if task is a Hito type or Tarea
        const parseTask = task as Hito
        if(parseTask.idHito){
            deleteHito(parseTask.idHito)
        } else {
            console.log("remove tarea")
        }
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