import HeroSlider from '@/components/Home/HeroSlider'
import CategoryGrid from '@/components/Home/CategoryGrid'
import FeaturedProducts from '@/components/Home/FeaturedProducts'
import Newsletter from '@/components/Home/Newsletter'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section>
        <HeroSlider />
      </section>

      {/* Category Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </section>
    </div>
  )
}