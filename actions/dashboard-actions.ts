import prismadb from "@/lib/prismadb"

interface GraphData {
    name: string
    total: number
}

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    const totalRevenue = paidOrders.reduce((acc, item) => acc + item.orderItems.reduce((acc, item) => acc + item.product.price.toNumber(), 0), 0)

    return totalRevenue
}

export const getSalesCount = async (storeId: string) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true
        }
    })

    return salesCount
}

export const getStockCount = async (storeId: string) => {
    const stockCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false
        }
    })

    return stockCount
}

export const getGraphRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    const monthlyRevenue: {[key: number]: number} = {}

    for (const order of paidOrders) {
        const momnth = order.createdAt.getMonth() + 1
        let revenueForOrder = 0

        for (const item of order.orderItems) {
            revenueForOrder += item.product.price.toNumber()
        }

        monthlyRevenue[momnth] = (monthlyRevenue[momnth] || 0) + revenueForOrder
    }

    const graphData: GraphData[] = [
        {name: 'Ene', total: 0},
        {name: 'Feb', total: 0},
        {name: 'Mar', total: 0},
        {name: 'Abr', total: 0},
        {name: 'May', total: 0},
        {name: 'Jun', total: 0},
        {name: 'Jul', total: 0},
        {name: 'Ago', total: 0},
        {name: 'Sep', total: 0},
        {name: 'Oct', total: 0},
        {name: 'Nov', total: 0},
        {name: 'Dic', total: 0}
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month) - 1].total = monthlyRevenue[parseInt(month)]
    }

    return graphData


}