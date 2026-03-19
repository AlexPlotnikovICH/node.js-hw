import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

// 1. Импорты моделей
import Author from './models/Author.js'
import Book from './models/Book.js'
import Category from './models/Category.js'
import Product from './models/Product.js'

const app = express()
const port = process.env.PORT || 3333
const host = process.env.HOST || '127.0.0.1'

app.use(express.json())

// 2. Функция для начального наполнения базы (Seeder)
// Логика: проверяем наличие данных и создаем их только при пустой базе
const seedDatabase = async () => {
  try {
    const count = await Author.countDocuments()
    if (count === 0) {
      console.log('Статус: База пуста. Создание тестовой записи автора...')
      await Author.create({
        name: 'Лев Толстой',
        bio: 'Великий русский писатель и мыслитель.',
      })
      console.log('Результат: Тестовый автор успешно добавлен')
    } else {
      console.log(`Статус: В базе обнаружено записей: ${count}`)
    }
  } catch (err) {
    console.error('Ошибка при наполнении базы:', err.message)
  }
}

// 3. Главная функция запуска приложения
// Принцип: Строгая последовательность (Подключение -> Данные -> Сервер)
const start = async () => {
  try {
    console.log('Попытка подключения к MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Успешно: Соединение с MongoDB установлено')

    // Запускаем наполнение только после подтверждения соединения
    await seedDatabase()

    app.listen(port, () => {
      console.log(`Сервер запущен по адресу: http://${host}:${port}`)
    })
  } catch (error) {
    console.error('Критическая ошибка при запуске приложения:', error.message)
    // Принудительное завершение процесса при сбое подключения к БД
    process.exit(1)
  }
}

start()
