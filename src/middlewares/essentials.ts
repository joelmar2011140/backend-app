import helmet from 'helmet'
import hpp from 'hpp'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import { type Application, json, urlencoded } from 'express'
import { apiRoutes } from '../app/app.routes'

export function useMiddlewares (app: Application): void {
  app.use(helmet())
  app.use(hpp())
  app.use(compression())
  app.use(cors({
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  }))
  app.use(json({ limit: '5mb' }))
  app.use(urlencoded({ extended: true }))
  app.use(morgan('common'))
  app.use('/api', apiRoutes)
}
