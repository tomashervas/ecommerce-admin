"use client"

import { Billboard, Size, Store } from "@prisma/client"
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

interface SizeFormProps {
    initialData: Size | null
}

const formShema = z.object({
    name: z.string().min(2),
    value: z.string().min(1),
})

const SizeForm = ({ initialData }: SizeFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const title = initialData ? "Editar talla" : "Nueva talla"
    const description = initialData ? "Editar la talla" : "Añade un nueva talla a tu tienda"
    const toastMessage = initialData ? "Talla actualizado" : "Talla creada"
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
                const response = await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values)
            } else {
                const response = await axios.post(`/api/${params.storeId}/sizes`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
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
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success('Talla eliminada')
        } catch (error) { 
            toast.error("Asegurate que no haya producos usando esta talla")
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
                                    <FormLabel htmlFor="name">Nombre de la talla</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre de la talla" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="value" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="value">Valor de la Talla</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="valor" {...field} />
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
export default SizeForm