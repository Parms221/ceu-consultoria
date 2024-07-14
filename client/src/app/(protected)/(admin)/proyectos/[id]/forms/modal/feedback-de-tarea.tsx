import { MessageSquareTextIcon, SendHorizonal } from "lucide-react";

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

type Props = {
  tarea : Tarea | Hito
};

export default function FeedbackChat({ tarea }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white"
        type="button"
      >
        <MessageSquareTextIcon size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">
            {tarea.titulo}
        </DialogTitle>
        <DialogDescription>
            Observaciones y comentarios
        </DialogDescription>
        <div>
            <Textarea placeholder="Escriba aquí alguna observación o comentario sobre esta tarea" className="max-h-[200px]"/>
            <Button variant={"default"} size={"sm"} className="mt-2">
                <SendHorizonal />
            </Button>
        </div>
        <div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
                <div className="flex items-center gap-2">
                    <Image 
                        src="/images/user/user-05.png"
                        alt="Nombre de usuario"
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                    <div className="bg-[#CDD6FD] p-4 rounded-md">
                        <h4 className="text-sm font-semibold text-ceu-azul">Nombre de usuario</h4>
                        <p className="text-body-sm text-black">Comentario de usuario Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quod distinctio nulla mollitia molestias sint aliquid sunt at tenetur nihil exercitationem nemo perspiciatis dolor id, animi dicta assumenda repudiandae rem.</p>
                    </div>
                </div>
            </div>
        </div> 
      </DialogContent>
    </Dialog>
  );
}
