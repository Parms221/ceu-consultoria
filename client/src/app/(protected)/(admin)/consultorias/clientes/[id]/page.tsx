import { getCliente } from "@/actions/Cliente";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddUserDialog from "../../../usuarios/partials/Dialogs/AddUserDialog";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface ClienteDetailProps {
  params: {
    id: string;
  };
}

export default async function ClienteDetail({ params }: ClienteDetailProps) {
  const { id } = params;
  const cliente = await getCliente(id);
  return (
    <div>
      <Breadcrumb pageName="Clientes" />
      <section className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 text-lg font-semibold">
            Datos del cliente
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-gray-800 text-sm font-semibold">
                {cliente.tipo_documento === "DNI" ? "Nombre" : "Razón social"}
              </label>
              <p className="text-gray-600 text-sm">
                {cliente.tipo_documento === "DNI"
                  ? `${cliente.nombre} ${cliente.apellido}`
                  : cliente.razonSocial}
              </p>
            </div>
            <div>
              <label className="text-gray-800 text-sm font-semibold">
                Tipo de documento
              </label>
              <p className="text-gray-600 text-sm">{cliente.tipo_documento}</p>
            </div>
            <div>
              <label className="text-gray-800 text-sm font-semibold">
                Documento
              </label>
              <p className="text-gray-600 text-sm">
                {cliente.tipo_documento === "DNI" ? cliente.dni : cliente.ruc}
              </p>
            </div>
            <div>
              <label className="text-gray-800 text-sm font-semibold">
                Correo
              </label>
              <p className="text-gray-600 text-sm">
                <a href="mailto:juan@perez.com">{cliente.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 text-lg font-semibold">Acceso</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-end">
              {cliente.usuarioCliente ? (
                <div className="">
                  <label className="text-gray-800 text-sm font-semibold">
                    Usuario
                  </label>
                  <p className="text-gray-600 text-sm">
                    {cliente.usuarioCliente.name}
                  </p>
                  <label className="text-gray-800 text-sm font-semibold">
                    Correo
                  </label>
                  <p className="text-gray-600 text-sm">
                    {cliente.usuarioCliente.email}
                  </p>
                </div>
              ) : (
                <div>No tiene acceso al sistema. </div>
              )}
            </div>
            <div className="flex items-end">
              {cliente.usuarioCliente ? (
                <div>
                  <Link
                    className={buttonVariants({
                      variant: "default",
                    })}
                    href={`/usuarios/${cliente.usuarioCliente.id}`}
                  >
                    Ver usuario
                  </Link>
                </div>
              ) : (
                <div>
                  <AddUserDialog cliente={cliente} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
