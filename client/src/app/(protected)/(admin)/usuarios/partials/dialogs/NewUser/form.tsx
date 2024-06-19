"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUsuario } from "@/actions/Usuario"
import { toast } from "sonner"

export default function NewUserForm(
    {setDialogOpen}
    : {setDialogOpen: (open: boolean) => void}
) {
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

      async function onSubmit(formData: FormData) {
        // TODO Validación de datos con zod (formSchema.parse(formData))
       try{
        console.log(formData)
        // const usuario = formSchema.parse(formData)
        const rawData = {
          name: formData.get("name"), 
          email: formData.get("email"), 
          password: formData.get("password"),
          roles: [formData.get("roles")]
        }
        
        const response = await createUsuario(rawData) 
        if(response.status === "success"){
          toast.success(response.message)
          setDialogOpen(false)
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
              <Button type="button"
                variant={"outline"} 
                onClick={() => setDialogOpen(false)} 
                >
                  Cancelar
              </Button>
            </DialogFooter>
        </form>
       </Form>
    );
}