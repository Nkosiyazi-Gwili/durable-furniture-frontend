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
  FiPlus,
  FiX,
  FiSave
} from 'react-icons/fi'

export default function UserManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'customer',
    status: 'active'
  })

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
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, users, roleFilter, statusFilter])

  // Email notification function
  const sendEmailNotification = async (userEmail, action, details = {}) => {
    try {
      // In a real application, you would call your email API here
      console.log(`Sending email to ${userEmail} for action: ${action}`, details)
      
      // Simulate API call
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: getEmailSubject(action),
          template: action,
          data: details
        })
      })

      console.log(`Email sent successfully to ${userEmail}`)
    } catch (error) {
      console.error('Failed to send email:', error)
    }
  }

  const getEmailSubject = (action) => {
    const subjects = {
      create: 'Welcome to Durable Furniture! Your Account Has Been Created',
      update: 'Your Account Has Been Updated',
      status_change: 'Account Status Update',
      delete: 'Account Deletion Confirmation'
    }
    return subjects[action] || 'Notification from Durable Furniture'
  }

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault()
    
    const newUser = {
      _id: Date.now().toString(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      orders: 0
    }

    setUsers([...users, newUser])
    
    // Send account creation email
    await sendEmailNotification(formData.email, 'create', {
      name: formData.name,
      role: formData.role,
      loginUrl: 'https://durablefurniture.com/auth/login'
    })

    setShowAddModal(false)
    resetForm()
  }

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      status: user.status
    })
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    
    const updatedUsers = users.map(user => 
      user._id === editingUser._id 
        ? { ...user, ...formData }
        : user
    )

    setUsers(updatedUsers)
    
    // Send update notification email
    await sendEmailNotification(editingUser.email, 'update', {
      name: formData.name,
      changes: Object.keys(formData).filter(key => formData[key] !== editingUser[key])
    })

    setEditingUser(null)
    resetForm()
  }

  // Delete user with confirmation
  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find(u => u._id === userId)
    
    // Send account deletion email
    await sendEmailNotification(userToDelete.email, 'delete', {
      name: userToDelete.name,
      deletionDate: new Date().toLocaleDateString()
    })

    setUsers(users.filter(user => user._id !== userId))
    setShowDeleteModal(null)
  }

  // Status change with email notification
  const handleStatusChange = async (userId, newStatus) => {
    const userToUpdate = users.find(u => u._id === userId)
    const updatedUsers = users.map(user => 
      user._id === userId ? { ...user, status: newStatus } : user
    )

    setUsers(updatedUsers)
    
    // Send status change email
    await sendEmailNotification(userToUpdate.email, 'status_change', {
      name: userToUpdate.name,
      newStatus: newStatus,
      statusMessage: newStatus === 'active' 
        ? 'Your account has been activated. You can now access all features.'
        : 'Your account has been deactivated. Please contact support for more information.'
    })
  }

  // Role change
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, role: newRole } : user
    ))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'customer',
      status: 'active'
    })
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
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
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
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
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
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-primary-600 hover:text-primary-900 p-1"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteModal(user._id)}
                          className="text-red-600 hover:text-red-900 p-1"
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
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg"
              >
                Add New User
              </button>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New User</h3>
                <button 
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      resetForm()
                    }}
                    className="px-4 py-2 text-neutral-600 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit User</h3>
                <button 
                  onClick={() => {
                    setEditingUser(null)
                    resetForm()
                  }}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingUser(null)
                      resetForm()
                    }}
                    className="px-4 py-2 text-neutral-600 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>Update User</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FiTrash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Delete User</h3>
                  <p className="text-neutral-600">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-neutral-700 mb-6">
                Are you sure you want to delete this user? All their data will be permanently removed.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(showDeleteModal)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}