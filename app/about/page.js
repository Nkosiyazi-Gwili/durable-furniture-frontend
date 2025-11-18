import { FiAward, FiUsers, FiTruck, FiShield } from 'react-icons/fi'

export default function AboutPage() {
  const features = [
    {
      icon: FiAward,
      title: 'Premium Quality',
      description: 'We specialize in high-quality beds, couches, and home furniture built to last.'
    },
    {
      icon: FiUsers,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We help you create comfortable living spaces.'
    },
    {
      icon: FiTruck,
      title: 'Nationwide Delivery',
      description: 'We deliver across South Africa, bringing quality furniture to your doorstep.'
    },
    {
      icon: FiShield,
      title: 'Quality Guarantee',
      description: 'All our products come with quality assurance and reliable customer support.'
    }
  ]

  const specialties = [
    {
      category: 'Beds',
      description: 'Quality bed frames and mattresses for restful sleep'
    },
    {
      category: 'Couches',
      description: 'Comfortable and stylish seating for your living room'
    },
    {
      category: 'Home Furniture',
      description: 'Complete home furniture solutions for every room'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Durable Furniture</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Specializing in high-quality beds, couches, and home furniture that blend comfort, style, and affordability.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-neutral-900 mb-8">Our Story</h2>
            <div className="prose prose-lg text-neutral-600 mx-auto">
              <p className="mb-6">
                Durable Furniture & Bedding is your trusted partner for quality home furnishings in South Africa. 
                We understand that furniture is more than just decor - it's where memories are made, families gather, 
                and comfort is found.
              </p>
              <p className="mb-6">
                Based in Pretoria, we serve customers nationwide with reliable delivery service. Our focus is on 
                providing durable, comfortable, and stylish furniture that stands the test of time while offering 
                excellent value for money.
              </p>
              <p>
                We work with trusted manufacturers and carefully select every product in our collection to ensure 
                it meets our standards for quality, comfort, and durability. From cozy bedrooms to welcoming living 
                rooms, we help you create spaces you'll love coming home to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            What We Specialize In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {specialties.map((specialty, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-primary-600 mb-3">
                  {specialty.category}
                </h3>
                <p className="text-neutral-600">
                  {specialty.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            Why Choose Durable Furniture?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to find the perfect furniture for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0685613608"
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-neutral-100 transition duration-300"
            >
              Call: 068 561 3608
            </a>
            <a
              href="mailto:durablefurniturebed@gmail.com"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}