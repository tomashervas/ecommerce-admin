"use client"

import { Copy, CopyIcon, ServerIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import { toast } from "react-hot-toast"

interface ApiAlertProps {
    title: string
    description: string
    variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
}



export const ApiAlert: React.FC<ApiAlertProps> = ({title, description, variant = "public"}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("Copiado")
    }


    return (
        <div className="p-4">
            <Alert>
                <ServerIcon className="h-4 w-4" />
                <AlertTitle>
                    {title}<Badge className="ml-4" variant={variantMap[variant]} >{textMap[variant]}</Badge>
                </AlertTitle>
                <AlertDescription className="mt-4 flex justify-between items-center">
                    <code className="relative rounded bg-muted p-2 font-mono font-sm font-semibold">
                        {description}
                    </code>
                    <Button variant={"outline"} size={"icon"} onClick={onCopy}>
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    )
}