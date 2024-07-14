"use client"
import { Fragment } from "react";
import Projects from "./partials/projects";
import { useQuery } from "@tanstack/react-query";
import { fetcherLocal } from "@/server/fetch/client-side";
import Loader from "@/components/common/Loader";
import { Proyecto } from "@/types/proyecto";

export default function HomeConsultor() {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["proyectos"],
        queryFn: async () => {
          const response = await fetcherLocal(`/proyectos`);
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
          },
      });
     
      

    return (
        <Fragment>
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Vista general de proyectos
              </h2>
            </header>

            <section className="flex flex-col">
                <article className="area flex flex-col">
                    <div className="w-full">
                        opciones
                    </div>
                    {
                        isLoading && <Loader />
                    }
                    {
                        isError || !data && <div>Error al cargar los proyectos</div>
                    }
                    {
                        data && <Projects proyectos={data.content as Proyecto[]}/>
                    }
                </article>
            </section>
        </Fragment>
    );
}