import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Search, TrendingUp, Clock, Users, Flag, ArrowRight } from 'lucide-react'
import { mockTeams } from '../data/mockData'

const countryFlag = (code) => {
  const flags = { US: '🇺🇸', DE: '🇩🇪', JP: '🇯🇵', KR: '🇰🇷', CN: '🇨🇳', RU: '🇷🇺', BR: '🇧🇷', IN: '🇮🇳', GB: '🇬🇧', CA: '🇨🇦', FR: '🇫🇷', NL: '🇳🇱', AU: '🇦🇺', MX: '🇲🇽', SE: '🇸🇪' }
  return flags[code] || '🌍'
}

const statusDot = (status) =>
  status === 'active'
    ? 'bg-green-400'
    : 'bg-gray-300'

function TeamModal({ team, onClose }) {
  if (!team) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg card p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold font-mono text-lg">
            #{team.rank}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {countryFlag(team.country)} {team.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <span className={`w-2 h-2 rounded-full ${statusDot(team.status)}`} />
                {team.status}
              </span>
              <span className="text-sm text-gray-500">
                <Users className="w-3.5 h-3.5 inline mr-1" />
                {team.members.length} members
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Rank', value: `#${team.rank}` },
            { label: 'Points', value: team.points.toLocaleString() },
            { label: 'Solved', value: team.solved },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="font-mono font-bold text-xl text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Members</h3>
          <div className="flex flex-wrap gap-2">
            {team.members.map((m) => (
              <span key={m} className="badge bg-gray-100 text-gray-700">{m}</span>
            ))}
          </div>
        </div>

        {team.solveHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Solves</h3>
            <div className="space-y-2">
              {team.solveHistory.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-800">{s.challenge}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-green-600 font-medium">+{s.points}</span>
                    <span className="text-gray-400 text-xs">{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ScoreboardPage() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = mockTeams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              Scoreboard
            </h1>
            <p className="text-gray-500 mt-1">{mockTeams.length} teams competing</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams..."
              className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 w-56"
            />
          </div>
        </div>

        {/* View Challenges CTA */}
        <Link
          to="/challenges"
          className="group flex items-center justify-between gap-6 w-full mb-8 px-8 py-6 rounded-2xl bg-gray-900 text-white shadow-xl hover:bg-gray-800 transition-all hover:shadow-2xl hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Flag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-0.5">Ready to play?</p>
              <p className="text-2xl font-extrabold tracking-tight">View Challenges</p>
            </div>
          </div>
          <ArrowRight className="w-7 h-7 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
        </Link>

        {/* Scoreboard table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">Rank</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Points</th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Solved</th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Last Submit</th>
                  <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((team, i) => (
                  <tr
                    key={team.id}
                    onClick={() => setSelectedTeam(team)}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      team.rank <= 3 ? 'bg-yellow-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <span className={`font-mono font-bold text-lg ${
                        team.rank === 1 ? 'text-yellow-500' :
                        team.rank === 2 ? 'text-gray-400' :
                        team.rank === 3 ? 'text-orange-500' : 'text-gray-700'
                      }`}>
                        {team.rank === 1 ? '🥇' : team.rank === 2 ? '🥈' : team.rank === 3 ? '🥉' : `#${team.rank}`}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span>{countryFlag(team.country)}</span>
                        <span className="font-semibold text-gray-900">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-mono font-bold text-gray-900">{team.points.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 text-right hidden sm:table-cell">
                      <span className="text-gray-700">{team.solved}</span>
                    </td>
                    <td className="px-4 py-4 text-right hidden md:table-cell">
                      <span className="flex items-center justify-end gap-1 text-sm text-gray-400">
                        <Clock className="w-3 h-3" />
                        {team.lastSubmission}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right hidden lg:table-cell">
                      <span className={`flex items-center justify-end gap-1.5 text-sm ${
                        team.status === 'active' ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${statusDot(team.status)}`} />
                        {team.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400">No teams found.</div>
          )}
        </div>
      </div>

      {selectedTeam && (
        <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </main>
  )
}
