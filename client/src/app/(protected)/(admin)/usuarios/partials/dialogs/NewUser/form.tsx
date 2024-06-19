"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUsuario } from "@/actions/Usuario"
import { toast } from "sonner"
import { CreateUsuarioDto } from "@/types/usuario"
import { useEffect, useState } from "react"
import { Copy } from "lucide-react"

export default function NewUserForm() {
    const [generatingPassword, setGeneratingPassword] = useState(false)

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
            const rawData = Object.fromEntries(formData.entries())
            const newUser = {...rawData, roles: [rawData.roles]} as CreateUsuarioDto
            const response = await createUsuario(newUser) 
            
            if(response.status === "success"){
              toast.success(response.message)
            }else {
              toast.error(response.message)
            }
        } catch(error){
          console.error(error)
        }
      }
      

      const { email, name, roles } = form.watch()
      useEffect(() => {
        setGeneratingPassword(true)
        let timeout :NodeJS.Timeout
        if(email && name && roles){
          setGeneratingPassword(true)
          timeout = setTimeout(() => {
              const randomNumber = Math.floor(1000 + Math.random() * 9000)
              const randomLettersFromName = name.slice(0, Math.random() * 8 + 1)
              const randomLettersFromEmail = email.split("@")[0].slice(-1*Math.random() * 8 + 1)
              const newPassword = randomLettersFromName + randomNumber + randomLettersFromEmail
              form.setValue("password", newPassword.slice(0, 10).replace(/\s/g, ""))
              setGeneratingPassword(false)
          }, 1000)
        }else{
          setGeneratingPassword(false)
          form.setValue("password", "")
        }

        //clear timeout
        return () => {
          clearTimeout(timeout)
          form.setValue("password", "")
        }
      }, [
        email,
        name,
        roles
      ])
    return (
       <Form {...form}>
        <form action={onSubmit} className="flex flex-col gap-2">
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
             <FormField 
                control={form.control}
                name="password"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <div className="relative">
                              <Input placeholder={generatingPassword ? "Generando contraseña ... " : ""} {...field} />
                              <Button 
                                className="absolute right-0 top-0 hover:scale-105 transition-transform duration-300 ease-in-out"
                                variant={"link"}
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(field.value)
                                  toast.success("Contraseña copiada al portapapeles")
                                }}
                              >
                                <Copy />
                                <span className="sr-only">Copiar contraseña al portapapeles</span>
                              </Button>
                            </div> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <DialogFooter>
                <DialogClose 
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
                  Guardar
                </DialogClose>
                <DialogClose 
                  className={buttonVariants({variant: "outline", size: "default"})}
                  type="button">
                  Cancelar
                </DialogClose>
            </DialogFooter>
        </form>
       </Form>
    );
}