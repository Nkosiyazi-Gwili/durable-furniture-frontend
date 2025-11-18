import Link from 'next/link'

export default function LowStockAlert({ products }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Low Stock Alert</h3>
        <Link href="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          Manage
        </Link>
      </div>
      
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product._id} className="flex items-center justify-between py-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {product.name}
              </p>
              <p className="text-sm text-neutral-600">
                SKU: {product.sku}
              </p>
            </div>
            <div className="ml-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                product.stockQuantity === 0 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {product.stockQuantity === 0 ? 'Out of Stock' : `${product.stockQuantity} left`}
              </span>
            </div>
          </div>
        ))}
        
        {products.length === 0 && (
          <p className="text-center text-neutral-500 py-4">All products are well stocked</p>
        )}
      </div>
    </div>
  )
}