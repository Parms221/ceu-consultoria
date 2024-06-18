"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewUserForm() {
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        rol: z.enum(["consultor", "cliente"]),
        email: z.string().email(),
        password: z.string().min(6).max(20),
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          rol: "consultor",
          email: "",
          password: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
    
        console.log(values)
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
                name="rol"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Rol</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="consultor">Consultor</SelectItem>
                            <SelectItem value="cliente">Cliente</SelectItem>
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