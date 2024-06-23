"use client";

import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { createContext, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(3, { message: "La descripción debe tener al menos 3 caracteres" })
    .optional()
    .or(z.literal("")),
});

interface IContextProjectForm {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const ContextForm = createContext<IContextProjectForm>(
  {} as IContextProjectForm,
);

interface ProjectFormProps {
  children: React.ReactNode;
}

export default function ProjectFormContext({ children }: ProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <ContextForm.Provider value={{ form }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
    </ContextForm.Provider>
  );
}

export function useProjectForm() {
  return useContext(ContextForm);
}
