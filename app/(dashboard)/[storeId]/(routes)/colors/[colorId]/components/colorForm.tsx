"use client"

import { Billboard, Color, Size, Store } from "@prisma/client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/modals/alertModal"
import { ApiAlert } from "@/components/ui/apiAlert"
import ImageUpoad from "@/components/ui/imageUpoad"

interface ColorFormProps {
    initialData: Color | null
}

const formShema = z.object({
    name: z.string().min(2),
    value: z.string().min(4).regex(/^#/, {message: 'Debes itroducir un color en formato HEX'}),
})

const ColorForm = ({ initialData }: ColorFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const title = initialData ? "Editar color" : "Nuevo color"
    const description = initialData ? "Editar el color" : "Añade un nuevo color a tu tienda"
    const toastMessage = initialData ? "Color actualizado" : "Color creado"
    const action = initialData ? "Guardar cambios" : "Crear"


    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try {
            setLoading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, values)
            } else {
                const response = await axios.post(`/api/${params.storeId}/colors`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Ha habido un error, por favor inténtelo nuevamente')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success('Color eliminado')
        } catch (error) { 
            toast.error("Asegurate que no haya producos usando este color")
        } finally {
            setLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={isOpen} onClose={() => setIsOpen(false)} loading={loading} onConfirm={onDelete} />
            <div className="p-4">
                <div className="flex justify-between p-4">
                    <Heading title={title} description={description} />
                    {initialData && <Button disabled={loading} variant={"destructive"} size={"icon"} onClick={() => setIsOpen(true)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>}
                </div>
                <Separator />
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">

                        <div className="grid grid-cols-3 gap-4 my-4">
                            <FormField name="name" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Nombre del color</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre de la color" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="value" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="value">Valor del color</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="valor" {...field} />
                                            <div className="p-4 rounded-full border" style={{backgroundColor: field.value}}/>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <Button disabled={loading} type="submit" className="p-4">{action}</Button>

                    </form>
                </Form>
            </div>
        </>
    )
}
export default ColorForm