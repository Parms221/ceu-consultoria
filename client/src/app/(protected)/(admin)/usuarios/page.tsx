import React from "react";

import { DataTable } from "./partials/DataTable/data-table";
import { columns } from "./partials/DataTable/columns";
import AddUserDialog from "./partials/Dialogs/AddUserDialog";
import { getUsuarios } from "@/actions/Usuario";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuarios",
};

export default async function Usuarios() {
  const usuarios = await getUsuarios();
  return (
    <React.Fragment>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Usuarios
        </h2>

        <AddUserDialog />
      </div>

      <section className="flex flex-col gap-8">
        <article className="rounded-md border-stroke bg-white px-2 pb-4 dark:border-strokedark dark:bg-boxdark">
          <DataTable columns={columns} data={usuarios ?? []} />
        </article>
      </section>
    </React.Fragment>
  );
}
