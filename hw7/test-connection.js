import mysql from 'mysql2/promise'

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1', // Именно IP, чтобы WSL не тупил с localhost
      port: 3307, // Твой "запасной" порт
      user: 'root',
      password: 'root',
      database: 'lesson_db',
    })

    console.log('✅ Победа! Node.js видит базу в Докере.')
    await connection.end()
  } catch (err) {
    console.error('❌ Протуп в коннекте:', err.message)
  }
}

test()
