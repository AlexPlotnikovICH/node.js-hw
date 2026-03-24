import { Router } from 'express'

const productRouter = Router()

// GET /products
productRouter.get('/', (req, res) => {
  res.json({ message: 'Список товаров' })
})

// POST /products
productRouter.post('/', (req, res) => {
  res.json({ message: 'Создание товара' })
})

export default productRouter
