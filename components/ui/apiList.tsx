
"use client"

import { useParams } from "next/navigation"
import { ApiAlert } from "./apiAlert"

interface ApiListProps {
    entityName: string
    entityIdName: string
}
const ApiList: React.FC<ApiListProps> = ({entityName, entityIdName}) => {

    const params = useParams()

  return (
    <div>
        <ApiAlert title="GET" variant="public" description={`${window.origin}/api/${params.storeId}/${entityName}`}/>
        <ApiAlert title="GET" variant="public" description={`${window.origin}/api/${params.storeId}/${entityName}/{${entityIdName}}`}/>
        <ApiAlert title="POST" variant="admin" description={`${window.origin}/api/${params.storeId}/${entityName}`}/>
        <ApiAlert title="PATCH" variant="admin" description={`${window.origin}/api/${params.storeId}/${entityName}/{${entityIdName}}`}/>
        <ApiAlert title="DELETE" variant="admin" description={`${window.origin}/api/${params.storeId}/${entityName}/{${entityIdName}}`}/>

    </div>
  )
}
export default ApiList