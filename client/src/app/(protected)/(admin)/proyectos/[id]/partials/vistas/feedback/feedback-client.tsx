'use client'

import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import { useEffect, useState } from 'react'
import { getEstadoFeedback } from "@/actions/Proyecto/FeedbackCliente/index"
import CustomerSatisfactionSurvey from "./partials/encuesta";

export default function VistaFeedback() {
    const { setFeedbackClient, projectId } = useProjectDetail();
    const [feedbackClient, setLocalFeedbackClient] = useState<boolean | null>(null); // Asegúrate de que el tipo es boolean | null

    useEffect(() => {
        async function fetchFeedbackStatus() {
            const status = await getEstadoFeedback(projectId);
            setFeedbackClient(status);
            setLocalFeedbackClient(status);
            console.log("Feedback:" + status)
        }

        fetchFeedbackStatus();
    }, [projectId]);

    if (feedbackClient === null) {
        return <div>Cargando...</div>; // Mostrar mientras se obtienen los datos
    }

    return (
        <article className="flex flex-col">
            <div className="grid">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white p-1">
                    Feedback sobre el proyecto
                </h2>
                {feedbackClient ? (
                    <p className="text-center">
                        Gracias por darnos tu opinión. Valoramos mucho tu feedback.
                    </p>
                ) : (
                    <CustomerSatisfactionSurvey />
                )}
            </div>
            <section className="flex flex-col gap-8">
                <article className="rounded-md border-stroke bg-white px-2 pb-4 dark:border-strokedark dark:bg-boxdark">
                    {/* Aquí puedes incluir la DataTable o cualquier otro contenido */}
                </article>
            </section>
        </article>
    );
}
