import {  PlusCircle, SendHorizonal } from "lucide-react";

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

export default function NewTaskModal() {
  const { selectedHito, selectedTask } = useProjectDetail()

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button className="bg-ceu-celeste text-white self-end mb-4" size={"sm"}>
            <PlusCircle />
            Añadir tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[550px] overflow-hidden overflow-y-auto" 
        style={
          {scrollbarWidth: 'thin'}
        }
      >
        <DialogTitle className="text-ceu-celeste">
            {
                selectedTask ? `Editar tarea ${selectedTask.titulo}` : `Nueva tarea` 
            }
        </DialogTitle>
        <DialogDescription>
            {selectedTask && `En lista ${selectedTask.estado}`  }
        </DialogDescription>
       <TareaForm />
      </DialogContent>
    </Dialog>
  );
}
