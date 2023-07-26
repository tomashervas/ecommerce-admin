"use client"

import { Store } from "@prisma/client"
import Heading from "../ui/heading"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { Separator } from "../ui/separator"
import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface SettingsFormProps {
    initialData: Store
}

const formShema = z.object({
    name: z.string().min(2),
})

const SettingsForm = ({initialData}: SettingsFormProps) => {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData
    })

    const onSubmit = async(values: z.infer<typeof formShema>) => {
        console.log(values)
    }



  return (
    <div className="p-4">
        <div className="flex justify-between p-4">
            <Heading title={'Ajustes'} description={"Administra la tienda seleccionada"} />
            <Button variant={"destructive"} size={"icon"}> 
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
        <Separator />
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                <div className="grid grid-cols-3 gap-4 my-4">
                    <FormField name="name" control={form.control} render={({field})=>(
                        <FormItem>
                            <FormLabel htmlFor="name">Nombre</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Nombre de la tienda" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <Button disabled={loading} type="submit" className="p-4">Guardar cambios</Button>

            </form>
        </Form>
    </div>
  )
}
export default SettingsForm