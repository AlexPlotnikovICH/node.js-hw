const axios = require('axios')
require('dotenv').config()

const city = process.env.CITY

console.log(`погода в  — ${city}`)

const url = `https://wttr.in/${city}?format=%t`
axios
  .get(url)
  .then(response => {
    console.log(`Погода в городе ${city}: ${response.data}`)
  })
  .catch(error => {
    console.error('Ошибка', error.message)
  })
