import { Router } from 'express'
import { createUserHttp, deleteAUserHttp, getAUserHttp, updatedAUserHttp } from './users.controller'

export const usersRoutes = Router()

usersRoutes.route('/')
  .post(createUserHttp)

usersRoutes.route('/:userId')
  .get(getAUserHttp)
  .patch(updatedAUserHttp)
  .delete(deleteAUserHttp)
