'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      // Mock orders data
      const mockOrders = [
        {
          _id: '1',
          orderNumber: 'ORD-001',
          total: 299.99,
          status: 'delivered',
          items: [{ name: 'Modern Chair', quantity: 2 }, { name: 'Side Table', quantity: 1 }],
          createdAt: new Date('2024-01-15'),
          shippingAddress: '123 Main St, City, State 12345'
        },
        {
          _id: '2',
          orderNumber: 'ORD-002', 
          total: 599.99,
          status: 'processing',
          items: [{ name: 'Dining Table', quantity: 1 }],
          createdAt: new Date('2024-01-10'),
          shippingAddress: '123 Main St, City, State 12345'
        }
      ]
      setOrders(mockOrders)
      setIsLoading(false)
    }
  }, [user, loading, router])

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
          <h1 className="text-3xl font-bold text-neutral-900">My Orders</h1>
          <p className="text-neutral-600 mt-2">View and manage your orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg mb-4">No orders found</p>
              <Link 
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="p-6">
              {orders.map((order) => (
                <div key={order._id} className="border-b border-neutral-200 last:border-b-0 py-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary-50 rounded-lg p-3">
                          <span className="text-primary-600 font-semibold">📦</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-neutral-900">
                            {order.orderNumber}
                          </h3>
                          <p className="text-neutral-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-neutral-100 text-neutral-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <Link 
                        href={`/customer/orders/${order._id}`}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}