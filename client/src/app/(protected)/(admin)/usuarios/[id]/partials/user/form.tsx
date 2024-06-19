"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUsuario, updateUsuarioDetails } from "@/actions/Usuario"
import { toast } from "sonner"
import { UpdateUsuarioDetailsDto, Usuario } from "@/types/usuario"

export default function UserDetailsForm({ usuario } : { usuario : Usuario}) {
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        roles: z.enum(["ROLE_CONSULTOR", "ROLE_CLIENTE"]),
        email: z.string().email(),
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: usuario.name,
          roles: usuario.roles[0].rol as "ROLE_CONSULTOR" | "ROLE_CLIENTE",
          email: usuario.email,
        },
      })

      async function onSubmit(formData: FormData) {
        // TODO Validación de datos con zod (formSchema.parse(formData))
        try{
            const rawData = Object.fromEntries(formData.entries())
            const newUser = {...rawData, roles: [rawData.roles]} as UpdateUsuarioDetailsDto
            const response = await updateUsuarioDetails(usuario.id, newUser) 
            
            if(response.status === "success"){
              toast.success(response.message)
            }else {
              toast.error(response.message)
            }
        } catch(error){
          console.error(error)
        }
      }
      
    return (
       <Form {...form}>
        <form action={onSubmit} className="flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <FormField 
                    control={form.control}
                    name="name"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Nombre de usuario</FormLabel>
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
            </div>
            {/* Actions */}
            <div className="space-x-2">
                <Button 
                    className={buttonVariants({variant: "default", size: "default"})}
                    type="submit"
                    onClick={(e) => {
                        try{
                            formSchema.parse(form.getValues())
                        }catch(error) {
                            e.preventDefault()
                            if (error instanceof z.ZodError) {
                            for (const issue of error.issues) {
                                form.setError(issue.path[0] as any, {
                                type: issue.code,
                                message: issue.message,
                                });
                            }
                            }
                        }
                        }}
                    >
                        Actualizar
                    </Button>
                    <Button 
                        variant={"outline"}
                        type="button"
                        onClick={() => form.reset()}
                    >
                        Restablecer
                    </Button>
            </div>
        </form>
       </Form>
    );
}