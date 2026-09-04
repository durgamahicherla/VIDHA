import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function InterviewPrep() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('DSA')
  const [flipped, setFlipped] = useState({})

  const categories = ['DSA', 'ML', 'DBMS', 'OS', 'HR']

  const questions = {
    DSA: [
      { q: 'What is Time Complexity?', a: 'Time complexity measures how runtime grows with input size. O(1) is constant, O(n) is linear, O(n²) is quadratic.' },
      { q: 'Difference between Array and LinkedList?', a: 'Array: fixed size, random access O(1). LinkedList: dynamic size, sequential access O(n), better for insertions/deletions.' },
      { q: 'What is Binary Search?', a: 'Binary search finds elements in sorted array by repeatedly dividing search space in half. Time: O(log n).' },
    ],
    ML: [
      { q: 'What is Overfitting?', a: 'Overfitting is when a model performs well on training data but poorly on new data. Fix: more data, regularization, dropout.' },
      { q: 'Difference between Supervised and Unsupervised Learning?', a: 'Supervised: labeled data (classification, regression). Unsupervised: no labels (clustering, dimensionality reduction).' },
      { q: 'What is a Neural Network?', a: 'Neural networks are ML models inspired by human brain. Layers of neurons learn patterns from data through forward/backward propagation.' },
    ],
    DBMS: [
      { q: 'What are ACID properties?', a: 'Atomicity, Consistency, Isolation, Durability. These ensure database transactions are processed reliably.' },
      { q: 'Difference between SQL and NoSQL?', a: 'SQL: structured, relational, tables (MySQL, PostgreSQL). NoSQL: unstructured, flexible, documents/key-value (MongoDB, Redis).' },
      { q: 'What is Normalization?', a: 'Normalization organizes database to reduce redundancy. 1NF, 2NF, 3NF, BCNF are normal forms.' },
    ],
    OS: [
      { q: 'What is Deadlock?', a: 'Deadlock occurs when processes wait for each other indefinitely. Prevention: avoid circular wait, use timeouts.' },
      { q: 'Difference between Process and Thread?', a: 'Process: independent program with own memory. Thread: lightweight unit within process, shares memory.' },
      { q: 'What is Virtual Memory?', a: 'Virtual memory uses disk space as extended RAM, allowing programs larger than physical memory to run.' },
    ],
    HR: [
      { q: 'Tell me about yourself?', a: 'I am Durga Mahicherla, Final Year BTech student. I built VIDHA — an AI adaptive learning system using React, Node.js and Claude API. Passionate about AI and full-stack development.' },
      { q: 'Why should we hire you?', a: 'I built a full-stack AI product from scratch — VIDHA. I can learn quickly, work independently, and deliver results. My project demonstrates both technical and problem-solving skills.' },
      { q: 'Where do you see yourself in 5 years?', a: 'I want to be a skilled AI engineer, building products that solve real problems. I am focused on continuous learning and delivering impact through technology.' },
    ],
  }

  const toggleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Interview Prep 🎯</h1>
          <p className="text-gray-400">Flashcards for placement preparation</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setFlipped({}) }}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeCategory === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcards */}
      <div className="space-y-4">
        {questions[activeCategory].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleFlip(index)}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
              flipped[index]
                ? 'bg-purple-900 border border-purple-500'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {!flipped[index] ? (
                  <div>
                    <p className="text-xs text-purple-400 font-bold mb-2">❓ QUESTION</p>
                    <p className="text-white font-bold text-lg">{item.q}</p>
                    <p className="text-gray-500 text-sm mt-3">Click to reveal answer 👆</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-green-400 font-bold mb-2">✅ ANSWER</p>
                    <p className="text-white font-bold text-lg mb-3">{item.q}</p>
                    <p className="text-gray-300">{item.a}</p>
                  </div>
                )}
              </div>
              <span className="text-2xl ml-4">
                {flipped[index] ? '✅' : '❓'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tip */}
      <div className="bg-purple-900 border border-purple-600 p-4 rounded-2xl mt-6">
        <p className="text-purple-300 font-bold mb-1">💡 Interview Tip</p>
        <p className="text-gray-300 text-sm">
          Practice answering out loud — not just reading. Interviewers judge your communication as much as your knowledge!
        </p>
      </div>

    </div>
  )
}

export default InterviewPrep