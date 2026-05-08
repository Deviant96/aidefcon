import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Users, Flag, Zap, Bell } from 'lucide-react'
import Countdown from '../components/Countdown'
import { mockAnnouncements } from '../data/mockData'

const prizes = [
  { place: '1st', amount: '$5,000', icon: '🥇', color: 'border-yellow-300 bg-yellow-50' },
  { place: '2nd', amount: '$2,500', icon: '🥈', color: 'border-gray-300 bg-gray-50' },
  { place: '3rd', amount: '$1,000', icon: '🥉', color: 'border-orange-300 bg-orange-50' },
]

const stats = [
  { label: 'Teams Registered', value: '234', icon: Users },
  { label: 'Challenges', value: '15', icon: Flag },
  { label: 'Prize Pool', value: '$8,500', icon: Trophy },
  { label: 'Hours Remaining', value: '47', icon: Zap },
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

      {/* Stats */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 font-mono">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
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

      {/* Announcements */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Bell className="w-5 h-5 text-gray-700" />
            <h2 className="section-title">Announcements</h2>
          </div>
          <div className="space-y-4">
            {mockAnnouncements.map((ann) => (
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
          </div>
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
