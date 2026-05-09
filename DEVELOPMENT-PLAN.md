# AI Defcon — Development Plan

This document tracks the implementation progress for the AI Defcon CTF platform prototype.
The specification is defined in [`AI-DEFCON-CTF-SPEC.md`](./AI-DEFCON-CTF-SPEC.md).

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | TailwindCSS v3 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Data | Mock (in-memory) |

---

## Phase 1 — Prototype MVP ✅

### Project Setup
- [x] Initialize Vite + React project
- [x] Configure TailwindCSS with custom theme (Inter font, brand colors, animations)
- [x] Set up React Router for SPA navigation
- [x] Create mock data layer (`src/data/mockData.js`)
  - [x] 15 mock challenges (Web, Pwn, Crypto, Reverse, Misc)
  - [x] 15 mock teams with scores, members, solve history
  - [x] Mock announcements
  - [x] Mock FAQ entries
  - [x] Difficulty color mapping and category icons
- [x] Create base CSS with reusable component classes (`.btn-primary`, `.card`, `.badge`, etc.)

### Layout & Navigation
- [x] Fixed top navbar (`Navbar.jsx`)
  - [x] Logo with shield icon
  - [x] Navigation links: Rules, FAQ, Beginner Quest
  - [x] FAQ opens as sidebar popup
  - [x] Sign In / user profile button (top right)
  - [x] Mobile-responsive hamburger menu

### Homepage (`/`)
- [x] "Competition is live" status badge
- [x] Large hero title: `AI DEFCON`
- [x] Subtitle tagline
- [x] CTA buttons: Register Team / Create Team, Join Team, Scoreboard
- [x] Guest-aware CTA (shows auth modal if not logged in)
- [x] Live countdown timer (HRS : MIN : SEC)
- [x] Competition stats bar (teams, challenges, prize pool, hours remaining)
- [x] Prize section (1st–3rd place cards)
- [x] Announcements feed (pinned, urgent badges)
- [x] Footer CTA linking to Challenges page

### Scoreboard Page (`/scoreboard`)
- [x] Rankings table with columns: Rank, Team, Points, Solved, Last Submit, Status
- [x] Medal icons for top 3 (🥇🥈🥉)
- [x] Country flag display
- [x] Active/idle status indicator
- [x] Team search/filter
- [x] Clickable rows → Team detail modal
- [x] Team modal: name, rank, points, members, solve history
- [x] Fully responsive (columns hide on smaller screens)

### Challenges Page (`/challenges`)
- [x] Three-column layout: Categories | Challenge List | Challenge Detail
- [x] Category sidebar with solve progress (e.g., `2/3`)
- [x] Challenge list with difficulty badge, title, points, solve count
- [x] Active challenge highlighting
- [x] Challenge detail panel (right column):
  - [x] Title, category, difficulty, points, solve count
  - [x] Full description
  - [x] Tags
  - [x] File attachments (download buttons)
  - [x] Hint toggle (show/hide)
  - [x] Flag submission form
  - [x] Mock submission feedback (success / fail states)
  - [x] Guest lock — prompts sign in for submission
- [x] Mobile: detail panel as slide-up bottom sheet

### Rules Page (`/rules`)
- [x] 8 rule sections: Eligibility, Team Rules, Flag Format, Scoring, Prohibited Actions, Tie-Breaking, Code of Conduct, Prize Policy
- [x] Numbered section cards
- [x] Contact footer

### FAQ Sidebar
- [x] Right-side slide-in panel (accessible from any page)
- [x] Accordion-style FAQ items
- [x] 8 FAQ topics covering competition basics, registration, teams, flag format, prizes

### Authentication (Mock)
- [x] Auth modal with guest notice banner
- [x] Social login buttons: Google, GitHub (mock 1.2s delay → logged in)
- [x] Email OTP flow: enter email → send OTP → enter code → logged in
- [x] App-wide guest/logged-in state

