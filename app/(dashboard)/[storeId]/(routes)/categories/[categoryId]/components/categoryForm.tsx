"use client"

import { Billboard, Category } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFormProps {
    initialData: Category | null
    billboards: Billboard[]
}

const formShema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(2),
})

const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const title = initialData ? "Editar categoría" : "Nueva categoría"
    const description = initialData ? "Editar categoría" : "Añade una nueva categoría"
    const toastMessage = initialData ? "categoría actualizada" : "categoría creada"
    const action = initialData ? "Guardar cambios" : "Crear"


    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData || {
            name: "",
            billboardId: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try {
            setLoading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values)
            } else {
                const response = await axios.post(`/api/${params.storeId}/categories`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/categories`)
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success('Categoría eliminada')
        } catch (error) { 
            toast.error("Asegúrate que no haya productos usando esta categoría")
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

                        <div className="grid grid-cols-3 gap-4 my-4">
                            <FormField name="name" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Nombre de la categoría</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre de la categoría" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="billboardId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="billboardId">Cartel</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder="Selecciona un cartel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {billboards.map(billboard => (
                                            <SelectItem key={billboard.id} value={billboard.id}>
                                                {billboard.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
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
export default CategoryForm