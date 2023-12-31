"use client"

import { Store } from "@prisma/client"
import Heading from "../ui/heading"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { Separator } from "../ui/separator"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import AlertModal from "../modals/alertModal"
import { ApiAlert } from "../ui/apiAlert"

interface SettingsFormProps {
    initialData: Store
}

const formShema = z.object({
    name: z.string().min(2),
})

const SettingsForm = ({initialData}: SettingsFormProps) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: initialData
    })

    const onSubmit = async(values: z.infer<typeof formShema>) => {
        try {
            setLoading(true)
            const response = await axios.patch(`/api/stores/${initialData.id}`, values)
            console.log(response.data)
            router.refresh()
            toast.success('Tienda actualizada')
        } catch (error) {
            toast.error('Ha habido un error, por favor inténtelo nuevamente')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async() => {
        try {
            setLoading(true)
            axios.delete(`/api/stores/${initialData.id}`)
            router.refresh()
            router.push("/")
            toast.success('Tienda eliminada')
        } catch (error) {
            toast.error("Asegurate que no haya productos ni categorías en la tienda")
        } finally {
            setLoading(false)
            setIsOpen(false)   
        }
    }

    useEffect(() => {
      console.log(window.origin)  
    },[])



  return (
    <>
        <AlertModal isOpen={isOpen} onClose={() => setIsOpen(false)} loading={loading} onConfirm={onDelete} />
        <div className="p-4">
            <div className="flex justify-between p-4">
                <Heading title={'Ajustes'} description={"Administra la tienda seleccionada"}/>
                <Button disabled={loading} variant={"destructive"} size={"icon"} onClick={() => setIsOpen(true)}> 
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
        <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${window.origin}/api/${initialData.id}`} variant="public"/>
    </>
  )
}
export default SettingsForm