import { Link } from 'react-router-dom'
import { ArrowRight, User } from 'lucide-react'
import Countdown from '../components/Countdown'

export default function HomePage({ onAuthClick, onFaqClick, onCreateTeam, onJoinTeam, isGuest, username }) {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-gray-100/70 blur-3xl" />
        <div className="absolute top-24 right-12 w-72 h-72 rounded-full bg-slate-100/80 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="fixed top-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        <div className="flex flex-col items-end gap-2">
          <Link
            to="/rules"
            className="px-5 py-3 rounded-xl bg-white/95 border-2 border-gray-300 shadow-md text-base font-mono font-semibold tracking-wide text-gray-800 hover:bg-gray-50"
          >
            {'<RULES />'}
          </Link>
          <button
            onClick={onFaqClick}
            className="px-5 py-3 rounded-xl bg-white/95 border-2 border-gray-300 shadow-md text-base font-mono font-semibold tracking-wide text-gray-800 hover:bg-gray-50"
          >
            {'<FAQ />'}
          </button>
          <Link
            to="/beginner"
            className="px-5 py-3 rounded-xl bg-white/95 border-2 border-gray-300 shadow-md text-base font-mono font-semibold tracking-wide text-gray-800 hover:bg-gray-50"
          >
            {'<BEGINNER_QUEST />'}
          </Link>
          {isGuest ? (
            <button onClick={onAuthClick} className="px-5 py-3 rounded-xl bg-gray-900 text-white shadow-lg text-base font-mono font-semibold tracking-wide hover:bg-gray-800">
              {'> SIGN_IN'}
            </button>
          ) : (
            <Link to="/profile" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white shadow-lg text-base font-mono font-semibold tracking-wide">
              <User className="w-4 h-4" />
              @{username}
            </Link>
          )}
        </div>
      </div>

      <div className="sm:hidden fixed top-4 right-4 z-40 flex flex-col gap-2">
        <button onClick={onFaqClick} className="px-4 py-2 rounded-xl border-2 border-gray-300 bg-white shadow-md text-sm font-mono font-semibold tracking-wide">
          {'<FAQ />'}
        </button>
        {isGuest ? (
          <button onClick={onAuthClick} className="px-4 py-2 rounded-xl bg-gray-900 text-white shadow-lg text-sm font-mono font-semibold tracking-wide">
            {'> SIGN_IN'}
          </button>
        ) : (
          <Link to="/profile" className="px-4 py-2 rounded-xl bg-gray-900 text-white shadow-lg text-sm font-mono font-semibold tracking-wide">
            @{username}
          </Link>
        )}
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
          AI DEFCON
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 font-light max-w-2xl mx-auto mb-12">
          The premier AI security Capture The Flag competition. Hack, solve, and dominate the board.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
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
    </main>
  )
}
