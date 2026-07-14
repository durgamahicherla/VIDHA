import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import MoodCheckIn from './MoodCheckIn'
import Dashboard from './Dashboard'
import Quiz from './Quiz'
import AuraChat from './AuraChat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mood" element={<MoodCheckIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/aura" element={<AuraChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App