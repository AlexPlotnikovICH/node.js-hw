import { MongoClient } from 'mongodb'
import 'dotenv/config'

const client = new MongoClient(process.env.MONGODB_URI)
let db

export async function connectDB() {
  try {
    await client.connect()
    db = client.db()
    console.log('Database connection established')
  } catch (error) {
    console.error('Critical: Database connection failed', error)
    process.exit(1)
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.')
  }
  return db
}
