'use client'
import { useRouteConfig } from '@/hooks/useRouteConfig'
import Header from '@/components/Layout/Header'

export default function RootLayout({ children }) {
  const { shouldHideHeader } = useRouteConfig()
  
  return (
    <html lang="en">
      <body>
        {!shouldHideHeader && <Header />}
        {children}
      </body>
    </html>
  )
}