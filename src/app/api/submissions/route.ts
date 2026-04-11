import { NextRequest, NextResponse } from 'next/server'
import { readUsers, writeUsers, readSubmissions, writeSubmissions, calculateScore, generateId } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { userId, answers, totalTime, tabSwitches, submittedAt, startedAt } = await request.json()

    // Get user details
    const users = await readUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (users[userIndex].hasAttempted) {
      return NextResponse.json({ error: 'User has already attempted the exam' }, { status: 403 })
    }

    // Calculate score
    const score = calculateScore(answers)
    const cheatScore = tabSwitches > 0 ? tabSwitches : 0

    // Create submission
    const submission = {
      id: generateId(),
      userId,
      userName: users[userIndex].name,
      userEmail: users[userIndex].email,
      answers,
      score,
      totalTime,
      cheatScore,
      tabSwitches,
      submittedAt,
      startedAt
    }

    // Save submission
    const submissions = await readSubmissions()
    submissions.push(submission)
    await writeSubmissions(submissions)

    // Mark user as having attempted
    users[userIndex].hasAttempted = true
    await writeUsers(users)

    return NextResponse.json({ 
      success: true, 
      score,
      totalTime,
      cheatScore 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const submissions = await readSubmissions()
    
    // Sort by score (desc) then by time (asc)
    const sortedSubmissions = submissions.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score // Higher score first
      }
      return a.totalTime - b.totalTime // Lower time first
    })

    return NextResponse.json(sortedSubmissions)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}