import { useState } from 'react'
import { X, Mail, Github, Chrome, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AuthModal({ onClose, onLogin }) {
  const [tab, setTab] = useState('login') // 'login' | 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSocialLogin(provider) {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ username: `${provider}_user`, provider })
    }, 1200)
  }

  function handleSendOtp(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
    }, 800)
  }

  function handleVerifyOtp(e) {
    e.preventDefault()
    if (!otp) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ username: email.split('@')[0], provider: 'email' })
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md card p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">
          Join AI Defcon CTF or continue your session
        </p>

        {/* Guest notice */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg mb-6 text-sm text-blue-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>You are currently browsing as guest. Sign in to create a team and submit flags.</span>
        </div>

        {/* Social providers */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs text-gray-400">
            <span className="bg-white px-2">or use email</span>
          </div>
        </div>

        {/* Email OTP form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                One-time password
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/, '').slice(0, 6))}
                placeholder="123456"
                className="input-field font-mono text-center tracking-widest text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Sign in'}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
