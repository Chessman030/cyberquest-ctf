import { NextRequest, NextResponse } from 'next/server'
import { readUsers, writeUsers, hashPassword, generateId } from '@/lib/database'

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

    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields (name, email, password) are required' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const users = readUsers()

    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const newUser = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      hasAttempted: false,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    writeUsers(users)

    return NextResponse.json(
      { message: 'User created successfully', userId: newUser.id },
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}