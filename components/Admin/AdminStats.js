import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign } from 'react-icons/fi'

export default function AdminStats({ stats }) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FiPackage,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FiShoppingCart,
      color: 'purple',
      change: '+8%'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'orange',
      change: '+15%'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    }
    return colors[color] || 'bg-gray-500'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
            </div>
            <div className={`${getColorClasses(stat.color)} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}