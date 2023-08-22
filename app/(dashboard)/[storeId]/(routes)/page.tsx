import { getGraphRevenue, getSalesCount, getStockCount, getTotalRevenue } from "@/actions/dashboard-actions"
import Overview from "@/components/overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"
import { CreditCardIcon, EuroIcon, GlassesIcon, Package2Icon } from "lucide-react"

const DashboardPage = async ({params}: {params: {storeId: string}}) => {
  const totalRevenue = await getTotalRevenue(params.storeId)
  const salesCount = await getSalesCount(params.storeId)
  const stockCount = await getStockCount(params.storeId)
  const graphData = await getGraphRevenue(params.storeId)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={"Resumen:"}description="Vista general de tu tienda" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2" >
              <CardTitle className="font-semibold text-sm">
                Total ingresado:
              </CardTitle>
              <EuroIcon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2" >
              <CardTitle className="font-semibold text-sm">
                Ventas
              </CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2" >
              <CardTitle className="font-semibold text-sm">
                Productos en stock:
              </CardTitle>
              <Package2Icon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center">
              <GlassesIcon className=" mr-2 h-6 w-6 text-muted-foreground"/>
              <CardTitle>
                Vista general:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={graphData} />
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
export default DashboardPage