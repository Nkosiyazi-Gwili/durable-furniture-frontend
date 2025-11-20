// app/products/page.js
'use client'
import { useState, useEffect } from 'react'
import ProductGrid from '@/components/Products/ProductGrid'
import ProductFilters from '@/components/Products/ProductFilters'

// Dummy products data
const dummyProducts = [
  {
    _id: 1,
    name: "Modern Leather Sofa",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: { _id: 'sofas', name: 'Sofas' },
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    materials: ['Leather', 'Wood'],
    description: "Luxurious leather sofa with premium comfort",
    createdAt: new Date('2024-01-15')
  },
  {
    _id: 2,
    name: "Queen Size Bed Frame",
    price: 899.99,
    originalPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: { _id: 'beds', name: 'Beds' },
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: false,
    materials: ['Wood', 'Metal'],
    description: "Elegant queen size bed frame",
    createdAt: new Date('2024-01-20')
  },
  {
    _id: 3,
    name: "Dining Table Set",
    price: 1599.99,
    originalPrice: 1899.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: { _id: 'dining', name: 'Dining' },
    rating: 4.9,
    reviews: 67,
    inStock: true,
    featured: true,
    materials: ['Wood', 'Glass'],
    description: "Complete dining set for family gatherings",
    createdAt: new Date('2024-01-10')
  },
  {
    _id: 4,
    name: "Office Ergonomic Chair",
    price: 399.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: { _id: 'office', name: 'Office' },
    rating: 4.7,
    reviews: 203,
    inStock: true,
    featured: false,
    materials: ['Mesh', 'Metal', 'Plastic'],
    description: "Ergonomic office chair for comfort",
    createdAt: new Date('2024-01-25')
  },
  {
    _id: 5,
    name: "Coffee Table",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: { _id: 'tables', name: 'Tables' },
    rating: 4.5,
    reviews: 89,
    inStock: false,
    featured: false,
    materials: ['Wood', 'Metal'],
    description: "Modern coffee table for your living room",
    createdAt: new Date('2024-01-18')
  },
  {
    _id: 6,
    name: "Bookshelf",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: { _id: 'storage', name: 'Storage' },
    rating: 4.3,
    reviews: 56,
    inStock: true,
    featured: true,
    materials: ['Wood'],
    description: "Spacious bookshelf for your collection",
    createdAt: new Date('2024-01-22')
  }
]

const dummyCategories = [
  { _id: 'sofas', name: 'Sofas' },
  { _id: 'beds', name: 'Beds' },
  { _id: 'dining', name: 'Dining' },
  { _id: 'office', name: 'Office' },
  { _id: 'tables', name: 'Tables' },
  { _id: 'storage', name: 'Storage' }
]

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    materials: [],
    inStock: false,
    featured: false,
    sortBy: 'name'
  })

  useEffect(() => {
    // Use dummy data instead of API calls
    setProducts(dummyProducts)
    setCategories(dummyCategories)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const applyFilters = () => {
    let filtered = [...products]

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category._id === filters.category)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    )

    // Materials filter
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        filters.materials.some(material => product.materials.includes(material))
      )
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter(product => product.featured)
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-neutral-900">
              All Products ({filteredProducts.length})
            </h1>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="border border-neutral-300 rounded-lg px-4 py-2"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}