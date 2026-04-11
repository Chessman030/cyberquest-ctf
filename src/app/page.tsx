'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isAdmin) {
        // Admin login
        const response = await fetch('/api/auth/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('adminToken', data.token)
          router.push('/admin')
        } else {
          try {
            const errorData = await response.json()
            setError(errorData.error || 'Invalid admin credentials')
          } catch {
            setError(`Server error: ${response.status} ${response.statusText}`)
          }
          console.error('Admin login failed:', response.status, response.statusText)
        }
      } else if (isLogin) {
        // User login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('userToken', data.token)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('userName', data.userName)
          router.push('/event')
        } else {
          try {
            const errorData = await response.json()
            setError(errorData.error || 'Login failed')
          } catch {
            setError(`Server error: ${response.status} ${response.statusText}`)
          }
          console.error('Login failed:', response.status, response.statusText)
        }
      } else {
        // User signup
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          alert('Account created successfully! Please login.')
          setIsLogin(true)
          setFormData({ name: '', email: '', password: '' })
        } else {
          try {
            const errorData = await response.json()
            setError(errorData.error || 'Signup failed')
          } catch {
            setError(`Server error: ${response.status} ${response.statusText}`)
          }
          console.error('Signup failed:', response.status, response.statusText)
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)
      console.error('Request error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ISTE Capture The Flag
          </h1>
          <p className="text-gray-600">Programming Competition</p>
        </div>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg ${
              !isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setIsAdmin(false)}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg ${
              isAdmin ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        {!isAdmin && (
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg ${
                isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg ${
                !isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isAdmin && !isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              isAdmin
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading
              ? 'Please wait...'
              : isAdmin
              ? 'Admin Login'
              : isLogin
              ? 'Login'
              : 'Create Account'
            }
          </button>
        </form>
      </div>
    </div>
  )
}