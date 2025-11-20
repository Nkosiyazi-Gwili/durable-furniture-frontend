'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OrderConfirmation() {
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    // Generate a random order number
    setOrderNumber('ORD' + Date.now().toString().slice(-8))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 mb-6">Your order number is: <strong>{orderNumber}</strong></p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• You will receive an order confirmation email shortly</li>
                <li>• We'll notify you when your order ships</li>
                <li>• Delivery typically takes 3-5 business days</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}