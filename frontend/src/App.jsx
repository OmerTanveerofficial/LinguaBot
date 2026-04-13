import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Analyze from './pages/Analyze'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/analyze" element={<Analyze />} />
      </Routes>
    </div>
  )
}

export default App
