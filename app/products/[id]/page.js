'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Toast from '@/components/Toast'
import Link from 'next/link'

// Product data - in real app, this would come from an API
const products = [
  {
    id: 1,
    _id: 1,
    name: "Modern Leather Sofa",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sofas",
    rating: 4.8,
    reviews: 124,
    description: "Experience ultimate comfort with our Modern Leather Sofa. Crafted from genuine leather and featuring a solid wood frame, this sofa combines luxury with durability. The memory foam cushions provide exceptional support for relaxing evenings with family and friends.",
    features: ["Genuine leather upholstery", "Solid wood frame", "Memory foam cushions", "Stain-resistant", "Easy to clean", "5-year warranty"],
    dimensions: "84″W x 36″D x 32″H",
    colors: ["Black", "Brown", "Cognac"],
    additionalImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 2,
    _id: 2,
    name: "Queen Size Bed Frame",
    price: 899.99,
    originalPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Beds",
    rating: 4.6,
    reviews: 89,
    description: "Transform your bedroom with our elegant Queen Size Bed Frame. Built from solid wood with a beautiful finish, this bed frame offers both style and functionality with convenient under-bed storage.",
    features: ["Solid wood construction", "Easy assembly", "Under-bed storage", "Headboard included", "Durable finish", "10-year warranty"],
    dimensions: "64″W x 86″D x 42″H",
    colors: ["Espresso", "White", "Natural Wood"],
    additionalImages: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  // Add other products similarly...
]

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const productId = parseInt(params.id)
  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-primary-500 hover:text-primary-600">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setToastMessage(`✅ ${product.name} added to cart!`)
    setShowToast(true)
  }

  const images = [product.image, ...(product.additionalImages || [])]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toast 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-primary-500 hover:text-primary-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-primary-500 hover:text-primary-600">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm text-primary-600 font-medium mb-2 block">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  R{product.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  R{product.originalPrice}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  Save R{(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dimensions */}
            {product.dimensions && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Dimensions</h3>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-lg font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-500 text-white py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-lg"
              >
                Add to Cart - R{(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}