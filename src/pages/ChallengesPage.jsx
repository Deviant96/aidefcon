import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Flag,
  Download,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Lock,
} from 'lucide-react'
import {
  mockChallenges,
  CATEGORIES,
} from '../data/mockData'
import useAnnouncements from '../hooks/useAnnouncements'

const CHALLENGE_CHIP_NEUTRAL = 'bg-slate-100 text-slate-700'
const CATEGORY_ICON_COLOR = 'text-sky-600'

function ChallengeDetail({ challenge, isGuest, onAuthClick }) {
  const [flagInput, setFlagInput] = useState('')
  const [submitState, setSubmitState] = useState(null) // null | 'success' | 'fail'
  const [hintVisible, setHintVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!challenge) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
        <Flag className="w-12 h-12 mb-4 opacity-30" />
        <p className="font-medium text-gray-500">Select a challenge</p>
        <p className="text-sm mt-1">Click any challenge to view details</p>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!flagInput.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      // Mock: any flag starting with AIDF{ is "correct"
      if (flagInput.trim().startsWith('AIDF{') && flagInput.trim().endsWith('}')) {
        setSubmitState('success')
      } else {
        setSubmitState('fail')
      }
      setFlagInput('')
      setTimeout(() => setSubmitState(null), 3000)
    }, 700)
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge bg-gray-100 text-gray-700 text-xs">
            <Flag className={`w-3.5 h-3.5 mr-1 ${CATEGORY_ICON_COLOR}`} />
            {challenge.category}
          </span>
          <span className={`badge text-xs ${CHALLENGE_CHIP_NEUTRAL}`}>
            {challenge.difficulty}
          </span>
          <span className={`badge text-xs font-mono ${CHALLENGE_CHIP_NEUTRAL}`}>
            {challenge.points} pts
          </span>
          {challenge.solved && (
            <span className="badge bg-green-50 text-green-700 text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Solved
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{challenge.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {challenge.solveCount} teams solved
        </p>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{challenge.description}</p>
      </div>

      {/* Tags */}
      {challenge.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {challenge.tags.map((tag) => (
            <span key={tag} className="badge bg-gray-100 text-gray-600 font-mono text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Files */}
      {challenge.files.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h3>
          <div className="space-y-2">
            {challenge.files.map((f) => (
              <button
                key={f}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      {challenge.hint && (
        <div>
          <button
            onClick={() => setHintVisible(!hintVisible)}
            className="flex items-center gap-2 text-sm font-medium text-yellow-700 hover:text-yellow-900 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {hintVisible ? 'Hide hint' : 'Show hint'}
          </button>
          {hintVisible && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              {challenge.hint}
            </div>
          )}
        </div>
      )}

      {/* Flag submission */}
      <div className="border-t border-gray-200 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Submit Flag</h3>

        {isGuest ? (
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <Lock className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Sign in to submit flags</p>
            <button onClick={onAuthClick} className="btn-primary text-sm py-2">
              Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              placeholder="AIDF{flag_here}"
              className="input-field font-mono text-sm"
            />
            <button
              type="submit"
              disabled={submitting || !flagInput.trim()}
              className="btn-primary text-sm disabled:opacity-50 w-full justify-center"
            >
              {submitting ? 'Checking...' : 'Submit Flag'}
            </button>

            {submitState === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Correct! Flag accepted. +{challenge.points} points added.
              </div>
            )}
            {submitState === 'fail' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                Incorrect flag. Keep trying!
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default function ChallengesPage({ isGuest, onAuthClick }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const { announcements, loading: announcementsLoading, error: announcementsError } = useAnnouncements()

  const categories = ['All', ...CATEGORIES]

  const filtered =
    activeCategory === 'All'
      ? mockChallenges
      : mockChallenges.filter((c) => c.category === activeCategory)

  const totalSolved = mockChallenges.filter((c) => c.solved).length

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
        {/* Left wing: Challenges title */}
        <div className="flex items-center justify-center border-r border-gray-100">
          <div className="flex flex-col items-center gap-3" style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-900 font-display leading-none whitespace-nowrap">Challenges</h1>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">{mockChallenges.length} total</span>
          </div>
        </div>


        {/* Main content grid: categories | challenge list + announcements | detail */}
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-[16rem_1fr_28rem]">
          {/* Categories nav */}
          <aside className="hidden md:block border-r border-gray-100 bg-gray-50/60 h-full overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-gray-700 mb-5">Categories</h3>
              <nav className="flex flex-col gap-3">
                {categories.map((cat) => {
                  const count =
                    cat === 'All'
                      ? mockChallenges.length
                      : mockChallenges.filter((c) => c.category === cat).length
                  const solved =
                    cat === 'All'
                      ? totalSolved
                      : mockChallenges.filter((c) => c.category === cat && c.solved).length
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat)
                        setSelectedChallenge(null)
                      }}
                      className={`flex items-center justify-between px-5 py-3 rounded-xl text-lg font-bold transition-colors ${
                        activeCategory === cat
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="leading-none inline-flex items-center gap-2">
                        {cat !== 'All' && <Flag className={`w-4 h-4 ${CATEGORY_ICON_COLOR}`} />}
                        {cat}
                      </span>
                      <span className="text-sm font-mono opacity-70">{solved}/{count}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Center: challenge list + announcements */}
          <div className="flex flex-col h-full overflow-hidden min-h-0">
            <div className="flex-1 min-h-0 p-6 flex flex-col lg:flex-col gap-6 lg:gap-12 overflow-hidden">
              {/* Challenge list */}
              <div className="min-h-0 overflow-y-scroll max-h-[50vh] pr-1">
                <h3 className="text-lg font-bold text-gray-700 mb-3">Challenges</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filtered.map((challenge) => (
                    <button
                      key={challenge.id}
                      onClick={() => setSelectedChallenge(challenge)}
                      className={`text-left p-5 rounded-xl border border-gray-200 transition-all hover:shadow-lg hover:border-gray-300 ${
                        selectedChallenge?.id === challenge.id ? 'ring-2 ring-blue-500 shadow-lg' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`badge text-sm ${CHALLENGE_CHIP_NEUTRAL}`}>{challenge.difficulty}</span>
                        <span className={`badge text-sm font-mono ${CHALLENGE_CHIP_NEUTRAL}`}>{challenge.points} pts</span>
                        {challenge.solved && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="font-bold text-gray-900 text-lg mb-1">{challenge.title}</p>
                      <p className="text-sm text-gray-500 font-mono">{challenge.solveCount} solves</p>
                    </button>
                  ))}
                </div>
              </div>
              {/* Announcements placeholder */}
              <div className="flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-700 mb-3">Announcements</h3>
                <div className="space-y-3 overflow-y-scroll pr-1">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className={`p-4 rounded-xl border shadow ${
                        ann.urgent
                          ? 'bg-gradient-to-r from-red-50 to-white border-red-100'
                          : 'bg-gradient-to-r from-blue-50 to-white border-blue-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {ann.pinned && (
                              <span className="badge bg-gray-900 text-white text-xs">Pinned</span>
                            )}
                            {ann.urgent && (
                              <span className="badge bg-red-100 text-red-700 text-xs">Urgent</span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-900">{ann.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{ann.content}</p>
                        </div>
                        <span className="text-xs font-mono text-gray-400 whitespace-nowrap">{ann.time}</span>
                      </div>
                    </div>
                  ))}
                  {!announcementsLoading && !announcementsError && announcements.length === 0 && (
                    <p className="text-sm text-gray-500">No announcements published yet.</p>
                  )}
                  {announcementsError && (
                    <p className="text-sm text-red-600">Announcements are currently unavailable.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: challenge detail or 3D placeholder */}
          <aside className="hidden md:flex flex-col border-l border-gray-100 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{zIndex:0}}>
              {!selectedChallenge && (
                <div className="w-72 h-72 bg-gradient-to-br from-blue-200 via-white to-gray-100 rounded-3xl shadow-2xl flex flex-col items-center justify-center opacity-80 blur-[1px]">
                  <span className="text-6xl font-extrabold text-blue-400 drop-shadow-lg mb-4">?</span>
                  <span className="text-xl font-bold text-gray-400">Select a challenge</span>
                  <span className="text-base text-gray-400 mt-2">Challenge details will appear here</span>
                </div>
              )}
            </div>
            <div className="overflow-y-auto flex-1 relative z-10">
              {selectedChallenge && (
                <ChallengeDetail
                  challenge={selectedChallenge}
                  isGuest={isGuest}
                  onAuthClick={onAuthClick}
                />
              )}
            </div>
          </aside>
        </div>

        {/* Right wing: Scoreboard & My Teams */}
        <div className="flex items-center justify-center border-l border-gray-100">
          <div className="flex flex-row items-center gap-16" style={{writingMode: 'vertical-rl'}}>
            <Link
              to="/scoreboard"
              className="flex flex-col items-center gap-1 group text-gray-300 hover:text-gray-900 transition-colors"
            >
              <span className="text-4xl xl:text-5xl font-extrabold tracking-tight font-display leading-none whitespace-nowrap group-hover:text-gray-900">Scoreboard</span>
            </Link>
            <div className="w-8 h-px bg-gray-200" />
            <Link
              to="/my-teams"
              className="flex flex-col items-center gap-1 group text-gray-300 hover:text-gray-900 transition-colors"
            >
              <span className="text-4xl xl:text-5xl font-extrabold tracking-tight font-display leading-none whitespace-nowrap group-hover:text-gray-900">My Teams</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: detail panel slide-up when challenge selected */}
      {selectedChallenge && (
        <div className="lg:hidden fixed inset-0 z-40 flex items-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedChallenge(null)}
          />
          <div className="relative w-full bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Challenge Detail</span>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100"
              >
                <span className="text-gray-500 text-lg leading-none">×</span>
              </button>
            </div>
            <ChallengeDetail
              challenge={selectedChallenge}
              isGuest={isGuest}
              onAuthClick={onAuthClick}
            />
          </div>
        </div>
      )}
    </main>
  )
}
