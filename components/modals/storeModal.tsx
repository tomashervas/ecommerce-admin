"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const formSchema = z.object({
    name: z.string().min(2),

})

const StoreModal = () => {

    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values)
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
                                    <Input placeholder="Nombre de la tienda" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex justify-end pt-6 space-x-2">
                            <Button variant={"outline"} onClick={storeModal.onClose} >Cancelar</Button>
                            <Button type="submit">Aceptar</Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    </Modal>
  )
}
export default StoreModal