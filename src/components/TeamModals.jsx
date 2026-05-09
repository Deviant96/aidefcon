import { useState } from 'react'
import { X, Copy, Check, Users } from 'lucide-react'

function generateToken() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `AIDF-${seg()}-${seg()}`
}

export function CreateTeamModal({ onClose, onTeamCreated, username }) {
  const [teamName, setTeamName] = useState('')
  const [agreed18, setAgreed18] = useState(false)
  const [agreedRules, setAgreedRules] = useState(false)
  const [token] = useState(generateToken)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onTeamCreated({ name: teamName, token, captain: username })
    }, 800)
  }

  const valid = teamName.trim() && agreed18 && agreedRules

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg card p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Team</h2>
            <p className="text-sm text-gray-500">Start competing with your crew</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. 0xDEADBEEF"
              className="input-field"
              maxLength={32}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Captain (auto-filled)
            </label>
            <input
              type="text"
              value={username || 'you'}
              className="input-field bg-gray-50 text-gray-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Access Token
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={token}
                className="input-field font-mono tracking-widest bg-gray-50 text-gray-700 flex-1"
                readOnly
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Copy token"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Share this token with teammates to let them join.</p>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed18}
                onChange={(e) => setAgreed18(e.target.checked)}
                className="mt-0.5"
              />
              <span className="text-sm text-gray-700">I confirm I am 18 years of age or older.</span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedRules}
                onChange={(e) => setAgreedRules(e.target.checked)}
                className="mt-0.5"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the{' '}
                <span className="text-blue-600 underline cursor-pointer">competition rules</span>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!valid || loading}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'Creating team...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  )
}

export function JoinTeamModal({ onClose, onTeamJoined }) {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (token.startsWith('AIDF-')) {
        onTeamJoined({ token })
      } else {
        setError('Invalid team access token. Make sure you entered it correctly.')
      }
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md card p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Join Team</h2>
            <p className="text-sm text-gray-500">Enter your team access token</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Access Token
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value.toUpperCase().slice(0, 14))}
              placeholder="AIDF-XXXX-XXXX"
              className="input-field font-mono tracking-widest"
              required
            />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>

          <p className="text-sm text-gray-500">
            Ask your team captain for the access token. It looks like:{' '}
            <code className="font-mono text-gray-700">AIDF-7KX9-PQ2M</code>
          </p>

          <button
            type="submit"
            disabled={!token || loading}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Join Team'}
          </button>
        </form>
      </div>
    </div>
  )
}
