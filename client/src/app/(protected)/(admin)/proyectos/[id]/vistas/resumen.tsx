"use client"

import { useProjectDetail } from "../contexto/proyecto-detail.context";

export default function VistaResumen() {
    const { proyecto } = useProjectDetail()
    return (
        <div>
            Vista resumen de proyecto
            {JSON.stringify(proyecto)}
        </div>
    );
}