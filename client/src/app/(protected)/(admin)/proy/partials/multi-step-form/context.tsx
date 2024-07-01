"use client";

import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { projectCompleteSchema } from "@/app/(protected)/(admin)/proy/partials/schemas/project.schema";
import { createContext, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  IStep,
  STEPS_VALUES,
} from "@/app/(protected)/(admin)/proy/partials/constants/steps";

interface IProjectContext {
  form: UseFormReturn<z.infer<typeof projectCompleteSchema>, any, undefined>;
  next: () => void;
  prev: () => void;
  currentStep: IStep;
}

export const ContextForm = createContext<IProjectContext>(
  {} as IProjectContext,
);

export default function ProjectFormContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof projectCompleteSchema>>({
    resolver: zodResolver(projectCompleteSchema),
    defaultValues: {
      clienteId: 0,
      project: {
        title: "",
        description: "",
      },
    },
  });

  async function OnSubmit(data: z.infer<typeof projectCompleteSchema>) {
    console.log(data);
  }

  const [currentStep, setCurrentStep] = useState(STEPS_VALUES[0]);

  const next = () => {
    if (currentStep.order < STEPS_VALUES.length - 1) {
      setCurrentStep(STEPS_VALUES[currentStep.order + 1]);
    }
  };

  const prev = () => {
    if (currentStep.order > 0) {
      setCurrentStep(STEPS_VALUES[currentStep.order - 1]);
    }
  };

  return (
    <ContextForm.Provider value={{ form, next, prev, currentStep }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)}>{children}</form>
      </Form>
    </ContextForm.Provider>
  );
}

export function useProjectForm() {
  const context = useContext(ContextForm);

  if (!context) {
    throw new Error(
      "useProjectForm debe estar dentro de un ProjectFormContext",
    );
  }

  return context;
}
