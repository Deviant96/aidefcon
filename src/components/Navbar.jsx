import { Link } from 'react-router-dom'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, Shield, User, Bell, Megaphone, Sparkles } from 'lucide-react'
import useAnnouncements from '../hooks/useAnnouncements'

export default function Navbar({ onAuthClick, onFaqClick, isGuest, username }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [announcementsOpen, setAnnouncementsOpen] = useState(false)
  const { announcements, loading, error } = useAnnouncements()

  const announcementsModal = announcementsOpen ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setAnnouncementsOpen(false)}
      />
      <div className="relative w-full max-w-2xl card p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={() => setAnnouncementsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6 pr-10">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
            <p className="text-sm text-gray-500">Latest updates from event organizers</p>
          </div>
        </div>

        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`card p-5 ${ann.urgent ? 'border-red-200 bg-red-50/50' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {ann.pinned && (
                      <span className="badge bg-gray-900 text-white text-xs">📌 Pinned</span>
                    )}
                    {ann.urgent && (
                      <span className="badge bg-red-100 text-red-700">🚨 Urgent</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{ann.content}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{ann.time}</span>
              </div>
            </div>
          ))}
          {!loading && !error && announcements.length === 0 && (
            <p className="text-sm text-gray-500">No announcements published yet.</p>
          )}
          {error && (
            <p className="text-sm text-red-600">Announcements are currently unavailable.</p>
          )}
        </div>
      </div>
    </div>
  ) : null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-mono font-bold text-gray-900">
            <Shield className="w-5 h-5" />
            <span className="text-lg">AI DEFCON</span>
          </Link>

          <button
            onClick={() => setAnnouncementsOpen(true)}
            className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-xl border border-gray-200 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
          >
            <span className="relative inline-flex">
              <Megaphone className="w-5 h-5 text-orange-700" />
              <Sparkles className="w-3.5 h-3.5 text-amber-500 absolute -top-2 -right-2" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-xs uppercase tracking-wider text-orange-700 font-semibold">Live Feed</span>
              <span className="block text-sm font-bold text-gray-900">Announcements</span>
            </span>
            <span className="badge bg-orange-100 text-orange-700">{loading ? '...' : `${announcements.length} New`}</span>
          </button>

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
          <button
            onClick={() => {
              setAnnouncementsOpen(true)
              setMobileOpen(false)
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 text-sm"
          >
            <span className="flex items-center gap-2 font-semibold text-gray-900">
              <Bell className="w-4 h-4 text-orange-700" />
              Announcements
            </span>
            <span className="badge bg-orange-100 text-orange-700">{loading ? '...' : `${announcements.length} New`}</span>
          </button>
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

      {typeof document !== 'undefined' && createPortal(announcementsModal, document.body)}
    </header>
  )
}
