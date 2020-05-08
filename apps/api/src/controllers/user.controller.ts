import { Request } from 'express'
import { Controller } from '../interfaces/controller.interface'
import { UserService } from '../services/user.service'
import { Endpoint } from '../routes/router'

export class UserController implements Controller {
    public service: UserService
    // public router = express.Router()

    constructor() {
        this.service = new UserService()
    }

    public endpoints: Endpoint[] = [
        {
            method: 'post',
            route: '/auth/register',
            handler: async (req: Request) => {
                const user = await this.service.create(req.body)
                req.session && (req.session.user = user)
                return user
            }
        },
        {
            method: 'post',
            route: '/auth/sign-in',
            handler: async (req: Request) => {
                const user = await this.service.authenticate(req.body)
                req.session && (req.session.user = user) 
                return user 
            }
        },
        {
            method: 'post',
            route: '/auth/sign-out',
            handler: async (req: Request) =>
                new Promise((resolve, reject) => {
                    req.session!.destroy(err => {
                        err ? reject(console.error(err)) : resolve({ success: true })
                    })
                })
        }, {
            method: 'get',
            route: '/auth/me',
            handler: (req: Request) => req.session!.user ? { user: req.session } : {}
        },
        {
            method: 'get',
            route: '/auth/all',
            handler: async () => await this.service.getAll()
        },
    ]
}
