"use client"

import { useStoreModal } from "@/hooks/useStoreModal"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"


interface StoreSwitcherProps {
    className?: string
    items: Store[]
}
const StoreSwitcher = ({className, items = []}: StoreSwitcherProps) => {

    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formatedItems = items.map(item => {
        return {
            label: item.name,
            value: item.id,
        }
    })
    const currentStore = formatedItems.find(item => item.value === params.storeId)

    const [open, setOpen] = useState(false)

    const onStoreSeect = (store: { label: string, value: string}) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }



  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant={"outline"} size={"sm"} role="combobox" aria-expanded={open} aria-label="Cambiar tienda" className={cn("w-[200px]", className)} >
                <StoreIcon className="mr-2 h-4 w-4"/>
                {currentStore?.label}
                <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandList >
                    <CommandInput placeholder="Buscar tienda" />
                    <CommandEmpty>No se ha encontrado nada.</CommandEmpty>
                    <CommandGroup>
                        {formatedItems.map((store) => (
                        <CommandItem
                            key={store.value}
                            onSelect={() => onStoreSeect(store)}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            {store.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>       
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem onSelect={() => {
                            setOpen(false)
                            storeModal.onOpen()}}>
                            <PlusCircle className="mr-2 h-4 w-4 opacity-70" />
                            Crear tienda
                        </CommandItem>
                    </CommandGroup>
                </CommandList>

            </Command>
        </PopoverContent>

    </Popover>
  )
}
export default StoreSwitcher