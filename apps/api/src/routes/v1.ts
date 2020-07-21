import Router from './router'
import { UserController } from '../controllers/user.controller'
import { IexController } from '../controllers/iex.controller'

const userController = new UserController()
const dataController = new IexController()

export default new Router([
    ...userController.endpoints,
    ...dataController.endpoints,
])