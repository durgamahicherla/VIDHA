import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Leaderboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('weekly')

  const weeklyData = [
    { rank: 1, name: 'Durga Mahicherla', score: 980, streak: 12, badge: '🏆', college: 'Osmania University' },
    { rank: 2, name: 'Rahul Sharma', score: 920, streak: 10, badge: '🥈', college: 'IIT Hyderabad' },
    { rank: 3, name: 'Priya Reddy', score: 890, streak: 9, badge: '🥉', college: 'BITS Pilani' },
    { rank: 4, name: 'Kiran Kumar', score: 850, streak: 7, badge: '⭐', college: 'NIT Warangal' },
    { rank: 5, name: 'Ananya Singh', score: 820, streak: 6, badge: '⭐', college: 'VIT Vellore' },
    { rank: 6, name: 'Sai Teja', score: 790, streak: 5, badge: '⭐', college: 'JNTUH' },
    { rank: 7, name: 'Meghna Patel', score: 760, streak: 4, badge: '⭐', college: 'Osmania University' },
    { rank: 8, name: 'Arjun Nair', score: 730, streak: 3, badge: '⭐', college: 'IIT Bombay' },
  ]

  const allTimeData = [...weeklyData].sort((a, b) => b.score - a.score)

  const data = activeTab === 'weekly' ? weeklyData : allTimeData

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Leaderboard 🏆</h1>
          <p className="text-gray-400">Top students this week</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 mb-8">
        {/* 2nd place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
            🥈
          </div>
          <p className="text-white font-bold text-sm">{data[1]?.name.split(' ')[0]}</p>
          <p className="text-gray-400 text-xs">{data[1]?.score} pts</p>
          <div className="bg-gray-600 w-20 h-16 rounded-t-xl mt-2 flex items-center justify-center">
            <span className="text-white font-bold text-xl">2</span>
          </div>
        </motion.div>

        {/* 1st place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="bg-yellow-500 w-24 h-24 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
            🏆
          </div>
          <p className="text-white font-bold">{data[0]?.name.split(' ')[0]}</p>
          <p className="text-purple-400 text-sm font-bold">{data[0]?.score} pts</p>
          <div className="bg-purple-600 w-24 h-24 rounded-t-xl mt-2 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">1</span>
          </div>
        </motion.div>

        {/* 3rd place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
            🥉
          </div>
          <p className="text-white font-bold text-sm">{data[2]?.name.split(' ')[0]}</p>
          <p className="text-gray-400 text-xs">{data[2]?.score} pts</p>
          <div className="bg-orange-700 w-20 h-12 rounded-t-xl mt-2 flex items-center justify-center">
            <span className="text-white font-bold text-xl">3</span>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2 rounded-xl font-bold ${activeTab === 'weekly' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
        >
          This Week
        </button>
        <button
          onClick={() => setActiveTab('alltime')}
          className={`px-4 py-2 rounded-xl font-bold ${activeTab === 'alltime' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
        >
          All Time
        </button>
      </div>

      {/* Full List */}
      <div className="space-y-3">
        {data.map((student, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-2xl ${
              student.name === 'Durga Mahicherla'
                ? 'bg-purple-900 border border-purple-500'
                : 'bg-gray-800'
            }`}
          >
            <span className="text-2xl w-8">{student.badge}</span>
            <span className="text-gray-400 font-bold w-6">#{student.rank}</span>
            <div className="flex-1">
              <p className={`font-bold ${student.name === 'Durga Mahicherla' ? 'text-purple-300' : 'text-white'}`}>
                {student.name} {student.name === 'Durga Mahicherla' && '(You)'}
              </p>
              <p className="text-gray-400 text-xs">{student.college}</p>
            </div>
            <div className="text-right">
              <p className="text-purple-400 font-bold">{student.score} pts</p>
              <p className="text-orange-400 text-xs">🔥 {student.streak} day streak</p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}

export default Leaderboard