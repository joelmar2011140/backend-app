import { createServer } from 'http'
import dotenv from 'dotenv'
import { logger } from './lib/logger'
import { app } from './app/app'
import { startDb } from './lib/prisma'

dotenv.config()

function startServer (): void {
  const port = process.env.PORT ?? 4321
  const server = createServer(app)
  server.listen(port, async () => {
    try {
      console.clear()
      logger.info(`Server running on port ${port}`)
      await startDb()
    } catch (err: any) {
      logger.error('Error on startServer: ', err)
      process.exit(1)
    }
  })
}

startServer()
