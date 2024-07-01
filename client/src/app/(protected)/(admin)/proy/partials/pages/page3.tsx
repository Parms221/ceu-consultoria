import { useProjectForm } from "../multi-step-form/context";
import { Previous, Next, NavigationFooter } from "../multi-step-form/navigation";

export default function ProjectFormPage3() {
    const { next, prev } = useProjectForm();
    return (
        
        <div>
            <NavigationFooter>
                <Previous onClick={prev}/>
                <Next onClick={next}/>
            </NavigationFooter>
        </div>
    );
}