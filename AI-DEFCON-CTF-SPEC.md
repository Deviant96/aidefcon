# AI Defcon - Product & Content Specification (Prototype MVP)

## Overview

### Project Name
AI Defcon

### Project Type
Clickable prototype for a public/community Capture The Flag platform inspired by Google CTF.

### Main Goal
Build a modern minimal CTF competition dashboard with:
- Realistic mock data
- Future-ready backend logic
- WordPress-compatible architecture
- Single-page app feel
- Public competition structure

This phase is:
- Prototype/demo first
- Backend-ready second
- Real competition later

---

# Core Product Vision

## Experience Goals

The platform should feel:
- Minimal
- Technical
- Clean
- Competitive
- Lightweight
- Fast

Visual direction:
- White dominant
- Smooth modern motion
- Inspired by Google CTF
- Hacker competition atmosphere without looking “dark hacker edgy”

---

# Technical Direction

## Environment

Primary ecosystem:
- WordPress environment

Possible implementation:
- WordPress as backend/database/auth
- Frontend may use:
  - custom WordPress theme
  - React frontend
  - headless WordPress
  - AJAX/API architecture

## Prototype Scope

Current version uses:
- Mock data only
- Mock auth only
- Mock challenge submissions
- Mock scoreboard
- Mock announcements

But architecture should anticipate:
- Real database later
- Real auth later
- Real challenge validation later

---

# Main Features

## Public Pages

### 1. Homepage

Purpose:
Landing page and competition entry point.

### Layout
- Fixed top navigation (top right)
- Minimal logo text on top left
- Large centered hero title
- CTA buttons below title
- Countdown timer
- Prize section
- Announcements section

### Navigation Items
- Rules
- FAQ
- Beginner Quest

### Hero Buttons
- Register Team
- Join Team
- Scoreboard

### Visual Style
- Large typography
- Spacious layout
- Minimal distractions
- Smooth animation
- White background dominant

---

## 2. Scoreboard Page

Purpose:
Display competition rankings.

### Layout Style
Inspired by:
- old-school competitive ranking boards
- arcade/high score tables

### Features
- Team ranking table
- Global leaderboard only
- Realistic mock data
- Search optional later
- Team detail modal on click

### Columns
- Rank
- Team Name
- Points
- Solved Challenges
- Last Submission
- Team Status

### Team Modal
Contains:
- Team name
- Members
- Rank
- Points
- Solve history
- Recent submissions

---

## 3. Challenge Page

Purpose:
Main competition interaction area.

## Layout Structure

| Column | Content |
|---|---|
| Left | Challenge Categories |
| Middle | Challenge List |
| Right | Challenge Detail |

---

## Categories

Required categories:
- Web
- Pwn
- Crypto
- Reverse
- Misc

---

## Challenge List

Each challenge item shows:
- Title
- Category
- Points
- Difficulty
- Solved status
- Short description
- Tags

### Interaction
Clicking challenge:
- updates detail panel dynamically
- SPA-like transition
- animated content switching

---

## Challenge Detail Panel

Contains:
- Full description
- Download files section
- Hint section
- Flag submission form
- Solve count
- Attachments
- Submission history

### Submission Flow
Mock only:
- success state
- fail state
- animated feedback
- fake live score update

---

## 4. Rules Page

Purpose:
Competition rules document.

### Content Sections
AI-generated placeholder content covering:
- Eligibility
- Team size
- Flag format
- Scoring
- Forbidden actions
- Tie-breakers
- Conduct
- Prize policy

---

## 5. FAQ Sidebar Popup

Purpose:
Quick-access help section.

### Format
Right-side popup/sidebar.

### FAQ Topics
- How competition works
- Prizes
- Registration
- Team joining
- Challenge solving
- Rules clarification

---

# Authentication System

## Login Methods

Supported methods:
- Gmail
- GitHub
- Manual Email + OTP

## Auth UX

Single combined auth modal/page.

### Guest Access
Guests may:
- Browse scoreboard
- Browse challenges
- Read rules

But UI should indicate:

> You are currently browsing as guest.

Restricted actions:
- Create team
- Join team
- Submit flags

---

# Team System

## Create Team

### Access
Only registered/logged-in users.

### UI
Popup modal.

### Fields
- Team Name
- Captain Name (auto-filled from account)
- Generated Team Access Token

### Additional Checkbox
- I’m over 18 years old
- Agree to rules

### Notes Section
Inspired by Google CTF disclaimer.

---

## Team Access Token

Requirements:
- Easy enough to share
- Hard enough to guess manually

Suggested format:

```txt
AIDF-7KX9-PQ2M
```

