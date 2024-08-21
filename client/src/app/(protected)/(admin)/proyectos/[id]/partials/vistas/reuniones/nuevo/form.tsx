import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { reunionSchema } from "./reunion.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker/date-picker";
import TimeInput from "@/components/ui/input-time";
import { Label } from "@/components/ui/label";
import { isBefore, startOfDay } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/Multiselect/Multiselect";
import useParticipante from "@/hooks/Partcipante/useParticipante";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import useReunion from "@/hooks/Reuniones/useReunion";
import { ReunionDTO } from "@/types/proyecto/Reunion";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleLogo from "@/components/common/Icons/GoogleLogo";
import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/app/(protected)/app.context";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import GoogleMeetIcon from "@/components/common/Icons/GoogleMeet";
import { v4 as uuidv4 } from "uuid";


export default function NewReunionForm() {
  const queryClient = useQueryClient()
  const { projectId } = useProjectDetail();
  const { createReunionByProyectoId } = useReunion();
  const { getParticipantesDeProyectoQuery } = useParticipante();
  const { isGoogleAuthorized } = useAppContext()
 
  const res = getParticipantesDeProyectoQuery(projectId);

  const reunionDefaultValues = {
    idReunion: uuidv4(),
    titulo: "Nueva reunión",
    fechaFin: new Date(),
    fechaInicio: new Date(),
    descripcion: "",
    invitados: [],
    enlace: "",
    crearEvento: isGoogleAuthorized,
    enviarUpdates: false,
  }

  const form = useForm<z.infer<typeof reunionSchema>>({
    resolver: zodResolver(reunionSchema),
    defaultValues: {...reunionDefaultValues},
  });

  async function onSubmit(values: z.infer<typeof reunionSchema>) {
    if(!isGoogleAuthorized && values.enlace === ""){
      form.setError("enlace", {
        type: "manual",
        message: "Debe ingresar un enlace de la reunión",
      });
      return;
    }
    const dto: ReunionDTO = {
      crearEvento: values.crearEvento ? true : false,
      enviarUpdates: values.enviarUpdates ? true : false,
      fechaFin: values.fechaFin.toISOString(),
      fechaInicio: values.fechaInicio.toISOString(),
      invitados: values.invitados,
      titulo: values.titulo,
      descripcion: values.descripcion,
      enlace: values.enlace !== "" ? values.enlace : undefined,
    };
    const ok = await createReunionByProyectoId(dto, projectId);
    queryClient.invalidateQueries({
      queryKey: ["reuniones", projectId],
    });

    if(!ok){
      return;
    }
    form.reset(reunionDefaultValues);
    document.getElementById("closeDialog")?.click();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título de la reunión</FormLabel>
              <FormControl>
                <Input maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="crearEvento"
            render={({ field }) => (
              <FormItem>
                <div className={
                  cn(
                    "mt-4 flex items-center gap-2",
                    !isGoogleAuthorized && "opacity-80"
                  )
                }>
                  <GoogleLogo className="h-6 w-6" />
                  <FormLabel>Crear evento en el calendario de Google</FormLabel>
                  <FormControl>
                    <Checkbox
                      name="crearEvento"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!isGoogleAuthorized}
                    />
                  </FormControl>
                </div>
                {!isGoogleAuthorized && <p className="text-xs flex items-center gap-1">
                  <InfoIcon className="w-4 h-4"/> 
                  Inicie sesión con una cuenta de Google en su <Link href="/profile" className="underline text-ceu-celeste">perfil de usuario</Link> para crear el evento en el calendario de Google
                </p>}
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem className="justifycent flex flex-1 flex-col gap-1">
                <Label>Fecha de inicio</Label>
                <div className="flex flex-1 gap-2">
                  <DatePicker
                    mode="single"
                    field={field}
                    disable={(date) => {
                      return isBefore(startOfDay(date), startOfDay(new Date()));
                    }}
                    onChange={(date) => {
                      field.onChange(date);
                      form.setValue("fechaFin", date as Date);
                    }}
                  />
                  <TimeInput {...field} className="h-[40px] w-fit" 
                    onChange={(date) => {
                      field.onChange(date);
                      form.setValue("fechaFin", date as Date);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem className="justifycent flex flex-1 flex-col gap-1">
                <Label>Fecha de finalización</Label>
                <div className="flex flex-1 gap-2">
                  <DatePicker
                    mode="single"
                    field={field}
                    disable={(date) => {
                      return isBefore(startOfDay(date), startOfDay(form.watch("fechaInicio")));
                    }}
                  />
                  <TimeInput {...field} className="h-[40px] w-fit" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {
          !isGoogleAuthorized && (
            <FormField
              control={form.control}
              name="enlace"
              render={({ field }) => (
                <FormItem>
                  <Label className="flex items-center gap-1">
                   <GoogleMeetIcon /> Enlace de la reunión
                  </Label>
                  <div className="flex items-center gap-1.5">
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        }
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <Label>Descripción {"(Opcional)"}</Label>
              <div className="flex items-center gap-1.5">
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="invitados"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitados</FormLabel>
              <MultiSelect
                onValueChange={(value) => {
                  console.log(value);
                  const newValue = value.map((e) => {
                    return {
                      email: e,
                      opcional: false,
                    };
                  });
                  console.log(newValue);
                  field.onChange(newValue);
                }}
                options={
                  res.data?.map((p) => ({
                    label: p.consultorParticipante.usuarioConsultor.email,
                    value: p.consultorParticipante.usuarioConsultor.email,
                  })) || []
                }
                placeholder="Selecciona los participantes"
                defaultValue={field.value?.map((e) => e.toString()) ?? []}
              ></MultiSelect>
              <FormMessage />
            </FormItem>
          )}
        />
        {
         form.watch("invitados").length > 0 && isGoogleAuthorized &&  
          <FormField
            control={form.control}
            name="enviarUpdates"
            render={({ field }) => (
              <FormItem>
                <div className="mt-4 flex items-center gap-2">
                  <FormLabel>Notificar a los invitados de la reunión</FormLabel>
                  <FormControl>
                    <Checkbox
                      name="enviarUpdates"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        }
        <Button type="submit" className="mt-4 flex items-center gap-2">
          <span>Guardar</span>
        </Button>
      </form>
    </Form>
  );
}
