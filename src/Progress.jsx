import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Progress() {
  const navigate = useNavigate()

  const [topics, setTopics] = useState([
    { id: 1, name: 'Neural Networks', subject: 'Machine Learning', completed: false },
    { id: 2, name: 'Supervised Learning', subject: 'Machine Learning', completed: true },
    { id: 3, name: 'Decision Trees', subject: 'Machine Learning', completed: true },
    { id: 4, name: 'SQL Joins', subject: 'DBMS', completed: false },
    { id: 5, name: 'Normalization', subject: 'DBMS', completed: true },
    { id: 6, name: 'Transactions', subject: 'DBMS', completed: false },
    { id: 7, name: 'Process Scheduling', subject: 'OS', completed: false },
    { id: 8, name: 'Memory Management', subject: 'OS', completed: true },
    { id: 9, name: 'Deadlocks', subject: 'OS', completed: false },
  ])

  const toggleTopic = (id) => {
    setTopics(topics.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const completed = topics.filter(t => t.completed).length
  const total = topics.length
  const percentage = Math.round((completed / total) * 100)

  const subjects = [...new Set(topics.map(t => t.subject))]

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Progress Tracker 📊</h1>
          <p className="text-gray-400">Track your topic completion</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </button>
      </div>

      {/* Overall Progress */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white font-bold text-lg">Overall Progress</h2>
          <span className="text-purple-400 font-bold text-xl">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-purple-500 h-4 rounded-full"
          />
        </div>
        <p className="text-gray-400 text-sm">{completed} of {total} topics completed</p>
      </div>

      {/* Topics by Subject */}
      {subjects.map((subject) => {
        const subjectTopics = topics.filter(t => t.subject === subject)
        const subjectCompleted = subjectTopics.filter(t => t.completed).length
        const subjectPercentage = Math.round((subjectCompleted / subjectTopics.length) * 100)

        return (
          <div key={subject} className="bg-gray-800 p-6 rounded-2xl mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-white font-bold">{subject}</h2>
              <span className="text-purple-400 text-sm font-bold">{subjectCompleted}/{subjectTopics.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${subjectPercentage}%` }}
              />
            </div>
            <div className="space-y-2">
              {subjectTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleTopic(topic.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    topic.completed ? 'bg-green-900 border border-green-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    topic.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'
                  }`}>
                    {topic.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`font-medium ${topic.completed ? 'text-green-300 line-through' : 'text-white'}`}>
                    {topic.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Progress