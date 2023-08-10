import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: {params: {storeId: string}}) {
        try {
            const {userId} = auth()
            const {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images,
                isArchived,
                isFeatured
            } = await req.json()
            
            if(!userId) return new NextResponse("Unauthorized", {status: 401})
            if(!price) return new NextResponse("name is required", {status: 400})
            if(!categoryId) return new NextResponse("name is required", {status: 400})
            if(!colorId) return new NextResponse("name is required", {status: 400})
            if(!sizeId) return new NextResponse("name is required", {status: 400})
            if(!name) return new NextResponse("name is required", {status: 400})
            if(!images || !images.length) return new NextResponse("images is required", {status: 400})
            if(!params.storeId) return new NextResponse("storeId is required", {status: 400})

            const storeByUserId = await prismadb.store.findUnique(
                {where:{ 
                    id: params.storeId,
                    userId
                }}
            )

            if(!storeByUserId) return new NextResponse("Unauthorized",{status: 403})

            const product = await prismadb.product.create({
                data: {
                    name,
                    price,
                    categoryId,
                    colorId,
                    sizeId,
                    isArchived,
                    isFeatured,
                    storeId: params.storeId,
                    images:{
                        createMany:{
                            data: [...images.map((image: {url: string}) => image)]
                        }
                    }
                }
            })
            return NextResponse.json(product)

        } catch (error) {
            console.log('[PRODUCT_POST_ERROR]', error)
            return new NextResponse("Internal Server Error", {status: 500})
        }
    }

    export async function GET(
        req: Request,
        { params }: {params: {storeId: string}}) {
            try {
                const { searchParams } = new URL(req.url)
                const categoryId = searchParams.get("categoryId") || undefined
                const colorId = searchParams.get("colorId") || undefined
                const sizeId = searchParams.get("sizeId") || undefined
                const isFeatured = searchParams.get("isFeatured")

                if(!params.storeId) return new NextResponse("storeId is required", {status: 400})
    
                const products = await prismadb.product.findMany({
                    where: {
                        storeId: params.storeId,
                        categoryId,
                        colorId,
                        sizeId,
                        isFeatured: isFeatured ? true: undefined
                    },
                    include: {
                        images: true,
                        category: true,
                        color: true,
                        size: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
                return NextResponse.json(products)
    
            } catch (error) {
                console.log('[PRODUCTS_GET_ERROR]', error)
                return new NextResponse("Internal Server Error", {status: 500})
            }
        }