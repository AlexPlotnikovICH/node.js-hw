const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'test')
const filePath = path.join(dirPath, 'example.txt')
const fileContent = 'Привет, это пример содержимого файла.'

console.log('Начинаем работу...')

fs.mkdir(dirPath, err => {
  if (err && err.code !== 'EEXIST') {
    console.error('Ошибка при создании папки:', err)
    return
  }
  console.log('1. Папка успешно создана (или уже была).')

  fs.writeFile(filePath, fileContent, 'utf-8', err => {
    if (err) {
      console.error('Ошибка при записи файла:', err)
      return
    }
    console.log('2. Файл успешно записан.')

    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error('Ошибка при чтении папки:', err)
        return
      }
      console.log('3. Содержимое папки "test":', files)
    })
  })
})
