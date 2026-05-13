import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Users, Flag } from 'lucide-react'
import { mockTeams } from '../data/mockData'

const countryFlag = (code) => {
  const flags = { US: '🇺🇸', DE: '🇩🇪', JP: '🇯🇵', KR: '🇰🇷', CN: '🇨🇳', RU: '🇷🇺', BR: '🇧🇷', IN: '🇮🇳', GB: '🇬🇧', CA: '🇨🇦', FR: '🇫🇷', NL: '🇳🇱', AU: '🇦🇺', MX: '🇲🇽', SE: '🇸🇪' }
  return flags[code] || '🌍'
}

const statusDot = (status) =>
  status === 'active'
    ? 'bg-green-400'
    : 'bg-gray-300'


export default function ScoreboardPage() {
  const [selectedTeam, setSelectedTeam] = useState(null)

  // Auto-select rank 1 team on mount
  useEffect(() => {
    if (!selectedTeam && mockTeams.length > 0) {
      const rank1 = mockTeams.find((t) => t.rank === 1)
      if (rank1) setSelectedTeam(rank1)
    }
  }, [selectedTeam])

  return (
    <main className="h-[calc(100vh-5rem)] bg-white relative overflow-hidden">
      {/* Ambient effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-blue-50/60 blur-3xl" />
        <div className="absolute top-24 right-12 w-96 h-96 rounded-full bg-slate-100/80 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[30rem] h-[20rem] rounded-full bg-gray-100/50 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
      {/* 3-column layout: left wing | content | right wing */}
      <div className="relative z-10 h-full mt-16 grid grid-cols-[5rem_1fr_5rem] xl:grid-cols-[7rem_1fr_7rem] items-stretch">
        {/* Left wing: Scoreboard title */}
        <div className="flex items-center justify-center border-r border-gray-100">
          <div className="flex flex-col items-center gap-3" style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-900 font-display leading-none whitespace-nowrap">Scoreboard</h1>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">{mockTeams.length} teams</span>
          </div>
        </div>

        {/* Center content */}
        <div className="py-10 px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_26rem] gap-8 overflow-y-auto">
        {/* Scoreboard table */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-md">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs w-20">Rank</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Team</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Points</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs hidden sm:table-cell">Solved</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs hidden md:table-cell">Last Submit</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs hidden lg:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTeams.map((team) => (
                <tr
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedTeam?.id === team.id ? 'bg-blue-50' : ''
                  } hover:bg-gray-50`}
                >
                  <td className="px-6 py-5 font-mono font-bold text-xl text-gray-700">
                    {team.rank === 1 ? <span className="text-blue-500">#1</span> : `#${team.rank}`}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{countryFlag(team.country)}</span>
                      <span className="font-semibold text-gray-900 text-base">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-mono font-bold text-lg text-gray-900">{team.points.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right hidden sm:table-cell text-gray-700 text-base">{team.solved}</td>
                  <td className="px-6 py-5 text-right hidden md:table-cell text-gray-400">
                    <span className="flex items-center justify-end gap-1 text-sm">
                      <Clock className="w-4 h-4" />
                      {team.lastSubmission}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right hidden lg:table-cell">
                    <span className={`flex items-center justify-end gap-1.5 text-sm ${team.status === 'active' ? 'text-blue-600' : 'text-gray-400'}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${statusDot(team.status)}`} />
                      {team.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mockTeams.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-lg">No teams found.</div>
          )}
        </div>

        {/* Right detail panel */}
        <aside className="lg:sticky lg:top-24">
          <div className="border border-gray-200 rounded-2xl bg-white p-8 min-h-[24rem] shadow-md">
            {selectedTeam ? (
              <>
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold font-mono text-2xl shadow">#{selectedTeam.rank}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 font-display">
                      {countryFlag(selectedTeam.country)} {selectedTeam.name}
                    </h2>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <span className={`w-2.5 h-2.5 rounded-full ${statusDot(selectedTeam.status)}`} />
                        {selectedTeam.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Users className="w-4 h-4 inline mr-1" />
                        {selectedTeam.members.length} members
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { label: 'Rank', value: `#${selectedTeam.rank}` },
                    { label: 'Points', value: selectedTeam.points.toLocaleString() },
                    { label: 'Solved', value: selectedTeam.solved },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                      <div className="font-mono font-bold text-2xl text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-7">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Members</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.members.map((m) => (
                      <span key={m} className="badge bg-gray-100 text-gray-700 text-sm px-3 py-1">{m}</span>
                    ))}
                  </div>
                </div>

                {selectedTeam.solveHistory.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Recent Solves</h3>
                    <div className="space-y-2.5">
                      {selectedTeam.solveHistory.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-gray-50">
                          <span className="text-gray-800">{s.challenge}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-blue-600 font-semibold">+{s.points}</span>
                            <span className="text-gray-400 text-xs">{s.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full min-h-[20rem] flex flex-col items-center justify-center text-center text-gray-400">
                <Users className="w-12 h-12 mb-4 opacity-30" />
                <p className="font-medium text-gray-500 text-lg">Select a team</p>
                <p className="text-sm mt-1">Details will appear here when you click a row</p>
              </div>
            )}
          </div>
        </aside>
        </div>{/* end center content */}

        {/* Right wing: View Challenges */}
        <div className="flex items-center justify-center border-l border-gray-100">
          <Link
            to="/challenges"
            className="flex flex-col items-center gap-3 group"
            style={{writingMode: 'vertical-rl'}}
          >
            <Flag className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors" style={{writingMode: 'horizontal-tb'}} />
            <span className="text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-300 group-hover:text-gray-900 transition-colors font-display leading-none whitespace-nowrap">View Challenges</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
