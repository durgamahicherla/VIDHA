import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function StudyPlan() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([''])
  const [examDate, setExamDate] = useState('')
  const [dailyHours, setDailyHours] = useState(3)
  const [plan, setPlan] = useState(null)

  const addSubject = () => setSubjects([...subjects, ''])

  const updateSubject = (index, value) => {
    const updated = [...subjects]
    updated[index] = value
    setSubjects(updated)
  }

  const generatePlan = () => {
    const validSubjects = subjects.filter(s => s.trim() !== '')
    if (validSubjects.length === 0 || !examDate) return

    const today = new Date()
    const exam = new Date(examDate)
    const daysLeft = Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
    const hoursPerSubject = Math.floor((daysLeft * dailyHours) / validSubjects.length)

    const priorities = ['High', 'High', 'Medium', 'Medium', 'Low']
    const generatedPlan = validSubjects.map((subject, index) => ({
      subject,
      hoursPerSubject,
      priority: priorities[index] || 'Low',
      dailyTime: dailyHours / validSubjects.length > 1
        ? `${(dailyHours / validSubjects.length).toFixed(1)} hrs/day`
        : `${Math.round((dailyHours / validSubjects.length) * 60)} mins/day`
    }))

    setPlan({ daysLeft, generatedPlan, totalHours: daysLeft * dailyHours })
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Study Plan 📅</h1>
          <p className="text-gray-400">AI generates your personalized schedule</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </button>
      </div>

      {!plan ? (
        <div className="bg-gray-800 p-6 rounded-2xl max-w-lg mx-auto">

          {/* Subjects */}
          <div className="mb-6">
            <label className="text-white font-bold mb-3 block">📚 Your Subjects</label>
            {subjects.map((subject, index) => (
              <input
                key={index}
                type="text"
                value={subject}
                onChange={(e) => updateSubject(index, e.target.value)}
                placeholder={`Subject ${index + 1} (e.g. Machine Learning)`}
                className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 mb-2"
              />
            ))}
            <button
              onClick={addSubject}
              className="text-purple-400 hover:text-purple-300 text-sm mt-1"
            >
              + Add Subject
            </button>
          </div>

          {/* Exam Date */}
          <div className="mb-6">
            <label className="text-white font-bold mb-3 block">📅 Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Daily Hours */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <label className="text-white font-bold">⏰ Daily Study Hours</label>
              <span className="text-purple-400 font-bold">{dailyHours} hrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <button
            onClick={generatePlan}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            Generate My Study Plan 🚀
          </button>
        </div>
      ) : (
        <div className="max-w-lg mx-auto">

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-purple-400">{plan.daysLeft}</p>
              <p className="text-gray-400 text-sm">Days Left</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-green-400">{dailyHours}</p>
              <p className="text-gray-400 text-sm">Hrs/Day</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-2xl text-center">
              <p className="text-3xl font-bold text-blue-400">{plan.totalHours}</p>
              <p className="text-gray-400 text-sm">Total Hours</p>
            </div>
          </div>

          {/* Generated Plan */}
          <div className="bg-gray-800 p-6 rounded-2xl mb-6">
            <h2 className="text-xl font-bold text-white mb-4">🤖 AI Generated Plan</h2>
            <div className="space-y-3">
              {plan.generatedPlan.map((item, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">{item.subject}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      item.priority === 'High' ? 'bg-red-500 text-white' :
                      item.priority === 'Medium' ? 'bg-yellow-500 text-black' :
                      'bg-green-500 text-white'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <span className="text-gray-400 text-sm">📅 {item.dailyTime}</span>
                    <span className="text-gray-400 text-sm">📚 {item.hoursPerSubject} hrs total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-purple-900 border border-purple-600 p-4 rounded-2xl mb-6">
            <p className="text-purple-300 font-bold mb-1">🤖 AI Insight</p>
            <p className="text-gray-300 text-sm">
              You have <span className="text-purple-400 font-bold">{plan.daysLeft} days</span> left.
              Study <span className="text-purple-400 font-bold">{dailyHours} hours daily</span> and
              you'll cover all {plan.generatedPlan.length} subjects completely!
            </p>
          </div>

          <button
            onClick={() => setPlan(null)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl"
          >
            ← Regenerate Plan
          </button>

        </div>
      )}
    </div>
  )
}

export default StudyPlan