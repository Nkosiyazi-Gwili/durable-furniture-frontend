'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FiUsers, 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiSearch,
  FiPlus
} from 'react-icons/fi'

export default function UserManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Dummy users data
  const dummyUsers = [
    {
      _id: '1',
      name: 'Admin User',
      email: 'admin@durablefurniture.com',
      role: 'admin',
      phone: '+27 68 561 3608',
      address: 'Pretoria, South Africa',
      joinDate: '2023-01-15',
      status: 'active',
      orders: 0
    },
    {
      _id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      phone: '+27 83 123 4567',
      address: 'Johannesburg, South Africa',
      joinDate: '2024-01-10',
      status: 'active',
      orders: 5
    },
    {
      _id: '3',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'customer',
      phone: '+27 82 987 6543',
      address: 'Cape Town, South Africa',
      joinDate: '2024-01-08',
      status: 'active',
      orders: 12
    },
    {
      _id: '4',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'customer',
      phone: '+27 81 555 7890',
      address: 'Durban, South Africa',
      joinDate: '2024-01-05',
      status: 'active',
      orders: 3
    },
    {
      _id: '5',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'customer',
      phone: '+27 84 222 3333',
      address: 'Pretoria, South Africa',
      joinDate: '2024-01-02',
      status: 'inactive',
      orders: 8
    },
    {
      _id: '6',
      name: 'David Brown',
      email: 'david@example.com',
      role: 'customer',
      phone: '+27 79 444 5555',
      address: 'Port Elizabeth, South Africa',
      joinDate: '2023-12-28',
      status: 'active',
      orders: 15
    },
    {
      _id: '7',
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      role: 'customer',
      phone: '+27 76 666 7777',
      address: 'Bloemfontein, South Africa',
      joinDate: '2023-12-20',
      status: 'active',
      orders: 7
    },
    {
      _id: '8',
      name: 'Robert Wilson',
      email: 'robert@example.com',
      role: 'customer',
      phone: '+27 83 888 9999',
      address: 'East London, South Africa',
      joinDate: '2023-12-15',
      status: 'inactive',
      orders: 2
    }
  ]

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      setUsers(dummyUsers)
      setFilteredUsers(dummyUsers)
      setIsLoading(false)
    }
  }, [user, loading, router])

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, role: newRole } : user
    ))
  }

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, status: newStatus } : user
    ))
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user._id !== userId))
    }
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const getRoleColor = (role) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800'
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">User Management</h1>
                <p className="text-neutral-600">Manage system users and permissions</p>
              </div>
            </div>
          </div>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Users</p>
                <p className="text-2xl font-bold text-neutral-900">{users.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Customers</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {users.filter(u => u.role === 'customer').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Active Users</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Orders</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {users.reduce((total, user) => total + user.orders, 0)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiUsers className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">
                        <div className="flex items-center space-x-1 mb-1">
                          <FiPhone className="w-4 h-4 text-neutral-400" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiMapPin className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs">{user.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 focus:ring-2 focus:ring-primary-500 ${getRoleColor(user.role)}`}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 focus:ring-2 focus:ring-primary-500 ${getStatusColor(user.status)}`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {user.orders} orders
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No users found
              </h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search criteria or add new users.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}