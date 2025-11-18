'use client'
import Link from 'next/link'

export default function CustomerStats({ stats }) {
  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '📦',
      link: '/customer/orders',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      link: '/customer/orders?filter=pending',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent.toLocaleString()}`,
      icon: '💰',
      link: '/customer/orders',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Wishlist Items',
      value: stats.wishlistCount,
      icon: '❤️',
      link: '/customer/wishlist',
      color: 'bg-red-50 border-red-200'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Link 
          key={index} 
          href={stat.link}
          className="block transition-transform hover:scale-105"
        >
          <div className={`border-2 rounded-xl p-6 ${stat.color} shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              </div>
              <div className="text-3xl">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm text-neutral-500">
              <span>View details</span>
              <span className="ml-1">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}