'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FiPackage, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiArrowLeft, 
  FiX,
  FiSave,
  FiImage,
  FiTag,
  FiCheck,
  FiAlertCircle,
  FiStar,
  FiUpload
} from 'react-icons/fi'

// Demo image URLs
const demoImages = {
  sofas: [
    {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      isFeatured: true
    },
    {
      url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      isFeatured: false
    },
    {
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=500&fit=crop',
      isFeatured: false
    }
  ],
  beds: [
    {
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop',
      isFeatured: true
    },
    {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&h=500&fit=crop',
      isFeatured: false
    },
    {
      url: 'https://images.unsplash.com/photo-1616627561834-5b31c46af0b7?w=500&h=500&fit=crop',
      isFeatured: false
    }
  ],
  dining: [
    {
      url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      isFeatured: true
    },
    {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      isFeatured: false
    },
    {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=500&h=500&fit=crop',
      isFeatured: false
    }
  ],
  office: [
    {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      isFeatured: true
    },
    {
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
      isFeatured: false
    },
    {
      url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
      isFeatured: false
    }
  ]
}

export default function ProductManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    stockQuantity: '',
    sku: '',
    status: 'active',
    featured: false,
    colors: [],
    variants: [],
    images: [],
    specifications: [],
    tags: [],
    featuredImage: ''
  })

  // New variant/color form
  const [newColor, setNewColor] = useState({ name: '', hex: '#3B82F6' })
  const [newVariant, setNewVariant] = useState({ name: '', priceAdjustment: 0 })
  const [newSpec, setNewSpec] = useState({ key: '', value: '' })
  const [newTag, setNewTag] = useState('')
  const [imageUploads, setImageUploads] = useState([])

  // Available categories and colors
  const categories = ['Sofas', 'Beds', 'Dining', 'Office', 'Storage', 'Decor', 'Lighting']
  const subcategories = {
    Sofas: ['Sectionals', 'Loveseats', 'Sleeper Sofas', 'Recliners'],
    Beds: ['Platform Beds', 'Storage Beds', 'Canopy Beds', 'Bunk Beds'],
    Dining: ['Dining Tables', 'Dining Chairs', 'Bar Stools', 'Buffets'],
    Office: ['Desks', 'Office Chairs', 'Bookshelves', 'Filing Cabinets'],
    Storage: ['Wardrobes', 'Cabinets', 'Shelving Units', 'Chests'],
    Decor: ['Mirrors', 'Wall Art', 'Vases', 'Clocks'],
    Lighting: ['Floor Lamps', 'Table Lamps', 'Pendant Lights', 'Chandeliers']
  }

  const predefinedColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#6B7280' },
    { name: 'Brown', hex: '#92400E' },
    { name: 'Beige', hex: '#FEF3C7' },
    { name: 'Navy Blue', hex: '#1E3A8A' },
    { name: 'Forest Green', hex: '#065F46' },
    { name: 'Burgundy', hex: '#991B1B' }
  ]

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      // Enhanced mock products data with real demo images
      const mockProducts = [
        {
          _id: '1',
          name: 'Premium Leather Sofa',
          description: 'Luxurious genuine leather sofa with premium comfort and modern design.',
          price: 1299.99,
          originalPrice: 1499.99,
          category: 'Sofas',
          subcategory: 'Sectionals',
          stockQuantity: 15,
          status: 'active',
          sku: 'SOFA-001',
          featured: true,
          colors: [
            { name: 'Black', hex: '#000000', stock: 8 },
            { name: 'Brown', hex: '#92400E', stock: 7 }
          ],
          variants: [
            { name: '3-Seater', priceAdjustment: 0, sku: 'SOFA-001-3S' },
            { name: '2-Seater', priceAdjustment: -200, sku: 'SOFA-001-2S' }
          ],
          images: demoImages.sofas,
          specifications: [
            { key: 'Material', value: 'Genuine Leather' },
            { key: 'Dimensions', value: '84"W x 36"D x 32"H' },
            { key: 'Weight Capacity', value: '600 lbs' }
          ],
          tags: ['leather', 'premium', 'modern', 'living-room'],
          featuredImage: demoImages.sofas[0].url
        },
        {
          _id: '2',
          name: 'King Size Bed Frame',
          description: 'Elegant king size bed frame with sturdy construction and under-bed storage.',
          price: 899.99,
          originalPrice: 1099.99,
          category: 'Beds',
          subcategory: 'Platform Beds',
          stockQuantity: 8,
          status: 'active',
          sku: 'BED-001',
          featured: true,
          colors: [
            { name: 'Walnut', hex: '#78350F', stock: 5 },
            { name: 'White', hex: '#FFFFFF', stock: 3 }
          ],
          variants: [
            { name: 'King Size', priceAdjustment: 0, sku: 'BED-001-K' },
            { name: 'Queen Size', priceAdjustment: -150, sku: 'BED-001-Q' }
          ],
          images: demoImages.beds,
          specifications: [
            { key: 'Material', value: 'Solid Wood' },
            { key: 'Dimensions', value: '76"W x 80"D x 42"H' },
            { key: 'Storage', value: 'Under-bed drawers' }
          ],
          tags: ['wood', 'storage', 'bedroom', 'king-size'],
          featuredImage: demoImages.beds[0].url
        }
      ]
      setProducts(mockProducts)
      setIsLoading(false)
    }
  }, [user, loading, router])

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      subcategory: '',
      stockQuantity: '',
      sku: '',
      status: 'active',
      featured: false,
      colors: [],
      variants: [],
      images: [],
      specifications: [],
      tags: [],
      featuredImage: ''
    })
    setNewColor({ name: '', hex: '#3B82F6' })
    setNewVariant({ name: '', priceAdjustment: 0 })
    setNewSpec({ key: '', value: '' })
    setNewTag('')
    setImageUploads([])
  }

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault()
    
    const newProduct = {
      _id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      stockQuantity: parseInt(formData.stockQuantity),
      createdAt: new Date().toISOString()
    }

    setProducts([...products, newProduct])
    showNotification('Product created successfully!')
    setShowAddModal(false)
    resetForm()
  }

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      subcategory: product.subcategory,
      stockQuantity: product.stockQuantity,
      sku: product.sku,
      status: product.status,
      featured: product.featured,
      colors: product.colors,
      variants: product.variants,
      images: product.images,
      specifications: product.specifications,
      tags: product.tags,
      featuredImage: product.featuredImage
    })
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    
    const updatedProducts = products.map(product => 
      product._id === editingProduct._id 
        ? { 
            ...product, 
            ...formData,
            price: parseFloat(formData.price),
            originalPrice: parseFloat(formData.originalPrice),
            stockQuantity: parseInt(formData.stockQuantity)
          }
        : product
    )

    setProducts(updatedProducts)
    showNotification('Product updated successfully!')
    setEditingProduct(null)
    resetForm()
  }

  // Delete product
  const handleDeleteProduct = async (productId) => {
    const productToDelete = products.find(p => p._id === productId)
    setProducts(products.filter(product => product._id !== productId))
    setShowDeleteModal(null)
    showNotification(`Product "${productToDelete.name}" deleted successfully!`)
  }

  // Image management
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      isFeatured: formData.images.length === 0 && imageUploads.length === 0 // First image is featured by default
    }))
    
    setImageUploads([...imageUploads, ...newImages])
    
    // Auto-set featured image if this is the first image
    if (formData.images.length === 0 && imageUploads.length === 0 && newImages.length > 0) {
      setFormData({
        ...formData,
        featuredImage: newImages[0].url
      })
    }
  }

  const removeImage = (index) => {
    const updatedUploads = imageUploads.filter((_, i) => i !== index)
    setImageUploads(updatedUploads)
    
    // If removed image was featured, set new featured image
    if (imageUploads[index]?.url === formData.featuredImage) {
      const newFeatured = updatedUploads[0]?.url || formData.images[0]?.url || ''
      setFormData({ ...formData, featuredImage: newFeatured })
    }
  }

  const removeSavedImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: updatedImages })
    
    // If removed image was featured, set new featured image
    if (formData.images[index]?.url === formData.featuredImage) {
      const newFeatured = updatedImages[0]?.url || imageUploads[0]?.url || ''
      setFormData({ ...formData, featuredImage: newFeatured })
    }
  }

  const setFeaturedImage = (imageUrl) => {
    setFormData({ ...formData, featuredImage: imageUrl })
  }

  // Color management
  const addColor = () => {
    if (newColor.name && newColor.hex) {
      setFormData({
        ...formData,
        colors: [...formData.colors, { ...newColor, stock: 0 }]
      })
      setNewColor({ name: '', hex: '#3B82F6' })
    }
  }

  const removeColor = (index) => {
    const updatedColors = formData.colors.filter((_, i) => i !== index)
    setFormData({ ...formData, colors: updatedColors })
  }

  const updateColorStock = (index, stock) => {
    const updatedColors = formData.colors.map((color, i) => 
      i === index ? { ...color, stock: parseInt(stock) || 0 } : color
    )
    setFormData({ ...formData, colors: updatedColors })
  }

  // Variant management
  const addVariant = () => {
    if (newVariant.name) {
      setFormData({
        ...formData,
        variants: [...formData.variants, { 
          ...newVariant, 
          sku: `${formData.sku}-${newVariant.name.toUpperCase().replace(/\s+/g, '')}` 
        }]
      })
      setNewVariant({ name: '', priceAdjustment: 0 })
    }
  }

  const removeVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index)
    setFormData({ ...formData, variants: updatedVariants })
  }

  // Specification management
  const addSpecification = () => {
    if (newSpec.key && newSpec.value) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, { ...newSpec }]
      })
      setNewSpec({ key: '', value: '' })
    }
  }

  const removeSpecification = (index) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index)
    setFormData({ ...formData, specifications: updatedSpecs })
  }

  // Tag management
  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag]
      })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    const updatedTags = formData.tags.filter(tag => tag !== tagToRemove)
    setFormData({ ...formData, tags: updatedTags })
  }

  // Helper functions
  const getTotalStock = (product) => {
    return product.colors.reduce((total, color) => total + (color.stock || 0), 0)
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const getStockColor = (quantity) => {
    if (quantity > 10) return 'bg-green-100 text-green-800'
    if (quantity > 0) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getAllImages = () => {
    return [...formData.images, ...imageUploads]
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
      {/* Notification Banner */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
          notification.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {notification.type === 'error' ? (
            <FiAlertCircle className="w-5 h-5" />
          ) : (
            <FiCheck className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotification({ show: false, message: '', type: '' })}
            className="ml-4 hover:opacity-70"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

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
                <FiPackage className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Product Management</h1>
                <p className="text-neutral-600">Manage your product catalog and inventory</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

         {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Colors/Variants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-neutral-100 rounded-lg overflow-hidden">
                          {product.featuredImage ? (
                            <img 
                              src={product.featuredImage} 
                              alt={product.name}
                              className="h-12 w-12 object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 flex items-center justify-center">
                              <FiPackage className="w-5 h-5 text-neutral-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-neutral-500">
                            SKU: {product.sku}
                          </div>
                          {product.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      <div>{product.category}</div>
                      <div className="text-neutral-500">{product.subcategory}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      <div className="font-semibold">${product.price}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-neutral-500 line-through">
                          ${product.originalPrice}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {/* Colors Display */}
                      <div className="mb-2">
                        <div className="flex items-center space-x-1 mb-1">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-neutral-300 relative group"
                              style={{ backgroundColor: color.hex }}
                              title={`${color.name} (${color.stock} in stock)`}
                            >
                              {color.stock === 0 && (
                                <div className="absolute inset-0 bg-red-500 bg-opacity-50 rounded-full"></div>
                              )}
                            </div>
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-xs text-neutral-500 bg-neutral-100 px-1 rounded">
                              +{product.colors.length - 4}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {product.colors.length} colors
                          {product.colors.some(c => c.stock === 0) && (
                            <span className="text-red-500 ml-1">• Out of stock</span>
                          )}
                        </div>
                      </div>

                      {/* Variants Display */}
                      <div>
                        <div className="text-xs text-neutral-600">
                          {product.variants.length} variants
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.variants.slice(0, 2).map((variant, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-700"
                              title={`${variant.name} (${variant.priceAdjustment >= 0 ? '+' : ''}${variant.priceAdjustment})`}
                            >
                              {variant.name}
                            </span>
                          ))}
                          {product.variants.length > 2 && (
                            <span className="text-xs text-neutral-500 bg-neutral-100 px-1 rounded">
                              +{product.variants.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor(getTotalStock(product))}`}>
                          {getTotalStock(product)} total
                        </span>
                        <div className="text-xs text-neutral-600">
                          {product.colors.filter(c => c.stock > 0).length}/{product.colors.length} colors available
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-primary-600 hover:text-primary-900 p-1"
                          title="Edit product"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteModal(product._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete product"
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
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Products</p>
                <p className="text-2xl font-bold text-neutral-900">{products.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Low Stock</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {products.filter(p => getTotalStock(p) <= 5).length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Out of Stock</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {products.filter(p => getTotalStock(p) === 0).length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Featured</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {products.filter(p => p.featured).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {(showAddModal || editingProduct) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-neutral-200 sticky top-0 bg-white">
                <h3 className="text-lg font-semibold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button 
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProduct(null)
                    resetForm()
                  }}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="p-6 space-y-6">
                {/* Product Images */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Product Images
                  </label>
                  
                  {/* Featured Image Display */}
                  {formData.featuredImage && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Featured Image
                      </label>
                      <div className="relative inline-block">
                        <img 
                          src={formData.featuredImage} 
                          alt="Featured"
                          className="h-32 w-32 rounded-lg border-2 border-primary-500 object-cover"
                        />
                        <FiStar className="absolute top-2 right-2 w-4 h-4 text-yellow-500 bg-white rounded-full p-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Image Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Upload Images
                    </label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                      <FiUpload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-600 mb-2">
                        Drag and drop images here or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm cursor-pointer inline-block"
                      >
                        Select Images
                      </label>
                    </div>
                  </div>

                  {/* Image Gallery */}
                  {(formData.images.length > 0 || imageUploads.length > 0) && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Image Gallery ({getAllImages().length} images)
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {getAllImages().map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image.url} 
                              alt={`Product ${index + 1}`}
                              className={`h-20 w-full rounded-lg object-cover border-2 cursor-pointer ${
                                formData.featuredImage === image.url 
                                  ? 'border-primary-500' 
                                  : 'border-neutral-200'
                              }`}
                              onClick={() => setFeaturedImage(image.url)}
                            />
                            
                            {/* Featured Badge */}
                            {formData.featuredImage === image.url && (
                              <div className="absolute top-1 right-1 bg-primary-500 text-white p-1 rounded-full">
                                <FiStar className="w-3 h-3" />
                              </div>
                            )}

                            {/* Set as Featured Button */}
                            {formData.featuredImage !== image.url && (
                              <button
                                type="button"
                                onClick={() => setFeaturedImage(image.url)}
                                className="absolute top-1 right-1 bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Set as featured"
                              >
                                <FiStar className="w-3 h-3 text-neutral-600" />
                              </button>
                            )}

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => {
                                if (index < formData.images.length) {
                                  removeSavedImage(index)
                                } else {
                                  removeImage(index - formData.images.length)
                                }
                              }}
                              className="absolute top-1 left-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove image"
                            >
                              <FiX className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Featured Image Instructions */}
                      <p className="text-xs text-neutral-500 mt-2">
                        Click on an image to set it as featured. The featured image will be used as the main product image.
                      </p>
                    </div>
                  )}
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Product Name *
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
                      SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Original Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Subcategory
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      disabled={!formData.category}
                    >
                      <option value="">Select Subcategory</option>
                      {formData.category && subcategories[formData.category]?.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Colors & Stock
                  </label>
                  <div className="space-y-3">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <div 
                          className="w-6 h-6 rounded-full border border-neutral-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="flex-1 text-sm font-medium">{color.name}</span>
                        <input
                          type="number"
                          placeholder="Stock"
                          value={color.stock}
                          onChange={(e) => updateColorStock(index, e.target.value)}
                          className="w-20 border border-neutral-300 rounded px-2 py-1 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Color name"
                        value={newColor.name}
                        onChange={(e) => setNewColor({...newColor, name: e.target.value})}
                        className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="color"
                        value={newColor.hex}
                        onChange={(e) => setNewColor({...newColor, hex: e.target.value})}
                        className="w-12 h-10 border border-neutral-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={addColor}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Add Color
                      </button>
                    </div>

                    {/* Predefined colors */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {predefinedColors.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setNewColor(color)}
                          className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Variants
                  </label>
                  <div className="space-y-3">
                    {formData.variants.map((variant, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <span className="flex-1 text-sm font-medium">{variant.name}</span>
                        <span className="text-sm text-neutral-600">
                          ${variant.priceAdjustment >= 0 ? '+' : ''}{variant.priceAdjustment}
                        </span>
                        <span className="text-sm text-neutral-500">{variant.sku}</span>
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Variant name (e.g., Large, Red)"
                        value={newVariant.name}
                        onChange={(e) => setNewVariant({...newVariant, name: e.target.value})}
                        className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Price adjustment"
                        value={newVariant.priceAdjustment}
                        onChange={(e) => setNewVariant({...newVariant, priceAdjustment: parseFloat(e.target.value) || 0})}
                        className="w-32 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={addVariant}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Add Variant
                      </button>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Specifications
                  </label>
                  <div className="space-y-3">
                    {formData.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <span className="w-32 text-sm font-medium">{spec.key}:</span>
                        <span className="flex-1 text-sm">{spec.value}</span>
                        <button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Specification key"
                        value={newSpec.key}
                        onChange={(e) => setNewSpec({...newSpec, key: e.target.value})}
                        className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Specification value"
                        value={newSpec.value}
                        onChange={(e) => setNewSpec({...newSpec, value: e.target.value})}
                        className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={addSpecification}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Add Spec
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-neutral-500 hover:text-neutral-700"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      <FiTag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-neutral-700">
                      Featured Product
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingProduct(null)
                      resetForm()
                    }}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-800 border border-neutral-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
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
                  <h3 className="text-lg font-semibold">Delete Product</h3>
                  <p className="text-neutral-600">This action cannot be undone.</p>
                </div>
              </div>
              
              {showDeleteModal && (() => {
                const productToDelete = products.find(p => p._id === showDeleteModal)
                return (
                  <>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        {productToDelete?.featuredImage ? (
                          <img 
                            src={productToDelete.featuredImage} 
                            alt={productToDelete.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                            <FiPackage className="w-6 h-6 text-neutral-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-neutral-900">{productToDelete?.name}</p>
                          <p className="text-sm text-neutral-600">SKU: {productToDelete?.sku}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-neutral-700 mb-6">
                      <p><strong>This will permanently delete:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Product information and details</li>
                        <li>{productToDelete?.images?.length || 0} product images</li>
                        <li>{productToDelete?.variants?.length || 0} product variants</li>
                        <li>All inventory and stock data</li>
                        <li>Product specifications and tags</li>
                      </ul>
                      <p className="text-red-600 font-semibold mt-2">
                        This action cannot be reversed!
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowDeleteModal(null)}
                        className="px-6 py-2 text-neutral-600 hover:text-neutral-800 border border-neutral-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(showDeleteModal)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Delete Product</span>
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}