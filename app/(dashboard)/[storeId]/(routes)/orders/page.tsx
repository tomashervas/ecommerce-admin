import prismadb from "@/lib/prismadb"
import { format } from 'date-fns'
import { OrderColumn } from "./components/columns"
import OrderClient from "./components/orderClient"
import { formatter } from "@/lib/utils"

const CategoriesPage = async ({params}: {params:{storeId: string}}) => {

  const orders = await prismadb.order.findMany(
    {
      where: {
        storeId: params.storeId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  )

  const formatedOrders:OrderColumn[] = orders.map(item=>({
    id: item.id,
    products: item.orderItems.map(item=>item.product.name).join(', '),
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    totalPrice: formatter.format(item.orderItems.reduce((acc,item)=>acc+item.product.price.toNumber(),0)),
    createdAt: format( item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderClient orders={formatedOrders}/>
        </div>
    </div>
  )
}
export default CategoriesPage