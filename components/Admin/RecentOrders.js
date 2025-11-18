import Link from 'next/link'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function RecentOrders({ orders }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
        <Link href="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0">
            <div>
              <p className="font-medium text-neutral-900">
                #{order.orderNumber}
              </p>
              <p className="text-sm text-neutral-600">
                {order.user?.name || 'Customer'}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">
                ${order.total}
              </p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
        
        {orders.length === 0 && (
          <p className="text-center text-neutral-500 py-4">No recent orders</p>
        )}
      </div>
    </div>
  )
}