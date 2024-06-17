"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
  password: z
    .string()
    .min(1, "Ingrese una contraseña"),
});

export default function LoginForm() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const errorCred = searchParams.get("error");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") ?? "/",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {errorCred && errorCred == "CredentialsSignin" && (
        <div className="mb-3 rounded-md bg-red p-3 text-white">
          <p className="font-semibold">Credenciales incorrectas</p>
          <p className="text-sm">El correo o la contraseña son incorrectos</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* {user && (
                            <pre>{JSON.stringify(user, null, 2) }</pre>
                        )} */}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="admin@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="mt-3 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>
    </>
  );
}
