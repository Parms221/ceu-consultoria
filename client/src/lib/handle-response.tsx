import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default async function HandleServerResponse(response: Response, form?: UseFormReturn<any, any, undefined>, toastId?: string | number): Promise<boolean> {


  if (response.status == 400) {
    const data = await response.json();

    // show message errors
    const errors = [] as string[];

    if ("code" in data) {
      if (data.code == "VALIDATION_ERRORS") {
        for (const error of data.errors) {
          errors.push(error.message);
          console.log(error)
          if (form) {
            form.setError(error.field, {
              type: "server",
              message: error.message
            });
          }
        }
        toast.error("Error",{
          description: errors.join("\n"),
          position: "top-center",
          id: toastId
        })
      }
    }




    return false
  } else if (response.status == 403) {
    toast.error("Acción denegada", {
      position: "top-center",
      id: toastId
    })
    return false;
  } else if (response.status >= 400) {
    toast.error("Ha ocurrido un error inesperado", {
      position: "top-center",
      id: toastId
    })
    return false;
  }

  return true
}