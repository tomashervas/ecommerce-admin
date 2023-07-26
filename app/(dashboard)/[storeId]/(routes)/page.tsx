import prismadb from "@/lib/prismadb"

const DashboardPage = async ({params}: {params: {storeId: string}}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })
  return (
    <div>
      <p>Dashboard</p>
      {store && <p>{store.name}</p>}
    </div>
  )
}
export default DashboardPage