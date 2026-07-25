import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(true)

  const weakTopics = ['Neural Networks', 'OS Scheduling', 'DBMS Joins']
  const strongTopics = ['Python Basics', 'Linear Algebra', 'Git & GitHub']

  const studyPlan = [
    { subject: 'Machine Learning', time: '2 hrs', priority: 'High' },
    { subject: 'DBMS', time: '1.5 hrs', priority: 'Medium' },
    { subject: 'OS', time: '1 hr', priority: 'Low' },
  ]

  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-100'
  const card = darkMode ? 'bg-gray-800' : 'bg-white'
  const cardInner = darkMode ? 'bg-gray-700' : 'bg-gray-100'
  const text = darkMode ? 'text-white' : 'text-gray-900'
  const subtext = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`min-h-screen ${bg} p-6`}>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${text}`}>VIDHA 🚀</h1>
          <p className={subtext}>Welcome back, Durga!</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={() => navigate('/mood')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
          >
            Daily Check-In
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className={`${card} p-4 rounded-2xl text-center`}>
          <p className="text-3xl font-bold text-purple-400">7</p>
          <p className={`${subtext} text-sm`}>Day Streak 🔥</p>
        </div>
        <div className={`${card} p-4 rounded-2xl text-center`}>
          <p className="text-3xl font-bold text-green-400">82%</p>
          <p className={`${subtext} text-sm`}>Quiz Score</p>
        </div>
        <div className={`${card} p-4 rounded-2xl text-center`}>
          <p className="text-3xl font-bold text-blue-400">12</p>
          <p className={`${subtext} text-sm`}>Topics Done</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <button
          onClick={() => navigate('/studyplan')}
          className="bg-purple-700 hover:bg-purple-600 p-4 rounded-2xl text-center"
        >
          <p className="text-2xl mb-1">📅</p>
          <p className="text-white font-bold text-sm">Study Plan</p>
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="bg-blue-700 hover:bg-blue-600 p-4 rounded-2xl text-center"
        >
          <p className="text-2xl mb-1">🧠</p>
          <p className="text-white font-bold text-sm">Take Quiz</p>
        </button>
        <button
          onClick={() => navigate('/aura')}
          className="bg-green-700 hover:bg-green-600 p-4 rounded-2xl text-center"
        >
          <p className="text-2xl mb-1">🤖</p>
          <p className="text-white font-bold text-sm">Ask Aura</p>
        </button>
        <button
          onClick={() => navigate('/timer')}
          className="bg-orange-700 hover:bg-orange-600 p-4 rounded-2xl text-center"
        >
          <p className="text-2xl mb-1">⏱️</p>
          <p className="text-white font-bold text-sm">Timer</p>
        </button>
        <button
          onClick={() => navigate('/progress')}
          className="bg-pink-700 hover:bg-pink-600 p-4 rounded-2xl text-center"
        >
          <p className="text-2xl mb-1">📊</p>
          <p className="text-white font-bold text-sm">Progress</p>
        </button>
      </div>

      <div className={`${card} p-6 rounded-2xl mb-6`}>
        <h2 className={`text-xl font-bold ${text} mb-4`}>📅 Today's Study Plan</h2>
        <div className="space-y-3">
          {studyPlan.map((item, index) => (
            <div key={index} className={`flex justify-between items-center ${cardInner} p-3 rounded-xl`}>
              <span className={`${text} font-medium`}>{item.subject}</span>
              <div className="flex gap-3 items-center">
                <span className={`${subtext} text-sm`}>{item.time}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  item.priority === 'High' ? 'bg-red-500 text-white' :
                  item.priority === 'Medium' ? 'bg-yellow-500 text-black' :
                  'bg-green-500 text-white'
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`${card} p-6 rounded-2xl`}>
          <h2 className="text-lg font-bold text-red-400 mb-3">⚠️ Weak Topics</h2>
          <div className="space-y-2">
            {weakTopics.map((topic, index) => (
              <div key={index} className={`${cardInner} px-3 py-2 rounded-lg ${subtext} text-sm`}>
                {topic}
              </div>
            ))}
          </div>
        </div>
        <div className={`${card} p-6 rounded-2xl`}>
          <h2 className="text-lg font-bold text-green-400 mb-3">✅ Strong Topics</h2>
          <div className="space-y-2">
            {strongTopics.map((topic, index) => (
              <div key={index} className={`${cardInner} px-3 py-2 rounded-lg ${subtext} text-sm`}>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-900 border border-purple-600 p-6 rounded-2xl">
        <h2 className="text-lg font-bold text-purple-300 mb-2">🤖 AI Insight</h2>
        <p className="text-gray-300">
          Based on your performance, focus on <span className="text-purple-400 font-bold">Neural Networks</span> today.
          You scored 40% last session — a quick 45-min revision will boost your confidence before the exam!
        </p>
      </div>

    </div>
  )
}

export default Dashboard