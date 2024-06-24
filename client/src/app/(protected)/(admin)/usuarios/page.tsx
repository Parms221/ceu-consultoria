import React from "react";

import { DataTable } from "./partials/DataTable/data-table";
import { columns } from "./partials/DataTable/columns"; 
import NewUserDialog from "./partials/dialogs/NewUser/dialog";
import { getUsuarios } from "@/actions/Usuario";

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