import Header from '@/components/Layout/Header'

export default function RootLayout({ children }) {
  // Check if the current route is a dashboard route
  const isDashboardRoute = children.props.childProp.segment === 'customer'
  
  return (
    <html lang="en">
      <body>
        {!isDashboardRoute && <Header />}
        {children}
      </body>
    </html>
  )
}