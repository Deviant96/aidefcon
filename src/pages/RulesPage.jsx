import { Shield } from 'lucide-react'

const sections = [
  {
    title: 'Eligibility',
    content: `AI Defcon CTF is open to participants worldwide. You must be at least 18 years of age to register and participate. By registering, you confirm that you meet this age requirement.

Employees, contractors, and immediate family members of AI Defcon organizers are not eligible to win prizes but may participate for educational purposes.`,
  },
  {
    title: 'Team Rules',
    content: `Teams may consist of 1 to 5 members. Each participant may only be on one team during the competition. Teams must be registered prior to the competition end time to be eligible for prizes.

Team captains are responsible for their team's conduct. Captains may share their unique Team Access Token with teammates to allow them to join.`,
  },
  {
    title: 'Flag Format',
    content: `All flags follow the format: AIDF{...}

Unless explicitly stated otherwise in the challenge description, flags are case-sensitive. Submitting a flag does not consume it — multiple team members may submit the same flag without penalty.`,
  },
  {
    title: 'Scoring',
    content: `Points are awarded upon correct flag submission. Each challenge has a fixed point value displayed on the challenge card. There is no partial credit.

In the event of a tie, the team that reached their score first (based on last valid submission timestamp) will be ranked higher.`,
  },
  {
    title: 'Prohibited Actions',
    content: `The following actions are strictly prohibited:

• Attacking the competition infrastructure
• Attempting to disrupt other teams' progress
• Sharing flags or solutions publicly during the competition
• Using automated brute-force attacks against flag submission
• Exploiting vulnerabilities in the competition platform itself
• Creating multiple accounts to gain unfair advantages

Violations may result in immediate disqualification and banning from future events.`,
  },
  {
    title: 'Tie-Breaking',
    content: `In the event of tied scores, ranking is determined by the timestamp of the last correct flag submission. The team that achieved the tied score earlier will be ranked higher.

All timestamps are recorded in UTC and are final as determined by the competition server.`,
  },
  {
    title: 'Code of Conduct',
    content: `All participants must treat fellow competitors and organizers with respect. Harassment, discrimination, or abusive behavior of any kind will not be tolerated.

By participating, you agree to maintain the spirit of fair competition and uphold the integrity of the CTF community.`,
  },
  {
    title: 'Prize Policy',
    content: `Prize-winning teams must provide valid identification to claim prizes. Prizes are non-transferable. Prize distribution may be subject to applicable taxes in the winner's jurisdiction.

AI Defcon reserves the right to withhold prizes in cases of suspected rule violations pending investigation. Prize decisions made by organizers are final.`,
  },
]

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden pt-24 pb-16 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-gray-100/70 blur-3xl" />
        <div className="absolute top-24 right-12 w-72 h-72 rounded-full bg-slate-100/80 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-gray-900" />
          <h1 className="text-3xl font-bold text-gray-900">Competition Rules</h1>
        </div>
        <p className="text-gray-500 mb-10">
          Please read all rules carefully before participating. By registering, you agree to abide by these rules.
        </p>

        {/* Rules sections */}
        <div className="space-y-8">
          {sections.map(({ title, content }, i) => (
            <section key={i} className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-mono">
                  {i + 1}
                </span>
                {title}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 p-5 bg-gray-50 rounded-xl text-sm text-gray-500 text-center">
          Last updated: May 2025 · Questions? Contact{' '}
          <a href="mailto:rules@aidefcon.io" className="text-gray-800 underline">
            rules@aidefcon.io
          </a>
        </div>
      </div>
    </main>
  )
}