Rules:
- uppercase
- grouped
- no ambiguous characters
- copy button included

---

## Join Team

### Access
Only logged-in users.

### UI
Popup modal.

### Flow
Input:
- Team Access Key

Possible future behavior:
- instant join
- request approval if enabled by captain

---

## Team Limits

Current rules:
- Max 5 members
- One team per user

Future configurable by admin.

---

# Profile System

## My Profile Page

### Content
- Avatar
- Username
- Email
- Login provider
- Joined date
- Team name
- Team role
  - Member
  - Captain
- Statistics
- Solved challenges

---

## My Team Page

### Content
- Team name
- Team score
- Rank
- Member list
- Solve history
- Invite/access token
- Recent activity

---

# Admin Dashboard Requirements

## WordPress Admin Support

System should support future admin management panel.

---

## Required Admin Settings

### Authentication
- Enable/disable manual email registration
- Enable/disable Gmail auth
- Enable/disable GitHub auth

---

### Team Management
- Set maximum members per team
- Allow/disallow multiple teams per user
- Enable captain approval system
- Regenerate team access tokens
- Remove members

---

### Competition Settings
- Enable/disable submissions
- Freeze scoreboard
- Open/close registration
- Open/close challenge access
- Set event countdown date

---

### Challenge Management
- CRUD challenge management
- Category management
- Point management
- Difficulty settings
- File uploads
- Hints
- Solve tracking

---

### Announcement System
- Create announcement
- Pin announcement
- Schedule announcement
- Mark urgent announcement

---

### Moderation
- Ban users
- Ban teams
- Submission logs
- Audit history
- IP monitoring (future)

---

# UX & Animation Direction

## Motion Style
- Smooth transitions
- Lightweight animations
- Subtle hover states
- Dynamic text reveals
- Randomized challenge text animation effects

Avoid:
- heavy neon cyberpunk
- excessive effects
- cluttered visuals

---

# Responsive Design

## Priority
Mobile responsive from the beginning.

### Mobile Requirements
- collapsible navigation
- stack challenge columns vertically
- responsive scoreboard
- optimized modals

---

# Suggested WordPress Architecture

## Recommended Structure

### Custom Post Types
- Challenges
- Announcements
- FAQ

### Custom Tables
Recommended for:
- Teams
- Team members
- Submissions
- Scoreboard cache

### User Roles
- Participant
- Team Captain
- Admin

---

# Sitemap

```txt
/
|-- Homepage
|-- Scoreboard
|-- Challenges
|   |-- Category View
|   |-- Challenge Detail
|
|-- Rules
|-- FAQ
|-- Profile
|-- My Team
|
|-- Auth Modal
|   |-- Gmail Login
|   |-- GitHub Login
|   |-- Email OTP
|
|-- Team Modal
|   |-- Create Team
|   |-- Join Team
```

---

# User Stories

## Guest
- I can browse challenges without logging in
- I can view scoreboard rankings
- I can read rules and FAQ

## Registered User
- I can create a team
- I can join a team
- I can submit flags
- I can view my stats

## Team Captain
- I can share access token
- I can manage team members
- I can approve requests later

## Admin
- I can manage event settings
- I can manage announcements
- I can manage challenges
- I can control registrations

---

# Acceptance Criteria

## Homepage
- Hero visible immediately
- CTA buttons functional
- Countdown works with mock data
- Announcements visible

## Authentication
- All login methods visible
- Mock login state changes work
- Guest restriction messaging appears

## Team System
- Team creation modal works
- Join team modal works
- Token generation works

## Challenge System
- Category switching works
- Challenge detail updates dynamically
- Mock submission feedback appears

## Scoreboard
- Large realistic mock data visible
- Ranking order correct
- Team modal opens properly

## Responsive
- Fully usable on mobile
- Navigation collapses properly
- Modals responsive

---

# Suggested Future Features

## Recommended Later
- Live websocket scoreboard
- Real-time solve notifications
- Team chat
- Beginner quests/tutorial path
- Achievement badges
- Dynamic scoring
- Challenge unlock chains
- Writeup submissions
- Admin analytics dashboard
- Anti-cheat monitoring
- Rate limiting
- Dockerized isolated challenge infrastructure

---

# Suggested MVP Stack

## Frontend
- React or Next.js frontend
- TailwindCSS
- Framer Motion

## Backend
- WordPress
- Custom REST API
- Custom plugin architecture

## Database
- WordPress DB + custom tables

---

# Final Direction

This product should feel like:
- a real competitive hacking event
- modern and polished
- lightweight and clean
- scalable into a real public CTF platform later

Not:
- overly gamified
- overly corporate
- overly “hacker movie” themed

