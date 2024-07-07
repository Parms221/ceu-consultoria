import { useProjectForm } from "../../multi-step-form/context";

export default function ProjectOverview() {
    const { form } = useProjectForm();
    return (
        <div>
            {JSON.stringify(form.getValues())}
        </div>
    );
}