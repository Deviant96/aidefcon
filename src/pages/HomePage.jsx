import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Users, Flag, Zap } from 'lucide-react'
import Countdown from '../components/Countdown'

const prizes = [
  { place: '1st', amount: '$5,000', icon: '🥇', color: 'border-yellow-300 bg-yellow-50' },
  { place: '2nd', amount: '$2,500', icon: '🥈', color: 'border-gray-300 bg-gray-50' },
  { place: '3rd', amount: '$1,000', icon: '🥉', color: 'border-orange-300 bg-orange-50' },
]

export default function HomePage({ onAuthClick, onCreateTeam, onJoinTeam, isGuest }) {
  return (
    <main className="min-h-screen">
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

      {/* Prizes */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-2">Prize Pool</h2>
          <p className="text-gray-500 text-center mb-10">Top teams take home real rewards</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {prizes.map(({ place, amount, icon, color }) => (
              <div
                key={place}
                className={`card p-6 text-center border-2 ${color}`}
              >
                <div className="text-4xl mb-3">{icon}</div>
                <div className="text-lg font-bold text-gray-900">{place} Place</div>
                <div className="text-2xl font-mono font-bold text-gray-700 mt-1">{amount}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            + Special swag packs for teams ranking in top 10
          </p>
        </div>
      </section>

      {/* CTA footer */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to compete?</h2>
        <p className="text-gray-500 mb-8">
          Challenges across Web, Pwn, Crypto, Reverse Engineering and Misc.
        </p>
        <Link to="/challenges" className="btn-primary">
          View Challenges <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  )
}
