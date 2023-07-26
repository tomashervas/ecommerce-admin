import SettingsForm from "@/components/forms/settingsForm"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


const AjustesPage = async ({params}: {params: {storeId: string}}) => {
  const {userId} = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if(!store) redirect('/')

  return (
    // <div>
    //   <p>Ajustes</p>
    //   <p>{params.storeId}</p>
    //   <p>{store.name}</p>

    // </div>
    <SettingsForm initialData={store} />
  )
}
export default AjustesPage