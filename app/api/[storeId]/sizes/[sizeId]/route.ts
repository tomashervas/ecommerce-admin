import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    {params}: {params: {sizeId: string}}
    ) {
    try {
        
        if(!params.sizeId) return new NextResponse("size id is required", {status: 400})
 
        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            }
        })
        return NextResponse.json(size)

    } catch (error) {
        console.log('[  SIZE_GET]', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, sizeId: string}}
    ) {
    try {
        const {userId} = auth()
        const {name, value} = await req.json()
        
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!name) return new NextResponse("name is required", {status: 400})
        if(!value) return new NextResponse("value is required", {status: 400})
        if(!params.sizeId) return new NextResponse("Size id is required", {status: 400})

        const storeByUserId = await prismadb.store.findFirst(
            {where:{ 
                id: params.storeId,
                userId
            }}
        )

        if(!storeByUserId) return new NextResponse("Unauthorized",{status: 403})
 
        const size = await prismadb.size.update({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_PATCH]', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, sizeId: string}}
    ) {
    try {
        const {userId} = auth()
        
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!params.storeId) return new NextResponse("Store id is required", {status: 400})
        if(!params.sizeId) return new NextResponse("size id is required", {status: 400})

        const storeByUserId = await prismadb.store.findFirst(
            {where:{ 
                id: params.storeId,
                userId
            }}
        )

        if(!storeByUserId) return new NextResponse("Unauthorized",{status: 403})
 
        const size = await prismadb.size.delete({
            where: {
                id: params.sizeId,
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_DELETE]', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}