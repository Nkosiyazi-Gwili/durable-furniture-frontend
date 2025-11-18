import ProductCard from '@/components/Products/ProductCard'

export default function FeaturedProducts({ products, title }) {
  if (!products || products.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-neutral-600">
            Handpicked selections for your home
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}