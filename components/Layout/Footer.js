import Link from 'next/link'
import Image from 'next/image'
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/images/logo.jpg"
                  alt="Durable Furniture & Bedding"
                  width={40}
                  height={40}
                  className="object-contain rounded"
                />
              </div>
              <div>
                <div className="text-lg font-bold">DURABLE</div>
                <div className="text-xs text-neutral-300 -mt-1">FURNITURE & BEDDING</div>
              </div>
            </div>
            <p className="text-neutral-300 mb-4 text-sm">
              High-quality beds, couches, and home furniture that blend comfort, style, and affordability. Nationwide delivery across South Africa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition duration-200">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition duration-200">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition duration-200">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition duration-200">
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=beds" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Beds
                </Link>
              </li>
              <li>
                <Link href="/products?category=sofas" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Couches
                </Link>
              </li>
              <li>
                <Link href="/products?category=bedding" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Bedding
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-white transition duration-200 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-neutral-300 text-sm">
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Pretoria, South Africa</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:0685613608" className="hover:text-white transition duration-200">
                  068 561 3608
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:durablefurniturebed@gmail.com" className="hover:text-white transition duration-200">
                  durablefurniturebed@gmail.com
                </a>
              </div>
              <div className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full inline-block mt-2">
                Nationwide Delivery
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-300 text-sm">
            © 2025 Durable Furniture & Bedding. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-neutral-300 hover:text-white text-sm transition duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-300 hover:text-white text-sm transition duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}