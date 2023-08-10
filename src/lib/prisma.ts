import { PrismaClient } from '@prisma/client'
import { logger } from './logger'

export const prismaClient = new PrismaClient()

export async function startDb (): Promise<void> {
  try {
    await prismaClient.$connect()
    logger.info('Database connected')
  } catch (err: any) {
    logger.error('Error on startDb: ', err)
    await prismaClient.$disconnect()
  }
}
