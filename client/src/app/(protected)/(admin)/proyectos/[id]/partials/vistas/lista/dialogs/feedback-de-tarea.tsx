"use client"
import { MessageSquareTextIcon, SendHorizonal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FeedbackTarea, Tarea } from "@/types/proyecto/Tarea";
import { Hito } from "@/types/proyecto/Hito";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useTarea from "@/hooks/Tarea/useTarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";

type Props = {
  tarea : Tarea | Hito
};

export default function FeedbackChat({ tarea }: Props) {
  const { addFeedback } = useTarea()
  const { projectId } = useProjectDetail()
  const queryClient = useQueryClient()

  function isHito(tarea: Hito | Tarea): tarea is Hito {
      return (tarea as Hito).idHito !== undefined;
  }

  const feedbackSchema = z.object({
    mensaje: z.string()
  });

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      mensaje: ""
    }
  })
  

  async function onSubmit(values: z.infer<typeof feedbackSchema>){
    if(isHito(tarea) || !tarea.idTarea) return
    await addFeedback(tarea.idTarea, values)
    queryClient.invalidateQueries({queryKey: [projectId, "hitos"]})
    form.reset()
  } 

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
        <Form {...form}>
          <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
          >
              {/*  */}
              <FormField 
                    control={form.control}
                    name="mensaje"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-1.5">
                                <FormControl>
                                <Textarea placeholder="Escriba aquí alguna observación o comentario sobre esta tarea" className="max-h-[200px]"
                                  {...field}
                                />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
              <Button variant={"default"} size={"sm"} className="mt-2"
                disabled={form.formState.isSubmitting}
              >
                  <SendHorizonal />
              </Button>
          </form>
        </Form>
        <div className="h-[250px] overflow-hidden overflow-y-scroll">
            { // Por el momento solo para tareas
              !isHito(tarea) && tarea.feedbacks?.map((feedback) => (
                <FeedbackMessage key={feedback.id} feedback={feedback} />
              ))
            }
        </div> 
      </DialogContent>
    </Dialog>
  );
}

export function FeedbackMessage({
  feedback,
}: {
  feedback: FeedbackTarea;
}) {
  const consultor = feedback.consultor;
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 relative">
      <div className="flex items-center gap-2">
        <Image
          src="/images/user/user-05.png"
          alt={consultor.nombres + " " + consultor.apellidos}
          width={64}
          height={64}
          className="rounded-full w-8.5 h-8.5"
        />
        <div className="rounded-md bg-[#CDD6FD] p-4 w-full">
          <h4 className="text-sm font-semibold text-ceu-azul">
            {`${consultor.nombres} ${consultor.apellidos}`}
          </h4>
          <p className="text-body-sm text-black break-words pr-2">
            {feedback.mensaje}
          </p>
          <span className="absolute right-2.5 bottom-3 text-xs">
            { formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true, locale: es }) }
          </span>
        </div>
      </div>
    </div>
  );
}