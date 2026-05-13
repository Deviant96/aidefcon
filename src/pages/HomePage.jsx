import { Link } from 'react-router-dom'
import { ArrowRight, User } from 'lucide-react'
import Countdown from '../components/Countdown'

export default function HomePage({ onAuthClick, onFaqClick, onCreateTeam, onJoinTeam, isGuest, username }) {
  return (
    <main className="min-h-screen">
      <div className="fixed top-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        <div className="flex flex-col items-end gap-2">
          <Link
            to="/rules"
            className="px-4 py-2 rounded-xl bg-white/95 border border-gray-200 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Rules
          </Link>
          <button
            onClick={onFaqClick}
            className="px-4 py-2 rounded-xl bg-white/95 border border-gray-200 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            FAQ
          </button>
          <Link
            to="/beginner"
            className="px-4 py-2 rounded-xl bg-white/95 border border-gray-200 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Beginner Quest
          </Link>
          {isGuest ? (
            <button onClick={onAuthClick} className="btn-primary px-5 py-3 rounded-xl shadow-lg">
              Sign In
            </button>
          ) : (
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white shadow-lg text-sm font-medium">
              <User className="w-4 h-4" />
              {username}
            </Link>
          )}
        </div>
      </div>

      <div className="sm:hidden fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
        <button onClick={onFaqClick} className="px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm font-medium">
          FAQ
        </button>
        {isGuest ? (
          <button onClick={onAuthClick} className="btn-primary px-4 py-2 rounded-xl shadow-lg">
            Sign In
          </button>
        ) : (
          <Link to="/profile" className="px-4 py-2 rounded-xl bg-gray-900 text-white shadow-lg text-sm font-medium">
            {username}
          </Link>
        )}
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Competition is live
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
            AI DEFCON
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 font-light max-w-2xl mx-auto mb-10">
            The premier AI security Capture The Flag competition. Hack, solve, dominate.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {isGuest ? (
              <>
                <button onClick={onAuthClick} className="btn-primary">
                  Register Team <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={onAuthClick} className="btn-secondary">
                  Join Team
                </button>
              </>
            ) : (
              <>
                <button onClick={onCreateTeam} className="btn-primary">
                  Create Team <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={onJoinTeam} className="btn-secondary">
                  Join Team
                </button>
              </>
            )}
            <Link to="/scoreboard" className="btn-secondary">
              Scoreboard
            </Link>
          </div>

          {/* Countdown */}
          <div className="inline-block">
            <p className="text-xs font-medium text-gray-400 tracking-widest uppercase mb-4 text-center">
              Time remaining
            </p>
            <Countdown />
          </div>
        </div>
      </section>


    </main>
  )
}
