"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUsuario } from "@/actions/Usuario";
import { toast } from "sonner";
import { CreateUsuarioDto } from "@/types/usuario";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { useAppContext } from "@/app/(protected)/app.context";
import { Rol } from "@/types/rol";
import { getReadableRole } from "@/lib/rol";

export default function CreateUserForm() {
  const [generatingPassword, setGeneratingPassword] = useState(false);
  const context = useAppContext();

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    roles: z.enum(
      context.roles.map((rol) => rol.rol as Rol["rol"]) as [
        string,
        ...string[],
      ],
      { message: "El rol seleccionado no es válido" },
    ),
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      roles: "ROLE_CONSULTOR",
      email: "",
      password: "",
    },
  });

  const dialogClose = () => {
    document.getElementById("closeDialog")?.click();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO Validación de datos con zod (formSchema.parse(formData))
    try {
      const response = await createUsuario({
        email: values.email,
        name: values.name,
        password: values.password,
        roles: [values.roles],
      });

      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const { email, name, roles } = form.watch();
  useEffect(() => {
    setGeneratingPassword(true);
    let timeout: NodeJS.Timeout;
    if (email && name && roles) {
      setGeneratingPassword(true);
      timeout = setTimeout(() => {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const randomLettersFromName = name.slice(0, Math.random() * 8 + 1);
        const randomLettersFromEmail = email
          .split("@")[0]
          .slice(-1 * Math.random() * 8 + 1);
        const newPassword =
          randomLettersFromName + randomNumber + randomLettersFromEmail;
        form.setValue("password", newPassword.slice(0, 10).replace(/\s/g, ""));
        setGeneratingPassword(false);
      }, 1000);
    } else {
      setGeneratingPassword(false);
      form.setValue("password", "");
    }

    //clear timeout
    return () => {
      clearTimeout(timeout);
      form.setValue("password", "");
    };
  }, [email, name, roles]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select
                name="roles"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {context.roles.map((rol) => {
                    return (
                      <SelectItem key={rol.idRol} value={rol.rol}>
                        {getReadableRole(rol.rol)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={
                      generatingPassword ? "Generando contraseña ... " : ""
                    }
                    {...field}
                  />
                  <Button
                    className="absolute right-0 top-0 transition-transform duration-300 ease-in-out hover:scale-105"
                    variant={"link"}
                    type="button"
                    onClick={() => {
                      if (field.value) {
                        navigator.clipboard.writeText(field.value);
                        toast.success("Contraseña copiada al portapapeles");
                      } else {
                        toast.info("Debe generar una contraseña primero");
                      }
                    }}
                  >
                    <Copy />
                    <span className="sr-only">
                      Copiar contraseña al portapapeles
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose
            className={buttonVariants({ variant: "default", size: "default" })}
            type="submit"
          >
            Guardar
          </DialogClose>
          <DialogClose
            id="closeDialog"
            className={buttonVariants({ variant: "outline", size: "default" })}
            type="button"
          >
            Cancelar
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
