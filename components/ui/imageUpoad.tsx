"use client"

import { ImagePlusIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from "./button"

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

const ImageUpoad: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {


    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    
    const onUpload = (result:any) => {
        onChange(result.info.secure_url) 
    }

    if (!isMounted) return null
    
    return (
        <div>
            <div className="flex space-x-4 p-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="absolute top-2 right-2 z-10 cursor-pointer">
                            <Button disabled={disabled} type="button" onClick={() => onRemove(url)}>
                                <Trash2Icon className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image  src={url} fill alt="image" className="object-cover"/>
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="vq8df5jw">
                    {({open})=>{
                        const onClick = () => {
                            open()
                        }
                        return (
                            <Button disabled={disabled} variant={"secondary"} type="button" onClick={onClick}>
                                <ImagePlusIcon className="h-4 w-4 mr-2" />
                                Subir imagen
                            </Button>
                        )
                    }}
            </CldUploadWidget>
        </div>
    )
}
export default ImageUpoad