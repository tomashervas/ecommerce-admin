import { UserButton, auth } from "@clerk/nextjs"
import MainNav from "@/components/mainNav"
import StoreSwitcher from "@/components/storeSwitcher"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

const Navbar = async () => {
    const {userId} = auth()
    if(!userId) redirect('/')

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })
  return (
    <div className="border-b flex h-16 items-center px-4">
        <StoreSwitcher items={stores}/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
        </div>

    </div>
  )
}
export default Navbar