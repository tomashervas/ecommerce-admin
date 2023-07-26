"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { toast } from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(2),

})

const StoreModal = () => {

    const storeModal = useStoreModal()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post("/api/stores", values)
            console.log(response.data)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error('Ha habido un error, por favor inténtelo nuevamente')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Modal isOpen={storeModal.isOpen} description="descripción"  title="Nueva tienda" onClose={storeModal.onClose}>
        <div>
            <div className="space-y-2">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField name="name" control={form.control} render={({field})=>(
                            <FormItem>
                                <FormLabel htmlFor="name">Nombre</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Nombre de la tienda" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex justify-end pt-6 space-x-2">
                            <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose} >Cancelar</Button>
                            <Button disabled={loading} type="submit">Aceptar</Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    </Modal>
  )
}
export default StoreModal