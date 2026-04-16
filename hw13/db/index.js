import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI

if (!uri) {
  console.error('Ошибка: MONGO_URI не задан в .env')
  process.exit(1)
}

export async function connectDB() {
  try {
    await mongoose.connect(uri)
    console.log('Успешное подключение к MongoDB через Mongoose')
  } catch (error) {
    console.error('Ошибка подключения к БД:', error)
    process.exit(1)
  }
}
