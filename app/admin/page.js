'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiShoppingCart, 
  FiBarChart2, 
  FiSettings,
  FiMenu,
  FiX
} from 'react-icons/fi'
import AdminStats from '@/components/Admin/AdminStats'
import RecentOrders from '@/components/Admin/RecentOrders'
import LowStockAlert from '@/components/Admin/LowStockAlert'
import SalesChart from '@/components/Admin/SalesChart'

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      // Use mock data since backend might not be running
      const mockStats = {
        totalUsers: 1247,
        totalProducts: 89,
        totalOrders: 543,
        totalRevenue: 125430,
        recentOrders: [
          {
            _id: '1',
            orderNumber: 'ORD-001',
            user: { name: 'John Doe', email: 'john@example.com' },
            total: 299.99,
            status: 'delivered'
          },
          {
            _id: '2', 
            orderNumber: 'ORD-002',
            user: { name: 'Sarah Wilson', email: 'sarah@example.com' },
            total: 599.99,
            status: 'processing'
          }
        ],
        lowStockProducts: [
          {
            _id: '1',
            name: 'Premium Leather Sofa',
            sku: 'SOFA-001',
            stockQuantity: 3
          },
          {
            _id: '2',
            name: 'King Size Bed Frame', 
            sku: 'BED-001',
            stockQuantity: 0
          }
        ],
        monthlyRevenue: [
          { _id: 1, revenue: 45000 },
          { _id: 2, revenue: 52000 },
          { _id: 3, revenue: 48000 },
          { _id: 4, revenue: 61000 },
          { _id: 5, revenue: 58000 },
          { _id: 6, revenue: 72000 }
        ]
      }
      setStats(mockStats)
      setIsLoading(false)
    }
  }, [user, loading, router])

  const adminMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiHome,
      href: '/admin'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: FiUsers,
      href: '/admin/users'
    },
    {
      id: 'products',
      label: 'Product Management',
      icon: FiPackage,
      href: '/admin/products'
    },
    {
      id: 'orders',
      label: 'Order Management',
      icon: FiShoppingCart,
      href: '/admin/orders'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: FiBarChart2,
      href: '/admin/reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FiSettings,
      href: '/admin/settings'
    }
  ]

  // Helper function to render dynamic icons
  const renderDynamicIcon = (sectionId) => {
    const menuItem = adminMenuItems.find(item => item.id === sectionId)
    if (!menuItem?.icon) return null
    
    const IconComponent = menuItem.icon
    return <IconComponent className="w-8 h-8 text-primary-600" />
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
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
              DF
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Admin Panel</h2>
              <p className="text-xs text-neutral-500">Durable Furniture</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {adminMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveSection(item.id)
                setSidebarOpen(false)
              }}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${activeSection === item.id
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-neutral-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-neutral-200 lg:border-l">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
                <p className="text-neutral-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-right">
                <p className="text-neutral-600">Total Revenue</p>
                <p className="font-semibold text-neutral-900">
                  ${stats?.totalRevenue?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-neutral-600">Total Orders</p>
                <p className="font-semibold text-neutral-900">
                  {stats?.totalOrders || '0'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeSection === 'dashboard' && stats && (
            <>
              <AdminStats stats={stats} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                  <SalesChart data={stats.monthlyRevenue} />
                </div>
                <div className="space-y-8">
                  <RecentOrders orders={stats.recentOrders} />
                  <LowStockAlert products={stats.lowStockProducts} />
                </div>
              </div>
            </>
          )}

          {/* Placeholder for other sections */}
          {activeSection !== 'dashboard' && (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {renderDynamicIcon(activeSection)}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {adminMenuItems.find(item => item.id === activeSection)?.label}
                </h3>
                <p className="text-neutral-600 mb-6">
                  This section is under development. You'll be able to manage {activeSection} here.
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <p className="text-sm text-primary-700">
                    <strong>Coming Soon:</strong> Full {activeSection} management functionality
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}