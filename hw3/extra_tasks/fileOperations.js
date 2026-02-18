const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'example.jpg')

fs.rename(dirPath, path.join(__dirname, 'renamed_example.jpg'), err => {
  if (err) {
    console.error('Ошибка при переименовании файла:', err)
    return
  }
  console.log('Файл успешно переименован.')

  fs.copyFile(
    path.join(__dirname, 'renamed_example.jpg'),
    path.join(__dirname, 'copyOfExample.jpg'),
    err => {
      if (err) {
        console.error('Ошибка при копировании файла:', err)
        return
      }
      console.log('Файл успешно скопирован.')

      fs.unlink(path.join(__dirname, 'renamed_example.jpg'), err => {
        if (err) {
          console.error('Ошибка при удалении файла:', err)
          return
        }
        console.log('Файл успешно удален.')
      })
    },
  )
})
