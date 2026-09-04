import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function MockInterview() {
  const navigate = useNavigate()
  const [stage, setStage] = useState('setup')
  const [role, setRole] = useState('Software Engineer')
  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const roles = ['Software Engineer', 'Data Scientist', 'ML Engineer', 'Full Stack Developer']

  const questions = {
    'Software Engineer': [
      'Tell me about yourself and your technical background.',
      'What is the difference between Stack and Queue? Give a real-world example.',
      'Explain OOPS concepts with examples.',
      'What is your biggest technical achievement?',
      'Where do you see yourself in 5 years?',
    ],
    'Data Scientist': [
      'Tell me about yourself.',
      'Explain the difference between supervised and unsupervised learning.',
      'How do you handle missing data in a dataset?',
      'What is overfitting and how do you prevent it?',
      'Describe a data project you have worked on.',
    ],
    'ML Engineer': [
      'Tell me about yourself.',
      'Explain how a Neural Network works.',
      'What is the difference between batch and stochastic gradient descent?',
      'How do you deploy a machine learning model?',
      'What frameworks have you worked with?',
    ],
    'Full Stack Developer': [
      'Tell me about yourself.',
      'Explain the difference between REST and GraphQL.',
      'What is the Virtual DOM in React?',
      'How do you optimize a web application?',
      'Describe a full stack project you have built.',
    ],
  }

  const getFeedback = async (question, userAnswer) => {
    setLoading(true)

    // Mock AI feedback for demo
    await new Promise(resolve => setTimeout(resolve, 1500))

    const feedbacks = [
      { score: 85, comment: 'Good answer! You covered the main points well. Try to add more specific examples from your experience.', tip: 'Use the STAR method: Situation, Task, Action, Result.' },
      { score: 72, comment: 'Decent response. Your explanation was clear but could be more detailed. Mention real-world applications.', tip: 'Practice explaining technical concepts in simple terms.' },
      { score: 90, comment: 'Excellent! Very structured and confident answer. You demonstrated strong knowledge.', tip: 'Keep this energy in real interviews!' },
      { score: 65, comment: 'Needs improvement. Try to be more specific and avoid vague statements.', tip: 'Prepare 2-3 strong examples for each type of question.' },
    ]

    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)]
    setFeedback(randomFeedback)
    setScore(prev => prev + randomFeedback.score)
    setAnswers(prev => [...prev, { question, answer: userAnswer, feedback: randomFeedback }])
    setLoading(false)
  }

  const handleNext = () => {
    const qs = questions[role]
    if (currentQ + 1 < qs.length) {
      setCurrentQ(currentQ + 1)
      setAnswer('')
      setFeedback(null)
    } else {
      setStage('result')
    }
  }

  const qs = questions[role]
  const avgScore = answers.length > 0 ? Math.round(score / answers.length) : 0

  if (stage === 'setup') {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Mock Interview 🎤</h1>
            <p className="text-gray-400">AI-powered interview practice</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white">← Dashboard</button>
        </div>

        <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Select Your Target Role</h2>

          <div className="space-y-3 mb-8">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`w-full p-4 rounded-xl text-left font-bold transition-all ${
                  role === r ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {r === 'Software Engineer' && '💻 '}
                {r === 'Data Scientist' && '📊 '}
                {r === 'ML Engineer' && '🤖 '}
                {r === 'Full Stack Developer' && '🌐 '}
                {r}
              </button>
            ))}
          </div>

          <div className="bg-purple-900 border border-purple-600 p-4 rounded-xl mb-6">
            <p className="text-purple-300 font-bold mb-1">📋 Interview Format</p>
            <p className="text-gray-300 text-sm">5 questions • AI feedback after each answer • Score at the end</p>
          </div>

          <button
            onClick={() => setStage('interview')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            Start Interview 🎤
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'result') {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-8 rounded-2xl text-center mb-6"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Interview Complete! 🎉</h2>
            <p className="text-gray-400 mb-6">Role: {role}</p>
            <div className={`text-6xl font-bold mb-2 ${avgScore >= 80 ? 'text-green-400' : avgScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {avgScore}%
            </div>
            <p className="text-gray-400 mb-6">Average Score</p>
            <p className="text-white font-bold text-lg">
              {avgScore >= 80 ? '🔥 Excellent! You are ready for placements!' :
               avgScore >= 60 ? '👍 Good effort! Practice more for better results.' :
               '💪 Keep practicing! You will get there!'}
            </p>
          </motion.div>

          {answers.map((a, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-2xl mb-3">
              <p className="text-purple-400 font-bold text-sm mb-1">Q{i + 1}: {a.question}</p>
              <p className="text-gray-300 text-sm mb-2">Your answer: {a.answer.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-xs">{a.feedback.comment.substring(0, 80)}...</p>
                <span className={`font-bold ${a.feedback.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {a.feedback.score}%
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={() => { setStage('setup'); setCurrentQ(0); setAnswer(''); setFeedback(null); setScore(0); setAnswers([]) }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl mt-4"
          >
            Try Again 🔄
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl mt-3"
          >
            ← Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Mock Interview 🎤</h1>
          <p className="text-purple-400 text-sm">{role}</p>
        </div>
        <span className="text-gray-400">Q {currentQ + 1}/{qs.length}</span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentQ) / qs.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <motion.div
        key={currentQ}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-800 p-6 rounded-2xl mb-6"
      >
        <p className="text-purple-400 text-sm font-bold mb-2">❓ QUESTION {currentQ + 1}</p>
        <p className="text-white text-xl font-bold">{qs[currentQ]}</p>
      </motion.div>

      {/* Answer Input */}
      {!feedback && (
        <div className="mb-6">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here... (minimum 20 words)"
            rows={5}
            className="w-full bg-gray-800 text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <button
            onClick={() => getFeedback(qs[currentQ], answer)}
            disabled={answer.length < 20 || loading}
            className={`w-full mt-3 font-bold py-3 rounded-xl transition-all ${
              answer.length >= 20 && !loading
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'AI is evaluating... 🤔' : 'Submit Answer →'}
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-6"
        >
          <div className="bg-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <p className="text-white font-bold">AI Feedback</p>
              <span className={`text-2xl font-bold ${feedback.score >= 80 ? 'text-green-400' : feedback.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {feedback.score}%
              </span>
            </div>
            <p className="text-gray-300 mb-3">{feedback.comment}</p>
            <div className="bg-purple-900 border border-purple-600 p-3 rounded-xl">
              <p className="text-purple-300 text-sm font-bold">💡 Tip: {feedback.tip}</p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            {currentQ + 1 < qs.length ? 'Next Question →' : 'See Results 🏆'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default MockInterview