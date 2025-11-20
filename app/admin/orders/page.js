'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FiShoppingCart, 
  FiEye, 
  FiArrowLeft, 
  FiEdit, 
  FiPlus,
  FiMail,
  FiFileText,
  FiDollarSign,
  FiX
} from 'react-icons/fi'

export default function OrderManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddOrder, setShowAddOrder] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showRefundModal, setShowRefundModal] = useState(false)

  // New order form state
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerEmail: '',
    items: [{ product: '', quantity: 1, price: 0 }],
    total: 0,
    status: 'pending',
    paymentStatus: 'pending'
  })

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      loadOrders()
    }
  }, [user, loading, router])

  const loadOrders = () => {
    // Mock orders data - in real app, this would be an API call
    const mockOrders = [
      {
        _id: '1',
        orderNumber: 'ORD-001',
        customer: { name: 'John Doe', email: 'john@example.com' },
        total: 299.99,
        status: 'delivered',
        items: [
          { product: 'Product A', quantity: 2, price: 149.99 },
          { product: 'Product B', quantity: 1, price: 0 }
        ],
        createdAt: '2024-01-15',
        paymentStatus: 'paid',
        shippingAddress: '123 Main St, City, State 12345'
      },
      {
        _id: '2',
        orderNumber: 'ORD-002',
        customer: { name: 'Sarah Wilson', email: 'sarah@example.com' },
        total: 599.99,
        status: 'processing',
        items: [{ product: 'Product C', quantity: 1, price: 599.99 }],
        createdAt: '2024-01-14',
        paymentStatus: 'paid',
        shippingAddress: '456 Oak Ave, City, State 12345'
      }
    ]
    setOrders(mockOrders)
    setIsLoading(false)
  }

  const sendEmailNotification = async (order, type, additionalData = {}) => {
    try {
      const emailData = {
        to: order.customer.email,
        template: type,
        data: {
          customerName: order.customer.name,
          orderNumber: order.orderNumber,
          ...additionalData
        }
      }

      // Add specific data for different email types
      switch (type) {
        case 'order_created':
          emailData.data = {
            ...emailData.data,
            orderDate: order.createdAt,
            status: order.status,
            items: order.items,
            total: order.total
          }
          break
        
        case 'status_updated':
          emailData.data = {
            ...emailData.data,
            oldStatus: additionalData.oldStatus,
            newStatus: additionalData.newStatus
          }
          break
        
        case 'payment_received':
          emailData.data = {
            ...emailData.data,
            amount: additionalData.amount || order.total
          }
          break
        
        case 'refund_approved':
          emailData.data = {
            ...emailData.data,
            refundAmount: additionalData.refundAmount || order.total,
            reason: additionalData.reason || ''
          }
          break
        
        case 'refund_denied':
          emailData.data = {
            ...emailData.data,
            reason: additionalData.reason || 'Please contact customer support for more information.'
          }
          break
        
        case 'invoice':
          emailData.data = {
            ...emailData.data,
            invoiceNumber: additionalData.invoiceNumber,
            items: order.items,
            total: order.total
          }
          break
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      const result = await response.json()
      console.log('Email sent successfully:', result)
      
      return result
    } catch (error) {
      console.error('Failed to send email:', error)
      // Don't throw error to avoid breaking user experience
    }
  }

  const handleAddOrder = async (e) => {
    e.preventDefault()
    const orderNumber = `ORD-${String(orders.length + 1).padStart(3, '0')}`
    
    const order = {
      _id: String(orders.length + 1),
      orderNumber,
      customer: {
        name: newOrder.customerName,
        email: newOrder.customerEmail
      },
      total: newOrder.total,
      status: newOrder.status,
      items: newOrder.items,
      createdAt: new Date().toISOString().split('T')[0],
      paymentStatus: newOrder.paymentStatus,
      shippingAddress: 'To be added'
    }

    setOrders(prev => [order, ...prev])
    setShowAddOrder(false)
    resetNewOrder()

    // Send order creation email
    await sendEmailNotification(order, 'order_created')
  }

  const handleStatusChange = async (orderId, newStatus) => {
    const order = orders.find(o => o._id === orderId)
    const oldStatus = order.status
    
    setOrders(prev => prev.map(order => 
      order._id === orderId 
        ? { ...order, status: newStatus }
        : order
    ))

    const updatedOrder = { ...order, status: newStatus }
    
    // Send status update email
    await sendEmailNotification(updatedOrder, 'status_updated', {
      oldStatus,
      newStatus
    })
  }

  const handlePaymentUpdate = async (orderId, paymentStatus, amount = null) => {
    const order = orders.find(o => o._id === orderId)
    
    const updatedOrders = orders.map(order => 
      order._id === orderId 
        ? { 
            ...order, 
            paymentStatus,
            ...(amount && { total: amount })
          }
        : order
    )
    
    setOrders(updatedOrders)
    setShowPaymentModal(false)
    setSelectedOrder(null)

    const updatedOrder = updatedOrders.find(o => o._id === orderId)
    
    if (paymentStatus === 'paid') {
      await sendEmailNotification(updatedOrder, 'payment_received', {
        amount: updatedOrder.total
      })
    }
  }

  const handleRefund = async (orderId, action, reason = '') => {
    const order = orders.find(o => o._id === orderId)
    
    if (action === 'approve') {
      setOrders(prev => prev.map(order => 
        order._id === orderId 
          ? { ...order, paymentStatus: 'refunded' }
          : order
      ))

      await sendEmailNotification(order, 'refund_approved', {
        refundAmount: order.total,
        reason
      })
    } else if (action === 'deny') {
      await sendEmailNotification(order, 'refund_denied', { reason })
    }

    setShowRefundModal(false)
    setSelectedOrder(null)
  }

  const generateInvoice = async (order) => {
    const invoiceNumber = `INV-${order.orderNumber}`
    
    // Send invoice email
    await sendEmailNotification(order, 'invoice', {
      invoiceNumber,
      items: order.items,
      total: order.total
    })

    alert(`Invoice generated and sent to ${order.customer.email}`)
  }

  const resetNewOrder = () => {
    setNewOrder({
      customerName: '',
      customerEmail: '',
      items: [{ product: '', quantity: 1, price: 0 }],
      total: 0,
      status: 'pending',
      paymentStatus: 'pending'
    })
  }

  const addItem = () => {
    setNewOrder(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, price: 0 }]
    }))
  }

  const updateItem = (index, field, value) => {
    const updatedItems = newOrder.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
    
    const total = updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    
    setNewOrder(prev => ({
      ...prev,
      items: updatedItems,
      total
    }))
  }

  const removeItem = (index) => {
    if (newOrder.items.length > 1) {
      const updatedItems = newOrder.items.filter((_, i) => i !== index)
      const total = updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      
      setNewOrder(prev => ({
        ...prev,
        items: updatedItems,
        total
      }))
    }
  }

  // Close all modals
  const closeAllModals = () => {
    setSelectedOrder(null)
    setShowEditModal(false)
    setShowPaymentModal(false)
    setShowRefundModal(false)
    setShowAddOrder(false)
  }

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
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      refunded: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
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
                <FiShoppingCart className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Order Management</h1>
                <p className="text-neutral-600">Process and track customer orders</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddOrder(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Order</span>
          </button>
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
                        {order.items.length} items
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
                      R{order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} border-none focus:ring-2 focus:ring-primary-500`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowEditModal(false)
                          }}
                          className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                        >
                          <FiEye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => generateInvoice(order)}
                          className="text-purple-600 hover:text-purple-900 flex items-center space-x-1"
                        >
                          <FiFileText className="w-4 h-4" />
                          <span>Invoice</span>
                        </button>
                      </div>
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

        {/* Add Order Modal */}
        {showAddOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Add New Order</h2>
                  <button
                    onClick={() => setShowAddOrder(false)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleAddOrder} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Customer Name</label>
                      <input
                        type="text"
                        required
                        value={newOrder.customerName}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, customerName: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Customer Email</label>
                      <input
                        type="email"
                        required
                        value={newOrder.customerEmail}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, customerEmail: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Order Items</label>
                    {newOrder.items.map((item, index) => (
                      <div key={index} className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          placeholder="Product name"
                          value={item.product}
                          onChange={(e) => updateItem(index, 'product', e.target.value)}
                          className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                        <input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                          className="w-20 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                          className="w-24 rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                        {newOrder.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-600 hover:text-red-700 px-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addItem}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      + Add another item
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Status</label>
                      <select
                        value={newOrder.status}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, status: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Payment Status</label>
                      <select
                        value={newOrder.paymentStatus}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, paymentStatus: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total:</span>
                      <span className="text-xl font-bold">${newOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddOrder(false)}
                      className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                    >
                      Create Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Order Modal */}
        {selectedOrder && !showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Order {selectedOrder.orderNumber}</h2>
                  <button
                    onClick={closeAllModals}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-neutral-700">Customer Information</h3>
                      <p className="mt-1">{selectedOrder.customer.name}</p>
                      <p className="text-neutral-600">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-700">Order Details</h3>
                      <p className="mt-1">Date: {selectedOrder.createdAt}</p>
                      <p>Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
                      <p>Payment: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>{selectedOrder.paymentStatus}</span></p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-neutral-700 mb-2">Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">{item.product}</p>
                            <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">R{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-xl font-bold">R{selectedOrder.total}</span>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => {
                        setShowPaymentModal(true)
                      }}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <FiDollarSign className="w-4 h-4" />
                      <span>Update Payment</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowRefundModal(true)
                      }}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      <FiDollarSign className="w-4 h-4" />
                      <span>Process Refund</span>
                    </button>
                    <button
                      onClick={() => generateInvoice(selectedOrder)}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      <FiFileText className="w-4 h-4" />
                      <span>Send Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Update Payment Status</h2>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <select
                    onChange={(e) => handlePaymentUpdate(selectedOrder._id, e.target.value)}
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refund Modal */}
        {showRefundModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Process Refund</h2>
                  <button
                    onClick={() => setShowRefundModal(false)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Refund reason (optional)"
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    id="refundReason"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowRefundModal(false)}
                      className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRefund(selectedOrder._id, 'deny', document.getElementById('refundReason')?.value || '')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                      Deny Refund
                    </button>
                    <button
                      onClick={() => handleRefund(selectedOrder._id, 'approve', document.getElementById('refundReason')?.value || '')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}