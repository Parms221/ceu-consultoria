"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useParams } from "next/navigation";

export default function UserDetail() {
    const {id} = useParams()
    return (
        <div>
            <Breadcrumb pageName="Usuarios"/>
            Detalle usuario {id}
        </div>
    );
}