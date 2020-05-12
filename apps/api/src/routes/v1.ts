import Router from './router'
import { UserController } from '../controllers/user.controller'
import { DataController } from '../controllers/data.controller'

const userController = new UserController()
const dataController = new DataController()

export default new Router([
    ...userController.endpoints,
    ...dataController.endpoints,
])