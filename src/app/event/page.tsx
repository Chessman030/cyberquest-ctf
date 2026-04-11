'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EventPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken')
    if (!token) {
      router.push('/')
      return
    }

    // Get user name from localStorage or decode from token
    const userId = localStorage.getItem('userId')
    if (userId) {
      // You might want to fetch user details here
      setUserName('Student') // Default name for now
    }
  }, [router])

  const handleEnterEvent = () => {
    router.push('/competition')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-12 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to ISTE Capture The Flag
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Programming Competition 2026
          </p>
          <p className="text-lg text-gray-500">
            Hello, {userName}! Ready for the challenge?
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Competition Rules</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Time limit: 2 hours</li>
              <li>• 20 questions to solve</li>
              <li>• mcq type question :- 10 questions</li>
              <li>• text type questions :- 10 questions</li>
              <li>• All questions must be answered to submit</li>
              <li>• Tab switching will be monitored</li>
              <li>• Only one attempt allowed</li>
              <li>• Save your answers frequently</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleEnterEvent}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-lg text-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Enter the Event
        </button>

        <div className="mt-8 text-sm text-gray-500">
          <p>Make sure you have a stable internet connection</p>
          <p>Good luck! 🚀</p>
        </div>
      </div>
    </div>
  )
}