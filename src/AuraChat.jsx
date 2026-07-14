import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AuraChat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am Aura, your AI Study Buddy 🤖 Ask me anything in Telugu or English!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockResponses = [
      'Great question! ' + input + ' గురించి చెప్తాను — idi chala important concept for your placements! 💡',
      'Neural Networks అంటే — human brain ni inspire chesi build chesina AI models. Each layer features learn chestundi!',
      'DBMS lo joins అంటే — rendu tables ni combine cheyyadam. INNER JOIN, LEFT JOIN, RIGHT JOIN — interview lo definitely vasthundi!',
      'Machine Learning lo 3 types unnai: Supervised, Unsupervised, Reinforcement Learning. Meeru supervised lo unnavuu!',
    ]

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

    setMessages([...updatedMessages, {
      role: 'assistant',
      content: randomResponse
    }])

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">

      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white">Aura 🤖</h1>
          <p className="text-purple-400 text-sm">AI Study Buddy — Telugu & English</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 px-4 py-3 rounded-2xl text-sm">
              Aura is thinking... 🤔
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-800 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything in Telugu or English..."
          className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold"
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default AuraChat