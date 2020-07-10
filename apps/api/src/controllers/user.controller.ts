import { Request } from 'express'
import { Controller } from '../interfaces/controller.interface'
import { UserService } from '../services/user.service'
import { Endpoint } from '../routes/router'

export class UserController implements Controller {
    public service: UserService

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
            handler: (req: Request) => { return { user: req.session?.user } }
        },
        {
            method: 'get',
            route: '/auth/all',
            handler: async () => await this.service.getAll()
        },
        {
            method: 'post',
            route: '/user/watchlist/:symbol',
            handler: async (req: Request) => {
                const { session, params: { symbol } } = req
                const user = session?.user

                if (!user.watchlist.includes(symbol)) {
                    const watchlist = [ ...user.watchlist, symbol ]
                    const updatedUser = await this.service.update(user._id, { ...user, watchlist })
                    session!.user = updatedUser
                    return updatedUser
                }

                return user
            }
        },
        {
            method: 'delete',
            route: '/user/watchlist/:symbol',
            handler: async (req: Request) => {
                const { session, params: { symbol } } = req
                const user = session?.user

                if (user.watchlist.includes(symbol)) {
                    const watchlist = user.watchlist.filter((item: string) => item !== symbol)
                    const updatedUser = await this.service.update(user._id, { ...user, watchlist })
                    session!.user = updatedUser
                    return updatedUser
                }

                return user
            }
        }
    ]
}
