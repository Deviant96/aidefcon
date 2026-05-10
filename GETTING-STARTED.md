# AI Defcon — Getting Started Guide

Welcome to **AI Defcon**, a modern CTF (Capture The Flag) competition platform prototype. This guide walks you through setup, running the app, and using its features.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [WordPress Backend Setup](#wordpress-backend-setup)
4. [Running the Application](#running-the-application)
5. [Features & Usage](#features--usage)
6. [Admin Dashboard Guide](#admin-dashboard-guide)
7. [Testing the App](#testing-the-app)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+) and npm
- **PHP** (v7.4+) for WordPress backend
- **MySQL** database (via Laragon, XAMPP, or equivalent)
- **WordPress 6.0+** installation in your web root
- **Git** (for version control)

### Quick Check

```bash
node --version      # Should be v16.0.0 or higher
npm --version       # Should be v7.0.0 or higher
php --version       # Should be 7.4 or higher
mysql --version     # Should be available
```

---

## Frontend Setup

The React/Vite frontend is located in `c:\laragon\www\aidefcon`.

### 1. Install Dependencies

```bash
cd c:\laragon\www\aidefcon
npm install
```

This installs all required packages:
- **React 18** — UI framework
- **Vite 5** — Build tool
- **TailwindCSS 3** — Styling
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **React Router 6** — Navigation

### 2. Verify Installation

```bash
npm run build
```

This should complete without errors.

---

## WordPress Backend Setup

The WordPress plugin is located in `wordpress/wp-content/plugins/aidefcon-core/`.

### 1. Activate the Plugin

1. Log in to your WordPress admin dashboard (typically at `http://localhost/wordpress/wp-admin` if using Laragon)
2. Go to **Plugins** > **Installed Plugins**
3. Find **AI Defcon Core** and click **Activate**

**What happens on activation:**
- Creates custom database tables: `wp_aidf_teams`, `wp_aidf_members`, `wp_aidf_submissions`, `wp_aidf_audit_logs`
- Registers custom post types: `aidf_challenge` (with menu icon), `aidf_announcement`
- Registers REST API endpoints under `/wp-json/aidefcon/v1/`
- Creates admin menu under `AI Defcon` dashboard

### 2. Verify Plugin Is Active

1. Go to WordPress Admin
2. In left sidebar, you should see **AI Defcon** menu with submenus:
   - Competition Settings
   - Team Management
   - Submission Logs

---

## Running the Application

### Production Mode (Recommended)

The React app is built and served directly through WordPress as a theme:

**1. Activate the AI Defcon Theme**

1. Log in to WordPress admin at **http://localhost/wordpress/wp-admin**
2. Go to **Appearance** > **Themes**
3. Find **AI Defcon** theme and click **Activate**

**2. Access the App**

Open **http://localhost/wordpress** in your browser. You should see the AI Defcon homepage with:
- Large hero title
- Countdown timer (mock)
- CTA buttons (Register Team, Join Team, Scoreboard)
- Announcements feed

All routing is handled by React Router on the client side—no page reloads occur as you navigate.

### Development Mode (Local Changes)

If you're actively developing the React frontend and want hot-reload, use the separate dev server:

```bash
npm run dev
```

Expected output:
```
  VITE v5.2.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Then open **http://localhost:5173/** to see changes instantly as you edit code.

**Note:** The dev server and production WordPress theme are separate. Changes in dev mode don't affect the production build until you run `npm run build` again.

### Building for Production

After making changes during development, rebuild the static files:

```bash
npm run build
```

Then copy the updated files to the WordPress theme:

```bash
cp -r dist/* wordpress/wp-content/themes/aidefcon/
```

Refresh **http://localhost/wordpress** to see the updated app.

### Backend API (WordPress)

The React app calls REST API endpoints at:
```
http://localhost/wordpress/wp-json/aidefcon/v1/
```

Example endpoints:
- `GET /challenges` → List all challenges
- `GET /scoreboard` → Get team rankings
- `POST /auth/otp-request` → Request OTP
- `POST /auth/otp-verify` → Verify OTP code

---

## Features & Usage

### 1. **Homepage** (`/`)

**What it shows:**
- Competition status ("Competition is live")
- Hero title and CTA buttons
- Live countdown timer (12 hours remaining)
- Competition stats (15 teams, 15 challenges, $20k prize pool)
- Prize cards (1st, 2nd, 3rd place)
- Announcements feed with pinned/urgent badges

**Actions:**
- Click **Rules** → View competition rules
- Click **FAQ** → Open FAQ sidebar
- Click **Register Team** → Opens auth modal if guest; creates team modal if logged in
- Click **Join Team** → Opens join team modal (requires login)
- Click **Scoreboard** → Navigate to rankings page

### 2. **Scoreboard** (`/scoreboard`)

**What it shows:**
- Leaderboard table with columns:
  - Rank (with medals for top 3: 🥇🥈🥉)
  - Team Name
  - Points
  - Challenges Solved
  - Last Submission Time
  - Status (Active/Idle)
  - Country flag emoji

**Actions:**
- Click any team row → Opens team detail modal with:
  - Team name, rank, points
  - Member list
  - Recent solve history
- Search/filter teams (click search icon)

### 3. **Challenges** (`/challenges`)

**Layout:**
- Left: Challenge categories sidebar (Web, Pwn, Crypto, Reverse, Misc) with solve counts
- Middle: Challenge list (shows title, points, difficulty, solve count)
- Right: Challenge detail panel (description, hint, submission form)

**Actions:**
- Click category → Filter challenges
- Click challenge → Load details in right panel
- Toggle hint → Reveal hint text
- Enter flag → Submit flag form
  - If guest: Prompts to sign in
  - If logged in: Shows success/fail response (mock)
- On success: Displays "Correct flag! +100 points"

### 4. **Rules** (`/rules`)

**What it shows:**
- 8 rule sections:
  1. Eligibility
  2. Team Rules
  3. Flag Format
  4. Scoring
  5. Prohibited Actions
  6. Tie-Breaking
  7. Code of Conduct
  8. Prize Policy

### 5. **Profile** (`/profile`)

**What it shows (when logged in):**
- Avatar (user's initial)
- Username, email, login provider
- Join date
- Team name and role (Captain/Member)
- Stats: Challenges solved, total points, rank, team size
- List of solved challenges with points

**Actions:**
- Click **Sign Out** → Logs out user

### 6. **Authentication**

**Guest Mode:**
- Browse challenges, scoreboard, rules without login
- Cannot create/join team or submit flags

**Login Options (Mock):**
1. **Google** → Simulates 1.2s delay, then logged in
2. **GitHub** → Simulates 1.2s delay, then logged in
3. **Email OTP** → Enter email, receive OTP, verify code

### 7. **Team System (Mock)**

**Create Team:**
- Click **Register Team** → Enter team name
- Auto-fills captain name from logged-in user
- Auto-generates access token (e.g., `AIDF-7KX9-PQ2M`)
- Copy token to clipboard
- Confirm age & rules checkboxes
- Click **Create** → Team created

**Join Team:**
- Click **Join Team** → Enter team access token
- Token must match format: `AIDF-XXXX-XXXX`
- Click **Join** → Joined team

---

## Admin Dashboard Guide

### Access

1. Log in to WordPress as admin
2. In left sidebar, click **AI Defcon**

### Submenus

#### **Competition Settings**

Manage event controls:

- **Enable submissions** — Toggle to pause flag submissions
- **Freeze scoreboard** — Toggle to hide live score updates
- **Open registration** — Toggle to close new user registrations
- **Open challenge access** — Toggle to restrict challenge browsing
- **Event countdown date** — Set event end date/time

**Example:** Before an event ends, check "Freeze scoreboard" to prevent score changes during announcement.

#### **AI Defcon Challenges** (Challenge CRUD)

Manage individual challenges (using WordPress CPT UI):

1. Click **AI Defcon** > **Challenges**
2. Click **Add New Challenge**
3. Fill in:
   - **Title:** Challenge name (e.g., "SQLi Warmup")
   - **Description:** Full challenge text (problem statement)
   - **Challenge Configuration** (meta box on right):
     - **Category:** Web, Pwn, Crypto, Reverse, Misc
     - **Difficulty:** Easy, Medium, Hard
     - **Points:** Point value (e.g., 100)
     - **Hint:** Optional hint text
     - **Attachment:** Upload challenge files (zip, binary, etc.)
4. Click **Publish**

**Actions:**
- **Edit** — Modify challenge details
- **Delete** — Remove challenge

#### **AI Defcon Announcements**

Manage competition announcements:

1. Click **AI Defcon** > **Announcements**
2. Click **Add New Announcement**
3. Fill in:
   - **Title:** Announcement title
   - **Description:** Announcement body
   - **Announcement Configuration** (meta box on right):
     - **Pin announcement** — Keep at top of feed
     - **Mark urgent** — Show urgent badge
     - **Schedule At** — Set publish time (optional)
4. Click **Publish**

#### **Team Management**

Manage teams and members:

1. Click **AI Defcon** > **Team Management**
2. View team table with columns:
   - Team ID
   - Team Name
   - Access Token
   - Member Count
   - Total Score
   - Status (active/banned)

**Actions per team:**
- **Ban** — Prevents team submissions
- **Regenerate Token** — Creates new access token
- **Members** — View/remove individual members

**Example:** After banning a team, click "Members" to see who to contact.

#### **Submission Logs**

View recent flag submissions and admin audit trail:

1. Click **AI Defcon** > **Submission Logs**
2. Two tables displayed:
   - **Latest Submissions** — Flag attempts with success/fail status and points awarded
   - **Audit History** — Admin actions (team bans, member removals, etc.)

**Use case:** Track which teams are solving challenges and when.

---

## Testing the App

### Quick Test Flow

**1. Test as Guest**
```
- Go to http://localhost:5173
- Click "Scoreboard" → See team rankings
- Click "Rules" → Read rules
- Try to submit flag → Should prompt to sign in
```

**2. Test Authentication**
```
- Click "Sign In"
- Try each login method (Google, GitHub, Email OTP)
- Check that you're now logged in (avatar appears top right)
```

**3. Test Team System**
```
- Click "Register Team"
- Enter team name → Click "Create"
- See success modal with access token
- Open new browser tab (incognito) and test "Join Team" with that token
```

**4. Test Admin Dashboard**
```
- Go to http://localhost/wordpress/wp-admin
- Click "AI Defcon" in sidebar
- Navigate each sub-page (Settings, Challenges, Announcements, Teams, Logs)
- Test toggling competition settings
- Add a new challenge
- Ban a test team
```

---

## Troubleshooting

### Issue: React app won't start (npm run dev fails)

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: WordPress plugin not showing in admin

**Solution:**
1. Check plugin file exists: `wordpress/wp-content/plugins/aidefcon-core/aidefcon-core.php`
2. Log into WordPress admin
3. Go **Plugins** > check for PHP errors in logs
4. Verify PHP version is 7.4+ (`php --version`)

### Issue: API calls return 404

**Solution:**
1. Verify WordPress is running at `http://localhost/wordpress`
2. Verify plugin is activated in WordPress admin
3. Check browser DevTools → Network tab to see actual API URL being called
4. Manually test endpoint: `http://localhost/wordpress/wp-json/aidefcon/v1/challenges`

### Issue: Team token validation fails

**Solution:**
- Token format must be: `AIDF-XXXX-XXXX`
- All characters must be uppercase
- Only alphanumeric characters allowed (no special chars except hyphens)

### Issue: Database tables don't exist

**Solution:**
1. Go to WordPress admin
2. Click **AI Defcon Core** plugin
3. Click **Deactivate**, then **Activate** again
4. This re-runs the activation hook which creates tables

---

## Architecture Overview

### Frontend Stack

```
src/
├── App.jsx              # Root component + router setup
├── main.jsx             # Vite entry point
├── index.css            # Tailwind + custom styles
├── components/
│   ├── Navbar.jsx       # Top navigation bar
│   ├── AuthModal.jsx    # Login modal
│   ├── TeamModals.jsx   # Create/Join team modals
│   ├── Countdown.jsx    # Live timer
│   └── FaqSidebar.jsx   # FAQ popup
├── pages/
│   ├── HomePage.jsx     # Landing page
│   ├── ScoreboardPage.jsx
│   ├── ChallengesPage.jsx
│   ├── RulesPage.jsx
│   └── ProfilePage.jsx
└── data/
    └── mockData.js      # All mock data (currently in-memory)
```

### Backend Architecture

```
WordPress
├── Core Tables
│   ├── wp_aidf_teams
│   ├── wp_aidf_members
│   ├── wp_aidf_submissions
│   └── wp_aidf_audit_logs
├── Custom Post Types
│   ├── aidf_challenge
│   └── aidf_announcement
├── REST API (namespace: aidefcon/v1)
│   ├── /auth/otp-request
│   ├── /auth/otp-verify
│   ├── /challenges
│   ├── /challenges/{id}/submit
│   ├── /scoreboard
│   ├── /teams
│   ├── /teams/join
│   └── /profile
└── Admin Dashboard
    ├── Settings
    ├── Challenge CRUD
    ├── Announcement CRUD
    ├── Team Management
    └── Logs
```

### Data Flow (Production)

```
WordPress Frontend (http://localhost/wordpress)
    ↓
Serves: React SPA (built dist/ files via theme)
    ↓ (HTTP calls from browser)
REST API (http://localhost/wordpress/wp-json/aidefcon/v1/)
    ↓
WordPress Core + Plugin Handlers
    ↓
Database (Teams, Submissions, Audit Logs)
```

### Data Flow (Development)

```
Vite Dev Server (http://localhost:5173)
    ↓
Serves: React SPA with Hot Module Reload
    ↓ (HTTP calls from browser)
REST API (http://localhost/wordpress/wp-json/aidefcon/v1/)
    ↓
WordPress Core + Plugin Handlers
    ↓
Database
```

---

## Workflow Summary

### For Content/Admin Changes
- No code changes needed
- Use WordPress admin dashboard to:
  - Add/edit challenges
  - Create announcements
  - Manage teams
  - View submission logs
- Changes reflected immediately at `http://localhost/wordpress`

### For Frontend Development
1. Run `npm run dev` (opens http://localhost:5173)
2. Edit React code in `src/`
3. See changes instantly with hot reload
4. When done: `npm run build`
5. Copy to theme: `cp -r dist/* wordpress/wp-content/themes/aidefcon/`
6. Verify at `http://localhost/wordpress`

### For Backend/API Changes
1. Edit WordPress plugin in `wordpress/wp-content/plugins/aidefcon-core/`
2. Deactivate/reactivate plugin in WordPress admin
3. Test API endpoints via REST client or React frontend

## Next Steps

### Phase 2 (In Progress)

- [ ] Real Authentication
  - Email OTP with persistent verification
  - Google OAuth integration
  - GitHub OAuth integration
  - JWT session management

### Phase 3 (Future)

- [ ] Live WebSocket scoreboard
- [ ] Real-time notifications
- [ ] Dynamic scoring
- [ ] Team chat
- [ ] Writeup submission
- [ ] Achievement badges
- [ ] Admin analytics

---

## Common Commands

```bash
# Start Vite dev server (for local development with hot reload)
npm run dev

# Build React app for production (creates dist/ folder)
npm run build

# Copy built files to WordPress theme after building
cp -r dist/* wordpress/wp-content/themes/aidefcon/

# Lint code
npm run lint

# Preview production build locally (without WordPress)
npm preview

# Check PHP syntax (plugin)
php -l wordpress/wp-content/plugins/aidefcon-core/aidefcon-core.php

# Check PHP syntax (theme)
php -l wordpress/wp-content/themes/aidefcon/functions.php
```

---

## Support Resources

- **Spec Document:** See [AI-DEFCON-CTF-SPEC.md](AI-DEFCON-CTF-SPEC.md)
- **Development Plan:** See [DEVELOPMENT-PLAN.md](DEVELOPMENT-PLAN.md)
- **WordPress Docs:** https://developer.wordpress.org/
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev

---

## Quick Reference: File Locations

| Item | Path |
|------|------|
| Frontend Source Code | `c:\laragon\www\aidefcon\src\` |
| Frontend Build Output | `c:\laragon\www\aidefcon\dist\` |
| WordPress Theme (Serves React) | `c:\laragon\www\aidefcon\wordpress\wp-content\themes\aidefcon\` |
| WordPress Plugin | `c:\laragon\www\aidefcon\wordpress\wp-content\plugins\aidefcon-core\` |
| Mock Data | `c:\laragon\www\aidefcon\src\data\mockData.js` |
| Spec Document | `c:\laragon\www\aidefcon\AI-DEFCON-CTF-SPEC.md` |
| Dev Plan | `c:\laragon\www\aidefcon\DEVELOPMENT-PLAN.md` |

---

**Happy hacking! 🛡️** 

For issues or questions, refer to the [Troubleshooting](#troubleshooting) section or check the [DEVELOPMENT-PLAN.md](DEVELOPMENT-PLAN.md) for implementation status.
