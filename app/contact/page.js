'use client'
import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock, FiGlobe, FiMessageCircle } from 'react-icons/fi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['068 561 3608'],
      description: 'Call us directly for immediate assistance',
      link: 'tel:0685613608',
      linkText: 'Call Now'
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['durablefurniturebed@gmail.com'],
      description: 'Send us an email for inquiries and quotes',
      link: 'mailto:durablefurniturebed@gmail.com',
      linkText: 'Send Email'
    },
    {
      icon: FiMapPin,
      title: 'Our Location',
      details: ['Pretoria, South Africa'],
      description: 'Based in Pretoria, serving nationwide',
      link: '#',
      linkText: 'View Location'
    },
    {
      icon: FiGlobe,
      title: 'Nationwide Delivery',
      details: ['Across South Africa'],
      description: 'We deliver to all major cities and towns',
      link: '#',
      linkText: 'Delivery Info'
    }
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 1:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Durable Furniture</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with us for quality beds, couches, and home furniture. We're here to help you create your dream space.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <div className="text-neutral-600 space-y-1 mb-2">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="font-medium">{detail}</p>
                        ))}
                      </div>
                      <p className="text-sm text-neutral-500 mb-3">
                        {item.description}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          className="inline-block bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded transition duration-200"
                        >
                          {item.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-8 bg-neutral-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                <FiClock className="w-5 h-5 mr-2 text-primary-500" />
                Business Hours
              </h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-200 last:border-b-0">
                    <span className="text-neutral-700 font-medium">{schedule.day}</span>
                    <span className={`font-semibold ${schedule.hours === 'Closed' ? 'text-red-500' : 'text-primary-600'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FiMessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Quick Response Guaranteed</h4>
                  <p className="text-green-700 text-sm">
                    We typically respond to all inquiries within 2 hours during business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-neutral-200 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Send us a Message</h2>
              
              {submitMessage && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="068 561 3608"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="bed-inquiry">Bed Inquiry</option>
                      <option value="couch-inquiry">Couch Inquiry</option>
                      <option value="furniture-inquiry">Furniture Inquiry</option>
                      <option value="delivery-question">Delivery Question</option>
                      <option value="quote-request">Quote Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your furniture needs, preferred styles, budget, and any specific requirements..."
                  />
                  <p className="text-sm text-neutral-500 mt-2">
                    Please include details about the type of furniture you're looking for, room dimensions, and your budget if possible.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Additional Contact Methods */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Prefer to Call?</h3>
                <p className="text-blue-700 mb-4">
                  Speak directly with our furniture experts for immediate assistance and personalized recommendations.
                </p>
                <a
                  href="tel:0685613608"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
                >
                  <FiPhone className="w-4 h-4 mr-2" />
                  Call 068 561 3608
                </a>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Email Inquiries</h3>
                <p className="text-green-700 mb-4">
                  Send us detailed requirements and we'll provide you with options and pricing.
                </p>
                <a
                  href="mailto:durablefurniturebed@gmail.com"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map & Location Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Find Us in Pretoria</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Based in Pretoria, serving customers across South Africa with nationwide delivery.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-green-100 h-80 lg:h-96 flex items-center justify-center">
                <div className="text-center text-neutral-600">
                  <FiMapPin className="w-16 h-16 mx-auto mb-4 text-primary-500" />
                  <p className="text-lg font-semibold">Pretoria, South Africa</p>
                  <p className="text-sm mt-2">Nationwide Delivery Available</p>
                </div>
              </div>
              
              {/* Location Info */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Durable Furniture & Bedding</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-900">Location</p>
                      <p className="text-neutral-600">Pretoria, South Africa</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-900">Phone</p>
                      <a href="tel:0685613608" className="text-primary-600 hover:text-primary-700">
                        068 561 3608
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-900">Email</p>
                      <a href="mailto:durablefurniturebed@gmail.com" className="text-primary-600 hover:text-primary-700">
                        durablefurniturebed@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiGlobe className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-900">Service Area</p>
                      <p className="text-neutral-600">Nationwide Delivery across South Africa</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-semibold text-primary-900 mb-2">Specializing In:</h4>
                  <ul className="text-primary-700 text-sm space-y-1">
                    <li>• High-quality beds and bed frames</li>
                    <li>• Comfortable couches and sofas</li>
                    <li>• Complete home furniture solutions</li>
                    <li>• Nationwide delivery service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}