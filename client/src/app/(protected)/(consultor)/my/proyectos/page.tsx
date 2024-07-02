import { Fragment } from "react";
import Projects from "./partials/projects";

export default function HomeConsultor() {
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
                    <Projects />
                </article>
            </section>
        </Fragment>
    );
}