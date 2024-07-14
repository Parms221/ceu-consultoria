import {  PlusCircle, SendHorizonal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tarea } from "@/types/proyecto/Tarea";
import { Hito } from "@/types/proyecto/Hito";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProjectDetail } from '@/components/Sections/Proyecto/detalle/contexto/proyecto-detail.context';

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
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">
            {
                selectedTask ? `Editar tarea ${selectedTask.titulo}` : `Nueva tarea` 
            }
        </DialogTitle>
        <DialogDescription>
            {selectedTask && `En lista ${selectedTask.estado}`  }
        </DialogDescription>
       Formulario de tarea
      </DialogContent>
    </Dialog>
  );
}
