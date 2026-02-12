const path = require('path')

const directory = '/home/user/documents'
const fileName = 'example.txt'

const fullPath = path.join(directory, fileName)

const extension = path.extname(fullPath)

console.log('путь не зависимо от ос:', fullPath)
console.log('расширение после .:', extension)
