import { toast } from "sonner";
import { useProjectForm } from "../../multi-step-form/context";
import { Next, NavigationFooter } from "../../multi-step-form/navigation";
import ProjectMembersForm from "./partials/project-members-form";
import ProjectOverview from "./partials/project-overview";

export default function ProjectFormPage3() {
  const { form, next } = useProjectForm();
  return (
    <div className="space-y-2.5">
      <ProjectOverview />
      <ProjectMembersForm />
      <NavigationFooter>
        <Next
          onClick={async () => {
            console.log("submitting form");
            const isValid = await form.trigger();
            if (isValid) {
              console.log("form is valid");
              next();
            } else {
              console.log("invalid", form.getValues(), form.formState.errors);
              toast.error("Por favor, completa los campos requeridos");
            }
          }}
          lastStep
        />
      </NavigationFooter>
    </div>
  );
}
