'use client'
import { useState } from 'react'

const materials = ['Wood', 'Metal', 'Fabric', 'Leather', 'Velvet', 'Linen']
const priceRanges = [
  { label: 'Under $100', value: [0, 100] },
  { label: '$100 - $500', value: [100, 500] },
  { label: '$500 - $1000', value: [500, 1000] },
  { label: 'Over $1000', value: [1000, 5000] },
]

export default function ProductFilters({ filters, setFilters, categories }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleMaterialChange = (material) => {
    const updatedMaterials = filters.materials.includes(material)
      ? filters.materials.filter(m => m !== material)
      : [...filters.materials, material]
    
    setFilters({ ...filters, materials: updatedMaterials })
  }

  const handlePriceRangeChange = (range) => {
    setFilters({ ...filters, priceRange: range })
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 5000],
      materials: [],
      inStock: false,
      featured: false,
      sortBy: 'name'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      {/* Mobile Filter Header */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="p-2 border border-neutral-300 rounded-lg"
        >
          {isMobileFiltersOpen ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-semibold mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]}
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters({ 
                ...filters, 
                priceRange: [Number(e.target.value), filters.priceRange[1]] 
              })}
              className="w-20 border border-neutral-300 rounded px-2 py-1 text-sm"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ 
                ...filters, 
                priceRange: [filters.priceRange[0], Number(e.target.value)] 
              })}
              className="w-20 border border-neutral-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Materials */}
        <div>
          <h4 className="font-semibold mb-3">Materials</h4>
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={() => handleMaterialChange(material)}
                  className="text-primary-500 focus:ring-primary-500 rounded"
                />
                <span>{material}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div>
          <h4 className="font-semibold mb-3">Availability</h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
              className="text-primary-500 focus:ring-primary-500 rounded"
            />
            <span>In Stock Only</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => setFilters({ ...filters, featured: e.target.checked })}
              className="text-primary-500 focus:ring-primary-500 rounded"
            />
            <span>Featured Products</span>
          </label>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2 px-4 rounded-lg transition duration-200"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  )
}