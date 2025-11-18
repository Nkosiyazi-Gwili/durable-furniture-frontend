'use client'
import { usePathname } from 'next/navigation'

export function useRouteConfig() {
  const pathname = usePathname()
  
  const hideHeaderRoutes = [
    '/customer',
    '/admin',
    '/dashboard'
  ]
  
  const shouldHideHeader = hideHeaderRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  return { shouldHideHeader }
}