import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import Author from './models/Author.js'
import Book from './models/Book.js'
import Category from './models/Category.js'
import Product from './models/Product.js'
import Course from './models/Course.js'
import Student from './models/Student.js'

const app = express()
const port = process.env.PORT || 3333
const host = process.env.HOST || '127.0.0.1'

app.use(express.json())

const seedDatabase = async () => {
  try {
    // --- 1. АВТОРЫ И КНИГИ ---
    const authorCount = await Author.countDocuments()
    if (authorCount === 0) {
      await Author.create({ name: 'Лев Толстой', bio: 'Писатель и мыслитель.' })
      console.log('✔ Автор: Толстой добавлен.')
    }

    const aurelius = await Author.findOne({ name: 'Марк Аврелий' })
    if (!aurelius) {
      const newAurelius = await Author.create({
        name: 'Марк Аврелий',
        bio: 'Философ-стоик.',
      })
      await Book.create({
        title: 'Наедине с собой',
        genre: 'Философия',
        year: 180,
        author: newAurelius._id,
      })
      console.log('✔ Автор: Марк Аврелий и книга добавлены.')
    }

    const tolkien = await Author.findOne({ name: 'Дж. Р. Р. Толкин' })
    if (!tolkien) {
      const newTolkien = await Author.create({
        name: 'Дж. Р. Р. Толкин',
        bio: 'Создатель Средиземья.',
      })
      await Book.create({
        title: 'Хоббит',
        genre: 'Фэнтези',
        year: 1937,
        author: newTolkien._id,
      })
      console.log('✔ Автор: Толкин создан.')
    } else {
      const tBooksCount = await Book.countDocuments({ author: tolkien._id })
      if (tBooksCount < 3) {
        await Book.insertMany([
          {
            title: 'Братство Кольца',
            genre: 'Фэнтези',
            year: 1954,
            author: tolkien._id,
          },
          {
            title: 'Сильмариллион',
            genre: 'Фэнтези',
            year: 1977,
            author: tolkien._id,
          },
        ])
        console.log('✔ Книги: Толкину добавлены 2 тома.')
      }
    }

    // --- 2. ЭЛЕКТРОНИКА ---
    const catExists = await Category.findOne({ name: 'Электроника' })
    if (!catExists) {
      const myCategory = await Category.create({ name: 'Электроника' })
      await Product.create({
        name: 'Смартфон',
        price: 670,
        category: myCategory._id,
      })
      console.log('✔ Склад: Категория и Смартфон созданы.')
    }

    // --- 3. ОБУЧЕНИЕ (MANY-TO-MANY) ---
    let nodeCourse = await Course.findOne({ title: 'Node.js' })
    if (!nodeCourse) {
      nodeCourse = await Course.create({
        title: 'Node.js',
        description: 'Суровый бэкенд.',
      })
      console.log('✔ Курс: Node.js создан.')
    }

    const ivanExists = await Student.findOne({ email: 'ivan@example.com' })
    if (!ivanExists) {
      const ivan = await Student.create({
        name: 'Иван',
        email: 'ivan@example.com',
        courses: [nodeCourse._id],
      })
      nodeCourse.students.push(ivan._id)
      await nodeCourse.save()
      console.log('✔ Учеба: Иван записан на курс.')
    }

    const petrExists = await Student.findOne({ email: 'petr@example.com' })
    if (!petrExists) {
      const petr = await Student.create({
        name: 'Петр',
        email: 'petr@example.com',
        courses: [nodeCourse._id],
      })
      nodeCourse.students.push(petr._id)
      await nodeCourse.save()
      console.log('✔ Учеба: Петр записан на курс.')
    }
  } catch (err) {
    console.error('❌ Ошибка сидинга:', err.message)
  }
}

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('📡 MongoDB: Соединение установлено')
    await seedDatabase()
    app.listen(port, () => console.log(`🚀 Сервер: http://${host}:${port}`))
  } catch (error) {
    console.error('❌ Ошибка запуска:', error.message)
    process.exit(1)
  }
}
// для проверки масива в браузере по http://localhost:3333/test-students, вижу курс унтри студента
app.get('/test-students', async (req, res) => {
  try {
    const students = await Student.find().populate('courses')
    res.json(students)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

start()
