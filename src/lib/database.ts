import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const dataDir = path.join(process.cwd(), 'data')
const usersFile = path.join(dataDir, 'users.json')
const submissionsFile = path.join(dataDir, 'submissions.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize files if they don't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2))
}

if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2))
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  hasAttempted: boolean
  createdAt: string
}

export interface Submission {
  id: string
  userId: string
  userName: string
  userEmail: string
  answers: { [questionId: number]: string }
  score: number
  totalTime: number // in seconds
  cheatScore: number
  tabSwitches: number
  submittedAt: string
  startedAt: string
}

export interface Question {
  id: number
  text: string
  answer: string
}

export const questions: Question[] = [
  { id: 1, text: "What is your name?", answer: "raghav" },
  { id: 2, text: "What is your name?", answer: "raghav" },
  { id: 3, text: "What is your name?", answer: "raghav" }
]

// Admin credentials
export const ADMIN_CREDENTIALS = {
  email: 'rssstar07@gmail.com',
  name: 'raghav',
  password: 'ravi071011'
}

export function readUsers(): User[] {
  try {
    const data = fs.readFileSync(usersFile, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export function readSubmissions(): Submission[] {
  try {
    const data = fs.readFileSync(submissionsFile, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function writeSubmissions(submissions: Submission[]): void {
  fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2))
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function calculateScore(answers: { [questionId: number]: string }): number {
  let score = 0
  questions.forEach(question => {
    const userAnswer = answers[question.id]?.toLowerCase().trim()
    const correctAnswer = question.answer.toLowerCase().trim()
    if (userAnswer === correctAnswer) {
      score += 1
    }
  })
  return score
}