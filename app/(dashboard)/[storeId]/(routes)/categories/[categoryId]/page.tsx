import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import CategoryForm from "./components/categoryForm"

const CategoryPage = async ({params}:{ params: { categoryId: string, storeId: string}}) => {

    const {userId} = auth()

    if (!userId) redirect('/sign-in')

    const category = await prismadb.category.findFirst({
        where: {
            id: params.categoryId,
        },
    })

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryForm initialData={category} billboards={billboards}/>
        </div>
    </div>
  )
}
export default CategoryPage