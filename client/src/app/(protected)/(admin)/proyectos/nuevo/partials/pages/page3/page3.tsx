import { useProjectForm } from "../../multi-step-form/context";
import { Previous, Next, NavigationFooter } from "../../multi-step-form/navigation";
import ProjectMembersForm from "./partials/project-members-form";
import ProjectOverview from "./partials/project-overview";

export default function ProjectFormPage3() {
  const { next, prev } = useProjectForm();
  return (
    <div className="space-y-2.5">
      <ProjectOverview />
      <ProjectMembersForm />
      <NavigationFooter>
        {/*<Previous onClick={prev}/>*/}
        <Next
          onClick={next}
          lastStep
        />
      </NavigationFooter>
    </div>
  );
}