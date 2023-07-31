"use client"

import { Billboard, Store } from "@prisma/client"
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

interface BillboardFormProps {
    initialData: Billboard | null
}

const formShema = z.object({
    label: z.string().min(2),
    imgUrl: z.string().min(2),
})

const BillboardForm = ({ initialData }: BillboardFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const title = initialData ? "Editar cartel" : "Nuevo cartel"
    const description = initialData ? "Editar el cartel de promoción" : "Añade un nuevo cartel de promoción"
    const toastMessage = initialData ? "Cartel actualizado" : "Cartel creado"
    const action = initialData ? "Guardar cambios?" : "Crear"


    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData || {
            label: "",
            imgUrl: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try {
            setLoading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values)
            } else {
                const response = await axios.post(`/api/${params.storeId}/billboards`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
            axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push("/")
            toast.success('Tienda eliminada')
        } catch (error) { 
            toast.error("Asegurate que no haya categorías usando este cartel")
        } finally {
            setLoading(false)
            setIsOpen(false)
        }
    }

    useEffect(() => {
        console.log(window.origin)
    }, [])



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

                        <FormField name="imgUrl" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="imgUrl">Imagen de fondo</FormLabel>
                                <FormControl>
                                    <ImageUpoad value={field.value ? [field.value] : [] }
                                        disabled={loading} onChange={(url)=>field.onChange(url)} onRemove={()=> field.onChange("") }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-3 gap-4 my-4">
                            <FormField name="label" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="label">Nombre del cartel</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre del cartel" {...field} />
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
export default BillboardForm