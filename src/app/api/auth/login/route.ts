import { NextRequest, NextResponse } from 'next/server'
import { readUsers, verifyPassword } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const users = readUsers()
    const user = users.find(u => u.email === email)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const passwordMatch = await verifyPassword(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (user.hasAttempted) {
      return NextResponse.json(
        { error: 'You have already attempted the exam. Only one attempt is allowed.' },
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    return NextResponse.json(
      {
        success: true,
        token,
        userId: user.id,
        userName: user.name,
        userEmail: user.email
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}