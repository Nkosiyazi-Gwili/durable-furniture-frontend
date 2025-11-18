// frontend/app/products/page.js
'use client'
import { useState, useEffect } from 'react'
import ProductGrid from '@/components/Products/ProductGrid'
import ProductFilters from '@/components/Products/ProductFilters'

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
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

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