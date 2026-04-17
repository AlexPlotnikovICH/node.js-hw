import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import Category from './models/Category.js'
import Product from './models/Product.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body
    const category = new Category({ name })
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Ошибка создания категории', error: error.message })
  }
})

app.post('/products', async (req, res) => {
  try {
    const { name, price, category } = req.body
    const product = new Product({ name, price, category })
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Ошибка создания продукта', error: error.message })
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category')
    res.status(200).json(products)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка получения продуктов', error: error.message })
  }
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Express сервер запущен на http://localhost:${PORT}`)
  })
})
