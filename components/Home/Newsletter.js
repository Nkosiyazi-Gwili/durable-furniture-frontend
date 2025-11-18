'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive deals, new arrivals, and design inspiration.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
          <button
            type="submit"
            className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-neutral-100 transition duration-300"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-sm mt-4 opacity-90">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}