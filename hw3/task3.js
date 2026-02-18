const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'text3.txt')

console.log('--- Чтение файла ---')

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении файла:', err.message)
    return
  }
  console.log('Текст из файла:')
  console.log(data)

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Ошибка:', err.message)
      return
    }
    console.log('--- Анализ ---')

    //символы
    const charCount = data.length

    //слова
    // /\s+/ —  "любой пробел или перенос строки"
    const words = data.split(/\s+/)
    const wordCount = words.length

    // предложения
    // Рубим по точке, вопросу или восклицанию. Пустые куски выкидываем.
    const sentences = data.split(/[.!?]/).filter(s => s.length > 0)
    const sentenceCount = sentences.length

    // самое длинное слово (простым перебором)
    let longestWord = ''

    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i]
      if (currentWord.length > longestWord.length) {
        longestWord = currentWord
      }
    }

    // отчет в одну строку
    const report = `
    Анализ текста:
    1. Всего символов: ${charCount}
    2. Всего слов: ${wordCount}
    3. Предложений: ${sentenceCount}
    4. Самое длинное слово: ${longestWord}
    `

    console.log(report)

    // путь для файла с отчетом
    const analysisPath = path.join(__dirname, 'analysis.txt')

    console.log('--- Запись результата ---')

    // пишем отчет на диск
    fs.writeFile(analysisPath, report, 'utf-8', err => {
      if (err) {
        console.error('Ошибка при записи отчета:', err)
        return
      }
      console.log('Готово! Результаты сохранены в файл analysis.txt')
    })
  })
})
