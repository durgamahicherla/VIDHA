import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Quiz() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [wrongTopics, setWrongTopics] = useState([])

  const questions = [
    {
      question: 'What is Supervised Learning?',
      options: ['Learning with labeled data', 'Learning without data', 'Learning with rewards', 'None of these'],
      answer: 0,
      explanation: 'Supervised Learning uses labeled input-output pairs to train a model. Example: spam email detection.'
    },
    {
      question: 'What does CNN stand for?',
      options: ['Central Neural Network', 'Convolutional Neural Network', 'Connected Node Network', 'Core Net Node'],
      answer: 1,
      explanation: 'CNN = Convolutional Neural Network. Used mainly for image recognition tasks.'
    },
    {
      question: 'Which algorithm is used for classification?',
      options: ['Linear Regression', 'K-Means', 'Decision Tree', 'PCA'],
      answer: 2,
      explanation: 'Decision Tree is used for classification. It splits data based on feature values.'
    },
  ]

  const handleAnswer = (index) => {
    setSelected(index)
    if (index === questions[current].answer) {
      setScore(score + 1)
    } else {
      setWrongTopics([...wrongTopics, questions[current].question])
    }
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete! 🎉</h2>
          <p className="text-5xl font-bold text-purple-400 mb-2">{score}/{questions.length}</p>
          <p className="text-gray-400 mb-6">Your Score</p>

          {wrongTopics.length > 0 && (
            <div className="bg-red-900 border border-red-600 p-4 rounded-xl mb-6 text-left">
              <p className="text-red-400 font-bold mb-2">⚠️ Topics to Revise:</p>
              {wrongTopics.map((topic, i) => (
                <p key={i} className="text-gray-300 text-sm">• {topic}</p>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const q = questions[current]

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg">

        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">Question {current + 1}/{questions.length}</p>
          <p className="text-purple-400 font-bold">Score: {score}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-white mb-6">{q.question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !selected && handleAnswer(index)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                selected === null
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : index === q.answer
                  ? 'bg-green-600 text-white'
                  : selected === index
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {selected !== null && selected !== q.answer && (
          <div className="bg-blue-900 border border-blue-600 p-4 rounded-xl mb-4">
            <p className="text-blue-300 font-bold mb-1">💡 Explanation:</p>
            <p className="text-gray-300 text-sm">{q.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {selected !== null && (
          <button
            onClick={handleNext}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            {current + 1 < questions.length ? 'Next Question →' : 'See Results'}
          </button>
        )}

      </div>
    </div>
  )
}

export default Quiz