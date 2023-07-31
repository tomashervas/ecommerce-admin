import prismadb from "@/lib/prismadb"
import BillboardForm from "./components/billboardForm"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const BillboardPage = async ({params}:{ params: { billboardId: string}}) => {

    const {userId} = auth()

    if (!userId) redirect('/sign-in')

    const billboard = await prismadb.billboard.findFirst({
        where: {
            id: params.billboardId,
        },
    })

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardForm initialData={billboard}/>
        </div>
    </div>
  )
}
export default BillboardPage