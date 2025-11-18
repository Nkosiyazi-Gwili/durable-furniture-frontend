import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Comfort Haven - Premium Furniture & Bedding',
  description: 'Discover durable furniture and comfortable bedding for your home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Toaster position="bottom-right" />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}