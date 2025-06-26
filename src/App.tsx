import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import Homepage from './pages/Homepage'
import Browse from './pages/Browse'
import Watch from './pages/Watch'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App