import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Shield, User } from 'lucide-react'

const navItems = [
  { label: 'Rules', path: '/rules' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Beginner Quest', path: '/beginner' },
]

export default function Navbar({ onAuthClick, onFaqClick, isGuest, username }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-mono font-bold text-gray-900">
            <Shield className="w-5 h-5" />
            <span className="text-lg">AI DEFCON</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.path === '/faq' ? (
                <button
                  key={item.label}
                  onClick={onFaqClick}
                  className="btn-ghost text-sm"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`btn-ghost text-sm ${
                    location.pathname === item.path ? 'bg-gray-100 text-gray-900' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {isGuest ? (
              <button onClick={onAuthClick} className="btn-primary text-sm py-2">
                Sign In
              </button>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-2 btn-ghost text-sm"
              >
                <User className="w-4 h-4" />
                {username}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {navItems.map((item) =>
            item.path === '/faq' ? (
              <button
                key={item.label}
                onClick={() => { onFaqClick(); setMobileOpen(false) }}
                className="w-full text-left btn-ghost text-sm"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block btn-ghost text-sm"
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="pt-2 border-t border-gray-100">
            {isGuest ? (
              <button
                onClick={() => { onAuthClick(); setMobileOpen(false) }}
                className="btn-primary text-sm w-full justify-center"
              >
                Sign In
              </button>
            ) : (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 btn-ghost text-sm"
              >
                <User className="w-4 h-4" />
                {username}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
