import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: 'Sofas',
    description: 'Comfortable seating for your living room',
    image: '/images/category-sofas.jpg',
    link: '/products?category=sofas'
  },
  {
    id: 2,
    name: 'Beds',
    description: 'Luxurious beds for perfect sleep',
    image: '/images/category-beds.jpg',
    link: '/products?category=beds'
  },
  {
    id: 3,
    name: 'Bedding',
    description: 'Premium quality bedding sets',
    image: '/images/category-bedding.jpg',
    link: '/products?category=bedding'
  },
  {
    id: 4,
    name: 'Dining',
    description: 'Elegant dining furniture',
    image: '/images/category-dining.jpg',
    link: '/products?category=dining'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed to bring comfort and style to every room in your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}