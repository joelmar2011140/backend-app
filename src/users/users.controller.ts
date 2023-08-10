import type { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'
import { updatedAUser, createUser, deleteAUser, getAUser, getMyAwesomeApplicant } from './users.service'
import { validateCreateUser, validateUpdateUser } from './users.validations'
import { BadRequest } from 'http-errors'

export async function getMyAwesomeApplicantHttp (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const response = await getMyAwesomeApplicant()
    res.status(response.return.status).json(response)
  } catch (err: any) {
    logger.error('Error in getMyAwesomeApplicantHttp ', err)
    next(err)
  }
}

export async function getAUserHttp (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId: string = req.params.userId
    const response = await getAUser(userId)
    res.status(response.return.status).json(response)
  } catch (err: any) {
    logger.error('Error in getAUserHttp ', err)
    next(err)
  }
}

export async function updatedAUserHttp (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId: string = req.params.userId
    const incomingData = await validateUpdateUser.validateAsync(req.body)
    const response = await updatedAUser(userId, incomingData)
    res.status(response.return.status).json(response)
  } catch (err: any) {
    logger.error('Error in updatedAUserHttp ', err)
    if (err.name === 'ValidationError') {
      for (const details of err.details) {
        next(new BadRequest(details.message))
      }
    }
    next(err)
  }
}

export async function createUserHttp (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const incomingData = await validateCreateUser.validateAsync(req.body)
    const response = await createUser(incomingData)
    res.status(response.return.status).json(response)
  } catch (err: any) {
    logger.error('Error in deleteAUserHttp ', err)
    if (err.name === 'ValidationError') {
      for (const details of err.details) {
        next(new BadRequest(details.message))
      }
    }
    next(err)
  }
}

export async function deleteAUserHttp (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId: string = req.params.userId
    const response = await deleteAUser(userId)
    res.status(response.return.status).json(response)
  } catch (err: any) {
    logger.error('Error in deleteAUserHttp ', err)
    next(err)
  }
}
