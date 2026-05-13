import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AuthModal from './components/AuthModal'
import { CreateTeamModal, JoinTeamModal } from './components/TeamModals'
import FaqSidebar from './components/FaqSidebar'
import HomePage from './pages/HomePage'
import ScoreboardPage from './pages/ScoreboardPage'
import ChallengesPage from './pages/ChallengesPage'
import RulesPage from './pages/RulesPage'
import ProfilePage from './pages/ProfilePage'
import MyTeamsPage from './pages/MyTeamsPage'

export default function App() {
  const [user, setUser] = useState(null) // null = guest
  const [team, setTeam] = useState(null)

  // Modal state
  const [showAuth, setShowAuth] = useState(false)
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [showJoinTeam, setShowJoinTeam] = useState(false)
  const [showFaq, setShowFaq] = useState(false)

  // Get the base path from WordPress theme
  const basePath = window.AIDEFCON_BASE_PATH || '/'

  function handleLogin(userData) {
    setUser(userData)
    setShowAuth(false)
  }

  function handleLogout() {
    setUser(null)
    setTeam(null)
  }

  function handleTeamCreated(teamData) {
    setTeam(teamData)
    setShowCreateTeam(false)
  }

  function handleTeamJoined(data) {
    setTeam({ name: 'Joined Team', token: data.token })
    setShowJoinTeam(false)
  }

  function openAuthOrCreateTeam() {
    if (!user) {
      setShowAuth(true)
    } else {
      setShowCreateTeam(true)
    }
  }

  function openAuthOrJoinTeam() {
    if (!user) {
      setShowAuth(true)
    } else {
      setShowJoinTeam(true)
    }
  }

  const isGuest = !user

  return (
    <BrowserRouter basename={basePath}>
      <AppShell
        isGuest={isGuest}
        user={user}
        onAuthClick={() => setShowAuth(true)}
        onFaqClick={() => setShowFaq(true)}
        onCreateTeam={openAuthOrCreateTeam}
        onJoinTeam={openAuthOrJoinTeam}
        onLogout={handleLogout}
        team={team}
      >
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isGuest={isGuest}
                onAuthClick={() => setShowAuth(true)}
                onFaqClick={() => setShowFaq(true)}
                onCreateTeam={openAuthOrCreateTeam}
                onJoinTeam={openAuthOrJoinTeam}
                username={user?.username}
              />
            }
          />
          <Route path="/scoreboard" element={<ScoreboardPage />} />
          <Route
            path="/challenges"
            element={
              <ChallengesPage
                isGuest={isGuest}
                onAuthClick={() => setShowAuth(true)}
              />
            }
          />
          <Route path="/my-teams" element={<MyTeamsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route
            path="/profile"
            element={
              <ProfilePage user={user} team={team} onLogout={handleLogout} />
            }
          />
          {/* Fallback */}
          <Route
            path="*"
            element={
              <main className="min-h-screen pt-32 px-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-500">Page not found.</p>
              </main>
            }
          />
        </Routes>

        {/* Overlays */}
        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onLogin={handleLogin}
          />
        )}
        {showCreateTeam && user && (
          <CreateTeamModal
            onClose={() => setShowCreateTeam(false)}
            onTeamCreated={handleTeamCreated}
            username={user.username}
          />
        )}
        {showJoinTeam && user && (
          <JoinTeamModal
            onClose={() => setShowJoinTeam(false)}
            onTeamJoined={handleTeamJoined}
          />
        )}
        {showFaq && <FaqSidebar onClose={() => setShowFaq(false)} />}
      </AppShell>
    </BrowserRouter>
  )
}

function AppShell({ children, isGuest, user, onAuthClick, onFaqClick }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white">
      {location.pathname !== '/' && (
        <Navbar
          onAuthClick={onAuthClick}
          onFaqClick={onFaqClick}
          isGuest={isGuest}
          username={user?.username}
        />
      )}
      {children}
    </div>
  )
}
