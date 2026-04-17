import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Успешное подключение к MongoDB (hw14)')
  } catch (error) {
    console.error('Ошибка подключения к БД:', error.message)
    process.exit(1)
  }
}
