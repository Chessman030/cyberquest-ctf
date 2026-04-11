'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Submission {
  id: string
  userId: string
  userName: string
  userEmail: string
  answers: { [questionId: number]: string }
  score: number
  totalTime: number
  cheatScore: number
  tabSwitches: number
  submittedAt: string
  startedAt: string
}

export default function AdminPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'scoreboard' | 'detailed'>('scoreboard')

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      router.push('/')
      return
    }

    fetchSubmissions()
  }, [router])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getScoreBadgeColor = (score: number) => {
    if (score === 3) return 'bg-green-100 text-green-800'
    if (score === 2) return 'bg-yellow-100 text-yellow-800'
    if (score === 1) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  const getCheatBadgeColor = (tabSwitches: number) => {
    if (tabSwitches === 0) return 'bg-green-100 text-green-800'
    if (tabSwitches <= 3) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                ISTE Capture The Flag Competition
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Total Submissions: {submissions.length}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('scoreboard')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'scoreboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scoreboard
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'detailed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Detailed View
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'scoreboard' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Competition Scoreboard
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Ranked by score (highest first), then by time (fastest first)
              </p>
            </div>
            
            {submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Participant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tab Switches
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission, index) => (
                      <tr key={submission.id} className={index < 3 ? 'bg-yellow-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {index === 0 && <span className="text-yellow-500 font-bold mr-2">1st</span>}
                            {index === 1 && <span className="text-gray-400 font-bold mr-2">2nd</span>}
                            {index === 2 && <span className="text-yellow-600 font-bold mr-2">3rd</span>}
                            <span className="font-medium text-gray-900">
                              #{index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {submission.userName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {submission.userEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            getScoreBadgeColor(submission.score)
                          }`}>
                            {submission.score}/3
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(submission.totalTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            getCheatBadgeColor(submission.tabSwitches)
                          }`}>
                            {submission.tabSwitches}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            {submissions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No submissions yet.
              </div>
            ) : (
              submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {submission.userName}
                        </h3>
                        <p className="text-gray-600">{submission.userEmail}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          getScoreBadgeColor(submission.score)
                        } mb-2`}>
                          Score: {submission.score}/3
                        </div>
                        <div className="text-sm text-gray-500">
                          Submitted: {formatDate(submission.submittedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-sm font-medium text-blue-800">Time Taken</div>
                        <div className="text-blue-600">{formatTime(submission.totalTime)}</div>
                      </div>
                      <div className={`p-3 rounded ${
                        submission.tabSwitches === 0 ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        <div className={`text-sm font-medium ${
                          submission.tabSwitches === 0 ? 'text-green-800' : 'text-red-800'
                        }`}>
                          Tab Switches
                        </div>
                        <div className={submission.tabSwitches === 0 ? 'text-green-600' : 'text-red-600'}>
                          {submission.tabSwitches}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm font-medium text-gray-800">Started At</div>
                        <div className="text-gray-600 text-sm">{formatDate(submission.startedAt)}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800">Answers:</h4>
                      {Object.entries(submission.answers).map(([questionId, answer]) => (
                        <div key={questionId} className="border rounded p-3">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            Question {questionId}: What is your name?
                          </div>
                          <div className="text-gray-600 bg-gray-50 p-2 rounded text-sm">
                            {answer || '<No answer>'}
                          </div>
                          <div className={`text-xs mt-1 ${
                            answer?.toLowerCase().trim() === 'raghav' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {answer?.toLowerCase().trim() === 'raghav' ? '[✓] Correct' : '[✗] Incorrect'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}