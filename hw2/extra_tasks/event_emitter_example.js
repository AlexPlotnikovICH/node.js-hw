import EventEmiter from 'events'
import chalk from 'chalk'

const logger = new EventEmiter()

logger.on('info', message => {
  console.log(`${chalk.white.bgGreen('Info:')} ${message}`)
})

logger.on('warning', message => {
  console.log(`${chalk.white.bgYellow('Warning:')} ${message}`)
})

logger.on('error', message => {
  console.log(`${chalk.black.bgRed('Error:')} ${message}`)
})

export default logger
