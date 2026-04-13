'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/data/questions'

// Flag 10: Source Map Leak - Unused variable that can be found in source maps
const superSecretFlag = "CyberQuest{50urc3_m4p5_r3v34l_4ll}"

export default function CompetitionPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60) // 2 hours in seconds
  const [tabSwitches, setTabSwitches] = useState(0)
  const [startTime, setStartTime] = useState(new Date())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [showFlagModal, setShowFlagModal] = useState(false)
  const [flagMessage, setFlagMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // Hints for text questions (questions 1-10)
  const hintsData: { [key: number]: { hint1: string; hint2: string } } = {
    1: {
      hint1: "Not everything the server sends to your browser is actually visible on the screen.",
      hint2: "Check the HTML structure in DevTools. How do developers use CSS to hide elements from the page layout?"
    },
    2: {
      hint1: "Developers often leave behind notes, reminders, or old code snippets for themselves.",
      hint2: "Inspect the raw HTML source code. What syntax is used to write text that the browser explicitly ignores when rendering the page?"
    },
    3: {
      hint1: "The webpage is asking you not to click that button, but client-side rules are more like suggestions than actual security.",
      hint2: "Inspect the locked element in DevTools. What specific HTML attribute tells the browser to make an input unclickable, and what happens if you simply delete it?"
    },
    4: {
      hint1: "Your browser holds a digital ID badge to remember who you are. It looks like gibberish, but it's an easily translatable format.",
      hint2: "Look into the DevTools tabs responsible for session data. Once you find a strange string of characters, what common encoding method is frequently used to safely transmit data over the web?atob right?"
    },
    5: {
      hint1: "Not all secrets are kept on the backend. Sometimes web apps stash keys temporarily right in your browser's memory.",
      hint2: "Open DevTools and explore the tabs related to browser memory and client-side persistence. Where else besides cookies can a web app store key-value pairs?"
    },
    6: {
      hint1: "The server whispers extra metadata to your browser in the background before the webpage even finishes loading.",
      hint2: "check for X-Secret_Flag in the after opening the very first request"
    },
    7: {
      hint1: "Why just read the page's code when you can actively interact with it? You have the power to run commands yourself.",
      hint2: "If you found the name of a suspicious function in the source code, which DevTools tab acts as a live terminal where you can call that function into action?revealflag right?"
    },
    8: {
      hint1: "Files can easily fake their extensions. A file named .png might not actually be an image at all.",
      hint2: "Monitor the page traffic as it loads. How does the server officially tell the browser what type of file it is sending, regardless of the file's actual name?"
    },
    9: {
      hint1: "HTML isn't the only language capable of inserting text onto a screen. The styling rules themselves might be injecting the secret.",
      hint2: "Inspect the Styles pane for the suspicious element. What CSS selectors allow developers to insert virtual elements and text right before or after an actual HTML tag?"
    },
    10: {
      hint1: "Production code is usually scrambled and minified, but developers sometimes accidentally leave the translation guide behind.",
      hint2: "Explore the directory structure in DevTools where the browser loads its scripts. Are there any debugging files exposed that reconstruct the original, readable code?"
    },
  }

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const visibilityRef = useRef(true)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('userToken')
    const storedUserId = localStorage.getItem('userId')
    
    if (!token || !storedUserId) {
      router.push('/')
      return
    }

    setUserId(storedUserId)
    setUserName('Student') // You might want to fetch this from API

    // Load competition state from localStorage if available
    const savedTimeLeft = localStorage.getItem('competitionTimeLeft')
    const savedAnswers = localStorage.getItem('competitionAnswers')
    const savedTabSwitches = localStorage.getItem('competitionTabSwitches')
    const savedCurrentQuestion = localStorage.getItem('competitionCurrentQuestion')
    const savedStartTime = localStorage.getItem('competitionStartTime')

    if (savedTimeLeft !== null) {
      setTimeLeft(parseInt(savedTimeLeft))
    }
    if (savedAnswers !== null) {
      setAnswers(JSON.parse(savedAnswers))
    }
    if (savedTabSwitches !== null) {
      setTabSwitches(parseInt(savedTabSwitches))
    }
    if (savedCurrentQuestion !== null) {
      setCurrentQuestion(parseInt(savedCurrentQuestion))
    }
    if (savedStartTime !== null) {
      setStartTime(new Date(savedStartTime))
    }

    setIsLoaded(true)
  }, [router])

  // Save timeLeft to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('competitionTimeLeft', timeLeft.toString())
    }
  }, [timeLeft, isLoaded])

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('competitionAnswers', JSON.stringify(answers))
    }
  }, [answers, isLoaded])

  // Save tabSwitches to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('competitionTabSwitches', tabSwitches.toString())
    }
  }, [tabSwitches, isLoaded])

  // Save currentQuestion to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('competitionCurrentQuestion', currentQuestion.toString())
    }
  }, [currentQuestion, isLoaded])

  // Save startTime to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('competitionStartTime', startTime.toISOString())
    }
  }, [startTime, isLoaded])

  // Timer and cheat detection - runs after page loads
  useEffect(() => {
    if (!isLoaded) return

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Page Visibility API for cheat detection
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && visibilityRef.current) {
        setTabSwitches(prev => prev + 1)
      }
      visibilityRef.current = document.visibilityState === 'visible'
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Removed DevTools and context menu blockers to allow developer access
    // for web security CTF debugging

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isLoaded])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }))
  }

  const showCopiedFlag = (flag: string) => {
    setFlagMessage(flag)
    setShowFlagModal(true)
    // Auto-copy to clipboard
    navigator.clipboard.writeText(flag).catch(() => {
      console.log('Clipboard copy failed, but flag is displayed')
    })
  }

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
      setShowHints(false) // Reset hints when moving to previous question
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setShowHints(false) // Reset hints when moving to next question
    }
  }



  const canSubmit = () => {
    // Allow submission even if not all questions are answered
    return true
  }

  const handleSubmit = async () => {
    if (confirm('Are you sure you want to submit? This cannot be undone.')) {
      await submitExam()
    }
  }

  const handleAutoSubmit = async () => {
    await submitExam()
  }

  const submitExam = async () => {
    if (isSubmitted) return

    setIsSubmitted(true)
    
    const endTime = new Date()
    const totalTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
    
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          answers,
          totalTime,
          tabSwitches,
          submittedAt: endTime.toISOString(),
          startedAt: startTime.toISOString()
        })
      })

      if (response.ok) {
        const result = await response.json()
        // Clear localStorage after successful submission
        localStorage.removeItem('competitionTimeLeft')
        localStorage.removeItem('competitionAnswers')
        localStorage.removeItem('competitionTabSwitches')
        localStorage.removeItem('competitionCurrentQuestion')
        localStorage.removeItem('competitionStartTime')
        router.push(`/results?score=${result.score}&time=${totalTime}&switches=${tabSwitches}`)
      } else {
        alert('Error submitting exam. Please try again.')
        setIsSubmitted(false)
      }
    } catch (error) {
      alert('Error submitting exam. Please try again.')
      setIsSubmitted(false)
    }
  }



  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Submitting your exam...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Loading your session...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Question Navigation</h2>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <div className={`text-lg font-bold ${timeLeft <= 300 ? 'text-red-600 timer-danger' : 'text-blue-600'}`}>
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="space-y-2">
            {questions.map(question => (
              <button
                key={question.id}
                onClick={() => {
                  setCurrentQuestion(question.id)
                  setShowHints(false)
                }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  currentQuestion === question.id
                    ? 'bg-blue-100 border-blue-400'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Question {question.id}</span>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {question.type === 'mcq' ? 'MCQ' : 'Text'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-sm">
              <div className="text-yellow-800 font-medium">Cheat Detection</div>
              <div className="text-yellow-700">Tab switches: {tabSwitches}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              ISTE Capture The Flag Competition
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <div className={`text-sm font-medium ${
                timeLeft <= 300 ? 'text-red-600' : 'text-green-600'
              }`}>
                {timeLeft <= 300 ? 'Time Running Out!' : 'Active'}
              </div>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Question {currentQuestion} of {questions.length}
                </h2>
                <div className="text-sm text-gray-500 mb-3">
                  Type: {questions[currentQuestion - 1]?.type === 'mcq' ? 'Multiple Choice' : 'Text Input'}
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-24">
                  <div className="text-gray-700 leading-relaxed">
                    {questions[currentQuestion - 1]?.text}
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Area */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Your Answer</h3>
                
                {/* Hint Button - Only for text questions */}
                {questions[currentQuestion - 1]?.type === 'text' && hintsData[currentQuestion] !== undefined && (
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {showHints ? 'Hide Hints' : '💡 Show Hints'}
                  </button>
                )}
              </div>

              {/* Hints Display */}
              {showHints && hintsData[currentQuestion] && (
                <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-purple-300 rounded">
                      <p className="text-sm font-semibold text-purple-600 mb-2">Hint 1:</p>
                      <p className="text-gray-700">{hintsData[currentQuestion].hint1}</p>
                    </div>
                    <div className="p-3 bg-white border border-purple-300 rounded">
                      <p className="text-sm font-semibold text-purple-600 mb-2">Hint 2:</p>
                      <p className="text-gray-700 text-xs whitespace-pre-wrap font-mono">{hintsData[currentQuestion].hint2}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Answer Input */}
              {questions[currentQuestion - 1]?.type === 'mcq' ? (
                <div className="space-y-3">
                  {questions[currentQuestion - 1]?.options?.map((option, index) => (
                    <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        className="w-4 h-4 text-gray-400 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your answer here..."
                />
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentQuestion === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  ← Previous
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Progress: {currentQuestion} / {questions.length} questions
                  </span>
                </div>

                {currentQuestion === questions.length ? (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      currentQuestion === questions.length
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Flags - Disabled and invisible UI elements */}
        <div style={{ display: 'none' }}>
          {/* Flag 3: Disabled Button */}
          <button 
            disabled 
            onClick={() => showCopiedFlag("CyberQuest{cl13nt_51d3_rul35_4r3_l135}")}
            onClickCapture={() => showCopiedFlag("CyberQuest{cl13nt_51d3_rul35_4r3_l135}")}
            className="bg-gray-400 cursor-not-allowed text-white px-4 py-2 rounded"
          >
            Download Flag (Admin Only)
          </button>
          
          {/* Flag 9: CSS Pseudo-Element Secret Box */}
          <div className="secret-box" style={{ opacity: 0, pointerEvents: 'none' }}>
            Hidden content here
          </div>
          
          {/* Flag 8: MIME Type Mismatch - Image pointing to text endpoint */}
          <img 
            src="/api/hidden-image" 
            alt="profile" 
            style={{ display: 'none', width: '1px', height: '1px' }}
          />
        </div>

        {/* Flag Modal - Display copied flag */}
        {showFlagModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-green-600">🎉 Flag Found!</h2>
                <button
                  onClick={() => setShowFlagModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Your flag:</p>
                <p className="text-lg font-mono font-bold text-green-700 break-all select-all">
                  {flagMessage}
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(flagMessage)
                    alert('Flag copied to clipboard! ✓')
                  }}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  📋 Copy Flag
                </button>
                <button
                  onClick={() => setShowFlagModal(false)}
                  className="w-full px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}