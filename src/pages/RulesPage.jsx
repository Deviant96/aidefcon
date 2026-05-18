import { AlertTriangle, ShieldCheck, Swords, Trophy } from 'lucide-react'

const quickFacts = [
  { label: 'Minimum Age', value: '18+' },
  { label: 'Team Size', value: '1-5 Operators' },
  { label: 'Flag Prefix', value: 'AIDF{...}' },
  { label: 'Time Standard', value: 'UTC Server Time' },
]

const ruleSections = [
  {
    title: 'Eligibility',
    summary: 'Open worldwide. Participants must be at least 18 years old.',
    details: [
      'AI Defcon CTF is open to participants worldwide. By registering, you confirm you meet the age requirement.',
      'Employees, contractors, and immediate family members of organizers may join for learning but are not eligible for prizes.',
    ],
  },
  {
    title: 'Team Rules',
    summary: 'One account, one team, one captain responsible for conduct.',
    details: [
      'Teams can have 1 to 5 members. Each participant may only be on one team during the competition.',
      'Team captains are responsible for team conduct and may share their Team Access Token with teammates.',
    ],
  },
  {
    title: 'Flag Format',
    summary: 'Use the expected pattern and watch case sensitivity.',
    details: [
      'All valid flags follow this format: AIDF{...}.',
      'Unless challenge text says otherwise, flags are case-sensitive. A correct flag can be submitted by multiple teammates without penalty.',
    ],
  },
  {
    title: 'Scoring + Tie Breaks',
    summary: 'Fixed challenge points, no partial credit, earliest completion wins ties.',
    details: [
      'Points are awarded only for correct submissions. Every challenge has a fixed score and there is no partial credit.',
      'If scores are tied, the team that reached that total first (based on last valid submission timestamp) ranks higher.',
    ],
  },
  {
    title: 'Code of Conduct',
    summary: 'Respect competitors and staff. Abuse or harassment is never tolerated.',
    details: [
      'Participants must treat others with respect at all times.',
      'Harassment, discrimination, and abusive behavior can result in disqualification and removal from future events.',
    ],
  },
  {
    title: 'Prize Policy',
    summary: 'Winning teams must verify identity. Organizer decisions are final.',
    details: [
      'Prize winners must provide valid identification. Prizes are non-transferable and may be subject to local taxes.',
      'AI Defcon may delay or withhold prizes during rule violation investigations. Final decisions rest with organizers.',
    ],
  },
]

const prohibited = [
  'Attacking competition infrastructure',
  "Disrupting another team's progress",
  'Sharing flags or complete solutions publicly during the event',
  'Automated brute force attacks against flag submission',
  'Exploiting vulnerabilities in the platform itself',
  'Creating multiple accounts to gain unfair advantage',
]

export default function RulesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100 pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.18),transparent_42%),radial-gradient(circle_at_80%_22%,rgba(14,165,233,0.18),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.14),transparent_42%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-900/10 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.22em] text-white">
                <ShieldCheck className="h-3.5 w-3.5" />
                Official Rulebook
              </p>
              <h1 className="max-w-2xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Competition Protocols For Fair And High-Signal Play
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Read this before you launch challenges. Registration and participation imply acceptance of every rule below.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-cyan-50 p-5">
              <p className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
                <Trophy className="h-4 w-4 text-amber-500" />
                Mission Snapshot
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {quickFacts.map((item) => (
                  <li key={item.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-[0_14px_40px_rgba(190,24,93,0.12)] lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-rose-700">
              <AlertTriangle className="h-4 w-4" />
              Prohibited Actions
            </p>
            <ul className="space-y-3">
              {prohibited.map((item, idx) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-rose-200 bg-white px-3 py-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-600 text-xs font-mono font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-rose-700">
              Violations can result in immediate disqualification and bans from future competitions.
            </p>
          </aside>

          <div className="space-y-4">
            {ruleSections.map((section, idx) => (
              <article
                key={section.title}
                className="animate-slide-up rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.08)] sm:p-7"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="flex items-center gap-3 text-xl font-black text-slate-900">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-mono text-white">
                      {idx + 1}
                    </span>
                    {section.title}
                  </h2>
                  <span className="mt-1 rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-cyan-700">
                    Required
                  </span>
                </div>

                <p className="mb-3 text-sm font-semibold text-slate-800">{section.summary}</p>
                <div className="space-y-2">
                  {section.details.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-900/10 bg-slate-900 p-5 text-center text-sm text-slate-200 sm:p-6">
          <p className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.14em] text-cyan-300">
            <Swords className="h-4 w-4" />
            Rule Enforcement Is Active
          </p>
          <p className="mt-2 text-slate-300">
            Last updated: May 2025. Questions: 
            <a href="mailto:rules@aidefcon.io" className="font-semibold text-amber-300 underline decoration-amber-500/60 underline-offset-2">
              rules@aidefcon.io
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
