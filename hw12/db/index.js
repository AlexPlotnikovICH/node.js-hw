import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI

if (!uri) {
  console.error('КРИТИЧЕСКАЯ ОШИБКА: MONGO_URI не найден в .env')
  process.exit(1)
}

const client = new MongoClient(uri)

export async function connectDB() {
  try {
    await client.connect()
    console.log('Успешный коннект к MongoDB. Живем.')

    return client.db()
  } catch (error) {
    console.error('База данных лежит или недоступна:', error)
    process.exit(1)
  }
}
