import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { reunionSchema } from "./reunion.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function NewReunionForm() {
  const form = useForm<z.infer<typeof reunionSchema>>({
    resolver: zodResolver(reunionSchema),
    defaultValues: {
      idReunion: crypto.randomUUID(),
      titulo: "Nueva reunión",
      fechaFin: new Date(),
      fechaInicio: new Date(),
      descripcion: "",
      participantes: [],
      enlace: "",
    },
  });

  async function onSubmit(values: z.infer<typeof reunionSchema>) {
    console.log(values)
  }

  return (
    <Form
        {...form}
    >
        <form onSubmit={form.handleSubmit(onSubmit)}>
            Formulario de reunión
        </form>
    </Form>
  );
}