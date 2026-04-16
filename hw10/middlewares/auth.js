import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

// Проверка токена
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Нет пропуска — сидишь дома' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Твой паспорт — липа' })
    }
    req.user = user // Записываем данные из токена в объект запроса
    next()
  })
}

// Проверка допуска
export const authorizeRole = requiredRole => {
  return (req, res, next) => {
    // Если паспорт не проверен или роли нет в токене — отказ
    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: 'У тебя нет здесь власти, обычный смертный' })
    }
    next()
  }
}
