import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";

import { DataTable } from "./partials/data-table";
import { columns } from "./partials/columns"; 
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Usuario } from "@/types/usuario";


async function getUsuarios(): Promise<Usuario[]> {
    // Mocks usuarios
    return [
     {
      id: 1,
      name: "John Doe",
      email: "johbn_d@gmail.com",
      enabled: true,
      rol: "Consultor",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01"
     },
     {
      id: 2,
      name: "John Doe 2",
      email: "johbn_d@gmail.com",
      enabled: false,
      rol: "Cliente",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01"
     }
    ]
  }

export default async function Usuarios() {
    const usuarios = await getUsuarios();
    return (
        <React.Fragment>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Usuarios
              </h2>

              <Button variant={"default"} size={"sm"} className="flex items-center gap-2">
                <Plus size={16}/>
                Añadir usuario
              </Button>
            </div>

            <section className="flex flex-col gap-8">
                <article className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark pb-4 px-2 rounded-md">
                    <DataTable  columns={columns} data={usuarios} />
                </article>
            </section>
        </React.Fragment>
    );
}