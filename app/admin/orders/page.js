'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiShoppingCart, FiEye, FiArrowLeft } from 'react-icons/fi'

export default function OrderManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      // Mock orders data
      const mockOrders = [
        {
          _id: '1',
          orderNumber: 'ORD-001',
          customer: { name: 'John Doe', email: 'john@example.com' },
          total: 299.99,
          status: 'delivered',
          items: 2,
          createdAt: '2024-01-15',
          paymentStatus: 'paid'
        },
        {
          _id: '2',
          orderNumber: 'ORD-002',
          customer: { name: 'Sarah Wilson', email: 'sarah@example.com' },
          total: 599.99,
          status: 'processing',
          items: 1,
          createdAt: '2024-01-14',
          paymentStatus: 'paid'
        },
        {
          _id: '3',
          orderNumber: 'ORD-003',
          customer: { name: 'Mike Johnson', email: 'mike@example.com' },
          total: 1550.52,
          status: 'shipped',
          items: 3,
          createdAt: '2024-01-13',
          paymentStatus: 'paid'
        },
        {
          _id: '4',
          orderNumber: 'ORD-004',
          customer: { name: 'Emily Davis', email: 'emily@example.com' },
          total: 899.99,
          status: 'pending',
          items: 1,
          createdAt: '2024-01-12',
          paymentStatus: 'pending'
        }
      ]
      setOrders(mockOrders)
      setIsLoading(false)
    }
  }, [user, loading, router])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentStatusColor = (status) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link
            href="/admin"
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <FiShoppingCart className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Order Management</h1>
              <p className="text-neutral-600">Process and track customer orders</p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">
                        {order.orderNumber}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {order.items} items
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {order.customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {order.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      ${order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 flex items-center space-x-1">
                        <FiEye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600">Total Orders</p>
              <p className="text-2xl font-bold text-neutral-900">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600">Pending</p>
              <p className="text-2xl font-bold text-neutral-900">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600">Processing</p>
              <p className="text-2xl font-bold text-neutral-900">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600">Shipped</p>
              <p className="text-2xl font-bold text-neutral-900">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600">Delivered</p>
              <p className="text-2xl font-bold text-neutral-900">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}