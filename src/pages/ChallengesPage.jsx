import { useState } from 'react'
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
  DIFFICULTY_COLORS,
  CATEGORY_ICONS,
} from '../data/mockData'

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
            {CATEGORY_ICONS[challenge.category]} {challenge.category}
          </span>
          <span className={`badge text-xs ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          <span className="badge bg-blue-50 text-blue-700 text-xs font-mono">
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

  const categories = ['All', ...CATEGORIES]

  const filtered =
    activeCategory === 'All'
      ? mockChallenges
      : mockChallenges.filter((c) => c.category === activeCategory)

  const totalSolved = mockChallenges.filter((c) => c.solved).length

  return (
    <main className="pt-16 h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Categories */}
        <aside className="w-48 border-r border-gray-200 bg-gray-50/50 flex-shrink-0 overflow-y-auto p-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2 mt-2">
            Categories
          </p>
          <nav className="space-y-0.5">
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
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    activeCategory === cat
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>
                    {cat !== 'All' && `${CATEGORY_ICONS[cat]} `}
                    {cat}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      activeCategory === cat ? 'text-gray-300' : 'text-gray-400'
                    }`}
                  >
                    {solved}/{count}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Middle: Challenge list */}
        <div className="flex-1 overflow-y-auto border-r border-gray-200 min-w-0">
          <div className="px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h1 className="font-bold text-gray-900">
              {activeCategory === 'All' ? 'All Challenges' : `${CATEGORY_ICONS[activeCategory]} ${activeCategory}`}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{filtered.length} challenges</p>
          </div>
          <div className="divide-y divide-gray-100">
            {filtered.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                  selectedChallenge?.id === challenge.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`badge text-xs ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.solved && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm truncate">{challenge.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">{challenge.points} pts · {challenge.solveCount} solves</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Challenge detail */}
        <div className="hidden lg:flex w-96 xl:w-[480px] flex-col flex-shrink-0 overflow-hidden">
          <ChallengeDetail
            challenge={selectedChallenge}
            isGuest={isGuest}
            onAuthClick={onAuthClick}
          />
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
