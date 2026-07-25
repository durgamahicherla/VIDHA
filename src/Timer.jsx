import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Timer() {
  const navigate = useNavigate()
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [selectedTime, setSelectedTime] = useState(25)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false)
            setSessions(sessions + 1)
            setMinutes(selectedTime)
            setSeconds(0)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, minutes, seconds])

  const reset = () => {
    setIsRunning(false)
    setMinutes(selectedTime)
    setSeconds(0)
  }

  const selectTime = (time) => {
    setSelectedTime(time)
    setMinutes(time)
    setSeconds(0)
    setIsRunning(false)
  }

  const progress = ((selectedTime * 60 - (minutes * 60 + seconds)) / (selectedTime * 60)) * 100

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Study Timer ⏱️</h1>
          <p className="text-gray-400">Pomodoro technique for focus</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </button>
      </div>

      {/* Sessions count */}
      <div className="text-center mb-6">
        <p className="text-gray-400">Sessions Completed: <span className="text-purple-400 font-bold">{sessions} 🔥</span></p>
      </div>

      {/* Time selector */}
      <div className="flex justify-center gap-3 mb-8">
        {[15, 25, 45, 60].map((time) => (
          <button
            key={time}
            onClick={() => selectTime(time)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              selectedTime === time
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {time}m
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="w-64 h-64 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-gray-400 text-sm mt-1">
              {isRunning ? 'Focus! 🧠' : 'Ready?'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 rounded-xl font-bold text-white text-lg ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isRunning ? 'Pause ⏸️' : 'Start ▶️'}
        </motion.button>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl font-bold text-gray-400 bg-gray-700 hover:bg-gray-600"
        >
          Reset 🔄
        </button>
      </div>

      {/* Tips */}
      <div className="bg-purple-900 border border-purple-600 p-4 rounded-2xl max-w-md mx-auto">
        <p className="text-purple-300 font-bold mb-1">💡 Pomodoro Tip</p>
        <p className="text-gray-300 text-sm">
          Study for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer break. This technique improves focus by 40%!
        </p>
      </div>

    </div>
  )
}

export default Timer