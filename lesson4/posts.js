const fs = require('fs')
const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/posts'

axios
  .get(url)
  .then(response => {
    const dataToSave = JSON.stringify(response.data)

    fs.writeFile('posts.txt', dataToSave, err => {
      if (err) {
        console.error('Ошибка при записи файла:', err)
        return
      }
      console.log('Файл успешно записан.')

      fs.readFile('posts.txt', 'utf8', (readErr, fileData) => {
        if (readErr) {
          console.error('Ошибка при чтении файла:', readErr)
          return
        }
        console.log(' Содержимое файла posts.txt')
        console.log(fileData)
      })
    })
  })
  .catch(error => {
    console.error('Ошибка при выполнении запроса:', error.message)
  })
