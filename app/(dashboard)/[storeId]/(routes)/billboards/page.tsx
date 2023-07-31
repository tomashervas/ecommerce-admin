import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/billboardClient"

const BillboardsPage = async () => {

  const billboards = await prismadb.billboard.findMany()

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient billboards={billboards}/>
        </div>
    </div>
  )
}
export default BillboardsPage