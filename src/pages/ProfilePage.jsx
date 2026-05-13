import { User, Trophy, Flag, Calendar, Shield, LogOut, Star } from 'lucide-react'
import { mockChallenges } from '../data/mockData'

export default function ProfilePage({ user, team, onLogout }) {
  const solved = mockChallenges.filter((c) => c.solved)
  const totalPoints = solved.reduce((sum, c) => sum + c.points, 0)

  if (!user) {
    return (
      <main className="min-h-screen bg-white relative overflow-hidden pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-gray-100/70 blur-3xl" />
          <div className="absolute top-24 right-12 w-72 h-72 rounded-full bg-slate-100/80 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>
        <div className="relative z-10 text-center">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden pt-24 pb-16 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-gray-100/70 blur-3xl" />
        <div className="absolute top-24 right-12 w-72 h-72 rounded-full bg-slate-100/80 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
      <div className="relative z-10">
        {/* Profile header */}
        <div className="card p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {user.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                via {user.provider}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Joined May 2025
              </span>
              {team && (
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  {team.name} · Captain
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="btn-ghost text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Solved', value: solved.length, icon: Flag },
            { label: 'Points', value: totalPoints, icon: Star },
            { label: 'Rank', value: team ? '#1' : '--', icon: Trophy },
            { label: 'Team Size', value: team ? 1 : '--', icon: User },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-4 text-center">
              <Icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="font-mono font-bold text-2xl text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Solved challenges */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Solved Challenges
          </h2>
          {solved.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No challenges solved yet.</p>
          ) : (
            <div className="space-y-3">
              {solved.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.category} · {c.difficulty}</p>
                  </div>
                  <span className="font-mono font-bold text-green-600 text-sm">+{c.points}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
