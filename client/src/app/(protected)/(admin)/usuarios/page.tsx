import React from "react";

import { DataTable } from "./partials/DataTable/data-table";
import { columns } from "./partials/DataTable/columns"; 
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Usuario } from "@/types/usuario";
import NewUserDialog from "./partials/dialogs/NewUser/dialog";


async function getUsuarios(): Promise<Usuario[] | undefined> {
    // Mocks usuarios
    try {
      const response = await fetch ("http://localhost:8800/usuarios/", {
        method: "GET",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwibm9tYnJlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUub3JnIiwiaWF0IjoxNzE4NzQ5MTQ2LCJleHAiOjE3NTAyODUxNDYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9.fjJS1_uNgH-t0l9cdP5l03bW_4Q750_7eqTnSSU8Xvl-7vtSb49WZfnJsoaJd-mz"
        }
      }) 
      let data
      if (response.ok){
        data = await response.json()
        return data as Usuario[]
      }else {
        console.error("Error: ", response.statusText)
      }
    }catch(error) {
        console.error(error);
    }
  }

export default async function Usuarios() {
    const usuarios = await getUsuarios();
    return (
        <React.Fragment>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Usuarios
              </h2>
     
              <NewUserDialog />
            </div>

            <section className="flex flex-col gap-8">
                <article className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark pb-4 px-2 rounded-md">
                    <DataTable  columns={columns} data={usuarios ?? []} />
                </article>
            </section>
        </React.Fragment>
    );
}