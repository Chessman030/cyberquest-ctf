import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import path from 'path'
import { fileURLToPath } from 'url'

// Load .env.local file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../.env.local')

dotenv.config({ path: envPath })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not set in .env.local')
  process.exit(1)
}

async function clearDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    console.log('🔄 Connecting to MongoDB...')
    await client.connect()
    console.log('✅ Connected to MongoDB successfully')

    const db = client.db('ctf_database')

    // Clear users collection
    console.log('🗑️  Clearing users collection...')
    const usersResult = await db.collection('users').deleteMany({})
    console.log(`✅ Deleted ${usersResult.deletedCount} documents from users collection`)

    // Clear submissions collection
    console.log('🗑️  Clearing submissions collection...')
    const submissionsResult = await db.collection('submissions').deleteMany({})
    console.log(`✅ Deleted ${submissionsResult.deletedCount} documents from submissions collection`)

    console.log('\n🎉 Database cleared successfully! Ready for CTF competition.')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the script
clearDatabase()
