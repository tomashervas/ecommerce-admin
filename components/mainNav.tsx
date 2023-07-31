"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const MainNav = ({className, ...props}: React.HtmlHTMLAttributes<HTMLElement> ) => {

    const pathName = usePathname()
    const params = useParams()
    
    const routes = [
        {label: 'Resumen', href: `/${params.storeId}`, active: pathName === `/${params.storeId}`},
        {label: 'Carteles', href: `/${params.storeId}/billboards`, active: pathName === `/${params.storeId}/billboards`},
        {label: 'Ajustes', href: `/${params.storeId}/ajustes`, active: pathName === `/${params.storeId}/ajustes`},
    ]

  return (
    <nav className={cn("flex items-center space-x-4",className)}>
        {routes.map(route => (
            <Link key={route.label} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white"  : "text-gray-500")}>
                {route.label}
            </Link>
        ))}
    </nav>
  )
}
export default MainNav