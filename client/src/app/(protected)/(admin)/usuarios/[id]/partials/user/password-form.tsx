"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { createUsuario, updateUsuarioDetails, updateUsuarioPassowrd } from "@/actions/Usuario"
import { toast } from "sonner"
import { UpdatePasswordDto, UpdateUsuarioDetailsDto, Usuario } from "@/types/usuario"

export default function UserPasswordReset({ usuario } : { usuario : Usuario}) {
    const formSchema = z.object({
        currentPassword: z.string().min(8).max(50),
        newPassword: z.string().min(8).max(50),
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
      })

      async function onSubmit(formData: FormData) {
        try{
            const rawData = Object.fromEntries(formData.entries())
            const newPassword = {...rawData } as UpdatePasswordDto
            console.log(newPassword)
            const response = await updateUsuarioPassowrd(usuario.id, newPassword) 
            
            if(response.status === "success"){
              toast.success(response.message)
              form.reset()
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
                    name="currentPassword"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Contraseña actual</FormLabel>
                            <FormControl>
                                <Input  type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               <FormField 
                    control={form.control}
                    name="newPassword"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                                <Input  type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* Actions */}
            <div className="space-x-2">
                <Button 
                    variant={"default"}
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
                        Actualizar contraseña
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