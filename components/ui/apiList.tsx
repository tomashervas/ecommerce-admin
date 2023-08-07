"use client"

import { useParams } from "next/navigation"
import { ApiAlert } from "./apiAlert"
import { useOrigin } from "@/hooks/useOrigin"

interface ApiListProps {
    entityName: string
    entityIdName: string
}
const ApiList: React.FC<ApiListProps> = ({entityName, entityIdName}) => {

    const params = useParams()
    const ori = useOrigin()

  return (
    <div>
        <ApiAlert title="GET" variant="public" description={`${ori}/api/${params.storeId}/${entityName}`}/>
        <ApiAlert title="GET" variant="public" description={`${ori}/api/${params.storeId}/${entityName}/{${entityIdName}}`}/>
        <ApiAlert title="POST" variant="admin" description={`${ori}/api/${params.storeId}/${entityName}`}/>
        <ApiAlert title="PATCH" variant="admin" description={`${ori}/api/${params.storeId}/${entityName}/{${entityIdName}}`}/>
        <ApiAlert title="DELETE" variant="admin" description={`${ori}/api/${params.storeId}/${entityName}/{${entityIdName}}`}/>

    </div>
  )
}
export default ApiList