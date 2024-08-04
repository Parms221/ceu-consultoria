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
import { cn } from "@/lib/utils";
import useHito from "@/hooks/Hito/useHito";

type Props = {
  tarea : Tarea | Hito
};

export default function FeedbackChat({ tarea }: Props) {
  const { addFeedback } = useTarea()
  const { addFeedback: addFeedbackHito } = useHito()
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
    if(isHito(tarea)){
      if(!tarea.idHito) return
      await addFeedbackHito(tarea.idHito, values)
    } else {
      if(!tarea.idTarea) return;
      await addFeedback(tarea.idTarea, values)
    }
    queryClient.invalidateQueries({queryKey: [projectId, "hitos"]})
    form.reset()
  } 

  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white relative"
        type="button"
      >
        <MessageSquareTextIcon size={16} />
        {
          tarea.feedbacks && tarea.feedbacks.length> 0 && (
              <span className="absolute -right-2 -top-2 bg-red text-white rounded-full w-4.5 h-4.5 text-xs flex items-center justify-center">
                {tarea.feedbacks.length}
              </span>
          )
        }
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
            {
              tarea.feedbacks?.map((feedback) => (
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
  const usuario = feedback.usuario;
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 relative">
      <div className={cn(
        "flex items-center gap-2",
        usuario.roles.some(rol => rol.rol === "ROLE_CLIENTE") && "flex-row-reverse"
      )}>
        <Image
          src="/images/user/user-05.png"
          alt={usuario.name}
          width={64}
          height={64}
          className="rounded-full w-8.5 h-8.5"
        />
        <div className={
          cn(
            "rounded-md p-4 w-full text-ceu-azul bg-ceu-celeste",
            usuario.roles.some(rol => rol.rol === "ROLE_ADMIN") && " text-white",
            usuario.roles.some(rol => rol.rol === "ROLE_CLIENTE") && "bg-[#CDD6FD]"
          )
        }>
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold ">
              {`${usuario.name}`}
            </h4>
            <span className="text-xs">
              { formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true, locale: es }) }
            </span>
          </div>
          <p className="text-body-sm break-words pr-2">
            {feedback.mensaje}
          </p>
        </div>
      </div>
    </div>
  );
}