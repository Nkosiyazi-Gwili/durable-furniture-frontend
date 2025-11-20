'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function WishlistPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      // Mock wishlist data
      const mockWishlist = [
        {
          _id: '1',
          productId: 'prod1',
          name: 'Modern Leather Sofa',
          price: 1299.99,
          image: '/images/sofa.jpg',
          inStock: true,
          description: 'Luxurious leather sofa with modern design'
        },
        {
          _id: '2',
          productId: 'prod2',
          name: 'Wooden Dining Table',
          price: 899.99,
          image: '/images/table.jpg',
          inStock: false,
          description: 'Solid wood dining table for 6 people'
        },
        {
          _id: '3',
          productId: 'prod3',
          name: 'Ergonomic Office Chair',
          price: 399.99,
          image: '/images/chair.jpg',
          inStock: true,
          description: 'Comfortable office chair with lumbar support'
        }
      ]
      setWishlist(mockWishlist)
      setIsLoading(false)
    }
  }, [user, loading, router])

  const removeFromWishlist = (itemId) => {
    setWishlist(prev => prev.filter(item => item._id !== itemId))
  }

  const moveToCart = (item) => {
    // Implement move to cart logic
    console.log('Moving to cart:', item)
    // For now, just remove from wishlist
    removeFromWishlist(item._id)
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900">My Wishlist</h1>
          <p className="text-neutral-600 mt-2">Your saved favorite items</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Your wishlist is empty</h3>
            <p className="text-neutral-600 mb-6">Save items you love to your wishlist for later!</p>
            <Link 
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="bg-neutral-100 rounded-lg h-48 flex items-center justify-center mb-4">
                    <span className="text-4xl">🛋️</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{item.name}</h3>
                  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveToCart(item)}
                      disabled={!item.inStock}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm ${
                        item.inStock
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      }`}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}