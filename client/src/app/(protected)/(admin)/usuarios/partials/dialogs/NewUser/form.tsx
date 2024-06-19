"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { revalidatePath } from "next/cache"

export default function NewUserForm() {
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        roles: z.enum(["ROLE_CONSULTOR", "ROLE_CLIENTE"]),
        email: z.string().email(),
        password: z.string().min(6).max(20),
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          roles: "ROLE_CONSULTOR",
          email: "",
          password: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = { ...values, roles: [values.roles]}
        console.log(formData)

        try {
          const response = await fetch("http://localhost:8800/usuarios/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwibm9tYnJlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUub3JnIiwiaWF0IjoxNzE4NzQ5MTQ2LCJleHAiOjE3NTAyODUxNDYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9.fjJS1_uNgH-t0l9cdP5l03bW_4Q750_7eqTnSSU8Xvl-7vtSb49WZfnJsoaJd-mz"
            },
            body: JSON.stringify(formData)
          }, 
        )
        if(response.ok){
          revalidatePath("/usuarios")
        }
        }catch(e){
          console.log(e)
        }
      }
  
    return (
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField 
                control={form.control}
                name="name"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl>
                            <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField 
                control={form.control}
                name="roles"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Rol</FormLabel>
                        <Select name="roles" onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ROLE_CONSULTOR">Consultor</SelectItem>
                            <SelectItem value="ROLE_CLIENTE">Cliente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField 
                control={form.control}
                name="email"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Correo</FormLabel>
                        <FormControl>
                            <Input  placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField 
                control={form.control}
                name="password"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <Input  placeholder="*****" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <DialogClose className="h-full border rounded-md px-4 py-2.5 hover:bg-neutral-300">Cancelar</DialogClose>
            </DialogFooter>
        </form>
       </Form>
    );
}