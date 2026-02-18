const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'info.txt')

fs.writeFile(filePath, 'Node.js is awesome!', 'utf-8', err => {
  if (err) {
    console.error('Ошибка при записи файла:', err)
    return
  }
  console.log('Файл успешно записан.')

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err)
      return
    }
    console.log('Содержимое файла:', data)
  })
})
