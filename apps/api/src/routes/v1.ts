import Router from './router'
import { UserController } from '../controllers/user.controller'

const userController = new UserController()

export default new Router([
    ...userController.endpoints
])