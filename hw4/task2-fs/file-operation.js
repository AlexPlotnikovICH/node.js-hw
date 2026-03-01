import 'dotenv/config'
import fs from 'fs'

const fileName = process.env.FILENAME
console.log(`File name: ${fileName}`)

const content = `данные дозаписаны через appendFile в ${new Date().toLocaleTimeString()}\n`

fs.appendFile(fileName, content, err => {
  if (err) {
    console.error('Протупили при записи файла', err)
    return
  }
  console.log(
    `Файл ${fileName} успешно создан и данные записаны 2 раз, использовал appendFile вместо writeFile /n !`,
  )
})
fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error('не смогли прочитать файл:', err)
    return
  }
  console.log('--- Содержимое файла ---')
  console.log(data)
  console.log('------------------------')
})
