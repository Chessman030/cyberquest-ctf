'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [score, setScore] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [tabSwitches, setTabSwitches] = useState(0)

  useEffect(() => {
    const scoreParam = searchParams.get('score')
    const timeParam = searchParams.get('time')
    const switchesParam = searchParams.get('switches')

    if (scoreParam) setScore(parseInt(scoreParam))
    if (timeParam) setTotalTime(parseInt(timeParam))
    if (switchesParam) setTabSwitches(parseInt(switchesParam))
  }, [searchParams])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  const getScoreColor = (score: number) => {
    if (score === 3) return 'text-green-600'
    if (score === 2) return 'text-yellow-600'
    if (score === 1) return 'text-orange-600'
    return 'text-red-600'
  }

  const getPerformanceMessage = (score: number, switches: number) => {
    if (score === 3 && switches === 0) return '🏆 Perfect! Excellent work!'
    if (score === 3) return '🥇 Great job! All questions correct!'
    if (score === 2) return '🥈 Good work! Almost there!'
    if (score === 1) return '🥉 Nice try! Keep practicing!'
    return '📚 Keep learning and try again!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Exam Completed! 🎉
          </h1>
          <p className="text-gray-600">
            Here are your results
          </p>
        </div>

        <div className="space-y-6">
          {/* Score Card */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Score</h2>
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/3
            </div>
            <p className="text-gray-600">
              Questions Answered Correctly
            </p>
          </div>

          {/* Performance Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-blue-800 mb-2">Time Taken</h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatTime(totalTime)}
              </p>
            </div>
            
            <div className={`rounded-lg p-4 text-center ${
              tabSwitches === 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                tabSwitches === 0 ? 'text-green-800' : 'text-red-800'
              }`}>
                Tab Switches
              </h3>
              <p className={`text-2xl font-bold ${
                tabSwitches === 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {tabSwitches}
              </p>
            </div>
          </div>

          {/* Performance Message */}
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-xl font-medium text-gray-800">
              {getPerformanceMessage(score, tabSwitches)}
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">📊 Performance Summary</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Questions answered: {score} out of 3</li>
              <li>• Completion time: {formatTime(totalTime)}</li>
              <li>• Clean attempt: {tabSwitches === 0 ? 'Yes ✅' : `No - ${tabSwitches} tab switches ❌`}</li>
              <li>• Final score: {score === 3 ? 'Perfect' : score === 2 ? 'Good' : score === 1 ? 'Okay' : 'Needs improvement'}</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Thank you for participating in the ISTE Capture The Flag competition!</p>
          <p className="mt-1">Results have been recorded and will be used for ranking.</p>
        </div>
      </div>
    </div>
  )
}