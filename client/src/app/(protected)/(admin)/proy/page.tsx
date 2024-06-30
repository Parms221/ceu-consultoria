import React from "react";
import MultiStepForm from "./partials/multi-step-form/multi-step-form";

export default async function Usuarios() {
    // const usuarios = await getUsuarios();
    return (
        <React.Fragment>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Nuevo Proyecto
                </h2>

                {/* <NewUserDialog /> */}
            </div>

            <section className="flex flex-col gap-8 my-5">
                <article className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark pb-4 px-2 rounded-md">
                    {/* <DataTable columns={columns} data={usuarios ?? []} /> */}
                    <div className="p-5">
                        Hola
                    </div>
                </article>
            </section>

            <section className="flex flex-col gap-8">
                <article className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark pb-4 px-2 rounded-md">
                    {/* <DataTable columns={columns} data={usuarios ?? []} /> */}
                    <MultiStepForm/>
                    {/* <div className="p-10">
                        Hola
                    </div> */}
                </article>
            </section>
        </React.Fragment>
    );
}