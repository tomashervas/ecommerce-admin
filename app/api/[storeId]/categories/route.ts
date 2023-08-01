import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: {params: {storeId: string}}) {
        try {
            const {userId} = auth()
            const {name, billboardId} = await req.json()
            
            if(!userId) return new NextResponse("Unauthorized", {status: 401})
            if(!name) return new NextResponse("Name is required", {status: 400})
            if(!billboardId) return new NextResponse("Billboard Id is required", {status: 400})
            if(!params.storeId) return new NextResponse("storeId is required", {status: 400})

            const storeByUserId = await prismadb.store.findUnique(
                {where:{ 
                    id: params.storeId,
                    userId
                }}
            )

            if(!storeByUserId) return new NextResponse("Unauthorized",{status: 403})

            const category = await prismadb.category.create({
                data: {
                    name,
                    billboardId,
                    storeId: params.storeId
                }
            })
            return NextResponse.json(category)

        } catch (error) {
            console.log('[CATEGORY_POST_ERROR]', error)
            return new NextResponse("Internal Server Error", {status: 500})
        }
    }

    export async function GET(
        req: Request,
        { params }: {params: {storeId: string}}) {
            try {
               
                if(!params.storeId) return new NextResponse("storeId is required", {status: 400})
    
                const categories = await prismadb.category.findMany({
                    where: {
                        storeId: params.storeId
                    }
                })
                return NextResponse.json(categories)
    
            } catch (error) {
                console.log('[CATEGORIES_GET_ERROR]', error)
                return new NextResponse("Internal Server Error", {status: 500})
            }
        }