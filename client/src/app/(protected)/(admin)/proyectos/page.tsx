import { Metadata } from "next";
import {
  ConsultoresAsignados,
  DefaultMiniCart,
  ProyectorPorConfirmar,
  ProyectosTerminados,
} from "@/app/(protected)/(admin)/proyectos/partials/mini-cards";
import { CheckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Proyectos - CEU",
};

export default function Page() {
  return (
    <main className="space-y-3">
      <h3 className="text-4xl font-semibold text-black dark:text-white">
        Administración de proyectos
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ProyectosTerminados />
        <ConsultoresAsignados />
        <ProyectorPorConfirmar />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hola</CardTitle>
        </CardHeader>
        <CardContent>hola 2</CardContent>
      </Card>
    </main>
  );
}