### Team System (Mock)
- [x] Create Team modal
  - [x] Team name input
  - [x] Captain auto-filled from logged-in user
  - [x] Auto-generated access token (`AIDF-XXXX-XXXX` format)
  - [x] Copy token to clipboard
  - [x] Age confirmation checkbox
  - [x] Rules agreement checkbox
- [x] Join Team modal
  - [x] Token input (uppercase, 14-char format)
  - [x] Mock validation (must start with `AIDF-`)
  - [x] Error messaging for invalid tokens

### Profile Page (`/profile`)
- [x] Avatar (initial letter)
- [x] Username, login provider, join date
- [x] Team name and role
- [x] Stats: solved count, points, rank, team size
- [x] Solved challenges list with points
- [x] Sign out button

---

## Phase 2 — Backend Integration (Planned)

### WordPress Backend
- [ ] Set up WordPress with custom plugin: `aidefcon-core`
- [ ] Custom REST API endpoints:
  - [ ] `POST /wp-json/aidefcon/v1/auth/otp-request`
  - [ ] `POST /wp-json/aidefcon/v1/auth/otp-verify`
  - [ ] `GET /wp-json/aidefcon/v1/challenges`
  - [ ] `POST /wp-json/aidefcon/v1/challenges/{id}/submit`
  - [ ] `GET /wp-json/aidefcon/v1/scoreboard`
  - [ ] `POST /wp-json/aidefcon/v1/teams`
  - [ ] `POST /wp-json/aidefcon/v1/teams/join`
  - [ ] `GET /wp-json/aidefcon/v1/profile`
- [ ] Custom DB tables: `aidf_teams`, `aidf_members`, `aidf_submissions`
- [ ] WordPress custom post types: `aidf_challenge`, `aidf_announcement`

### Real Authentication
- [ ] WordPress OAuth: Google login integration
- [ ] WordPress OAuth: GitHub login integration
- [ ] Email OTP via SMTP plugin
- [ ] JWT session management

### Admin Dashboard
- [ ] Competition settings (enable/disable submissions, scoreboard freeze, countdown date)
- [ ] Challenge CRUD with file upload
- [ ] Announcement management (pin, urgent, schedule)
- [ ] Team management (ban, remove members, regenerate tokens)
- [ ] Submission logs and audit history

---

## Phase 3 — Advanced Features (Future)

- [ ] Live scoreboard via WebSockets
- [ ] Real-time solve notifications / activity feed
- [ ] Dynamic scoring (points decrease as more teams solve)
- [ ] Challenge unlock chains
- [ ] Achievement badges
- [ ] Beginner Quest tutorial path
- [ ] Writeup submission system
- [ ] Team chat
- [ ] Anti-cheat / rate limiting
- [ ] Admin analytics dashboard
- [ ] Dockerized isolated challenge infrastructure
- [ ] IP monitoring

---

## File Structure

```
aidefcon/
├── AI-DEFCON-CTF-SPEC.md       # Product specification
├── DEVELOPMENT-PLAN.md          # This file
├── index.html                   # Entry HTML
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # App entry
    ├── App.jsx                  # Root component + routing + global state
    ├── index.css                # Tailwind base + custom component classes
    ├── data/
    │   └── mockData.js          # All mock data (challenges, teams, FAQs, etc.)
    ├── components/
    │   ├── Navbar.jsx           # Fixed top navigation bar
    │   ├── Countdown.jsx        # Live countdown timer
    │   ├── AuthModal.jsx        # Login modal (social + email OTP)
    │   ├── TeamModals.jsx       # Create Team / Join Team modals
    │   └── FaqSidebar.jsx       # FAQ right-side panel
    └── pages/
        ├── HomePage.jsx         # Landing page
        ├── ScoreboardPage.jsx   # Rankings + team modal
        ├── ChallengesPage.jsx   # Challenge browser + detail panel
        ├── RulesPage.jsx        # Competition rules
        └── ProfilePage.jsx      # User profile + stats
```
