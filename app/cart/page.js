'use client'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Add this import

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, clearCart } = useCart()
  const router = useRouter() // Initialize router

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    // Navigate to checkout page instead of processing here
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
            <Link
              href="/products"
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 500 ? 0 : 49.99
  const tax = subtotal * 0.15
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({getCartItemsCount()} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {items.map((item) => (
                <div key={item._id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex-shrink-0 w-24 h-24 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">{item.category?.name || item.category}</p>
                    <p className="text-lg font-bold text-primary-600 mt-1">R{item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-l border-r border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">R{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">
                      R{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center">
                <Link href="/products" className="text-primary-500 hover:text-primary-600 font-semibold">
                  Continue Shopping
                </Link>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 500 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 text-center">
                    Add R{(500 - subtotal).toFixed(2)} more for <strong>FREE shipping</strong>!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}