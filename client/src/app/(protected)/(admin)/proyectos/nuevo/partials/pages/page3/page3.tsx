import { useProjectForm } from "../../multi-step-form/context";
import { Previous, Next, NavigationFooter } from "../../multi-step-form/navigation";
import ProjectOverview from "./project-overview";

export default function ProjectFormPage3() {
    const { next, prev } = useProjectForm();
    return (
        <div>
            <h1>Page 3</h1>
            <div>
                <ProjectOverview />
            </div>
            <NavigationFooter>
                <Previous onClick={prev}/>
                <Next 
                    onClick={next}
                    lastStep
                />
            </NavigationFooter>
        </div>
    );
}