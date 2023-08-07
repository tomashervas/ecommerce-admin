import prismadb from "@/lib/prismadb"
import SizeForm from "./components/sizeForm"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const SizePage = async ({params}:{ params: { sizeId: string}}) => {

    const {userId} = auth()

    if (!userId) redirect('/sign-in')

    const size = await prismadb.size.findFirst({
        where: {
            id: params.sizeId,
        },
    })

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeForm initialData={size}/>
        </div>
    </div>
  )
}
export default SizePage