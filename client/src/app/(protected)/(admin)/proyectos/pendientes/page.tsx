import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

export default function ProyectosPendientes() {
    return (
        <section>
            <Breadcrumb pageName={"Proyectos por confirmar"} slug={"Pendientes"}>
                <Link href="/usuarios">Proyectos /</Link>
            </Breadcrumb>

            <article className="area">
                
            </article>
        </section>
    );
}