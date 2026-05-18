import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { quests } from './BeginnerQuestPage'
import { ArrowLeft, CheckCircle, Terminal, ChevronDown } from 'lucide-react'

const challengeData = {
  'guess-password': {
    story: 'A restricted server login panel has been discovered. The username is "admin". Can you guess the password?',
    type: 'text-input',
    placeholder: 'Enter the password...',
    hints: [
      'It is one of the most commonly used passwords in the world.',
      'It contains only lowercase letters, exactly 8 characters.',
      'Rhymes with "bassword".',
    ],
    validate: (v) => v.trim().toLowerCase() === 'password',
  },
  'decode-message': {
    story: 'You intercepted an encoded transmission. Decode it to reveal the flag.\n\nEncoded:\nSYNT{ebg_guvegrra_vf_sha}',
    type: 'text-input',
    placeholder: 'Enter the decoded flag...',
    hints: [
      'This is a classic substitution cipher used in online forums.',
      'ROT13 shifts every letter by 13 positions in the alphabet.',
      'A → N, B → O, F → S, L → Y ...',
    ],
    validate: (v) => v.trim().toUpperCase() === 'FLAG{ROT_THIRTEEN_IS_FUN}',
  },
  'find-the-flag': {
    story: '[SYS] Boot sequence initiated...\n[SYS] Loading kernel modules... OK\n[USR] user=root connected from 192.168.1.42\n[SYS] Memory check: 8192MB... PASS\n[DATA] Packet 0x4F: FLAG{hidden_in_plain_sight}\n[SYS] Session timeout. Connection closed.',
    type: 'text-input',
    placeholder: 'Copy and paste the flag here...',
    hints: [
      'Read the log line by line.',
      'Something in the [DATA] line looks unusual.',
      'It starts with FLAG{ and ends with }.',
    ],
    validate: (v) => v.trim() === 'FLAG{hidden_in_plain_sight}',
  },
  'basic-steganography': {
    story: 'A message is hidden in this poem. Look carefully:\n\nF ire burns bright in the night sky\nL ight cuts through the endless dark\nA ll roads eventually lead somewhere\nG reat minds see what others miss',
    type: 'text-input',
    placeholder: 'Enter the hidden word...',
    hints: [
      'The secret is not in the body of the text.',
      'Try reading the poem vertically.',
      'Take the very first character of each line.',
    ],
    validate: (v) => v.trim().toUpperCase() === 'FLAG',
  },
  'simple-sql-injection': {
    story: "A login form was found on a target system. The username is \"admin\" but you don't know the password. Use SQL injection to bypass authentication.",
    type: 'sql-login',
    placeholder: "Enter password payload...",
    hints: [
      'SQL injection manipulates the database query behind the login form.',
      "You need to make the WHERE clause always evaluate to TRUE.",
      "Classic payload: ' OR '1'='1",
    ],
    validate: (v) => {
      const t = v.trim()
      return t === "' OR '1'='1" || t === "' OR 1=1--" || t === "' OR '1'='1'--" || t === "' or '1'='1"
    },
  },
  'crack-the-hash': {
    story: 'You found a hashed password in a leaked config file:\n\n5f4dcc3b5aa765d61d8327deb882cf99\n\nThis is an MD5 hash. Crack it and enter the original plaintext password.',
    type: 'text-input',
    placeholder: 'Enter the cracked value...',
    hints: [
      'MD5 hashes are reversible via rainbow table lookups.',
      'Try searching this exact hash on an online MD5 cracker.',
      "It's the #1 most commonly used password of all time.",
    ],
    validate: (v) => v.trim().toLowerCase() === 'password',
  },
  'write-a-script': {
    story: 'Write a Python script that prints the numbers 1 to 10, one per line.\n\nExpected output:\n1\n2\n3\n...\n10',
    type: 'code-input',
    placeholder: '# Write your Python script here\n',
    hints: [
      'Use a for loop to iterate over a sequence of numbers.',
      'range(1, 11) generates integers from 1 to 10 inclusive.',
      'Use print() inside the loop to output each number.',
    ],
    validate: (v) => v.includes('range') && v.includes('print'),
  },
  'debugging-101': {
    story: 'This script should print "Hello, World!" but it contains a bug. Find it, fix it, and submit the corrected code.',
    buggyCode: 'prnt("Hello, World!")',
    type: 'code-input',
    placeholder: '# Fix the code here\n',
    hints: [
      'Read the function name carefully.',
      "Python's built-in output function has a different spelling.",
      'It should be print(), not prnt().',
    ],
    validate: (v) => v.includes('print(') && v.includes('Hello, World!'),
  },
}

