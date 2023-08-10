import { createLogger } from 'bunyan'

export const logger = createLogger({
  name: 'backend-app',
  level: 'debug'
})
