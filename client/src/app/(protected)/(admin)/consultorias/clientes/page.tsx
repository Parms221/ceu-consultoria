import React from "react";

import { DataTable } from "./partials/DataTable/data-table";
import { columns } from "./partials/DataTable/columns";
import NewClienteDialog from "./partials/dialogs/NewClient/dialog";
import { getClientes } from "@/actions/Cliente";

export default async function Clientes() {
  const data = await getClientes();
  return (
    <React.Fragment>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Clientes
        </h2>

        <NewClienteDialog />
      </div>

      <section className="flex flex-col gap-8">
        <article className="rounded-md border-stroke bg-white px-2 pb-4 dark:border-strokedark dark:bg-boxdark">
          <DataTable columns={columns} data={data} />
        </article>
      </section>
    </React.Fragment>
  );
}
