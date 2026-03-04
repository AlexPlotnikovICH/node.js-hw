import pool from './db.js'

const initDb = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `

    await pool.query(query)
    console.log('✅ Таблица products успешно создана или уже существует.')
    process.exit()
  } catch (err) {
    console.error('❌ Ошибка при создании таблицы:', err.message)
    process.exit(1)
  }
}

initDb()
