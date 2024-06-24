"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateUsuarioDetails } from "@/actions/Usuario"
import { toast } from "sonner"
import { UpdateUsuarioDetailsDto, Usuario } from "@/types/usuario"
import { Rol } from "@/types/rol"
import { useAppContext } from "@/app/(protected)/app.context"
import { getReadableRole } from "@/lib/rol"
import { Checkbox } from "@/components/ui/checkbox"

export default function UserDetailsForm({ usuario } : { usuario : Usuario}) {
    const { roles } = useAppContext()

    const formSchema = z.object({
        name: z.string().min(2).max(50),
        roles: z.enum(
            roles.map((rol) => rol.rol as Rol["rol"]) as [string, ...string[]],
            { message: "El rol seleccionado no es válido"}
        ),
        email: z.string().email(),
        enabled: z.boolean(),
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: usuario.name,
          roles: usuario.roles[0].rol as Rol["rol"],
          email: usuario.email,
          enabled: usuario.enabled,
        },
      })

      async function onSubmit(formData: FormData) {
        // TODO Validación de datos con zod (formSchema.parse(formData))
        try{
            const rawData = Object.fromEntries(formData.entries())
            const newUser = {...rawData,
                roles: [rawData.roles],
                enabled: rawData.enabled ? true : false
            } as UpdateUsuarioDetailsDto
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
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
                                {roles.map((rol) => (
                                    <SelectItem key={rol.idRol} value={rol.rol}>
                                        {getReadableRole(rol.rol)}
                                    </SelectItem>
                                ))}
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
                    name="enabled"
                    render = {({field}) => (
                        <FormItem>
                            <div className="mt-4 flex items-center gap-2">
                                <FormLabel>Activo</FormLabel>
                                <FormControl>
                                    <Checkbox
                                        name="enabled"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </div>
                            <FormDescription>
                                Si la casilla está marcada, el usuario podrá acceder al sistema.
                            </FormDescription>
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