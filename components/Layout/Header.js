'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getCartItemsCount } = useCart()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/images/logo.jpg"
                alt="Durable Furniture & Bedding"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-neutral-900">DURABLE</div>
              <div className="text-xs text-neutral-600 -mt-1">FURNITURE & BEDDING</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for furniture, bedding..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button className="md:hidden p-2">
              <FiSearch className="w-5 h-5" />
            </button>

            {/* User Account */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 p-2">
                  <FiUser className="w-5 h-5" />
                  <span className="hidden sm:block">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 hover:bg-neutral-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-2 hover:bg-neutral-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-neutral-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="flex items-center space-x-1 p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="w-5 h-5" />
                <span className="hidden sm:block">Login</span>
              </Link>
            )}

            {/* Shopping Cart */}
            <Link 
              href="/cart" 
              className="relative p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiShoppingCart className="w-5 h-5" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:hidden"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-neutral-200 md:border-t-0 py-4 md:py-0`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
            <Link 
              href="/" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link 
              href="/products?category=beds" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Beds
            </Link>
            <Link 
              href="/products?category=sofas" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Couches
            </Link>
            <Link 
              href="/products?category=bedding" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Bedding
            </Link>
            <Link 
              href="/about" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-primary-500 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          {/* Search Bar - Mobile */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for furniture, bedding..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}