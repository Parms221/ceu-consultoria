"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/form.context";
import { Textarea } from "@/components/ui/textarea";

export default function DescripcionProjectData() {
  const { form } = useProjectForm();

  return (
    <div>
      <FormField
        control={form.control}
        name="description"
        render={({ field, formState }) => (
          <FormItem className="mt-3">
            <FormLabel>Descripción del proyecto</FormLabel>
            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/*<RichText />*/}
    </div>
  );
}
