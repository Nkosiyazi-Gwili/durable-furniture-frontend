'use client'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    toast.success('Product added to cart!')
    setIsAdding(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden product-card border border-neutral-200">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-64 bg-neutral-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.newArrival && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
            {product.bestSelling && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                Popular
              </span>
            )}
            {!product.inStock && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition duration-200">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              R{product.price}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-neutral-500 line-through">
                R{product.comparePrice}
              </span>
            )}
          </div>
          
          {/* Rating */}
          {product.ratings && product.ratings.average > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-neutral-600">
                {product.ratings.average.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
          </button>
          
          <button className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition duration-200">
            <FiHeart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}