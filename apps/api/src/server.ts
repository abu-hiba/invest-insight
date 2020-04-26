import App from './app'
import validateEnv from './utils/validateEnv'
import { UserController } from './controllers/user.controller'

validateEnv()

const app = new App(
    [
        new UserController()
    ]
)

app.listen()
