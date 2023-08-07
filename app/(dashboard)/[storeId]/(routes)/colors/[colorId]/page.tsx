import prismadb from "@/lib/prismadb"
import ColorForm from "./components/colorForm"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const ColorPage = async ({params}:{ params: { sizeId: string}}) => {

    const {userId} = auth()

    if (!userId) redirect('/sign-in')

    const color = await prismadb.color.findFirst({
        where: {
            id: params.sizeId,
        },
    })

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ColorForm initialData={color}/>
        </div>
    </div>
  )
}
export default ColorPage