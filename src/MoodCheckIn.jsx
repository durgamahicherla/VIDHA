import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MoodCheckIn() {
  const [mood, setMood] = useState(null)
  const [focus, setFocus] = useState(5)
  const navigate = useNavigate()

  const moods = [
    { emoji: '😞', label: 'Terrible', value: 1 },
    { emoji: '😕', label: 'Bad', value: 2 },
    { emoji: '😐', label: 'Okay', value: 3 },
    { emoji: '😊', label: 'Good', value: 4 },
    { emoji: '🔥', label: 'Amazing', value: 5 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Good Morning! 👋</h1>
          <p className="text-gray-400 mt-2">How are you feeling today?</p>
        </div>

        {/* Mood Selection */}
        <div className="flex justify-between mb-8">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                mood === m.value
                  ? 'bg-purple-600 scale-110'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className="text-xs text-gray-300 mt-1">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Focus Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Focus Level</label>
            <span className="text-purple-400 font-bold">{focus}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigate('/dashboard')}
          disabled={!mood}
          className={`w-full font-bold py-3 rounded-xl transition-all duration-200 ${
            mood
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Studying! 🚀
        </button>

        {mood && (
          <p className="text-center text-gray-400 mt-4">
            Mood: {moods.find(m => m.value === mood)?.emoji} | Focus: {focus}/10
          </p>
        )}

      </div>
    </div>
  )
}

export default MoodCheckIn