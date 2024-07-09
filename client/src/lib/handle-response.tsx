import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default async function HandleServerResponse(response: Response, form?: UseFormReturn<any, any, undefined>, toastId?: string | number): Promise<boolean> {

  let messageError = "";

  if (response.status == 400) {
    const data = await response.json();
    const errors = [] as string[];

    if ("code" in data) {
      if (data.code == "VALIDATION_ERRORS") {
        for (const error of data.errors) {
          errors.push(error.message);
          console.log(error);
          if (form) {
            form.setError(error.field, {
              type: "server",
              message: error.message
            });
          }
        }
        messageError = errors.join("\n");
      }
    }
  } else if (response.status == 403) {
    messageError = "Acción denegada";
  } else if (response.status == 500) {
    messageError = "Error en el servidor";
  } else if (response.status >= 400) {
    messageError = "Error no controlado";
  }

  if (response.status >= 400) {
    toast.error(messageError, {
      position: "top-center",
      id: toastId
    });
    return false;
  }

  return true;
}