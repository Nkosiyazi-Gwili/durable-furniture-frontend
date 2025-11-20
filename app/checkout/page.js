// app/checkout/page.js
'use client'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart, addresses, addAddress, setDefaultAddress, deleteAddress, getDefaultAddress } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [useSavedAddress, setUseSavedAddress] = useState(!!getDefaultAddress())
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'South Africa',
    province: '',
    saveAddress: false
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePaymentDataChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Save address if requested
    if (formData.saveAddress && !useSavedAddress) {
      addAddress(formData)
    }

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      alert('Order placed successfully! Thank you for your purchase.')
      router.push('/order-confirmation')
    }, 3000)
  }

  const handleUseNewAddress = () => {
    setUseSavedAddress(false)
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'South Africa',
      province: '',
      saveAddress: false
    })
  }

  const handleUseSavedAddress = (address) => {
    setUseSavedAddress(true)
    setFormData({ ...address, saveAddress: false })
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 500 ? 0 : 49.99
  const tax = subtotal * 0.15
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Items in Cart</h1>
          <p className="text-gray-600 mb-8">Please add items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                {addresses.length > 0 && (
                  <div className="flex space-x-2">
                    {!useSavedAddress && (
                      <button
                        type="button"
                        onClick={() => setUseSavedAddress(true)}
                        className="text-primary-500 hover:text-primary-600 font-semibold"
                      >
                        Use Saved Address
                      </button>
                    )}
                    {useSavedAddress && (
                      <button
                        type="button"
                        onClick={handleUseNewAddress}
                        className="text-primary-500 hover:text-primary-600 font-semibold"
                      >
                        Use New Address
                      </button>
                    )}
                  </div>
                )}
              </div>

              {useSavedAddress && addresses.length > 0 ? (
                <div className="space-y-4">
                  <select
                    onChange={(e) => {
                      const address = addresses.find(addr => addr.id === e.target.value)
                      if (address) handleUseSavedAddress(address)
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {addresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.firstName} {address.lastName} - {address.address}, {address.city}
                        {address.isDefault && ' (Default)'}
                      </option>
                    ))}
                  </select>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(getDefaultAddress()?.id)}
                      className="text-sm text-primary-500 hover:text-primary-600"
                    >
                      Set as Default
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteAddress(getDefaultAddress()?.id)}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Province</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="North West">North West</option>
                    <option value="Northern Cape">Northern Cape</option>
                  </select>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  {!useSavedAddress && (
                    <div className="md:col-span-2 flex items-center">
                      <input
                        type="checkbox"
                        name="saveAddress"
                        checked={formData.saveAddress}
                        onChange={(e) => setFormData({...formData, saveAddress: e.target.checked})}
                        className="mr-2"
                      />
                      <label className="text-gray-700">Save this address for future orders</label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                {/* Credit/Debit Card */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={() => setSelectedPayment('card')}
                    className="mr-3"
                  />
                  <label className="flex items-center">
                    <span className="mr-2">💳</span>
                    Credit/Debit Card
                  </label>
                </div>

                {selectedPayment === 'card' && (
                  <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      name="nameOnCard"
                      placeholder="Name on Card"
                      value={paymentData.nameOnCard}
                      onChange={handlePaymentDataChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentDataChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentDataChange}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={paymentData.cvv}
                        onChange={handlePaymentDataChange}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}

                {/* Payfast */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payfast"
                    checked={selectedPayment === 'payfast'}
                    onChange={() => setSelectedPayment('payfast')}
                    className="mr-3"
                  />
                  <label className="flex items-center">
                    <span className="mr-2">🔒</span>
                    Payfast
                  </label>
                </div>

                {/* Ozow */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ozow"
                    checked={selectedPayment === 'ozow'}
                    onChange={() => setSelectedPayment('ozow')}
                    className="mr-3"
                  />
                  <label className="flex items-center">
                    <span className="mr-2">⚡</span>
                    Ozow
                  </label>
                </div>

                {selectedPayment !== 'card' && (
                  <div className="ml-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      You will be redirected to {selectedPayment === 'payfast' ? 'Payfast' : 'Ozow'} to complete your payment securely.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>R{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span className="text-primary-600">R{total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
              >
                {isProcessing ? 'Processing Payment...' : 
                 selectedPayment === 'card' ? `Pay R${total.toFixed(2)}` :
                 `Pay with ${selectedPayment === 'payfast' ? 'Payfast' : 'Ozow'}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing your purchase you agree to our Terms of Service
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}