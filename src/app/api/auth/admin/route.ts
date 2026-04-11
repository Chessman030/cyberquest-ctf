import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_CREDENTIALS } from '@/lib/database'

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

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64')
      return NextResponse.json(
        {
          success: true,
          token,
          isAdmin: true
        },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return NextResponse.json(
      { error: 'Invalid admin credentials' },
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}