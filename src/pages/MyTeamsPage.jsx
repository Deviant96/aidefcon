import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, TrendingUp, Flag, Trophy } from 'lucide-react'
import { mockTeams } from '../data/mockData'

const countryFlag = (code) => {
  const flags = { US: '🇺🇸', DE: '🇩🇪', JP: '🇯🇵', KR: '🇰🇷', CN: '🇨🇳', RU: '🇷🇺', BR: '🇧🇷', IN: '🇮🇳', GB: '🇬🇧', CA: '🇨🇦', FR: '🇫🇷', NL: '🇳🇱', AU: '🇦🇺', MX: '🇲🇽', SE: '🇸🇪' }
  return flags[code] || '🌍'
}

export default function MyTeamsPage() {
  // Mock: show first 3 teams as user's teams, first one is "current"
  const userTeams = mockTeams.slice(0, 3)
  const [selectedTeam, setSelectedTeam] = useState(userTeams[0])

  const statusDot = (status) =>
    status === 'active' ? 'bg-green-400' : 'bg-gray-300'

  return (
    <main className="h-[calc(100vh-5rem)] bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-blue-50/60 blur-3xl" />
        <div className="absolute top-24 right-12 w-96 h-96 rounded-full bg-slate-100/80 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[30rem] h-[20rem] rounded-full bg-gray-100/50 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* 3-column layout: left wing | content | right wing */}
      <div className="relative z-10 h-full mt-16 grid grid-cols-[5rem_1fr_5rem] xl:grid-cols-[7rem_1fr_7rem] items-stretch">
        {/* Left wing: My Teams title */}
        <div className="flex items-center justify-center border-r border-gray-100">
          <div className="flex flex-col items-center gap-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-900 font-display leading-none whitespace-nowrap">My Teams</h1>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">{userTeams.length} joined</span>
          </div>
        </div>

        {/* Center content */}
        <div className="h-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-gray-200 bg-white p-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display mb-2">
              Your Teams
            </h2>
            <p className="text-gray-500">Manage and track your team's progress</p>
          </div>

          {/* Teams grid + detail panel */}
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_26rem] gap-0">
            {/* Teams list grid */}
            <div className="overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
              {userTeams.map((team, idx) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`text-left p-6 rounded-xl border transition-all hover:shadow-lg hover:border-gray-300 ${
                    selectedTeam?.id === team.id ? 'ring-2 ring-blue-500 shadow-lg bg-white' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{countryFlag(team.country)}</span>
                        <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                      </div>
                      {idx === 0 && (
                        <span className="badge bg-blue-50 text-blue-700 text-xs">Current Team</span>
                      )}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${statusDot(team.status)}`} />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="font-mono font-bold text-lg text-gray-900">#{team.rank}</div>
                      <div className="text-xs text-gray-500">Rank</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="font-mono font-bold text-lg text-gray-900">{team.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="font-mono font-bold text-lg text-gray-900">{team.solved}</div>
                      <div className="text-xs text-gray-500">Solved</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {team.members.length} members
                    </span>
                    <span className={`flex items-center gap-1 ${team.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {team.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right detail panel */}
            <aside className="hidden lg:flex flex-col border-l border-gray-100 overflow-hidden">
              <div className="overflow-y-auto flex-1 p-8">
                {selectedTeam ? (
                  <>
                    {/* Team Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold font-mono text-3xl shadow">
                          #{selectedTeam.rank}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-2">
                            {countryFlag(selectedTeam.country)} {selectedTeam.name}
                          </h2>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                              <span className={`w-2.5 h-2.5 rounded-full ${statusDot(selectedTeam.status)}`} />
                              {selectedTeam.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {[
                        { label: 'Rank', value: `#${selectedTeam.rank}`, icon: Trophy },
                        { label: 'Points', value: selectedTeam.points.toLocaleString(), icon: TrendingUp },
                        { label: 'Solved', value: selectedTeam.solved, icon: Flag },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                          <Icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                          <div className="font-mono font-bold text-2xl text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Members */}
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Team Members ({selectedTeam.members.length})</h3>
                      <div className="space-y-2">
                        {selectedTeam.members.map((member) => (
                          <div key={member} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="font-mono text-sm text-gray-700">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Solves */}
                    {selectedTeam.solveHistory.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Recent Solves</h3>
                        <div className="space-y-2.5">
                          {selectedTeam.solveHistory.map((solve, i) => (
                            <div key={i} className="flex items-center justify-between text-sm p-2 border-b border-gray-50">
                              <span className="text-gray-800 font-medium">{solve.challenge}</span>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-blue-600 font-semibold">+{solve.points}</span>
                                <span className="text-gray-400 text-xs">{solve.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                    <Users className="w-12 h-12 mb-4 opacity-30" />
                    <p className="font-medium text-gray-500">Select a team</p>
                    <p className="text-sm mt-1">Details will appear here</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* Right wing: Challenges & Scoreboard */}
        <div className="flex items-center justify-center border-l border-gray-100">
          <div className="flex flex-col items-center gap-8" style={{ writingMode: 'vertical-rl' }}>
            <Link
              to="/challenges"
              className="flex flex-col items-center gap-1 group text-gray-300 hover:text-gray-900 transition-colors"
            >
              <span className="text-4xl xl:text-5xl font-extrabold tracking-tight font-display leading-none whitespace-nowrap group-hover:text-gray-900">Challenges</span>
            </Link>
            <div className="w-8 h-px bg-gray-200" />
            <Link
              to="/scoreboard"
              className="flex flex-col items-center gap-1 group text-gray-300 hover:text-gray-900 transition-colors"
            >
              <span className="text-4xl xl:text-5xl font-extrabold tracking-tight font-display leading-none whitespace-nowrap group-hover:text-gray-900">Scoreboard</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
