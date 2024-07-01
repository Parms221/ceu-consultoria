export default function Pag1Ex() {
    return (
        <section className="flex flex-col gap-8">
            <article className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark pb-4 px-2 rounded-md">
                <div className="">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" className="border p-1 rounded-sm" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" id="apellido" name="apellido" className="border p-1 rounded-sm" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="border p-1 rounded-sm" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" className="border p-1 rounded-sm" />
                        </div>
                        {/* <button className="bg-blue-500 text-white rounded-md py-2">Siguiente</button> */}
                    </form>
                </div>
            </article>
        </section>
    );

}