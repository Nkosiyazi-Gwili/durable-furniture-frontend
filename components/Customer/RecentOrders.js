'use client'
import Link from 'next/link'

export default function RecentOrders({ orders }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Orders</h2>
          <Link 
            href="/customer/orders"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All Orders
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500">No orders found</p>
            <Link 
              href="/products"
              className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <span className="text-primary-600 font-semibold">📦</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">
                      {order.orderNumber}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  
                  <Link 
                    href={`/customer/orders/${order._id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}