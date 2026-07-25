import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">VIDHA 🚀</h1>
          <p className="text-purple-400 mt-2">Create your account</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Durga Mahicherla"
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Language Preference</label>
            <select className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500">
              <option value="english">English</option>
              <option value="telugu">Telugu</option>
            </select>
          </div>
          <button 
          onClick={() => window.location.href = '/mood'}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-200 cursor-pointer">
           Create Account
          </button>
        </div>
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
