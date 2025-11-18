'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CustomerStats from '@/components/Customer/CustomerStats'
import RecentOrders from '@/components/Customer/RecentOrders'
import Wishlist from '@/components/Customer/Wishlist'

export default function CustomerDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      // Use mock data since backend might not be running
      const mockStats = {
        totalOrders: 5,
        pendingOrders: 1,
        totalSpent: 2450.50,
        wishlistCount: 2,
        recentOrders: [
          {
            _id: '1',
            orderNumber: 'ORD-001',
            total: 299.99,
            status: 'delivered',
            items: [{}, {}],
            createdAt: new Date('2024-01-15')
          },
          {
            _id: '2',
            orderNumber: 'ORD-002', 
            total: 599.99,
            status: 'processing',
            items: [{}],
            createdAt: new Date('2024-01-10')
          },
          {
            _id: '3',
            orderNumber: 'ORD-003',
            total: 1550.52,
            status: 'shipped',
            items: [{}, {}, {}],
            createdAt: new Date('2024-01-05')
          }
        ]
      }
      setStats(mockStats)
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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Dashboard</h1>
          <p className="text-neutral-600 mt-2">Welcome back, {user.name}!</p>
          
          {/* Quick Action Links - Updated with better styling */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link 
              href="/customer/orders"
              className="inline-flex items-center px-5 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="mr-2">📦</span>
              My Orders
            </Link>
            <Link 
              href="/customer/wishlist"
              className="inline-flex items-center px-5 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="mr-2">❤️</span>
              My Wishlist
            </Link>
            <Link 
              href="/customer/profile"
              className="inline-flex items-center px-5 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="mr-2">👤</span>
              Update Profile
            </Link>
            <Link 
              href="/auth/reset-password"
              className="inline-flex items-center px-5 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="mr-2">🔒</span>
              Reset Password
            </Link>
          </div>
        </div>

        {stats && (
          <>
            <CustomerStats stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2">
                <RecentOrders orders={stats.recentOrders} />
              </div>
              <div>
                <Wishlist />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}