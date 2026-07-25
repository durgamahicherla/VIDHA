import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import MoodCheckIn from './MoodCheckIn'
import Dashboard from './Dashboard'
import Quiz from './Quiz'
import AuraChat from './AuraChat'
import StudyPlan from './StudyPlan'
import Timer from './Timer'
import Progress from './Progress'
import Leaderboard from './Leaderboard'

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
        <Route path="/studyplan" element={<StudyPlan />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App