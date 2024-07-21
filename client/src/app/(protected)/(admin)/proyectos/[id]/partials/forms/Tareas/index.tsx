import {  Pen, PenBox, PlusCircle, SendHorizonal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useProjectDetail } from '@/app/(protected)/(admin)/proyectos/[id]/partials/contexto/proyecto-detail.context';
import TareaForm from "./form";
import { Tarea } from "@/types/proyecto/Tarea";
import { Hito } from "@/types/proyecto/Hito";

interface IProps {
  asEdit? : boolean
  task? : Tarea
}

export default function NewTaskModal(
  { asEdit, task} : IProps
) {
  const { setSelectedTask } = useProjectDetail()

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        {
          !asEdit ? (
            <Button className="bg-ceu-celeste text-white self-end mb-4" size={"sm"}>
                <PlusCircle /> Añadir Tarea
            </Button>
          ) : (
            <Button
              size={"sm"}
              className="py-1.5 bg-ceu-azul"
              onClick={() => {
                if(task){
                  setSelectedTask(task)
                }
              }}
            >
              <PenBox size={16}/>
              <span className="sr-only">
                Editar tarea
              </span>
            </Button>
          )
        }
       
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[550px] overflow-hidden overflow-y-auto" 
        style={
          {scrollbarWidth: 'thin'}
        }
      >
        <DialogTitle className="text-ceu-celeste">
            {
                task ? `Editar tarea ${task.titulo}` : `Nueva tarea` 
            }
        </DialogTitle>
        <DialogDescription>
            {task && `En lista ${task.estado}`  }
        </DialogDescription>
       <TareaForm />
      </DialogContent>
    </Dialog>
  );
}
