import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Modern Leather Sofa",
      price: 1299.99,
      originalPrice: 1499.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Sofas",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Queen Size Bed Frame",
      price: 899.99,
      originalPrice: 1099.99,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Beds",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: "Dining Table Set",
      price: 1599.99,
      originalPrice: 1899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Dining",
      rating: 4.9,
      reviews: 67
    },
    {
      id: 4,
      name: "Office Ergonomic Chair",
      price: 399.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Office",
      rating: 4.7,
      reviews: 203
    }
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Handpicked selection of our most popular and high-quality furniture pieces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-medium">
                  {product.category}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  R{product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  R{product.originalPrice}
                </span>
              </div>
              
              <button className="w-full mt-4 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}