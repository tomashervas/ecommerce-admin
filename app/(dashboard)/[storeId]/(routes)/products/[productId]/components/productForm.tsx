"use client"

import { Category, Color, Image, Product, Size  } from "@prisma/client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/modals/alertModal"
import { ApiAlert } from "@/components/ui/apiAlert"
import ImageUpoad from "@/components/ui/imageUpoad"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null
    categories: Category[]
    sizes: Size[]
    colors: Color[]
}

const formShema = z.object({
    name: z.string().min(2),
    images: z.array(z.object({
        url: z.string(),
    })),
    price: z.coerce.number().nonnegative(),
    sizeId: z.string().min(2),
    colorId: z.string().min(2),
    categoryId: z.string().min(2),
    isArchived: z.boolean().default(false).optional(),
    isFeatured: z.boolean().default(false).optional(),
})

const ProductForm = ({ initialData, categories, colors, sizes }: ProductFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const title = initialData ? "Editar producto" : "Nuevo producto"
    const description = initialData ? "Editar el producto" : "Añade un nuevo producto"
    const toastMessage = initialData ? "Producto actualizado" : "Producto creado"
    const action = initialData ? "Guardar cambios" : "Crear"


    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData ? { ...initialData, price: parseFloat(String(initialData?.price)) } : {
            name: '',
            images: [],
            price: 0,
            sizeId: '',
            colorId: '',
            categoryId: '',
            isArchived: false,
            isFeatured: false,
        }
    })

    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try {
            setLoading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/products/${params.productId}`, values)
            } else {
                const response = await axios.post(`/api/${params.storeId}/products`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/products`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success('Producto eliminada')
        } catch (error) { 
            toast.error("Ha habido un error")
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

                        <FormField name="images" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="images">Imágenes</FormLabel>
                                <FormControl>
                                    <ImageUpoad value={field.value.map(image => image.url) }
                                        disabled={loading} 
                                        onChange={(url)=>field.onChange([...field.value,{url}])} 
                                        onRemove={(url)=> field.onChange([...field.value.filter((current=>current.url!==url))]) }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-3 gap-4 my-4">
                            <FormField name="name" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Nombre</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre del producto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="price" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="price">Precio</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Introduce el precio en euros" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="categoryId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="categoryId">Categoría</FormLabel>
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
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )} />

                            <FormField name="colorId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="colorId">Color</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder="Selecciona un color" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {colors.map(color => (
                                            <SelectItem key={color.id} value={color.id}>
                                                {color.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )} />

                            <FormField name="sizeId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="sizeId">Talla</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder="Selecciona una talla" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {sizes.map(size => (
                                            <SelectItem key={size.id} value={size.id}>
                                                {size.value }
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )} />

                        <FormField name="isFeatured" control={form.control} render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md p-4">
                                    <Checkbox disabled={loading} checked={field.value} onCheckedChange={field.onChange}/>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel htmlFor="isFeatured">Destacado</FormLabel>
                                        <FormDescription>Aparecerá en la página de inicio</FormDescription>
                                    </div>
                                </FormItem>
                            )} />

                        <FormField name="isArchived" control={form.control} render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md p-4">
                                    <Checkbox disabled={loading} checked={field.value} onCheckedChange={field.onChange}/>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel htmlFor="isArchived">Archivado</FormLabel>
                                        <FormDescription>Este producto no aparecerá en la tienda</FormDescription>
                                    </div>
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
export default ProductForm