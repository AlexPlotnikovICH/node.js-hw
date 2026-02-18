const fs = require('fs')
const path = require('path')

const folderPath = path.join(__dirname, 'myFolder')
fs.mkdir(folderPath, (err) => {
  if (err) {
    console.error('ошибка при создании папки:', err)
    return
  }
  console.log('папка успешно создана.')

  fs.rmdir(folderPath, (err) => {
    if (err) {
      console.error('ошибка при удалении папки:', err)
      return
    }
    console.log('папка успешно удалена.')
  })
})