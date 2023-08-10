import type { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'
import type { IError } from '../utils/global.types'
import { NotFound, HttpError } from 'http-errors'

export function erroMiddleware (err: any, req: Request, res: Response<IError>, next: NextFunction): void {
  logger.error(err)
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
      method: req.method,
      statusCode: err.statusCode,
      timestamp: new Date().toLocaleDateString()
    })
    return
  }
  res.status(500).json({
    message: 'Something happened in our server , please try later',
    method: req.method,
    statusCode: 500,
    timestamp: new Date().toLocaleDateString()
  })
}

export function error404 (req: Request, res: Response, next: NextFunction): void {
  next(new NotFound('Resource not found'))
}
