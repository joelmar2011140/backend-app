import { Router } from 'express'
import { usersRoutes } from '../users/users.routes'
import { getMyAwesomeApplicantHttp } from '../users/users.controller'

export const apiRoutes = Router()

apiRoutes.use('/users', usersRoutes)
apiRoutes.get('/awesome/applicant', getMyAwesomeApplicantHttp)