export default function QuestDetailPage() {
  const { slug } = useParams()
  const quest = quests.find(q => q.slug === slug)
  const challenge = challengeData[slug]

  const [input, setInput] = useState(challenge?.buggyCode || '')
  const [solved, setSolved] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)

  if (!quest || !challenge) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase">Quest Not Found</h1>
        <Link to="/beginner" className="btn-primary">Back to Quests</Link>
      </main>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (challenge.validate(input)) {
      setSolved(true)
    }
  }

  const questIndex = quests.findIndex(q => q.slug === slug)
  const nextQuest = quests[questIndex + 1]

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Top bar */}
      <div className="w-full bg-gray-900 px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between sticky top-0 z-20">
        <Link to="/beginner" className="flex items-center gap-2 text-gray-400 hover:text-white transition font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          All Quests
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-gray-600 uppercase tracking-widest hidden sm:block">{quest.difficulty}</span>
          <span className="font-mono text-sm font-bold text-white">{quest.points} pts</span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-12 py-12">

        {/* Header */}
        <div className="mb-10 border-b border-gray-200 pb-10">
          <span className="font-mono text-xs text-gray-400 uppercase tracking-[0.3em]">
            Quest {quest.num}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight uppercase mt-3 mb-4 leading-tight">
            {quest.title}
          </h1>
          <p className="text-gray-500 text-lg">{quest.desc}</p>
        </div>

        {/* Challenge terminal */}
        <div className="bg-gray-950 rounded-2xl mb-10 overflow-hidden border border-gray-800">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800 bg-gray-900">
            <Terminal className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Challenge</span>
            <div className="ml-auto flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
            </div>
          </div>
          <div className="p-6">
            <pre className="font-mono text-green-400 text-sm whitespace-pre-wrap leading-relaxed">{challenge.story}</pre>
          </div>
        </div>

        {/* Hints */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Hints — {hintsShown} of {challenge.hints.length} revealed
            </h3>
            {hintsShown < challenge.hints.length && (
              <button
                onClick={() => setHintsShown(h => h + 1)}
                className="flex items-center gap-1 text-xs font-bold text-gray-900 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-900 hover:text-white hover:border-gray-900 transition"
              >
                <ChevronDown className="w-3 h-3" /> Reveal hint
              </button>
            )}
          </div>
          <div className="space-y-2">
            {challenge.hints.map((hint, i) => (
              <div
                key={i}
                className={'border rounded-xl px-5 py-4 font-mono text-sm ' + (i < hintsShown ? 'border-gray-200 bg-white text-gray-700' : 'border-gray-100 bg-gray-50 text-gray-300')}
              >
                {i < hintsShown ? hint : 'Hint ' + (i + 1) + ' — locked'}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive input */}
        {!solved && (
          <form onSubmit={handleSubmit}>
            {challenge.type === 'sql-login' ? (
              <div className="border-2 border-gray-900 rounded-2xl p-6 mb-6">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Login Panel</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-1 block">Username</label>
                    <input value="admin" disabled className="input-field bg-gray-100 text-gray-400 font-mono cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-1 block">Password</label>
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={challenge.placeholder}
                      className="input-field font-mono"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            ) : challenge.type === 'code-input' ? (
              <div className="mb-6">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 block">Your Code</label>
                <textarea
                  rows={9}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={challenge.placeholder}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl font-mono text-sm focus:outline-none focus:border-gray-900 transition resize-none bg-gray-950 text-green-400 leading-relaxed"
                  spellCheck={false}
                  autoFocus
                />
              </div>
            ) : (
              <div className="mb-6">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 block">Your Answer</label>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={challenge.placeholder}
                  className="input-field font-mono text-lg"
                  autoFocus
                />
              </div>
            )}

            {submitted && !solved && (
              <div className="mb-4 border border-red-200 bg-red-50 rounded-xl px-5 py-3 text-red-600 font-mono text-sm">
                Incorrect — try again or reveal a hint above.
              </div>
            )}

            <button type="submit" className="btn-primary w-full text-base py-4 font-mono uppercase tracking-widest rounded-xl">
              Submit Answer
            </button>
          </form>
        )}

        {/* Solved state */}
        {solved && (
          <div className="bg-gray-900 text-white rounded-2xl p-10 text-center">
            <CheckCircle className="w-14 h-14 mx-auto mb-5 text-emerald-400" />
            <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-2">Quest Complete</h2>
            <p className="text-gray-400 font-mono mb-8">+{quest.points} points earned</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/beginner" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition">
                All Quests
              </Link>
              {nextQuest && (
                <Link to={'/beginner/' + nextQuest.slug} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
                  Next: {nextQuest.title} →
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

