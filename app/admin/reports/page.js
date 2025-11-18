'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiBarChart2, FiArrowLeft, FiDollarSign, FiShoppingCart, FiUsers, FiTrendingUp } from 'react-icons/fi'

export default function ReportsAnalytics() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [reports, setReports] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      // Mock reports data
      const mockReports = {
        salesData: [
          { month: 'Jan', revenue: 45000, orders: 45 },
          { month: 'Feb', revenue: 52000, orders: 52 },
          { month: 'Mar', revenue: 48000, orders: 48 },
          { month: 'Apr', revenue: 61000, orders: 61 },
          { month: 'May', revenue: 58000, orders: 58 },
          { month: 'Jun', revenue: 72000, orders: 72 }
        ],
        topProducts: [
          { name: 'Premium Leather Sofa', sales: 45, revenue: 58495 },
          { name: 'King Size Bed Frame', sales: 38, revenue: 34199 },
          { name: 'Memory Foam Mattress', sales: 52, revenue: 36399 },
          { name: 'Dining Table Set', sales: 28, revenue: 33599 }
        ],
        customerStats: {
          total: 1247,
          newThisMonth: 45,
          returning: 234
        }
      }
      setReports(mockReports)
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
              <FiBarChart2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Reports & Analytics</h1>
              <p className="text-neutral-600">Business insights and performance metrics</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">$279,000</p>
                <p className="text-sm text-green-600 flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Orders</p>
                <p className="text-2xl font-bold text-neutral-900">336</p>
                <p className="text-sm text-green-600 flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  +8.2% from last month
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Customers</p>
                <p className="text-2xl font-bold text-neutral-900">1,247</p>
                <p className="text-sm text-green-600 flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  +5.7% from last month
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-neutral-900">$830</p>
                <p className="text-sm text-green-600 flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  +3.4% from last month
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Monthly Revenue</h3>
            <div className="space-y-4">
              {reports.salesData.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${(month.revenue / 80000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">
                      ${month.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {reports.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                      <p className="text-xs text-neutral-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-neutral-900">
                    ${product.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Customer Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUsers className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{reports.customerStats.total}</p>
              <p className="text-sm text-neutral-600">Total Customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{reports.customerStats.newThisMonth}</p>
              <p className="text-sm text-neutral-600">New This Month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUsers className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{reports.customerStats.returning}</p>
              <p className="text-sm text-neutral-600">Returning Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}