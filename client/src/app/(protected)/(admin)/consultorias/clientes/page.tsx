import React from "react";

import { DataTable } from "./partials/DataTable/data-table";
import { columns } from "./partials/DataTable/columns";
import NewClienteDialog from "./partials/dialogs/NewClient/dialog";
import { Cliente } from "@/types/cliente";
import config from "@/config";
import { Paginated } from "@/types/shared/pagination";

async function getClientes(): Promise<Paginated<Cliente>> {
  try {
    const response = await fetch(config.back_uri + "/clientes", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwibm9tYnJlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUub3JnIiwiaWF0IjoxNzE4ODA5NzM0LCJleHAiOjIwMjk4NDk3MzQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9._Xm5xkAaxggMsRp21B9gQk370juWgSyeff6axlM9yG-CD1llQFO7usXgwdVbRbGz",
      },
    });
    let data;
    if (response.ok) {
      data = await response.json();
      console.log(data);
      return data as Paginated<Cliente>;
    } else {
      console.error("Error: ", response.statusText);
      return {} as Paginated<Cliente>;
    }
  } catch (error) {
    console.error(error);
    return {} as Paginated<Cliente>;
  }
}

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
          <DataTable
            columns={columns}
            data={data._embedded["clienteNaturals"]}
          />
        </article>
      </section>
    </React.Fragment>
  );
}
