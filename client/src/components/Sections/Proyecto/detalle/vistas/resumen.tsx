"use client"

import { useProjectDetail } from "../contexto/proyecto-detail.context";

export default function VistaResumen() {
    const { projectId } = useProjectDetail()
    return (
        <div>
            Vista resumen de proyecto
            {JSON.stringify(projectId)}
        </div>
    );
}