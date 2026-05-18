import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Trophy } from 'lucide-react'

export const quests = [
  { slug: 'guess-password',       num: '01', title: 'Guess the Password',  desc: 'Crack a login using logic and common password patterns.',                   difficulty: 'Easy',         points: 100 },
  { slug: 'decode-message',       num: '02', title: 'Decode the Message',  desc: 'Decipher a ROT13-encoded flag from an intercepted transmission.',           difficulty: 'Easy',         points: 120 },
  { slug: 'find-the-flag',        num: '03', title: 'Find the Flag',       desc: 'Hunt through a system log and extract the hidden flag.',                    difficulty: 'Beginner',     points: 150 },
  { slug: 'basic-steganography',  num: '04', title: 'Basic Steganography', desc: 'Discover a secret hidden in plain sight inside an ASCII poem.',             difficulty: 'Beginner',     points: 180 },
  { slug: 'simple-sql-injection', num: '05', title: 'SQL Injection',       desc: 'Bypass a vulnerable login form using a classic injection payload.',         difficulty: 'Intermediate', points: 200 },
  { slug: 'crack-the-hash',       num: '06', title: 'Crack the Hash',      desc: 'Reverse a known MD5 hash to recover the original password.',               difficulty: 'Intermediate', points: 220 },
  { slug: 'write-a-script',       num: '07', title: 'Write a Script',      desc: 'Demonstrate basic automation by writing a working Python for-loop.',        difficulty: 'Tech-Savvy',   points: 250 },
  { slug: 'debugging-101',        num: '08', title: 'Debugging 101',       desc: 'Identify and fix a bug in a broken Python script.',                        difficulty: 'Tech-Savvy',   points: 300 },
]

const mockScoreboard = [
  { rank: 1, name: 'n0ct0rn3',     solved: 8, points: 1520 },
  { rank: 2, name: 'xpl0it_girl',  solved: 7, points: 1320 },
  { rank: 3, name: 'h4cker_kid',   solved: 6, points: 1100 },
  { rank: 4, name: 'cyb3r_noob',   solved: 5, points: 870  },
  { rank: 5, name: 'zero_c00l',    solved: 4, points: 650  },
  { rank: 6, name: 'r3dteam',      solved: 3, points: 450  },
  { rank: 7, name: 'crypt0_alice', solved: 2, points: 270  },
  { rank: 8, name: 'newbie_1337',  solved: 1, points: 100  },
]

const difficultyClass = {
  'Easy':         'border-gray-700 text-gray-300 bg-gray-950',
  'Beginner':     'border-gray-700 text-gray-300 bg-gray-950',
  'Intermediate': 'border-gray-700 text-gray-200 bg-gray-950',
  'Tech-Savvy':   'border-emerald-500 text-emerald-300 bg-gray-950',
}

export default function BeginnerQuestPage() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col">

      {/* Hero */}
      <section className="w-full bg-gray-950 px-6 sm:px-12 lg:px-20 py-16 border-b border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
          <div className="flex flex-col justify-between min-h-[340px]">
            <div>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-[-0.06em] leading-[0.88] mb-6 uppercase">
                Beginner<br />Quests
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed font-medium">
                Pick a terminal-ready quest, crack it in the browser, and climb the beginner board.
                Everything here is built to feel like a live operations console.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-black/80 shadow-2xl overflow-hidden min-h-[340px]">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800 bg-gray-900/90">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-gray-500 uppercase tracking-[0.28em]">mission control</span>
              <span className="ml-auto text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">live / active / synced</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_0.8fr] gap-0">
              <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-800">
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.7)]" />
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-[0.35em]">root terminal</span>
                </div>
                <pre className="text-sm sm:text-base font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">{`root@aidefcon:~$ ./beginner.sh
[OK] quest deck loaded
[OK] hint engine armed
[OK] scoreboard synced
[OK] browser mode enabled
[READY] select a quest to begin`}</pre>
              </div>

              <div className="p-5 sm:p-6 bg-white/5">
                <div className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">signal telemetry</div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-[0.25em] mb-2">
                      <span>quest feed</span>
                      <span>74%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full w-[74%] bg-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-[0.25em] mb-2">
                      <span>hint engine</span>
                      <span>91%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full w-[91%] bg-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-[0.25em] mb-2">
                      <span>browser runtime</span>
                      <span>100%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full w-full bg-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quest Grid */}
      <section className="w-full px-6 sm:px-12 lg:px-20 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 uppercase tracking-widest">
            Choose Your Quest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-800 bg-gray-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            {quests.map((q) => (
              <Link
                key={q.slug}
                to={'/beginner/' + q.slug}
                className="group border-r border-b border-gray-800 p-6 sm:p-7 bg-gray-950 hover:bg-black transition-colors duration-150 flex flex-col min-h-[280px] relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.85)]" />
                    terminal tile
                  </div>
                  <span className={'text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ' + difficultyClass[q.difficulty]}>
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-mono text-5xl font-extrabold text-gray-800 group-hover:text-emerald-400 leading-none select-none transition-colors">
                    {q.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight uppercase group-hover:text-emerald-300 transition-colors">
                      {q.title}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed font-medium">
                      {q.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex items-center justify-between border-t border-gray-800 mt-8">
                  <span className="font-mono font-bold text-sm text-gray-500 group-hover:text-gray-200">$ reward: {q.points} pts</span>
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-emerald-300 transition-colors">
                    <span className="font-mono text-xs uppercase tracking-[0.3em]">open</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scoreboard */}
      <section className="w-full px-6 sm:px-12 lg:px-20 py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-5 h-5 text-gray-900" />
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-widest">
              Beginner Scoreboard
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-20">Rank</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Player</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Solved</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Points</th>
                </tr>
              </thead>
              <tbody>
                {mockScoreboard.map((row) => (
                  <tr
                    key={row.rank}
                    className={'border-b border-gray-200 transition-colors ' + (row.rank === 1 ? 'bg-gray-900 text-white' : 'hover:bg-gray-100')}
                  >
                    <td className="py-4 px-4 font-mono font-bold text-base">
                      {row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : '#' + row.rank}
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold">{row.name}</td>
                    <td className="py-4 px-4 text-right font-mono text-sm">{row.solved} / {quests.length}</td>
                    <td className="py-4 px-4 text-right font-mono font-extrabold text-lg">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
  )
}

