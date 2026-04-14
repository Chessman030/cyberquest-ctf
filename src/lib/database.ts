import bcrypt from 'bcryptjs'
import { MongoClient } from 'mongodb'
import { questions } from '@/data/questions'

// --- MONGODB CONNECTION SETUP ---
const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env.local or Vercel Environment Variables')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// --- INTERFACES & CONSTANTS ---
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
  totalTime: number
  cheatScore: number
  tabSwitches: number
  submittedAt: string
  startedAt: string
}

export const ADMIN_CREDENTIALS = {
  email: 'rssstar07@gmail.com',
  name: 'raghav',
  password: 'ravi071011'
}

// --- DATABASE FUNCTIONS ---

export async function readUsers(): Promise<User[]> {
  const client = await clientPromise
  const db = client.db('ctf_database')
  const users = await db.collection('users').find({}).toArray()
  return users as unknown as User[]
}

export async function writeUsers(users: User[]): Promise<void> {
  const client = await clientPromise
  const db = client.db('ctf_database')
  if (users.length > 0) {
    await db.collection('users').deleteMany({})
    await db.collection('users').insertMany(users)
  }
}

export async function readSubmissions(): Promise<Submission[]> {
  const client = await clientPromise
  const db = client.db('ctf_database')
  const submissions = await db.collection('submissions').find({}).toArray()
  return submissions as unknown as Submission[]
}

export async function writeSubmissions(submissions: Submission[]): Promise<void> {
  const client = await clientPromise
  const db = client.db('ctf_database')
  if (submissions.length > 0) {
    await db.collection('submissions').deleteMany({})
    await db.collection('submissions').insertMany(submissions)
  }
}

// --- UTILS ---
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