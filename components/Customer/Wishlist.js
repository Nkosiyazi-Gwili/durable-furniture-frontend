'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for wishlist
    const mockWishlist = [
      {
        _id: '1',
        productId: 'prod1',
        name: 'Modern Leather Sofa',
        price: 1299.99,
        image: '/images/sofa.jpg',
        inStock: true
      },
      {
        _id: '2',
        productId: 'prod2',
        name: 'Wooden Dining Table',
        price: 899.99,
        image: '/images/table.jpg',
        inStock: false
      }
    ]
    
    setWishlistItems(mockWishlist)
    setIsLoading(false)
  }, [])

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item._id !== itemId))
  }

  const moveToCart = (item) => {
    // Implement move to cart logic
    console.log('Moving to cart:', item)
    removeFromWishlist(item._id)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-neutral-200 rounded"></div>
            <div className="h-20 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">My Wishlist</h2>
          <Link 
            href="/customer/wishlist"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">❤️</div>
            <p className="text-neutral-500 mb-2">Your wishlist is empty</p>
            <Link 
              href="/products"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.slice(0, 3).map((item) => (
              <div 
                key={item._id} 
                className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-neutral-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛋️</span>
                </div>
                
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-neutral-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-lg font-semibold text-primary-600">
                    ${item.price.toFixed(2)}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    item.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => moveToCart(item)}
                    disabled={!item.inStock}
                    className={`px-3 py-1 text-sm rounded-lg font-medium ${
                      item.inStock
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="px-3 py-1 text-sm text-neutral-600 hover:text-red-600 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            {wishlistItems.length > 3 && (
              <div className="text-center pt-4">
                <Link 
                  href="/customer/wishlist"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View all {wishlistItems.length} items
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}