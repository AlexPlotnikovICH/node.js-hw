const fs = require('fs')

const writeStream = fs.createWriteStream('output.txt', 'utf-8')
fs.writeStream.write('потоковая запись данных в файл. /n')
writeStream.write('Еще одна строка для записи.\n')
writeStream.end('Последняя строка.\n')
writeStream.on('finish', () => {
  console.log('Запись файла завершена.')
})
writeStream.on('error', err => {
  console.log(err)
})
